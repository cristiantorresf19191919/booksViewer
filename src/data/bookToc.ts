import type { TocEntry } from "@/types/book";

/**
 * @deprecated Use @/data/books/win-friends/toc instead
 * Table of contents for "How to Win Friends and Influence People".
 * Each entry has titleEn, titleEs, and optional match string to find paragraph index.
 */
export const bookToc: TocEntry[] = [
  {
    id: "preface",
    titleEn: "Preface to revised edition",
    titleEs: "Prefacio a la edición revisada",
    match: "first published in 1937",
  },
  {
    id: "how-written",
    titleEn: "How this book was written – and why",
    titleEs: "Cómo se escribió este libro y por qué",
    match: "Why, then, did I have the temerity",
  },
  {
    id: "part-one",
    titleEn: "Part One: Fundamental Techniques in Handling People",
    titleEs: "Parte uno: Técnicas fundamentales para tratar a las personas",
    match: "PART ONE",
    children: [
      {
        id: "p1-1",
        titleEn: "1. Don't criticise, condemn or complain",
        titleEs: "1. No critiques, no condenes ni te quejes",
        match: "PRINCIPLE 1",
      },
      {
        id: "p1-2",
        titleEn: "2. The Big Secret: Give honest appreciation",
        titleEs: "2. El gran secreto: Dar apreciación sincera",
        match: "PRINCIPLE 2",
      },
      {
        id: "p1-3",
        titleEn: "3. Arouse in the other person an eager want",
        titleEs: "3. Despierta en la otra persona un deseo ferviente",
        match: "PRINCIPLE 3",
      },
    ],
  },
  {
    id: "part-two",
    titleEn: "Part Two: Six Ways to Make People Like You",
    titleEs: "Parte dos: Seis maneras de agradar a los demás",
    match: "PART TWO",
    children: [
      { id: "p2-1", titleEn: "1. Become genuinely interested in others", titleEs: "1. Interésate sinceramente por los demás", match: "Become genuinely interested" },
      { id: "p2-2", titleEn: "2. Smile", titleEs: "2. Sonríe", match: "Your smile is a messenger" },
      { id: "p2-3", titleEn: "3. Remember names", titleEs: "3. Recuerda los nombres", match: "sweetest and most important sound" },
      { id: "p2-4", titleEn: "4. Be a good listener", titleEs: "4. Sé un buen oyente", match: "Be a good listener" },
      { id: "p2-5", titleEn: "5. Talk in terms of the other person's interests", titleEs: "5. Habla según el interés del otro", match: "other person's interests" },
      { id: "p2-6", titleEn: "6. Make the other person feel important", titleEs: "6. Haz que la otra persona se sienta importante", match: "Make the other person feel important" },
    ],
  },
  {
    id: "part-three",
    titleEn: "Part Three: How to Win People to Your Way of Thinking",
    titleEs: "Parte tres: Cómo lograr que los demás piensen como tú",
    match: "PART THREE",
    children: [
      { id: "p3-1", titleEn: "1. Avoid arguments", titleEs: "1. Evita las discusiones", match: "get the best of an argument is to avoid it" },
      { id: "p3-2", titleEn: "2. Never say 'You're wrong'", titleEs: "2. Nunca digas 'Te equivocas'", match: "Show respect for the other person's opinions" },
      { id: "p3-3", titleEn: "3. Admit mistakes quickly", titleEs: "3. Admite tus errores rápidamente", match: "admit it quickly and emphatically" },
      { id: "p3-4", titleEn: "4. Begin in a friendly way", titleEs: "4. Empieza de manera amigable", match: "Begin in a friendly way" },
      { id: "p3-5", titleEn: "5. Get the other person saying 'yes, yes'", titleEs: "5. Haz que el otro diga 'sí, sí'", match: "yes, yes" },
      { id: "p3-6", titleEn: "6. Let the other person do the talking", titleEs: "6. Deja que el otro hable", match: "other person do a great deal of the talking" },
      { id: "p3-7", titleEn: "7. Let the other person feel the idea is theirs", titleEs: "7. Haz que el otro sienta que la idea es suya", match: "idea is his or hers" },
      { id: "p3-8", titleEn: "8. See things from the other's point of view", titleEs: "8. Mira las cosas desde el punto de vista del otro", match: "other person's point of view" },
      { id: "p3-9", titleEn: "9. Be sympathetic with their ideas", titleEs: "9. Sé comprensivo con sus ideas", match: "sympathetic with the other person's ideas" },
      { id: "p3-10", titleEn: "10. Appeal to nobler motives", titleEs: "10. Apela a motivos más nobles", match: "Appeal to the nobler motives" },
      { id: "p3-11", titleEn: "11. Dramatise your ideas", titleEs: "11. Dramatiza tus ideas", match: "Dramatise your ideas" },
      { id: "p3-12", titleEn: "12. Throw down a challenge", titleEs: "12. Lanza un desafío", match: "Throw down a challenge" },
    ],
  },
  {
    id: "part-four",
    titleEn: "Part Four: Be a Leader – Change People Without Offence",
    titleEs: "Parte cuatro: Sé un líder – Cambia a las personas sin ofender",
    match: "PART FOUR",
    children: [
      { id: "p4-1", titleEn: "1. Begin with praise", titleEs: "1. Empieza con elogios", match: "Begin with praise and honest appreciation" },
      { id: "p4-2", titleEn: "2. Call attention to mistakes indirectly", titleEs: "2. Señala los errores de forma indirecta", match: "Call attention to people's mistakes indirectly" },
      { id: "p4-3", titleEn: "3. Talk about your own mistakes first", titleEs: "3. Habla de tus propios errores primero", match: "Talk about your own mistakes before criticising" },
      { id: "p4-4", titleEn: "4. Ask questions instead of orders", titleEs: "4. Haz preguntas en lugar de dar órdenes", match: "Ask questions instead of giving direct orders" },
      { id: "p4-5", titleEn: "5. Let the other person save face", titleEs: "5. Deja que el otro salve las apariencias", match: "Let the other person save face" },
      { id: "p4-6", titleEn: "6. Praise every improvement", titleEs: "6. Elogia cada mejora", match: "Praise the slightest improvement" },
      { id: "p4-7", titleEn: "7. Give a fine reputation to live up to", titleEs: "7. Da una buena reputación que mantener", match: "fine reputation to live up to" },
      { id: "p4-8", titleEn: "8. Use encouragement", titleEs: "8. Usa el estímulo", match: "Use encouragement" },
      { id: "p4-9", titleEn: "9. Make the other person happy to do it", titleEs: "9. Haz que el otro esté feliz de hacerlo", match: "Make the other person happy about doing" },
    ],
  },
];

// @deprecated - Use @/utils/toc for resolveToc
export { resolveToc } from "@/utils/toc";
