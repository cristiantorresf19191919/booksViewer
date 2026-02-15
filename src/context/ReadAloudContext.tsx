"use client";

import { createContext, useContext, ReactNode, useCallback, useMemo } from "react";
import { useTextToSpeech, SpeechStatus, WordHighlight } from "@/hooks/useTextToSpeech";
import { useLanguage } from "./LanguageContext";

interface ReadAloudContextValue {
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
  togglePlayPause: () => void;
  speakSelection: () => void;
}

const ReadAloudContext = createContext<ReadAloudContextValue | null>(null);

interface ReadAloudProviderProps {
  children: ReactNode;
}

export function ReadAloudProvider({ children }: ReadAloudProviderProps) {
  const { language } = useLanguage();

  // Map app language to speech synthesis language
  const speechLang = language === "es" ? "es-ES" : "en-US";

  const tts = useTextToSpeech({
    lang: speechLang,
    rate: 1,
  });

  const togglePlayPause = useCallback(() => {
    if (tts.status === "speaking") {
      tts.pause();
    } else if (tts.status === "paused") {
      tts.resume();
    }
  }, [tts]);

  const speakSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text) {
      tts.speak(text);
    }
  }, [tts]);

  const value = useMemo(
    () => ({
      ...tts,
      togglePlayPause,
      speakSelection,
    }),
    [tts, togglePlayPause, speakSelection]
  );

  return (
    <ReadAloudContext.Provider value={value}>
      {children}
    </ReadAloudContext.Provider>
  );
}

export function useReadAloud(): ReadAloudContextValue {
  const context = useContext(ReadAloudContext);
  if (!context) {
    throw new Error("useReadAloud must be used within a ReadAloudProvider");
  }
  return context;
}
