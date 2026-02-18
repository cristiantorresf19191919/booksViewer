"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useBook } from "@/context/BookContext";
import { useGlossary } from "@/context/GlossaryContext";

interface ReadingStats {
  totalReadingSeconds: number;
  pagesVisited: number[];
  lastReadDate: string;
  streakDays: number;
  sessionsCount: number;
}

function getStorageKey(bookId: string) {
  return `book-friends-reading-stats-${bookId}`;
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadStats(bookId: string): ReadingStats {
  try {
    const stored = localStorage.getItem(getStorageKey(bookId));
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return {
    totalReadingSeconds: 0,
    pagesVisited: [],
    lastReadDate: "",
    streakDays: 0,
    sessionsCount: 0,
  };
}

function saveStats(bookId: string, stats: ReadingStats) {
  localStorage.setItem(getStorageKey(bookId), JSON.stringify(stats));
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

interface ReadingStatsPanelProps {
  currentPage: number;
  totalPages: number;
}

export function ReadingStatsPanel({ currentPage, totalPages }: ReadingStatsPanelProps) {
  const { t } = useLanguage();
  const { currentBook } = useBook();
  const { glossaryCount } = useGlossary();
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<ReadingStats>(() => loadStats(currentBook.id));
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    setStats(loadStats(currentBook.id));
    setSessionSeconds(0);
  }, [currentBook.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sessionSeconds > 0 && sessionSeconds % 10 === 0) {
      setStats((prev) => {
        const updated = { ...prev, totalReadingSeconds: prev.totalReadingSeconds + 10 };
        saveStats(currentBook.id, updated);
        return updated;
      });
    }
  }, [sessionSeconds, currentBook.id]);

  useEffect(() => {
    setStats((prev) => {
      if (prev.pagesVisited.includes(currentPage)) return prev;
      const updated = { ...prev, pagesVisited: [...prev.pagesVisited, currentPage] };
      saveStats(currentBook.id, updated);
      return updated;
    });
  }, [currentPage, currentBook.id]);

  useEffect(() => {
    const today = getTodayStr();
    setStats((prev) => {
      if (prev.lastReadDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);
      const isConsecutive = prev.lastReadDate === yesterdayStr;
      const updated = {
        ...prev,
        lastReadDate: today,
        streakDays: isConsecutive ? prev.streakDays + 1 : 1,
        sessionsCount: prev.sessionsCount + 1,
      };
      saveStats(currentBook.id, updated);
      return updated;
    });
  }, [currentBook.id]);

  const togglePanel = useCallback(() => setIsOpen((o) => !o), []);

  const uniquePages = stats.pagesVisited.length;
  const completionPercent = totalPages > 0 ? Math.round((uniquePages / totalPages) * 100) : 0;
  const avgPagesPerSession = stats.sessionsCount > 0 ? Math.round(uniquePages / stats.sessionsCount) : 0;
  const totalTime = stats.totalReadingSeconds + sessionSeconds;

  const pagesRemaining = totalPages - uniquePages;
  const timePerPage = uniquePages > 0 ? totalTime / uniquePages : 120;
  const estimatedRemaining = Math.round(pagesRemaining * timePerPage);

  return (
    <>
      <button
        type="button"
        onClick={togglePanel}
        className="rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200 transition-colors"
        title={t("Reading Statistics", "Estadisticas de Lectura")}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={togglePanel} />

          <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c] overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-[#1f1f30]">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {t("Reading Stats", "Estadisticas")}
                </h2>
              </div>
              <button
                type="button"
                onClick={togglePanel}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30">
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-300">
                  {formatTime(totalTime)}
                </p>
                <p className="text-xs text-violet-600/80 dark:text-violet-400/80 mt-1">
                  {t("Reading time", "Tiempo de lectura")}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  {uniquePages}/{totalPages}
                </p>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1">
                  {t("Pages read", "Paginas leidas")}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {glossaryCount}
                </p>
                <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                  {t("Words learned", "Palabras aprendidas")}
                </p>
              </div>

              <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">
                  {stats.streakDays} {t("days", "dias")}
                </p>
                <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mt-1">
                  {t("Reading streak", "Racha de lectura")}
                </p>
              </div>
            </div>

            <div className="px-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {t("Book completion", "Progreso del libro")}
                </span>
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{completionPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-[#1a1a2e] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${completionPercent}%`,
                    background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
                  }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-[#1f1f30] px-5 py-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{t("Sessions", "Sesiones")}: {stats.sessionsCount}</span>
              <span>{t("Avg pages/session", "Prom. paginas/sesion")}: {avgPagesPerSession}</span>
            </div>

            {pagesRemaining > 0 && (
              <div className="border-t border-gray-100 dark:border-[#1f1f30] px-5 py-3 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("Estimated time remaining", "Tiempo restante estimado")}:{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{formatTime(estimatedRemaining)}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
