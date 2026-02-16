"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full border border-gray-200 bg-gray-100 p-0.5 dark:border-[#2a2a3e] dark:bg-[#14141f]">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${language === "en"
          ? "bg-violet-500 text-white shadow shadow-violet-500/20 dark:bg-violet-600"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${language === "es"
          ? "bg-violet-500 text-white shadow shadow-violet-500/20 dark:bg-violet-600"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          }`}
      >
        ES
      </button>
    </div>
  );
}
