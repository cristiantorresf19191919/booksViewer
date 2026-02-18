"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useGlossary } from "@/context/GlossaryContext";

export function GlossaryPanel() {
  const [open, setOpen] = useState(false);
  const { language, t } = useLanguage();
  const { glossary, removeFromGlossary } = useGlossary();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-2 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200"
        title={t("Glossary", "Glosario")}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {glossary.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[0.6rem] font-bold text-white">
            {glossary.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-3 z-50 mt-2 sm:absolute sm:inset-x-auto sm:right-0 sm:w-80 sm:max-w-80 max-h-[70vh] overflow-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c]/95">
            <div className="sticky top-0 border-b border-gray-200 bg-gray-50/90 backdrop-blur-md px-4 py-3 dark:border-[#1f1f30] dark:bg-[#14141f]/90 rounded-t-2xl">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {t("Words to learn", "Palabras para aprender")}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {t("Hover words in the text to add them.", "Pasa el cursor sobre palabras en el texto para añadirlas.")}
              </p>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-[#1f1f30]">
              {glossary.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-500">
                  {t("No words yet. Hover over underlined words and click \u201cAdd to glossary\u201d.", "A\u00fan no hay palabras. Pasa el cursor sobre las palabras subrayadas y haz clic en \u00abA\u00f1adir al glosario\u00bb.")}
                </li>
              ) : (
                glossary.map((entry) => (
                  <li key={entry.word} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-violet-700 dark:text-violet-300">
                          {entry.word}
                        </span>
                        <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                          {language === "es" ? entry.definitionEs : entry.definition}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromGlossary(entry.word)}
                        className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300"
                        title={t("Remove", "Quitar")}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
