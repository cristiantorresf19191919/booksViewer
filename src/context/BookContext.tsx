"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { BookMetadata, DictionaryEntry } from "@/types/book";
import { booksCatalog, getBookById, getBookDefinitionFn, getBookHasWordFn, DEFAULT_BOOK_ID } from "@/data/books";

const STORAGE_KEY = "book-friends-selected-book";

interface BookContextValue {
  currentBook: BookMetadata;
  allBooks: BookMetadata[];
  selectBook: (bookId: string) => void;
  getDefinition: (word: string) => DictionaryEntry | undefined;
  hasWord: (word: string) => boolean;
}

const BookContext = createContext<BookContextValue | null>(null);

function loadSelectedBook(): string {
  if (typeof window === "undefined") return DEFAULT_BOOK_ID;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && getBookById(stored)) return stored;
    return DEFAULT_BOOK_ID;
  } catch {
    return DEFAULT_BOOK_ID;
  }
}

function saveSelectedBook(bookId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, bookId);
}

export function BookProvider({ children }: { children: ReactNode }) {
  const [bookId, setBookId] = useState<string>(() => loadSelectedBook());

  // No longer need the effect to load from storage - handled in useState initializer

  const selectBook = useCallback((newBookId: string) => {
    const book = getBookById(newBookId);
    if (book) {
      setBookId(newBookId);
      saveSelectedBook(newBookId);
    }
  }, []);

  const currentBook = getBookById(bookId) ?? booksCatalog[0];
  const getDefinition = getBookDefinitionFn(bookId);
  const hasWord = getBookHasWordFn(bookId);

  return (
    <BookContext.Provider
      value={{
        currentBook,
        allBooks: booksCatalog,
        selectBook,
        getDefinition,
        hasWord,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within BookProvider");
  return ctx;
}
