"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBookmarks } from "@/context/BookmarkContext";

interface BookmarksPanelProps {
  currentPageIndex: number;
  onNavigate: (pageIndex: number) => void;
}

export function BookmarksPanel({ currentPageIndex, onNavigate }: BookmarksPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const { t } = useLanguage();
  const { bookmarks, addBookmark, removeBookmark, updateBookmarkNote, isPageBookmarked, getBookmarkForPage } = useBookmarks();

  const sortedBookmarks = [...bookmarks].sort((a, b) => a.pageIndex - b.pageIndex);
  const currentBookmark = getBookmarkForPage(currentPageIndex);
  const isCurrentPageBookmarked = isPageBookmarked(currentPageIndex);

  const handleToggleBookmark = () => {
    if (isCurrentPageBookmarked && currentBookmark) {
      removeBookmark(currentBookmark.id);
    } else {
      addBookmark(currentPageIndex);
    }
  };

  const handleEditStart = (id: string, currentNote: string | undefined) => {
    setEditingId(id);
    setEditNote(currentNote || "");
  };

  const handleEditSave = () => {
    if (editingId) {
      updateBookmarkNote(editingId, editNote);
      setEditingId(null);
      setEditNote("");
    }
  };

  const handleNavigate = (pageIndex: number) => {
    onNavigate(pageIndex);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bookmark toggle button for current page */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleToggleBookmark}
          className={`flex items-center justify-center rounded-lg border p-2 transition-colors ${
            isCurrentPageBookmarked
              ? "border-amber-400 bg-amber-50 text-amber-600 dark:border-amber-500 dark:bg-amber-900/30 dark:text-amber-400"
              : "border-stone-300 bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-700 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-200"
          }`}
          title={isCurrentPageBookmarked ? t("Remove bookmark", "Quitar marcador") : t("Add bookmark", "Añadir marcador")}
        >
          <svg className="h-5 w-5" fill={isCurrentPageBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        {/* Show bookmarks panel button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          <span>{t("Bookmarks", "Marcadores")}</span>
          {bookmarks.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
              {bookmarks.length}
            </span>
          )}
        </button>
      </div>

      {/* Bookmarks panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-80 max-h-[70vh] overflow-auto rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900">
            <div className="sticky top-0 border-b border-stone-200 bg-stone-50 px-4 py-3 dark:border-stone-700 dark:bg-stone-800">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                {t("Your Bookmarks", "Tus Marcadores")}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t("Click the bookmark icon to save your current page", "Haz clic en el icono de marcador para guardar la página actual")}
              </p>
            </div>

            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {sortedBookmarks.length === 0 ? (
                <li className="px-4 py-8 text-center">
                  <svg className="mx-auto h-10 w-10 text-stone-300 dark:text-stone-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {t("No bookmarks yet", "Aún no hay marcadores")}
                  </p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                    {t("Click the bookmark icon above to add one", "Haz clic en el icono de marcador arriba para añadir uno")}
                  </p>
                </li>
              ) : (
                sortedBookmarks.map((bookmark) => (
                  <li key={bookmark.id} className="px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50">
                    {editingId === bookmark.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          placeholder={t("Add a note...", "Añadir nota...")}
                          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleEditSave}
                            className="flex-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600"
                          >
                            {t("Save", "Guardar")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="flex-1 rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-700"
                          >
                            {t("Cancel", "Cancelar")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => handleNavigate(bookmark.pageIndex)}
                          className="flex-1 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                              {t("Page", "Página")} {bookmark.pageIndex + 1}
                            </span>
                            {bookmark.pageIndex === currentPageIndex && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                                {t("Current", "Actual")}
                              </span>
                            )}
                          </div>
                          {bookmark.note && (
                            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                              {bookmark.note}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                            {new Date(bookmark.addedAt).toLocaleDateString()}
                          </p>
                        </button>
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditStart(bookmark.id, bookmark.note)}
                            className="rounded p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-700 dark:hover:text-stone-300"
                            title={t("Edit note", "Editar nota")}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBookmark(bookmark.id)}
                            className="rounded p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            title={t("Remove", "Quitar")}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
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
