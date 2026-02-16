"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative flex h-10 w-20 items-center rounded-full p-1 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)"
          : "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 50%, #a78bfa 100%)",
        boxShadow: isDark
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(139,92,246,0.1)"
          : "inset 0 2px 4px rgba(167,139,250,0.3), 0 1px 2px rgba(0,0,0,0.1)",
      }}
      title={isDark ? t("Switch to light mode", "Cambiar a modo claro") : t("Switch to dark mode", "Cambiar a modo oscuro")}
      aria-label={isDark ? t("Switch to light mode", "Cambiar a modo claro") : t("Switch to dark mode", "Cambiar a modo oscuro")}
    >
      {/* Stars (visible in dark mode) */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <div className="absolute left-3 top-2 h-1 w-1 rounded-full bg-violet-300/80 animate-pulse" style={{ animationDelay: "0s" }} />
        <div className="absolute left-6 top-4 h-0.5 w-0.5 rounded-full bg-violet-200/60 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute right-8 top-2.5 h-0.5 w-0.5 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute left-4 bottom-2 h-0.5 w-0.5 rounded-full bg-violet-300/50 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Clouds (visible in light mode) */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        <div
          className="absolute right-6 top-1.5 h-2 w-4 rounded-full bg-white/70"
          style={{
            boxShadow: "2px 0 0 0 rgba(255,255,255,0.5), -2px 1px 0 0 rgba(255,255,255,0.4)",
          }}
        />
        <div
          className="absolute right-10 bottom-2 h-1.5 w-3 rounded-full bg-white/50"
          style={{
            boxShadow: "1px 0 0 0 rgba(255,255,255,0.3)",
          }}
        />
      </div>

      {/* Toggle circle with sun/moon */}
      <div
        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-out"
        style={{
          transform: isDark ? "translateX(38px)" : "translateX(0)",
          background: isDark
            ? "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)"
            : "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)",
          boxShadow: isDark
            ? "0 0 20px rgba(226,232,240,0.5), inset -2px -2px 4px rgba(0,0,0,0.1)"
            : "0 0 20px rgba(167,139,250,0.6), inset -2px -2px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Sun icon */}
        <svg
          className="absolute h-5 w-5 text-violet-900 transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
          }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>

        {/* Moon icon */}
        <svg
          className="absolute h-5 w-5 text-slate-600 transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>

        {/* Moon craters (only visible in dark mode) */}
        <div
          className="absolute transition-opacity duration-500"
          style={{ opacity: isDark ? 0.3 : 0 }}
        >
          <div className="absolute -left-0.5 top-1 h-1 w-1 rounded-full bg-slate-400" />
          <div className="absolute left-1 top-3 h-1.5 w-1.5 rounded-full bg-slate-400" />
          <div className="absolute right-1.5 bottom-1 h-0.5 w-0.5 rounded-full bg-slate-400" />
        </div>
      </div>
    </button>
  );
}
