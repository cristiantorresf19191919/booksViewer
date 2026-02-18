"use client";

import { useFontSize } from "@/context/FontSizeContext";
import { useLanguage } from "@/context/LanguageContext";

export function FontSizeControls() {
  const { fontSize, increase, decrease, reset, canIncrease, canDecrease } = useFontSize();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-gray-200 bg-white dark:border-[#2a2a3e] dark:bg-[#14141f] overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        disabled={!canDecrease}
        className="px-2 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200 transition-colors"
        title={t("Decrease font size", "Reducir tamano de fuente")}
        aria-label={t("Decrease font size", "Reducir tamano de fuente")}
      >
        A<span className="text-[10px]">-</span>
      </button>
      <button
        type="button"
        onClick={reset}
        className="px-1.5 py-2 text-[10px] font-medium text-gray-400 hover:bg-gray-50 dark:text-gray-500 dark:hover:bg-[#1a1a2e] transition-colors tabular-nums"
        title={t("Reset font size", "Restablecer tamano de fuente")}
        aria-label={t("Reset font size", "Restablecer tamano de fuente")}
      >
        {fontSize}
      </button>
      <button
        type="button"
        onClick={increase}
        disabled={!canIncrease}
        className="px-2 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-[#1a1a2e] dark:hover:text-gray-200 transition-colors"
        title={t("Increase font size", "Aumentar tamano de fuente")}
        aria-label={t("Increase font size", "Aumentar tamano de fuente")}
      >
        A<span className="text-xs">+</span>
      </button>
    </div>
  );
}
