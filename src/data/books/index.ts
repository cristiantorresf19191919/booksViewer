import type { BookMetadata, TocEntry, DictionaryEntry } from "@/types/book";

// Import book-specific data
import { bookToc as winFriendsToc } from "./win-friends/toc";
import { dictionary as winFriendsDictionary, getDefinition as getWinFriendsDefinition, hasWord as hasWinFriendsWord } from "./win-friends/dictionary";
import { bookToc as economicIndicatorsToc } from "./economic-indicators/toc";
import { dictionary as economicIndicatorsDictionary, getDefinition as getEconomicIndicatorsDefinition, hasWord as hasEconomicIndicatorsWord } from "./economic-indicators/dictionary";

/** All available books in the catalog */
export const booksCatalog: BookMetadata[] = [
  {
    id: "win-friends",
    titleEn: "How to Win Friends and Influence People",
    titleEs: "Cómo ganar amigos e influir sobre las personas",
    author: "Dale Carnegie",
    descriptionEn: "The classic guide to interpersonal skills and human relations that has helped millions succeed in business and personal life.",
    descriptionEs: "La guía clásica de habilidades interpersonales y relaciones humanas que ha ayudado a millones a tener éxito en los negocios y la vida personal.",
    coverColor: "amber",
    contentPath: "/data/books/win-friends/content.json",
    category: "self-help",
  },
  {
    id: "economic-indicators",
    titleEn: "The Trader's Guide to Key Economic Indicators",
    titleEs: "Guía del Trader sobre Indicadores Económicos Clave",
    author: "Richard Yamarone",
    descriptionEn: "A comprehensive guide to understanding the most important economic indicators used by Wall Street professionals and how they affect the markets.",
    descriptionEs: "Una guía completa para entender los indicadores económicos más importantes utilizados por los profesionales de Wall Street y cómo afectan a los mercados.",
    coverColor: "emerald",
    coverImage: "/covers/economic-indicators.png",
    contentPath: "/data/books/economic-indicators/content.json",
    category: "finance",
  },
];

/** Get book metadata by ID */
export function getBookById(bookId: string): BookMetadata | undefined {
  return booksCatalog.find((book) => book.id === bookId);
}

/** Get TOC for a specific book */
export function getBookToc(bookId: string): TocEntry[] {
  switch (bookId) {
    case "win-friends":
      return winFriendsToc;
    case "economic-indicators":
      return economicIndicatorsToc;
    default:
      return [];
  }
}

/** Get dictionary for a specific book */
export function getBookDictionary(bookId: string): DictionaryEntry[] {
  switch (bookId) {
    case "win-friends":
      return winFriendsDictionary;
    case "economic-indicators":
      return economicIndicatorsDictionary;
    default:
      return [];
  }
}

/** Get definition lookup function for a specific book */
export function getBookDefinitionFn(bookId: string): (word: string) => DictionaryEntry | undefined {
  switch (bookId) {
    case "win-friends":
      return getWinFriendsDefinition;
    case "economic-indicators":
      return getEconomicIndicatorsDefinition;
    default:
      return () => undefined;
  }
}

/** Check if word exists in book's dictionary */
export function getBookHasWordFn(bookId: string): (word: string) => boolean {
  switch (bookId) {
    case "win-friends":
      return hasWinFriendsWord;
    case "economic-indicators":
      return hasEconomicIndicatorsWord;
    default:
      return () => false;
  }
}

/** Default book ID */
export const DEFAULT_BOOK_ID = "win-friends";
