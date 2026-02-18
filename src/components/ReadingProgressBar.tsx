"use client";

import { useLanguage } from "@/context/LanguageContext";

interface ReadingProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export function ReadingProgressBar({ currentPage, totalPages }: ReadingProgressBarProps) {
  const { t } = useLanguage();
  const progress = totalPages > 1 ? ((currentPage + 1) / totalPages) * 100 : 100;
  const isComplete = currentPage >= totalPages - 1;

  return (
    <div className="reading-progress-container fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200/40 dark:bg-[#1a1a2e]/40">
      <div
        className={`reading-progress-bar h-full transition-all duration-500 ease-out ${
          isComplete
            ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
            : "bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600"
        }`}
        style={{ width: `${progress}%` }}
      />
      {/* Screen reader text */}
      <span className="sr-only">
        {t("Reading progress", "Progreso de lectura")}: {Math.round(progress)}%
      </span>
    </div>
  );
}
