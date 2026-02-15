import type { TocEntry, TocEntryResolved } from "@/types/book";
import type { ContentBlock } from "@/types/book";

function findParagraphIndex(paragraphs: ContentBlock[], entry: TocEntry, startFrom = 0): number {
  const search = entry.match ?? entry.titleEn;
  const lower = search.toLowerCase();
  for (let i = startFrom; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (typeof p === "string" && p.toLowerCase().includes(lower)) return i;
    if (typeof p === "object" && p !== null && "en" in p && typeof (p as { en: string }).en === "string") {
      if ((p as { en: string }).en.toLowerCase().includes(lower)) return i;
    }
  }
  return startFrom;
}

/**
 * Resolve TOC entries against the actual book paragraphs.
 * Sets paragraphIndex for each entry (and children) by finding the first paragraph that contains the match.
 * Children search from their parent's paragraph index to resolve ambiguous matches correctly.
 */
export function resolveToc(paragraphs: ContentBlock[], toc: TocEntry[], startFrom = 0): TocEntryResolved[] {
  return toc.map((entry): TocEntryResolved => {
    const paragraphIndex = findParagraphIndex(paragraphs, entry, startFrom);
    return {
      id: entry.id,
      titleEn: entry.titleEn,
      titleEs: entry.titleEs,
      match: entry.match,
      paragraphIndex,
      children: entry.children?.length ? resolveToc(paragraphs, entry.children, paragraphIndex) : undefined,
    };
  });
}
