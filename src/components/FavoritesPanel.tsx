"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";

export function FavoritesPanel() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { favorites, removeFavorite } = useFavorites();

  const byPage = new Map<number, { word: string[]; quote: string[] }>();
  favorites.forEach((f) => {
    if (!byPage.has(f.pageIndex)) byPage.set(f.pageIndex, { word: [], quote: [] });
    const entry = byPage.get(f.pageIndex)!;
    if (f.type === "word") entry.word.push(f.content);
    else entry.quote.push(f.content);
  });
  const sortedPages = Array.from(byPage.keys()).sort((a, b) => a - b);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-200 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
      >
        <span className="text-lg">⭐</span>
        {t("Favorites", "Favoritos")} ({favorites.length})
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-96 max-h-[70vh] overflow-auto rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900">
            <div className="sticky top-0 border-b border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-700 dark:bg-stone-800">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                {t("Favorites by page", "Favoritos por página")}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t("Select text and click “Add to favorites” to save words or quotes for the current page.", "Selecciona texto y haz clic en «Añadir a favoritos» para guardar palabras o citas en esta página.")}
              </p>
            </div>
            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {sortedPages.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-stone-500 dark:text-stone-400">
                  {t("No favorites yet. Select text in the book and add to favorites for the current page.", "Aún no hay favoritos. Selecciona texto en el libro y añádelo a favoritos en la página actual.")}
                </li>
              ) : (
                sortedPages.map((pageNum) => {
                  const pageFavs = favorites.filter((f) => f.pageIndex === pageNum);
                  return (
                    <li key={pageNum} className="px-4 py-3">
                      <div className="mb-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                        {t("Page", "Página")} {pageNum + 1}
                      </div>
                      <ul className="space-y-2">
                        {pageFavs.map((fav) => (
                          <li
                            key={fav.id}
                            className="flex items-start justify-between gap-2 rounded bg-stone-50 px-2 py-1.5 dark:bg-stone-800/50"
                          >
                            <span className="text-xs text-stone-500 dark:text-stone-400">
                              {fav.type === "word" ? "📖" : "💬"}
                            </span>
                            <span className="min-w-0 flex-1 text-sm text-stone-800 dark:text-stone-200">
                              {fav.content.length > 120
                                ? `${fav.content.slice(0, 120)}…`
                                : fav.content}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFavorite(fav.id)}
                              className="shrink-0 rounded p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-600 dark:hover:bg-stone-700 dark:hover:text-stone-300"
                              title={t("Remove", "Quitar")}
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
