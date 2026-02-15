"use client";

import { useMemo } from "react";
import { WordWithTooltip } from "./WordWithTooltip";
import { useBook } from "@/context/BookContext";
import { useGlossary } from "@/context/GlossaryContext";

function normalizeForLookup(token: string): string {
  return token.replace(/^['"]|['",;:.!?)\]}\s]+$/g, "").toLowerCase();
}

/** Split text into tokens: words (that may have definitions) and non-words (punctuation/space) */
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  const re = /[\w']+|[^\w\s]|\s+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    tokens.push(m[0]);
  }
  return tokens;
}

/** Detect if paragraph is a chapter heading like "Chapter 1: Gross Domestic Product" */
function isChapterHeading(text: string): boolean {
  return /^Chapter \d+:/i.test(text.trim());
}

/** Detect if paragraph is a major section heading (short title text, no period at end) */
function isSectionHeading(text: string): boolean {
  const trimmed = text.trim();
  // Section headings are short (under 60 chars), don't end with period, and start with capital
  const sectionPatterns = [
    /^Acknowledgments$/i,
    /^Introduction$/i,
    /^The Business Cycle$/i,
    /^Indicators and the Markets$/i,
    /^How to Use This Book$/i,
    /^Who Can Benefit from This Book\??$/i,
    /^Evolution of an Indicator$/i,
    /^Digging for the Data$/i,
    /^Some Definitions$/i,
    /^GDP Versus GNP$/i,
    /^Calculating GDP:/i,
    /^What Does It All Mean\??$/i,
    /^How to Use What You See$/i,
    /^Tricks? From the Trenches$/i,
  ];
  return sectionPatterns.some(pattern => pattern.test(trimmed));
}

/** Detect if text is a bullet list item */
function isBulletItem(text: string): boolean {
  return /^[•\-\*]\s/.test(text.trim()) || /^\d+\.\s/.test(text.trim());
}

interface ParagraphWithTooltipsProps {
  text: string;
}

export function ParagraphWithTooltips({ text }: ParagraphWithTooltipsProps) {
  const { getDefinition } = useBook();
  const { isInGlossary } = useGlossary();

  const tokens = useMemo(() => tokenize(text), [text]);

  const renderTokens = () => {
    return tokens.map((token, i) => {
      const normalized = normalizeForLookup(token);
      const hasDef = !!getDefinition(normalized) || isInGlossary(normalized);
      if (hasDef && normalized.length > 1) {
        return <WordWithTooltip key={`${i}-${token}`} word={token} />;
      }
      return <span key={`${i}-${token}`}>{token}</span>;
    });
  };

  // Chapter headings get the largest, most prominent styling
  if (isChapterHeading(text)) {
    return (
      <h2 className="mt-8 mb-6 text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300 border-b-2 border-emerald-200 dark:border-emerald-800 pb-3">
        {renderTokens()}
      </h2>
    );
  }

  // Section headings get medium styling
  if (isSectionHeading(text)) {
    return (
      <h3 className="mt-6 mb-4 text-xl font-semibold text-stone-800 dark:text-stone-200 border-l-4 border-emerald-400 dark:border-emerald-600 pl-4">
        {renderTokens()}
      </h3>
    );
  }

  // Bullet items get special formatting
  if (isBulletItem(text)) {
    return (
      <p className="mb-2 ml-6 leading-relaxed text-stone-700 dark:text-stone-300">
        {renderTokens()}
      </p>
    );
  }

  // Regular paragraphs
  return (
    <p className="mb-4 leading-relaxed text-stone-700 dark:text-stone-300">
      {renderTokens()}
    </p>
  );
}
