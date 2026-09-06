/**
 * A card-sized blurb from a full excerpt.
 *
 * Excerpts on places run to a 326-character median, which is three or four
 * sentences — far too long for a grid card. Take the first sentence, and if
 * that alone is still long, cut it at a word boundary rather than mid-word.
 */
export function dek(excerpt: string | null | undefined, maxChars = 92): string {
  if (!excerpt) return "";
  const clean = excerpt.replace(/\s+/g, " ").trim();
  if (!clean) return "";

  // First sentence: a full stop, question or exclamation mark followed by a
  // space and a capital. Avoids splitting on "5.8 on the Richter scale".
  const match = clean.match(/^.*?[.!?](?=\s+[A-Z"'“])/);
  let first = match ? match[0] : clean;

  if (first.length <= maxChars) return first;

  const cut = first.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—-]+$/, "") + "…";
}
