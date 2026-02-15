export interface BookPage {
  page: number;
  rawText: string;
  paragraphs: string[];
}

export interface BookData {
  totalPages: number;
  extractedPages: number;
  pages: BookPage[];
}

export type Language = "en" | "es";

export interface DictionaryEntry {
  word: string;
  definition: string;
  definitionEs: string;
  example?: string;
}

export interface GlossaryEntry {
  word: string;
  definition: string;
  definitionEs: string;
  addedAt: number;
}

/** Bilingual paragraph with English and Spanish versions */
export interface BilingualParagraph {
  en: string;
  es: string;
}

/** Inline image block in book content */
export interface ContentImage {
  type: "image";
  src: string;
}

/** A content block can be a text paragraph or an inline image */
export type ContentBlock = string | BilingualParagraph | ContentImage;

/** Book content - supports paragraphs (strings), bilingual, and inline images */
export interface BookContent {
  paragraphs: ContentBlock[];
}

/** Type guard to check if content is bilingual */
export function isBilingualContent(paragraphs: string[] | BilingualParagraph[]): paragraphs is BilingualParagraph[] {
  return paragraphs.length > 0 && typeof paragraphs[0] === "object" && "en" in paragraphs[0];
}

/** Book metadata for the catalog/registry */
export interface BookMetadata {
  id: string;
  titleEn: string;
  titleEs: string;
  author: string;
  descriptionEn: string;
  descriptionEs: string;
  coverColor: string; // Tailwind color class for the book card
  coverImage?: string; // Optional path to cover image
  contentPath: string; // Path to book_content.json
  category: "self-help" | "finance" | "business" | "psychology" | "other";
}

/** A favorite (word or quote) tied to a specific page/section. */
export interface FavoriteEntry {
  id: string;
  pageIndex: number;
  type: "word" | "quote";
  content: string;
  addedAt: number;
}

/** Table of contents entry (unresolved: no paragraph index yet). */
export interface TocEntry {
  id: string;
  titleEn: string;
  titleEs: string;
  /** Optional phrase to find in paragraphs to resolve paragraphIndex. */
  match?: string;
  /** Sub-entries (e.g. principles within a part). */
  children?: TocEntry[];
}

/** TOC entry with paragraph index resolved from book content. */
export interface TocEntryResolved extends TocEntry {
  paragraphIndex: number;
  children?: TocEntryResolved[];
}
