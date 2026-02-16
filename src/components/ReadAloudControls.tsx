"use client";

import { useState } from "react";
import { useReadAloud } from "@/context/ReadAloudContext";
import { useLanguage } from "@/context/LanguageContext";

export function ReadAloudControls() {
  const { t, language } = useLanguage();
  const {
    status,
    isSupported,
    stop,
    togglePlayPause,
    rate,
    setRate,
    availableVoices,
    selectedVoice,
    setSelectedVoice,
  } = useReadAloud();

  const [showSettings, setShowSettings] = useState(false);

  if (!isSupported) {
    return null;
  }

  const langCode = language === "es" ? "es" : "en";
  const languageVoices = availableVoices.filter((v) => v.lang.startsWith(langCode));

  const isActive = status === "speaking" || status === "paused";

  return (
    <div className="relative">
      {isActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 shadow-lg shadow-violet-500/20 dark:bg-violet-700">
          <button
            type="button"
            onClick={togglePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={status === "speaking" ? t("Pause", "Pausar") : t("Resume", "Reanudar")}
          >
            {status === "speaking" ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={stop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={t("Stop", "Detener")}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-white text-sm">
            {status === "speaking" && (
              <span className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {t("Reading...", "Leyendo...")}
              </span>
            )}
            {status === "paused" && (
              <span>{t("Paused", "Pausado")}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={t("Settings", "Configuración")}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      )}

      {showSettings && isActive && (
        <div className="fixed bottom-[55%] left-1/2 -translate-x-1/2 z-50 w-80 rounded-2xl bg-white/95 backdrop-blur-xl p-4 shadow-2xl dark:bg-[#12121c]/95 border border-gray-200 dark:border-[#2a2a3e]">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            {t("Read Aloud Settings", "Configuración de Lectura")}
          </h4>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">
              {t("Speed", "Velocidad")}: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#1a1a2e]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.5x</span>
              <span>1x</span>
              <span>2x</span>
            </div>
          </div>

          {languageVoices.length > 0 && (
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-500 mb-1">
                {t("Voice", "Voz")}
              </label>
              <select
                value={selectedVoice?.name || ""}
                onChange={(e) => {
                  const voice = availableVoices.find((v) => v.name === e.target.value);
                  setSelectedVoice(voice || null);
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-200"
              >
                {languageVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} {voice.localService ? "(Local)" : "(Online)"}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
