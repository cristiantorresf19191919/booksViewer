"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PARAGRAPHS_PER_PAGE } from "@/constants/book";
import type { ContentBlock } from "@/types/book";

interface SearchResult {
  paragraphIndex: number;
  pageIndex: number;
  snippet: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  paragraphs: ContentBlock[];
  onNavigate: (pageIndex: number, paragraphIndex: number) => void;
  language: "en" | "es";
}

function getBlockTextForSearch(block: ContentBlock, lang: "en" | "es"): string | null {
  if (typeof block === "string") return block;
  if (typeof block === "object" && block !== null && "en" in block)
    return (block as { en: string; es: string })[lang] ?? (block as { en: string }).en;
  return null;
}

export function SearchModal({ isOpen, onClose, paragraphs, onNavigate, language }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const results: SearchResult[] = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    for (let i = 0; i < paragraphs.length && found.length < 50; i++) {
      const text = getBlockTextForSearch(paragraphs[i], language);
      if (!text) continue;
      const lower = text.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx !== -1) {
        const snippetStart = Math.max(0, idx - 40);
        const snippetEnd = Math.min(text.length, idx + query.length + 40);
        const snippet =
          (snippetStart > 0 ? "..." : "") +
          text.slice(snippetStart, snippetEnd) +
          (snippetEnd < text.length ? "..." : "");
        found.push({
          paragraphIndex: i,
          pageIndex: Math.floor(i / PARAGRAPHS_PER_PAGE),
          snippet,
        });
      }
    }
    return found;
  }, [query, paragraphs, language]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onNavigate(result.pageIndex, result.paragraphIndex);
      onClose();
    },
    [onNavigate, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c] overflow-hidden search-modal-enter">
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-[#1f1f30]">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search in book...", "Buscar en el libro...")}
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none dark:text-gray-200 dark:placeholder-gray-500"
          />
          <kbd className="hidden sm:inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-gray-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              {t("Type at least 2 characters to search", "Escribe al menos 2 caracteres para buscar")}
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              {t("No results found", "No se encontraron resultados")}
            </div>
          ) : (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {results.length} {t("results", "resultados")}
              </div>
              {results.map((result, i) => (
                <button
                  key={`${result.paragraphIndex}-${i}`}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className="w-full px-4 py-3 text-left hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-colors border-b border-gray-50 dark:border-[#1a1a2e] last:border-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-lg bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      {t("Page", "Pag.")} {result.pageIndex + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {result.snippet}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-4 py-2 text-[10px] text-gray-400 dark:border-[#1f1f30] dark:text-gray-500 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 dark:border-[#2a2a3e] dark:bg-[#1a1a2e]">Enter</kbd>
            {t("to select", "para seleccionar")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 dark:border-[#2a2a3e] dark:bg-[#1a1a2e]">Esc</kbd>
            {t("to close", "para cerrar")}
          </span>
        </div>
      </div>
    </div>
  );
}
