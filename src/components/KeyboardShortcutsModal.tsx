"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  descriptionEn: string;
  descriptionEs: string;
}

const shortcuts: ShortcutItem[] = [
  { keys: ["<-", "->"], descriptionEn: "Navigate pages", descriptionEs: "Navegar paginas" },
  { keys: ["Ctrl", "K"], descriptionEn: "Search in book", descriptionEs: "Buscar en el libro" },
  { keys: ["?"], descriptionEn: "Show keyboard shortcuts", descriptionEs: "Mostrar atajos de teclado" },
  { keys: ["Esc"], descriptionEn: "Close modal / Stop speech", descriptionEs: "Cerrar modal / Detener lectura" },
  { keys: ["+"], descriptionEn: "Increase font size", descriptionEs: "Aumentar tamano de fuente" },
  { keys: ["-"], descriptionEn: "Decrease font size", descriptionEs: "Reducir tamano de fuente" },
];

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const { t } = useLanguage();

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
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#2a2a3e] dark:bg-[#12121c] overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-[#1f1f30]">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {t("Keyboard Shortcuts", "Atajos de Teclado")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-300 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-3">
          {shortcuts.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t(shortcut.descriptionEn, shortcut.descriptionEs)}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, j) => (
                  <span key={j}>
                    <kbd className="inline-flex min-w-[28px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 shadow-sm dark:border-[#2a2a3e] dark:bg-[#1a1a2e] dark:text-gray-300">
                      {key}
                    </kbd>
                    {j < shortcut.keys.length - 1 && (
                      <span className="mx-0.5 text-xs text-gray-400">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-5 py-3 dark:border-[#1f1f30]">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            {t(
              "Press ? anytime to show this panel",
              "Presiona ? en cualquier momento para mostrar este panel"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
