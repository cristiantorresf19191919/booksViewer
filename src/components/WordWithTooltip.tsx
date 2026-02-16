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

  const cancelHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    cancelHide();
    setShow(true);
  }, [cancelHide]);

  const handleMouseLeave = useCallback(() => {
    cancelHide();
    hideTimeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 150);
  }, [cancelHide]);

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
        className="cursor-help border-b border-dotted border-violet-500/60 text-violet-700 dark:text-violet-300 dark:border-violet-400/50"
      >
        {word}
      </span>
      {show && displayDef && (
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed z-50 max-w-xs rounded-xl border border-violet-200 bg-violet-50/95 backdrop-blur-md px-3 py-2 text-sm shadow-xl dark:border-violet-800/50 dark:bg-[#1a1a2e]/95 dark:text-violet-100"
          style={{
            left: pos?.x ?? 0,
            top: (pos?.y ?? 0) - 4,
            transform: "translateY(-100%)",
          }}
        >
          <span className="block font-medium text-violet-900 dark:text-violet-200">
            {entry?.word ?? normalized}
          </span>
          <span className="block mt-0.5 text-violet-800 dark:text-violet-300">{displayDef}</span>
          <span className="block mt-2 flex flex-wrap gap-1.5">
            {entry && !inGlossary && (
              <button
                type="button"
                onClick={handleAddGlossary}
                className="rounded-lg bg-violet-200 px-2 py-1 text-xs font-medium text-violet-900 hover:bg-violet-300 dark:bg-violet-800/60 dark:text-violet-100 dark:hover:bg-violet-700/60"
              >
                + {t("Glossary", "Glosario")}
              </button>
            )}
            <button
              type="button"
              onClick={handleAddFavorite}
              className="rounded-lg bg-violet-100 px-2 py-1 text-xs font-medium text-violet-800 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-200 dark:hover:bg-violet-800/40"
            >
              + {t("Favorites (this page)", "Favoritos (esta página)")}
            </button>
          </span>
        </span>
      )}
    </>
  );
}
