"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useBook } from "@/context/BookContext";
import { useLanguage } from "@/context/LanguageContext";
import { useGlossary } from "@/context/GlossaryContext";
import { useCurrentPage } from "@/context/CurrentPageContext";
import { useFavorites } from "@/context/FavoritesContext";

interface WordWithTooltipProps {
  word: string;
  onAddToGlossary?: (word: string) => void;
}

/** Strip trailing punctuation so "temerity?" matches "temerity" */
function normalizeForLookup(token: string): string {
  return token.replace(/^['"]|['",;:.!?)\]}\s]+$/g, "").toLowerCase();
}

export function WordWithTooltip({ word, onAddToGlossary }: WordWithTooltipProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { getDefinition } = useBook();
  const { language, t } = useLanguage();
  const { addToGlossary, isInGlossary } = useGlossary();
  const pageIndex = useCurrentPage();
  const { addFavorite } = useFavorites();

  const normalized = normalizeForLookup(word);
  const entry = getDefinition(normalized);
  const inGlossary = isInGlossary(normalized);
  const hasDefinition = !!entry;

  // Clear any pending hide timeout
  const cancelHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Show tooltip immediately
  const handleMouseEnter = useCallback(() => {
    cancelHide();
    setShow(true);
  }, [cancelHide]);

  // Hide tooltip with a small delay to allow moving to the tooltip
  const handleMouseLeave = useCallback(() => {
    cancelHide();
    hideTimeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 150); // 150ms delay to move mouse to tooltip
  }, [cancelHide]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!show || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.top - 8 });
  }, [show]);

  const definition = entry
    ? language === "es"
      ? entry.definitionEs
      : entry.definition
    : null;

  const handleAddGlossary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (normalized && addToGlossary(normalized)) {
      onAddToGlossary?.(normalized);
    }
  };

  const handleAddFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (normalized) addFavorite(pageIndex, "word", normalized);
  };

  if (!hasDefinition && !inGlossary) {
    return <>{word}</>;
  }

  const displayDef = definition ?? (inGlossary ? t("In your glossary", "En tu glosario") : "");

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-help border-b border-dotted border-amber-600/60 text-amber-800 dark:text-amber-200 dark:border-amber-400/50"
      >
        {word}
      </span>
      {show && displayDef && (
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed z-50 max-w-xs rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm shadow-lg dark:border-amber-800 dark:bg-amber-950/95 dark:text-amber-100"
          style={{
            left: pos?.x ?? 0,
            top: (pos?.y ?? 0) - 4,
            transform: "translateY(-100%)",
          }}
        >
          <span className="block font-medium text-amber-900 dark:text-amber-100">
            {entry?.word ?? normalized}
          </span>
          <span className="block mt-0.5 text-amber-800 dark:text-amber-200">{displayDef}</span>
          <span className="block mt-2 flex flex-wrap gap-1.5">
            {entry && !inGlossary && (
              <button
                type="button"
                onClick={handleAddGlossary}
                className="rounded bg-amber-200 px-2 py-1 text-xs font-medium text-amber-900 hover:bg-amber-300 dark:bg-amber-800 dark:text-amber-100 dark:hover:bg-amber-700"
              >
                + {t("Glossary", "Glosario")}
              </button>
            )}
            <button
              type="button"
              onClick={handleAddFavorite}
              className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-200 dark:bg-amber-900/70 dark:text-amber-100 dark:hover:bg-amber-800"
            >
              + {t("Favorites (this page)", "Favoritos (esta página)")}
            </button>
          </span>
        </span>
      )}
    </>
  );
}
