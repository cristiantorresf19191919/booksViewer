"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

const FONT_SIZES = [14, 16, 18, 20, 22, 24] as const;
const DEFAULT_INDEX = 1; // 16px
const STORAGE_KEY = "book-friends-font-size-index";

interface FontSizeContextValue {
  fontSize: number;
  fontSizeIndex: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(DEFAULT_INDEX);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < FONT_SIZES.length) {
        setIndex(parsed);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(index));
  }, [index]);

  const increase = useCallback(() => {
    setIndex((i) => Math.min(i + 1, FONT_SIZES.length - 1));
  }, []);

  const decrease = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIndex(DEFAULT_INDEX);
  }, []);

  return (
    <FontSizeContext.Provider
      value={{
        fontSize: FONT_SIZES[index],
        fontSizeIndex: index,
        increase,
        decrease,
        reset,
        canIncrease: index < FONT_SIZES.length - 1,
        canDecrease: index > 0,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize must be used within FontSizeProvider");
  return ctx;
}
