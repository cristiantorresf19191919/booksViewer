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
  const articleRef = useRef<HTMLElement>(null);

  const goToPage = useCallback((nextIndex: number, paragraphIndex?: number) => {
    setPageIndex((p) => {
      const dir = nextIndex > p ? 1 : -1;
      setPageDirection(dir);
      return nextIndex;
    });
    // Set paragraph to scroll to after page renders
    if (paragraphIndex !== undefined) {
      setScrollToParagraph(paragraphIndex);
    }
  }, []);

  // Handle scrolling to specific paragraph after page change
  useEffect(() => {
    if (scrollToParagraph !== null) {
      // Small delay to ensure DOM is updated after page transition
      const timer = setTimeout(() => {
        const paragraphId = `paragraph-${scrollToParagraph}`;
        const element = document.getElementById(paragraphId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Add highlight effect
          element.classList.add("highlight-flash");
          setTimeout(() => element.classList.remove("highlight-flash"), 2000);
        }
        setScrollToParagraph(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [scrollToParagraph, pageIndex]);

  // Load book content when book changes
  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      if (!cancelled) {
        setLoading(true);
        setError(null);
        setPageIndex(0); // Reset to first page when switching books
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

  // All hooks must run unconditionally (before any early return)
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
      // Only handle arrow keys in paginated mode
      if (!scrollMode && !fullscreenMode) {
        if (e.key === "ArrowLeft") {
          goToPage(Math.max(0, pageIndex - 1));
        } else if (e.key === "ArrowRight") {
          goToPage(Math.min(totalPages - 1, pageIndex + 1));
        }
      }
      if (e.key === "Escape") {
        // Exit fullscreen on Escape
        if (fullscreenMode) {
          setFullscreenMode(false);
        }
        // Stop speech on Escape
        if (speechStatus !== "idle") {
          stopSpeech();
        }
        setSelectionPopup(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [totalPages, pageIndex, speechStatus, stopSpeech, goToPage, scrollMode, fullscreenMode]);

  // Close popup when clicking outside
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
      <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="text-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent mx-auto" />
          <p className="text-stone-600 dark:text-stone-400">{t("Loading book...", "Cargando libro...")}</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="max-w-md text-center px-4">
          <p className="text-red-600 dark:text-red-400 mb-2">
            {error ?? t("Book data not found.", "Datos del libro no encontrados.")}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 via-stone-50 to-amber-50/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/90 backdrop-blur-md dark:border-stone-700/80 dark:bg-stone-900/90 shadow-sm">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
          {/* Logo on top */}
          <Link href="/" className="group flex items-center justify-center gap-2.5 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md transition-transform group-hover:scale-105">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
            <span className="font-literata text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Cristian<span className="text-amber-600 dark:text-amber-500">Lecturas</span>.com
            </span>
          </Link>
          {/* Book navigation and tools below */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/80 dark:border-stone-700/80">
            <div className="min-w-0 flex-1">
              <h1 className="font-literata text-base font-semibold tracking-tight text-stone-800 dark:text-stone-200 truncate">
                {bookTitle}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                {currentBook.author}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <BookSelector />
              <button
                type="button"
                onClick={() => setTocOpen(true)}
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
              >
                {t("Contents", "Indice")}
              </button>
              {/* Scroll/Paginated Toggle */}
              <button
                type="button"
                onClick={() => setScrollMode(!scrollMode)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  scrollMode
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
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
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                title={t("Fullscreen reading", "Lectura pantalla completa")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <LanguageToggle />
              <ThemeToggle />
              <GlossaryPanel />
              <FavoritesPanel />
            </div>
          </div>
        </div>
      </header>

      {/* Page nav + hint */}
      {!scrollMode && (
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {content.paragraphs.length} {t("paragraphs", "parrafos")} · {t("Use left/right to turn pages", "Usa izquierda/derecha para cambiar de pagina")}
            {speechSupported && (
              <span className="ml-2">· {t("Select text to read aloud", "Selecciona texto para leer en voz alta")}</span>
            )}
          </p>
          <nav className="flex items-center gap-2 flex-wrap" aria-label={t("Pagination", "Paginacion")}>
            <button
              type="button"
              onClick={() => goToPage(Math.max(0, pageIndex - 1))}
              disabled={pageIndex === 0}
              aria-label={t("Previous page", "Pagina anterior")}
              className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              {t("Previous", "Anterior")}
            </button>
            <span className="text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
              {t("Page", "Pagina")} {pageIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages - 1, pageIndex + 1))}
              disabled={pageIndex >= totalPages - 1}
              aria-label={t("Next page", "Pagina siguiente")}
              className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              {t("Next", "Siguiente")}
            </button>
            <button
              type="button"
              onClick={() => goToPage(totalPages - 1)}
              disabled={pageIndex >= totalPages - 1}
              aria-label={t("Go to last page", "Ir a la ultima pagina")}
              className="rounded-lg border border-amber-400 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-100 dark:border-amber-600 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
            >
              {t("Latest", "Ultima")}
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
          </nav>
        </div>
      )}

      {scrollMode && (
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            {t("Scroll mode active - showing all content", "Modo scroll activo - mostrando todo el contenido")} · {content.paragraphs.length} {t("paragraphs", "parrafos")}
            {speechSupported && (
              <span className="ml-2">· {t("Select text to read aloud", "Selecciona texto para leer en voz alta")}</span>
            )}
          </p>
        </div>
      )}

      {/* Book content */}
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-2 sm:px-6 relative">
        <CurrentPageProvider pageIndex={pageIndex}>
          <article
            ref={articleRef}
            onMouseUp={handleMouseUp}
            className="book-content rounded-2xl border border-stone-200/60 bg-white/70 p-8 shadow-sm dark:border-stone-700/60 dark:bg-stone-900/70 md:p-12 select-text min-h-[420px]"
          >
            {!scrollMode && (
              <div className="mb-6 flex items-baseline justify-between border-b border-stone-200 pb-2 dark:border-stone-700">
                <span className="text-xs font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {t("Page", "Pagina")} {pageIndex + 1}
                </span>
              </div>
            )}
            <div className="relative overflow-hidden">
              {scrollMode ? (
                // Scroll mode: show all content without pagination
                <div className="font-literata text-stone-800 dark:text-stone-200 space-y-4">
                  {content.paragraphs.map((block, idx) => {
                    if (isImageBlock(block)) {
                      return (
                        <figure
                          key={`img-${idx}`}
                          id={`paragraph-${idx}`}
                          className="my-6 first:mt-4 scroll-mt-32 transition-colors duration-500"
                        >
                          <Image
                            src={block.src}
                            alt=""
                            width={800}
                            height={500}
                            className="w-full h-auto rounded-lg border border-stone-200/60 dark:border-stone-600/60 shadow-sm"
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
                        className="mb-4 scroll-mt-32 transition-colors duration-500"
                      >
                        {lines.map((line, i) => (
                          <ParagraphWithTooltips key={i} text={line} />
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Paginated mode: show current page with animation
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
                    className="font-literata text-stone-800 dark:text-stone-200"
                  >
                    {pageParagraphs.map((block, idx) => {
                      const globalParagraphIndex = start + idx;
                      if (isImageBlock(block)) {
                        return (
                          <figure
                            key={`img-${globalParagraphIndex}`}
                            id={`paragraph-${globalParagraphIndex}`}
                            className="my-6 first:mt-4 scroll-mt-32 transition-colors duration-500"
                          >
                            <Image
                              src={block.src}
                              alt=""
                              width={800}
                              height={500}
                              className="w-full h-auto rounded-lg border border-stone-200/60 dark:border-stone-600/60 shadow-sm"
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
                          className="mb-4 scroll-mt-32 transition-colors duration-500"
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
            <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2 py-1 shadow-lg dark:border-stone-700 dark:bg-stone-800">
              {/* Read Aloud button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={readSelectionAloud}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30 transition-colors"
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
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-colors"
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
                className="flex items-center justify-center rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-700 dark:hover:text-stone-300 transition-colors"
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

      {/* Read Aloud Highlighter - shows text with word-by-word highlighting */}
      <ReadingHighlighter />

      {/* Read Aloud Controls */}
      <ReadAloudControls />

      {/* Fullscreen Reading Modal */}
      {fullscreenMode && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-stone-950 overflow-y-auto">
          {/* Fullscreen Header */}
          <div className="sticky top-0 z-10 border-b border-stone-200/80 bg-white/95 backdrop-blur-md dark:border-stone-700/80 dark:bg-stone-900/95 shadow-sm">
            <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="font-literata text-lg font-semibold tracking-tight text-stone-800 dark:text-stone-200 truncate">
                  {bookTitle}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {currentBook.author}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFullscreenMode(false)}
                className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 transition-colors"
                title={t("Exit fullscreen", "Salir de pantalla completa")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t("Exit", "Salir")}
              </button>
            </div>
          </div>

          {/* Fullscreen Content */}
          <div className="mx-auto max-w-4xl px-6 py-8">
            <article className="font-literata text-lg leading-relaxed text-stone-800 dark:text-stone-200 space-y-6">
              {content.paragraphs.map((block, idx) => {
                if (isImageBlock(block)) {
                  return (
                    <figure
                      key={`fullscreen-img-${idx}`}
                      className="my-8"
                    >
                      <Image
                        src={block.src}
                        alt=""
                        width={1000}
                        height={600}
                        className="w-full h-auto rounded-lg border border-stone-200/60 dark:border-stone-600/60 shadow-md"
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
                  <div key={`fullscreen-${idx}`} className="space-y-3">
                    {lines.map((line, i) => (
                      <ParagraphWithTooltips key={i} text={line} />
                    ))}
                  </div>
                );
              })}
            </article>
          </div>

          {/* Scroll to top button */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 rounded-full bg-amber-500 p-4 text-white shadow-lg hover:bg-amber-600 transition-colors"
            title={t("Scroll to top", "Ir arriba")}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer
        className="border-t border-stone-200/80 bg-white/50 dark:border-stone-700/80 dark:bg-stone-900/50 py-8 mt-8"
        style={{ animation: "footer-fade-in 0.6s ease-out forwards" }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-4">
          <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5">
            <span>Con amor para</span>
            <span className="font-semibold text-amber-600 dark:text-amber-500">Sandra Arisitzabal</span>
            <svg className="h-4 w-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500 tracking-wide font-medium">
            Created by{" "}
            <a
              href="https://agencypartner2.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-creator-link text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400"
            >
              CristianScript
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
