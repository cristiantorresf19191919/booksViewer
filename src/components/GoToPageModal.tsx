"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface GoToPageModalProps {
  totalPages: number;
  currentPage: number;
  onNavigate: (pageIndex: number) => void;
}

export function GoToPageModal({ totalPages, currentPage, onNavigate }: GoToPageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      queueMicrotask(() => {
        setInputValue(String(currentPage + 1));
        inputRef.current?.select();
      });
    }
  }, [isOpen, currentPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(inputValue, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onNavigate(pageNum - 1);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e] transition-colors"
        title={t("Go to page", "Ir a página")}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">{t("Go to", "Ir a")}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl p-6 shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c]/95"
              onKeyDown={handleKeyDown}
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t("Go to Page", "Ir a Página")}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="page-input" className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                    {t("Enter page number", "Ingresa el número de página")} (1-{totalPages})
                  </label>
                  <input
                    ref={inputRef}
                    id="page-input"
                    type="number"
                    min={1}
                    max={totalPages}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-lg font-medium text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-100"
                    placeholder="1"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-[#2a2a3e] dark:bg-[#14141f] dark:text-gray-300 dark:hover:bg-[#1a1a2e]"
                  >
                    {t("Cancel", "Cancelar")}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm shadow-violet-500/20"
                  >
                    {t("Go", "Ir")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
