"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { TocEntryResolved } from "@/types/book";

interface TableOfContentsProps {
  resolvedToc: TocEntryResolved[];
  currentPageIndex: number;
  onNavigate: (pageIndex: number, paragraphIndex?: number) => void;
  onClose: () => void;
  isOpen: boolean;
  paragraphsPerPage: number;
}

function TocItem({
  entry,
  currentPageIndex,
  onNavigate,
  onClose,
  language,
  depth = 0,
  paragraphsPerPage,
}: {
  entry: TocEntryResolved;
  currentPageIndex: number;
  onNavigate: (pageIndex: number, paragraphIndex?: number) => void;
  onClose: () => void;
  language: "en" | "es";
  depth?: number;
  paragraphsPerPage: number;
}) {
  const pageIndex = Math.floor(entry.paragraphIndex / paragraphsPerPage);
  const title = language === "es" ? entry.titleEs : entry.titleEn;
  const isActive = currentPageIndex === pageIndex;

  const handleClick = () => {
    onNavigate(pageIndex, entry.paragraphIndex);
    onClose();
  };

  return (
    <div className={depth > 0 ? "ml-3 border-l border-gray-200 pl-3 dark:border-[#1f1f30]" : ""}>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full text-left py-1.5 px-2 rounded-xl text-sm transition-colors ${isActive
          ? "bg-violet-50 font-medium text-violet-900 dark:bg-violet-900/20 dark:text-violet-200"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1a1a2e]"
          }`}
      >
        {title}
      </button>
      {entry.children?.map((child) => (
        <TocItem
          key={child.id}
          entry={child}
          currentPageIndex={currentPageIndex}
          onNavigate={onNavigate}
          onClose={onClose}
          language={language}
          depth={depth + 1}
          paragraphsPerPage={paragraphsPerPage}
        />
      ))}
    </div>
  );
}

export function TableOfContents({
  resolvedToc,
  currentPageIndex,
  onNavigate,
  onClose,
  isOpen,
  paragraphsPerPage,
}: TableOfContentsProps) {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60"
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto border-r border-gray-200 bg-white shadow-2xl dark:border-[#1f1f30] dark:bg-[#0c0c16]"
        aria-label={t("Table of contents", "\u00cdndice del libro")}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-[#1f1f30] dark:bg-[#0c0c16]">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            {t("Contents", "\u00cdndice")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300"
            aria-label={t("Close", "Cerrar")}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-3">
          {resolvedToc.map((entry) => (
            <TocItem
              key={entry.id}
              entry={entry}
              currentPageIndex={currentPageIndex}
              onNavigate={onNavigate}
              onClose={onClose}
              language={language}
              paragraphsPerPage={paragraphsPerPage}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
