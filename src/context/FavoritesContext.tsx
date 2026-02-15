"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { FavoriteEntry } from "@/types/book";
import { useBook } from "./BookContext";

const STORAGE_KEY_PREFIX = "book-friends-favorites";

interface FavoritesContextValue {
  favorites: FavoriteEntry[];
  addFavorite: (pageIndex: number, type: "word" | "quote", content: string) => void;
  removeFavorite: (id: string) => void;
  getFavoritesForPage: (pageIndex: number) => FavoriteEntry[];
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function getStorageKey(bookId: string): string {
  return `${STORAGE_KEY_PREFIX}-${bookId}`;
}

function loadFavorites(bookId: string): FavoriteEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(bookId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(bookId: string, entries: FavoriteEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(entries));
}

function generateId() {
  return `fav-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { currentBook } = useBook();
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);

  // Reload favorites when book changes
  useEffect(() => {
    setFavorites(loadFavorites(currentBook.id));
  }, [currentBook.id]);

  const addFavorite = useCallback((pageIndex: number, type: "word" | "quote", content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setFavorites((prev) => {
      const next: FavoriteEntry[] = [
        ...prev,
        { id: generateId(), pageIndex, type, content: trimmed.slice(0, 500), addedAt: Date.now() },
      ];
      saveFavorites(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveFavorites(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const getFavoritesForPage = useCallback(
    (pageIndex: number) => favorites.filter((f) => f.pageIndex === pageIndex),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, getFavoritesForPage }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
