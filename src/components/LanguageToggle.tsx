"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full border border-gray-200 bg-gray-50 p-0.5 dark:border-[#2a2a3e] dark:bg-[#14141f]">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${language === "en"
          ? "bg-violet-500 text-white shadow shadow-violet-500/20 dark:bg-violet-600 scale-105"
          : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${language === "es"
          ? "bg-violet-500 text-white shadow shadow-violet-500/20 dark:bg-violet-600 scale-105"
          : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
