"use client";

import { useState } from "react";
import Image from "next/image";
import { useBook } from "@/context/BookContext";
import { useLanguage } from "@/context/LanguageContext";

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-900 dark:text-amber-100",
    hover: "hover:bg-amber-200 dark:hover:bg-amber-800/50",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-300 dark:border-emerald-700",
    text: "text-emerald-900 dark:text-emerald-100",
    hover: "hover:bg-emerald-200 dark:hover:bg-emerald-800/50",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-900 dark:text-blue-100",
    hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-300 dark:border-purple-700",
    text: "text-purple-900 dark:text-purple-100",
    hover: "hover:bg-purple-200 dark:hover:bg-purple-800/50",
  },
};

export function BookSelector() {
  const { currentBook, allBooks, selectBook } = useBook();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (bookId: string) => {
    selectBook(bookId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {t("Switch Book", "Cambiar Libro")}
        <svg className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full z-50 mt-2 w-96 rounded-xl border border-stone-200 bg-white p-2 shadow-xl dark:border-stone-700 dark:bg-stone-800">
            <div className="mb-2 px-2 py-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t("Select a Book", "Selecciona un Libro")}
              </h3>
            </div>

            <div className="space-y-2">
              {allBooks.map((book) => {
                const colors = colorClasses[book.coverColor] || colorClasses.amber;
                const isSelected = book.id === currentBook.id;
                const title = language === "es" ? book.titleEs : book.titleEn;
                const description = language === "es" ? book.descriptionEs : book.descriptionEn;

                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleSelect(book.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${colors.border} ${colors.bg} ${colors.hover} ${
                      isSelected ? "ring-2 ring-offset-2 ring-amber-500 dark:ring-offset-stone-800" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Cover image or fallback icon */}
                      {book.coverImage ? (
                        <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md shadow-md">
                          <Image
                            src={book.coverImage}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className={`flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-md ${colors.bg} ${colors.text} shadow-sm`}>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium leading-tight ${colors.text}`}>
                          {title}
                        </h4>
                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                          {book.author}
                        </p>
                        <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                          {description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 border-t border-stone-200 pt-2 dark:border-stone-700">
              <p className="px-2 text-xs text-stone-500 dark:text-stone-400">
                {t(
                  "Each book has its own glossary and favorites.",
                  "Cada libro tiene su propio glosario y favoritos."
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
