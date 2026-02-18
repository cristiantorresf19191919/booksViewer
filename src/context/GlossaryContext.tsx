"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { GlossaryEntry } from "@/types/book";
import { useBook } from "./BookContext";

const STORAGE_KEY_PREFIX = "book-friends-glossary";

interface GlossaryContextValue {
  glossary: GlossaryEntry[];
  glossaryCount: number;
  addToGlossary: (word: string) => boolean;
  removeFromGlossary: (word: string) => void;
  isInGlossary: (word: string) => boolean;
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null);

function getStorageKey(bookId: string): string {
  return `${STORAGE_KEY_PREFIX}-${bookId}`;
}

function loadGlossary(bookId: string): GlossaryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(bookId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GlossaryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGlossary(bookId: string, entries: GlossaryEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(entries));
}

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const { currentBook, getDefinition } = useBook();
  const [glossary, setGlossary] = useState<GlossaryEntry[]>([]);

  // Reload glossary when book changes
  useEffect(() => {
    queueMicrotask(() => {
      setGlossary(loadGlossary(currentBook.id));
    });
  }, [currentBook.id]);

  const addToGlossary = useCallback((word: string): boolean => {
    const normalized = word.trim().toLowerCase().replace(/[^\w']/g, "");
    if (!normalized) return false;
    const entry = getDefinition(normalized);
    const definition = entry?.definition ?? "No definition in dictionary.";
    const definitionEs = entry?.definitionEs ?? "Sin definición en el diccionario.";
    setGlossary((prev) => {
      if (prev.some((e) => e.word.toLowerCase() === normalized)) return prev;
      const next: GlossaryEntry[] = [
        ...prev,
        { word: normalized, definition, definitionEs, addedAt: Date.now() },
      ].sort((a, b) => a.word.localeCompare(b.word));
      saveGlossary(currentBook.id, next);
      return next;
    });
    return true;
  }, [currentBook.id, getDefinition]);

  const removeFromGlossary = useCallback((word: string) => {
    const normalized = word.trim().toLowerCase();
    setGlossary((prev) => {
      const next = prev.filter((e) => e.word.toLowerCase() !== normalized);
      saveGlossary(currentBook.id, next);
      return next;
    });
  }, [currentBook.id]);

  const isInGlossary = useCallback(
    (word: string) => glossary.some((e) => e.word.toLowerCase() === word.trim().toLowerCase()),
    [glossary]
  );

  return (
    <GlossaryContext.Provider
      value={{ glossary, glossaryCount: glossary.length, addToGlossary, removeFromGlossary, isInGlossary }}
    >
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const ctx = useContext(GlossaryContext);
  if (!ctx) throw new Error("useGlossary must be used within GlossaryProvider");
  return ctx;
}
