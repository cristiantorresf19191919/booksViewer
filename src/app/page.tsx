"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BookContent, ContentBlock, ContentImage } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { ParagraphWithTooltips } from "@/components/ParagraphWithTooltips";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GlossaryPanel } from "@/components/GlossaryPanel";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { TableOfContents } from "@/components/TableOfContents";
import { BookSelector } from "@/components/BookSelector";
import { ReadAloudControls } from "@/components/ReadAloudControls";
import { ReadingHighlighter } from "@/components/ReadingHighlighter";
import { GoToPageModal } from "@/components/GoToPageModal";
import { BookmarksPanel } from "@/components/BookmarksPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useBook } from "@/context/BookContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useReadAloud } from "@/context/ReadAloudContext";
import { CurrentPageProvider } from "@/context/CurrentPageContext";
import { getBookToc } from "@/data/books";
import { resolveToc } from "@/utils/toc";
import { PARAGRAPHS_PER_PAGE } from "@/constants/book";

function splitParagraphLines(para: string): string[] {
  return para.split(/\n/).filter((line) => line.trim());
}

function isImageBlock(block: ContentBlock): block is ContentImage {
  return typeof block === "object" && block !== null && "type" in block && block.type === "image";
}

function getBlockText(block: ContentBlock, lang: "en" | "es"): string | null {
  if (typeof block === "string") return block;
  if (typeof block === "object" && block !== null && "en" in block) return (block as { en: string; es: string })[lang] ?? (block as { en: string }).en;
  return null;
}

