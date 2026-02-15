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
        className="flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-200 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
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
          <div className="absolute right-0 top-full z-50 mt-2 w-80 max-h-[70vh] overflow-auto rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900">
            <div className="sticky top-0 border-b border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-700 dark:bg-stone-800">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                {t("Words to learn", "Palabras para aprender")}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t("Hover words in the text to add them.", "Pasa el cursor sobre palabras en el texto para añadirlas.")}
              </p>
            </div>
            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {glossary.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
                  {t("No words yet. Hover over underlined words and click “Add to glossary”.", "Aún no hay palabras. Pasa el cursor sobre las palabras subrayadas y haz clic en «Añadir al glosario».")}
                </li>
              ) : (
                glossary.map((entry) => (
                  <li key={entry.word} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-amber-800 dark:text-amber-200">
                          {entry.word}
                        </span>
                        <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                          {language === "es" ? entry.definitionEs : entry.definition}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromGlossary(entry.word)}
                        className="shrink-0 rounded p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-600 dark:hover:bg-stone-700 dark:hover:text-stone-300"
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
