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
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e]"
      >
        <span className="text-lg">📖</span>
        {t("Glossary", "Glosario")} ({glossary.length})
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-80 max-h-[70vh] overflow-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c]/95">
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
