"use client";

import { useMemo } from "react";
import { useReadAloud } from "@/context/ReadAloudContext";
import { useLanguage } from "@/context/LanguageContext";

export function ReadingHighlighter() {
  const { t } = useLanguage();
  const { currentText, currentHighlight, status } = useReadAloud();

  const words = useMemo(() => {
    if (!currentText) return [];
    const result: { word: string; startIndex: number }[] = [];
    let index = 0;
    const parts = currentText.split(/(\s+)/);

    for (const part of parts) {
      if (part.trim()) {
        result.push({ word: part, startIndex: index });
      }
      index += part.length;
    }
    return result;
  }, [currentText]);

  if (!currentText || status === "idle") {
    return null;
  }

  const currentWordIdx = currentHighlight
    ? words.findIndex((w, idx) => {
        const nextWord = words[idx + 1];
        const endIndex = nextWord ? nextWord.startIndex : currentText.length;
        return (
          currentHighlight.charIndex >= w.startIndex &&
          currentHighlight.charIndex < endIndex
        );
      })
    : -1;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[90vw] max-h-[30vh] overflow-y-auto rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-xl p-6 shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c]/95">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-[#1f1f30]">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-2">
          {status === "speaking" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
          )}
          {status === "speaking" ? t("Reading Aloud", "Leyendo en Voz Alta") : t("Paused", "Pausado")}
        </span>
      </div>
      <p className="font-literata text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {words.map((w, idx) => (
          <span
            key={`${w.startIndex}-${idx}`}
            className={
              idx === currentWordIdx
                ? "bg-violet-300 dark:bg-violet-500/60 text-gray-900 dark:text-white px-0.5 rounded transition-colors duration-75"
                : "transition-colors duration-75"
            }
          >
            {w.word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
