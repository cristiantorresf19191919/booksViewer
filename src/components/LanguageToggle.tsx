"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/types/book";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full border border-stone-300 bg-stone-100 p-0.5 dark:border-stone-600 dark:bg-stone-800">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${language === "en"
          ? "bg-amber-500 text-white shadow dark:bg-amber-600"
          : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${language === "es"
          ? "bg-amber-500 text-white shadow dark:bg-amber-600"
          : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          }`}
      >
        ES
      </button>
    </div>
  );
}
