"use client";

import { useMemo } from "react";
import { useReadAloud } from "@/context/ReadAloudContext";
import { useLanguage } from "@/context/LanguageContext";

export function ReadingHighlighter() {
  const { t } = useLanguage();
  const { currentText, currentHighlight, status } = useReadAloud();

  // Split text into words while preserving whitespace for accurate positioning
  const words = useMemo(() => {
    if (!currentText) return [];
    // Split into words, keeping track of positions
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

  // Determine which word is currently being spoken based on charIndex
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
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[90vw] max-h-[30vh] overflow-y-auto rounded-2xl border border-stone-200/80 bg-white/95 backdrop-blur-md p-6 shadow-2xl dark:border-stone-700/80 dark:bg-stone-900/95">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200 dark:border-stone-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          {status === "speaking" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
          {status === "speaking" ? t("Reading Aloud", "Leyendo en Voz Alta") : t("Paused", "Pausado")}
        </span>
      </div>
      <p className="font-literata text-lg leading-relaxed text-stone-700 dark:text-stone-300">
        {words.map((w, idx) => (
          <span
            key={`${w.startIndex}-${idx}`}
            className={
              idx === currentWordIdx
                ? "bg-amber-300 dark:bg-amber-500/70 text-stone-900 dark:text-white px-0.5 rounded transition-colors duration-75"
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
