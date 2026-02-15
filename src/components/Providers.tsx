"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { BookProvider } from "@/context/BookContext";
import { GlossaryProvider } from "@/context/GlossaryContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ReadAloudProvider } from "@/context/ReadAloudContext";
import { BookmarkProvider } from "@/context/BookmarkContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BookProvider>
          <GlossaryProvider>
            <FavoritesProvider>
              <BookmarkProvider>
                <ReadAloudProvider>
                  {children}
                </ReadAloudProvider>
              </BookmarkProvider>
            </FavoritesProvider>
          </GlossaryProvider>
        </BookProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
