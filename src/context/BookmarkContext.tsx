"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useBook } from "./BookContext";

const STORAGE_KEY_PREFIX = "book-friends-bookmarks";

export interface Bookmark {
  id: string;
  pageIndex: number;
  paragraphIndex?: number;
  note?: string;
  addedAt: number;
}

interface BookmarkContextValue {
  bookmarks: Bookmark[];
  addBookmark: (pageIndex: number, paragraphIndex?: number, note?: string) => void;
  removeBookmark: (id: string) => void;
  updateBookmarkNote: (id: string, note: string) => void;
  isPageBookmarked: (pageIndex: number) => boolean;
  getBookmarkForPage: (pageIndex: number) => Bookmark | undefined;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function getStorageKey(bookId: string): string {
  return `${STORAGE_KEY_PREFIX}-${bookId}`;
}

function loadBookmarks(bookId: string): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(bookId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Bookmark[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookId: string, entries: Bookmark[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(entries));
}

function generateId() {
  return `bm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const { currentBook } = useBook();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(loadBookmarks(currentBook.id));
  }, [currentBook.id]);

  const addBookmark = useCallback((pageIndex: number, paragraphIndex?: number, note?: string) => {
    setBookmarks((prev) => {
      // Don't add duplicate bookmarks for the same page
      if (prev.some((b) => b.pageIndex === pageIndex)) {
        return prev;
      }
      const next: Bookmark[] = [
        ...prev,
        { id: generateId(), pageIndex, paragraphIndex, note, addedAt: Date.now() },
      ];
      saveBookmarks(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBookmarks(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const updateBookmarkNote = useCallback((id: string, note: string) => {
    setBookmarks((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, note } : b));
      saveBookmarks(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const isPageBookmarked = useCallback(
    (pageIndex: number) => bookmarks.some((b) => b.pageIndex === pageIndex),
    [bookmarks]
  );

  const getBookmarkForPage = useCallback(
    (pageIndex: number) => bookmarks.find((b) => b.pageIndex === pageIndex),
    [bookmarks]
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, updateBookmarkNote, isPageBookmarked, getBookmarkForPage }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