export default function Home() {
  const { t, language } = useLanguage();
  const { currentBook } = useBook();
  const { addFavorite } = useFavorites();
  const { speak, status: speechStatus, stop: stopSpeech, isSupported: speechSupported } = useReadAloud();
  const [content, setContent] = useState<BookContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageDirection, setPageDirection] = useState<1 | -1>(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [selectionPopup, setSelectionPopup] = useState<{ x: number; y: number; text: string } | null>(null);
  const [scrollToParagraph, setScrollToParagraph] = useState<number | null>(null);
  const [scrollMode, setScrollMode] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [fullscreenFontSize, setFullscreenFontSize] = useState(1.15);
  const [fullscreenProgress, setFullscreenProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);
  const fullscreenContentRef = useRef<HTMLDivElement>(null);

  const goToPage = useCallback((nextIndex: number, paragraphIndex?: number) => {
    setPageIndex((p) => {
      const dir = nextIndex > p ? 1 : -1;
      setPageDirection(dir);
      return nextIndex;
    });
    if (paragraphIndex !== undefined) {
      setScrollToParagraph(paragraphIndex);
    }
  }, []);

  useEffect(() => {
    if (scrollToParagraph !== null) {
      const timer = setTimeout(() => {
        const paragraphId = `paragraph-${scrollToParagraph}`;
        const element = document.getElementById(paragraphId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("highlight-flash");
          setTimeout(() => element.classList.remove("highlight-flash"), 2000);
        }
        setScrollToParagraph(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [scrollToParagraph, pageIndex]);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      if (!cancelled) {
        setLoading(true);
        setError(null);
        setPageIndex(0);
      }

      try {
        const res = await fetch(currentBook.contentPath);
        if (!res.ok) throw new Error("Failed to load book");
        const d: BookContent = await res.json();
        if (!cancelled) {
          setContent(d);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message);
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [currentBook.contentPath]);

  // Track fullscreen scroll progress
  useEffect(() => {
    if (!fullscreenMode) return;
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setFullscreenProgress(Math.round((scrollTop / scrollHeight) * 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fullscreenMode]);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || !articleRef.current) {
      setSelectionPopup(null);
      return;
    }
    const range = sel?.getRangeAt(0);
    if (!range) return;
    const rect = range.getBoundingClientRect();
    setSelectionPopup({ x: rect.left + rect.width / 2, y: rect.bottom + 4, text });
  }, []);

  const addSelectionToFavorites = useCallback(() => {
    if (selectionPopup?.text) {
      addFavorite(pageIndex, "quote", selectionPopup.text);
      window.getSelection()?.removeAllRanges();
    }
    setSelectionPopup(null);
  }, [pageIndex, addFavorite, selectionPopup]);

  const readSelectionAloud = useCallback(() => {
    if (selectionPopup?.text) {
      speak(selectionPopup.text);
      window.getSelection()?.removeAllRanges();
    }
    setSelectionPopup(null);
  }, [speak, selectionPopup]);

  const closePopup = useCallback(() => {
    setSelectionPopup(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  const totalPages = content
    ? Math.max(1, Math.ceil(content.paragraphs.length / PARAGRAPHS_PER_PAGE))
    : 1;
  const bookToc = getBookToc(currentBook.id);
  const resolvedToc = useMemo(
    () => (content ? resolveToc(content.paragraphs, bookToc) : []),
    [content, bookToc]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (e.target.isContentEditable || e.target.closest("input, textarea, [role=textbox]"))) return;
      if (!scrollMode && !fullscreenMode) {
        if (e.key === "ArrowLeft") {
          goToPage(Math.max(0, pageIndex - 1));
        } else if (e.key === "ArrowRight") {
          goToPage(Math.min(totalPages - 1, pageIndex + 1));
        }
      }
      if (e.key === "Escape") {
        if (fullscreenMode) {
          setFullscreenMode(false);
        }
        if (speechStatus !== "idle") {
          stopSpeech();
        }
        setSelectionPopup(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [totalPages, pageIndex, speechStatus, stopSpeech, goToPage, scrollMode, fullscreenMode]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (selectionPopup && !(e.target as Element).closest(".selection-popup")) {
        const selection = window.getSelection();
        if (!selection?.toString().trim()) {
          setSelectionPopup(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [selectionPopup]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#08080f]">
        <div className="text-center">
          <div className="mb-6 relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-violet-200 dark:border-violet-800/40" />
            <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full border-2 border-purple-400 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Loading book...", "Cargando libro...")}</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#08080f]">
        <div className="max-w-md text-center px-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20">
            <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 mb-2 font-medium">
            {error ?? t("Book data not found.", "Datos del libro no encontrados.")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("Paste your book text into app/public/book_raw.txt and run: node scripts/parse-book-content.js", "Pega el texto del libro en app/public/book_raw.txt y ejecuta: node scripts/parse-book-content.js")}
          </p>
        </div>
      </div>
    );
  }

  const start = pageIndex * PARAGRAPHS_PER_PAGE;
  const end = Math.min(start + PARAGRAPHS_PER_PAGE, content.paragraphs.length);
  const pageParagraphs = content.paragraphs.slice(start, end);
  const bookTitle = language === "es" ? currentBook.titleEs : currentBook.titleEn;
  const progressPercent = totalPages > 1 ? Math.round(((pageIndex + 1) / totalPages) * 100) : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-[#08080f] dark:via-[#0c0c16] dark:to-[#08080f]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl dark:border-[#1f1f30]/80 dark:bg-[#0c0c16]/85 shadow-sm dark:shadow-[0_1px_0_rgba(255,255,255,0.03)]">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          {/* Top row: Logo + Theme/Language */}
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/20 transition-transform group-hover:scale-105">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
              <span className="font-literata text-base font-bold tracking-tight text-gray-900 dark:text-gray-100 hidden sm:inline">
                Cristian<span className="text-violet-600 dark:text-violet-400">Lecturas</span>.com
              </span>
            </Link>
            <div className="flex items-center gap-1.5">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Book info + tools row */}
          <div className="flex items-center gap-3 pt-2.5 mt-2.5 border-t border-gray-100 dark:border-[#1f1f30]/60">
            {/* Book title */}
            <div className="min-w-0 flex-1">
              <h1 className="font-literata text-[0.95rem] font-semibold leading-tight text-gray-800 dark:text-gray-200 truncate">
                {bookTitle}
              </h1>
              <p className="text-[0.7rem] text-gray-400 dark:text-gray-500 truncate mt-0.5">
                {currentBook.author}
              </p>
            </div>

            {/* Action buttons - organized in a clean row */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <BookSelector />
              <button
                type="button"
                onClick={() => setTocOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200 transition-colors"
                title={t("Table of Contents", "Indice")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span className="hidden md:inline">{t("Contents", "Indice")}</span>
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200 dark:bg-[#1f1f30] mx-0.5 hidden sm:block" />

              {/* Scroll/Paginated Toggle */}
              <button
                type="button"
                onClick={() => setScrollMode(!scrollMode)}
                className={`rounded-xl border p-2 transition-all ${
                  scrollMode
                    ? "border-emerald-400/50 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200"
                }`}
                title={scrollMode ? t("Switch to paginated", "Cambiar a paginado") : t("Switch to scroll", "Cambiar a scroll")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {scrollMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  )}
                </svg>
              </button>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={() => setFullscreenMode(true)}
                className="rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200 transition-colors"
                title={t("Expand reading mode", "Modo lectura expandido")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200 dark:bg-[#1f1f30] mx-0.5 hidden sm:block" />

              <GlossaryPanel />
              <FavoritesPanel />
            </div>
          </div>
        </div>
      </header>

      {/* Page nav + progress */}
      {!scrollMode && (
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          {/* Progress bar card */}
          <div className="mb-4 rounded-2xl border border-gray-200/60 bg-white/80 px-5 py-4 dark:border-[#1f1f30] dark:bg-[#12121c]/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-500">
                {t("Progress", "Progreso")} &middot; {content.paragraphs.length} {t("paragraphs", "parrafos")}
              </span>
              <span className="text-sm font-bold tabular-nums text-violet-600 dark:text-violet-400">
                {progressPercent}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-[#1a1a2e] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 40%, #6d28d9 70%, #818cf8 100%)",
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-between gap-3" aria-label={t("Pagination", "Paginacion")}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(Math.max(0, pageIndex - 1))}
                disabled={pageIndex === 0}
                aria-label={t("Previous page", "Pagina anterior")}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-600 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-800 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e] transition-colors"
              >
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{t("Previous", "Anterior")}</span>
              </button>

              <div className="flex items-center gap-1.5 rounded-xl bg-gray-100/80 dark:bg-[#14141f]/80 px-3 py-2">
                <span className="text-sm font-semibold tabular-nums text-gray-700 dark:text-gray-300" aria-live="polite">
                  {pageIndex + 1}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">/ {totalPages}</span>
              </div>

              <button
                type="button"
                onClick={() => goToPage(Math.min(totalPages - 1, pageIndex + 1))}
                disabled={pageIndex >= totalPages - 1}
                aria-label={t("Next page", "Pagina siguiente")}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-600 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-800 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e] transition-colors"
              >
                <span className="hidden sm:inline">{t("Next", "Siguiente")}</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToPage(totalPages - 1)}
                disabled={pageIndex >= totalPages - 1}
                aria-label={t("Go to last page", "Ir a la ultima pagina")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-sm font-medium text-violet-700 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-violet-100 dark:border-violet-500/30 dark:bg-violet-900/20 dark:text-violet-400 dark:hover:bg-violet-900/30 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                <span className="hidden sm:inline">{t("Latest", "Ultima")}</span>
              </button>
              <GoToPageModal
                totalPages={totalPages}
                currentPage={pageIndex}
                onNavigate={goToPage}
              />
              <BookmarksPanel
                currentPageIndex={pageIndex}
                onNavigate={goToPage}
              />
            </div>
          </nav>
        </div>
      )}

      {scrollMode && (
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/60 bg-emerald-50/60 px-5 py-3 dark:border-emerald-800/30 dark:bg-emerald-900/10 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                {t("Scroll mode", "Modo scroll")}
              </p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-400/60">
                {content.paragraphs.length} {t("paragraphs", "parrafos")}
                {speechSupported && (
                  <span> &middot; {t("Select text to read aloud", "Selecciona texto para leer en voz alta")}</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setScrollMode(false)}
              className="rounded-lg border border-emerald-300/50 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-white dark:border-emerald-700/30 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition-colors"
            >
              {t("Paginated", "Paginado")}
            </button>
          </div>
        </div>
      )}

      {/* Book content */}
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-2 sm:px-6 relative">
        <CurrentPageProvider pageIndex={pageIndex}>
          <article
            ref={articleRef}
            onMouseUp={handleMouseUp}
            className="book-content rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm dark:border-[#1f1f30] dark:bg-[#12121c]/90 sm:p-8 md:p-10 lg:p-12 select-text min-h-[70vh]"
          >
            {!scrollMode && (
              <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-[#1f1f30]/60">
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-violet-500/80 dark:text-violet-400/70">
                  {t("Page", "Pagina")} {pageIndex + 1}
                </span>
                {speechSupported && (
                  <span className="text-[0.65rem] text-gray-400 dark:text-gray-600 hidden sm:inline">
                    {t("Select text to read aloud", "Selecciona texto para leer en voz alta")}
                  </span>
                )}
              </div>
            )}
            <div className="relative overflow-hidden reading-content">
              {scrollMode ? (
                <div className="font-literata text-[1.05rem] leading-[1.85] text-gray-800 dark:text-gray-200 space-y-5">
                  {content.paragraphs.map((block, idx) => {
                    if (isImageBlock(block)) {
                      return (
                        <figure
                          key={`img-${idx}`}
                          id={`paragraph-${idx}`}
                          className="my-8 first:mt-4 scroll-mt-32 transition-colors duration-500"
                        >
                          <Image
                            src={block.src}
                            alt=""
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-xl border border-gray-200/60 dark:border-[#1f1f30] shadow-sm"
                            unoptimized
                          />
                        </figure>
                      );
                    }
                    const para = getBlockText(block, language);
                    if (!para) return null;
                    const lines = splitParagraphLines(para);
                    if (lines.length <= 1) {
                      return (
                        <div
                          key={`${idx}`}
                          id={`paragraph-${idx}`}
                          className="scroll-mt-32 transition-colors duration-500"
                        >
                          <ParagraphWithTooltips text={para} />
                        </div>
                      );
                    }
                    return (
                      <div
                        key={`${idx}`}
                        id={`paragraph-${idx}`}
                        className="mb-5 scroll-mt-32 transition-colors duration-500"
                      >
                        {lines.map((line, i) => (
                          <ParagraphWithTooltips key={i} text={line} />
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={pageIndex}
                    initial={{ opacity: 0, x: pageDirection * 60 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        x: { type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.25, ease: "easeOut" },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: -pageDirection * 60,
                      transition: {
                        x: { type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.2, ease: "easeIn" },
                      },
                    }}
                    className="font-literata text-[1.05rem] leading-[1.85] text-gray-800 dark:text-gray-200"
                  >
                    {pageParagraphs.map((block, idx) => {
                      const globalParagraphIndex = start + idx;
                      if (isImageBlock(block)) {
                        return (
                          <figure
                            key={`img-${globalParagraphIndex}`}
                            id={`paragraph-${globalParagraphIndex}`}
                            className="my-8 first:mt-4 scroll-mt-32 transition-colors duration-500"
                          >
                            <Image
                              src={block.src}
                              alt=""
                              width={800}
                              height={500}
                              className="w-full h-auto rounded-xl border border-gray-200/60 dark:border-[#1f1f30] shadow-sm"
                              unoptimized
                            />
                          </figure>
                        );
                      }
                      const para = getBlockText(block, language);
                      if (!para) return null;
                      const lines = splitParagraphLines(para);
                      if (lines.length <= 1) {
                        return (
                          <div
                            key={`${globalParagraphIndex}`}
                            id={`paragraph-${globalParagraphIndex}`}
                            className="scroll-mt-32 transition-colors duration-500"
                          >
                            <ParagraphWithTooltips text={para} />
                          </div>
                        );
                      }
                      return (
                        <div
                          key={`${globalParagraphIndex}`}
                          id={`paragraph-${globalParagraphIndex}`}
                          className="mb-5 scroll-mt-32 transition-colors duration-500"
                        >
                          {lines.map((line, i) => (
                            <ParagraphWithTooltips key={i} text={line} />
                          ))}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </article>

        </CurrentPageProvider>
        <TableOfContents
          resolvedToc={resolvedToc}
          currentPageIndex={pageIndex}
          onNavigate={goToPage}
          onClose={() => setTocOpen(false)}
          isOpen={tocOpen}
          paragraphsPerPage={PARAGRAPHS_PER_PAGE}
        />

        {/* Floating popup for selection actions */}
        {selectionPopup && (
          <div
            className="selection-popup fixed z-50 -translate-x-1/2 flex flex-col gap-1"
            style={{ left: selectionPopup.x, top: selectionPopup.y }}
          >
            <div className="flex items-center gap-0.5 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-md px-1.5 py-1 shadow-xl dark:border-[#2a2a3e] dark:bg-[#14141f]/95">
              {/* Read Aloud button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={readSelectionAloud}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-colors"
                  title={t("Read aloud", "Leer en voz alta")}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {t("Read", "Leer")}
                </button>
              )}

              {/* Add to favorites button */}
              <button
                type="button"
                onClick={addSelectionToFavorites}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20 transition-colors"
                title={t("Add to favorites", "Anadir a favoritos")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {t("Save", "Guardar")}
              </button>

              {/* Close button */}
              <button
                type="button"
                onClick={closePopup}
                className="flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300 transition-colors"
                title={t("Close", "Cerrar")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Read Aloud Highlighter */}
      <ReadingHighlighter />

      {/* Read Aloud Controls */}
      <ReadAloudControls />

      {/* Fullscreen / Expand Reading Mode */}
      <AnimatePresence>
        {fullscreenMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#06060c] overflow-y-auto"
          >
            {/* Fullscreen sticky header */}
            <div className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/95 backdrop-blur-xl dark:border-[#1a1a28]/60 dark:bg-[#08080f]/95">
              {/* Thin progress bar at very top */}
              <div className="h-0.5 w-full bg-gray-100 dark:bg-[#12121c]">
                <div
                  className="h-full rounded-r-full transition-all duration-300 ease-out"
                  style={{
                    width: `${fullscreenProgress}%`,
                    background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
                  }}
                />
              </div>
              <div className="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-literata text-sm font-semibold tracking-tight text-gray-700 dark:text-gray-300 truncate">
                    {bookTitle}
                  </h2>
                  <p className="text-[0.65rem] text-gray-400 dark:text-gray-600 mt-0.5">
                    {currentBook.author} &middot; {fullscreenProgress}% {t("read", "leido")}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Font size controls */}
                  <div className="hidden sm:flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 dark:border-[#2a2a3e] dark:bg-[#12121c] p-0.5">
                    <button
                      type="button"
                      onClick={() => setFullscreenFontSize(Math.max(0.85, fullscreenFontSize - 0.1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-700 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300 transition-colors"
                      title={t("Smaller text", "Texto mas pequeno")}
                    >
                      A-
                    </button>
                    <span className="w-10 text-center text-[0.65rem] tabular-nums text-gray-400 dark:text-gray-500">
                      {Math.round(fullscreenFontSize * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setFullscreenFontSize(Math.min(1.6, fullscreenFontSize + 0.1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-700 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300 transition-colors"
                      title={t("Larger text", "Texto mas grande")}
                    >
                      A+
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFullscreenMode(false)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e] transition-colors"
                    title={t("Exit expand mode", "Salir de modo expandido")}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                    <span className="hidden sm:inline">{t("Exit", "Salir")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div ref={fullscreenContentRef} className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
              <article
                className="font-literata leading-[1.9] text-gray-700 dark:text-gray-300 space-y-7"
                style={{ fontSize: `${fullscreenFontSize}rem` }}
              >
                {content.paragraphs.map((block, idx) => {
                  if (isImageBlock(block)) {
                    return (
                      <figure
                        key={`fullscreen-img-${idx}`}
                        className="my-10"
                      >
                        <Image
                          src={block.src}
                          alt=""
                          width={1000}
                          height={600}
                          className="w-full h-auto rounded-xl border border-gray-200/60 dark:border-[#1f1f30] shadow-md"
                          unoptimized
                        />
                      </figure>
                    );
                  }
                  const para = getBlockText(block, language);
                  if (!para) return null;
                  const lines = splitParagraphLines(para);
                  if (lines.length <= 1) {
                    return (
                      <div key={`fullscreen-${idx}`}>
                        <ParagraphWithTooltips text={para} />
                      </div>
                    );
                  }
                  return (
                    <div key={`fullscreen-${idx}`} className="space-y-4">
                      {lines.map((line, i) => (
                        <ParagraphWithTooltips key={i} text={line} />
                      ))}
                    </div>
                  );
                })}
              </article>
            </div>

            {/* Scroll to top FAB */}
            <AnimatePresence>
              {fullscreenProgress > 10 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="fixed bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/90 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600 backdrop-blur-sm transition-colors"
                  title={t("Scroll to top", "Ir arriba")}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 bg-gradient-to-b from-white/50 to-gray-50/80 dark:border-[#1f1f30]/60 dark:from-[#0c0c16]/50 dark:to-[#08080f]/80 py-10 mt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1.5">
            <span>{t("With love for", "Con amor para")}</span>
            <span className="font-semibold text-violet-600 dark:text-violet-400">Sandra Aristizabal</span>
            <svg className="h-4 w-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gray-200 dark:bg-[#1f1f30]" />
            <p className="text-xs text-gray-400 dark:text-gray-600 tracking-wide font-medium">
              {t("Created by", "Creado por")}{" "}
              <a
                href="https://agencypartner2.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-creator-link text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
              >
                CristianScript
              </a>
            </p>
            <div className="h-px w-8 bg-gray-200 dark:bg-[#1f1f30]" />
          </div>
        </div>
      </footer>
    </div>
  );
}
