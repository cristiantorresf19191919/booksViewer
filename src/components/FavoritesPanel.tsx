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
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e]"
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
          <div className="absolute right-0 top-full z-50 mt-2 w-96 max-h-[70vh] overflow-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c]/95">
            <div className="sticky top-0 border-b border-gray-200 bg-gray-50/90 backdrop-blur-md px-4 py-3 dark:border-[#1f1f30] dark:bg-[#14141f]/90 rounded-t-2xl">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {t("Favorites by page", "Favoritos por p\u00e1gina")}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {t("Select text and click \u201cAdd to favorites\u201d to save words or quotes for the current page.", "Selecciona texto y haz clic en \u00abA\u00f1adir a favoritos\u00bb para guardar palabras o citas en esta p\u00e1gina.")}
              </p>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-[#1f1f30]">
              {sortedPages.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-500">
                  {t("No favorites yet. Select text in the book and add to favorites for the current page.", "A\u00fan no hay favoritos. Selecciona texto en el libro y a\u00f1\u00e1delo a favoritos en la p\u00e1gina actual.")}
                </li>
              ) : (
                sortedPages.map((pageNum) => {
                  const pageFavs = favorites.filter((f) => f.pageIndex === pageNum);
                  return (
                    <li key={pageNum} className="px-4 py-3">
                      <div className="mb-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                        {t("Page", "P\u00e1gina")} {pageNum + 1}
                      </div>
                      <ul className="space-y-2">
                        {pageFavs.map((fav) => (
                          <li
                            key={fav.id}
                            className="flex items-start justify-between gap-2 rounded-xl bg-gray-50 px-2 py-1.5 dark:bg-[#14141f]/50"
                          >
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {fav.type === "word" ? "📖" : "💬"}
                            </span>
                            <span className="min-w-0 flex-1 text-sm text-gray-800 dark:text-gray-200">
                              {fav.content.length > 120
                                ? `${fav.content.slice(0, 120)}\u2026`
                                : fav.content}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFavorite(fav.id)}
                              className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300"
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
