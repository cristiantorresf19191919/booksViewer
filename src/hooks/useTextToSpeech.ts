"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type SpeechStatus = "idle" | "speaking" | "paused";

/** Word highlight info for visual feedback */
export interface WordHighlight {
  wordIndex: number;
  charIndex: number;
  charLength: number;
}

interface UseTextToSpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  status: SpeechStatus;
  isSupported: boolean;
  currentText: string | null;
  currentHighlight: WordHighlight | null;
  rate: number;
  setRate: (rate: number) => void;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
}

// Preferred male voice names (local voices are generally more natural)
const PREFERRED_MALE_VOICES_EN = [
  "Daniel", // macOS British English - very natural
  "Aaron",  // macOS US English
  "Alex",   // macOS US English
  "Tom",    // macOS US English
  "David",  // Windows
  "Mark",   // Windows
  "James",  // Various
  "Google UK English Male",
  "Google US English",
];

const PREFERRED_MALE_VOICES_ES = [
  "Jorge",   // macOS Spanish
  "Juan",    // macOS Spanish
  "Diego",   // macOS Spanish
  "Pablo",   // Various
  "Google español",
];

/** Find the best male voice for a language */
function findPreferredMaleVoice(
  voices: SpeechSynthesisVoice[],
  langCode: string
): SpeechSynthesisVoice | null {
  const preferredNames = langCode === "es" ? PREFERRED_MALE_VOICES_ES : PREFERRED_MALE_VOICES_EN;
  const langVoices = voices.filter((v) => v.lang.startsWith(langCode));

  // First, try to find a preferred male voice (local preferred)
  for (const name of preferredNames) {
    const voice = langVoices.find(
      (v) => v.name.includes(name) && v.localService
    );
    if (voice) return voice;
  }

  // Then try preferred male voice (any)
  for (const name of preferredNames) {
    const voice = langVoices.find((v) => v.name.includes(name));
    if (voice) return voice;
  }

  // Fallback: any local voice for the language
  const localVoice = langVoices.find((v) => v.localService);
  if (localVoice) return localVoice;

  // Final fallback: any voice for the language
  return langVoices[0] || null;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}): UseTextToSpeechReturn {
  const { lang = "en-US", rate: initialRate = 1, pitch = 1, onEnd, onError } = options;

  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [currentHighlight, setCurrentHighlight] = useState<WordHighlight | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [rate, setRate] = useState(initialRate);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>("");
  const isRestartingRef = useRef(false);

  // Check browser support and load voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      queueMicrotask(() => setIsSupported(true));

      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Auto-select a preferred male voice for the current language
        if (!selectedVoice && voices.length > 0) {
          const langCode = lang.split("-")[0];
          const preferredVoice = findPreferredMaleVoice(voices, langCode);
          if (preferredVoice) {
            setSelectedVoice(preferredVoice);
          }
        }
      };

      loadVoices();

      // Voices may load asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [lang, selectedVoice]);

  // Update voice when language changes - prefer male voices
  useEffect(() => {
    if (availableVoices.length > 0) {
      const langCode = lang.split("-")[0];
      const preferredVoice = findPreferredMaleVoice(availableVoices, langCode);
      if (preferredVoice) {
        queueMicrotask(() => setSelectedVoice(preferredVoice));
      }
    }
  }, [lang, availableVoices]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      textRef.current = text;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setStatus("speaking");
        setCurrentText(text);
        setCurrentHighlight(null);
      };

      // Track word boundaries for highlighting
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const charIndex = event.charIndex;
          const charLength = event.charLength || 0;

          // Calculate word index by counting words up to charIndex
          const textBeforeCursor = textRef.current.substring(0, charIndex);
          const wordsBefore = textBeforeCursor.split(/\s+/).filter(Boolean);
          const wordIndex = wordsBefore.length;

          setCurrentHighlight({
            wordIndex,
            charIndex,
            charLength,
          });
        }
      };

      utterance.onend = () => {
        setStatus("idle");
        setCurrentText(null);
        setCurrentHighlight(null);
        onEnd?.();
      };

      utterance.onerror = (event) => {
        if (event.error !== "canceled") {
          setStatus("idle");
          setCurrentText(null);
          setCurrentHighlight(null);
          onError?.(event.error);
        }
      };

      utterance.onpause = () => {
        setStatus("paused");
      };

      utterance.onresume = () => {
        setStatus("speaking");
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, lang, rate, pitch, selectedVoice, onEnd, onError]
  );

  // Restart speech when voice or rate changes during playback
  useEffect(() => {
    // Only restart if we're currently speaking or paused (not idle)
    // and we have text to speak
    if ((status === "speaking" || status === "paused") && textRef.current && !isRestartingRef.current) {
      isRestartingRef.current = true;

      // Cancel current speech
      window.speechSynthesis.cancel();

      // Small delay to ensure cancel completes, then restart
      const timeoutId = setTimeout(() => {
        const text = textRef.current;
        if (text) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang;
          utterance.rate = rate;
          utterance.pitch = pitch;

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          utterance.onstart = () => {
            setStatus("speaking");
            isRestartingRef.current = false;
          };

          utterance.onboundary = (event) => {
            if (event.name === "word") {
              const charIndex = event.charIndex;
              const charLength = event.charLength || 0;
              const textBeforeCursor = textRef.current.substring(0, charIndex);
              const wordsBefore = textBeforeCursor.split(/\s+/).filter(Boolean);
              const wordIndex = wordsBefore.length;
              setCurrentHighlight({ wordIndex, charIndex, charLength });
            }
          };

          utterance.onend = () => {
            setStatus("idle");
            setCurrentText(null);
            setCurrentHighlight(null);
            isRestartingRef.current = false;
            onEnd?.();
          };

          utterance.onerror = (event) => {
            if (event.error !== "canceled") {
              setStatus("idle");
              setCurrentText(null);
              setCurrentHighlight(null);
              isRestartingRef.current = false;
              onError?.(event.error);
            }
          };

          utterance.onpause = () => setStatus("paused");
          utterance.onresume = () => setStatus("speaking");

          utteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedVoice, rate, lang, pitch, status, onEnd, onError]); // Restart when voice or rate changes

  const pause = useCallback(() => {
    if (isSupported && status === "speaking") {
      window.speechSynthesis.pause();
      setStatus("paused");
    }
  }, [isSupported, status]);

  const resume = useCallback(() => {
    if (isSupported && status === "paused") {
      window.speechSynthesis.resume();
      setStatus("speaking");
    }
  }, [isSupported, status]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setStatus("idle");
      setCurrentText(null);
      setCurrentHighlight(null);
    }
  }, [isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    status,
    isSupported,
    currentText,
    currentHighlight,
    rate,
    setRate,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
  };
}
