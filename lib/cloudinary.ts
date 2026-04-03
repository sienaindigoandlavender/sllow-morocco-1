/**
 * Cloudinary URL optimization — bypasses Vercel image proxy (free tier 402 fix).
 * Inserts width, quality, and format transforms into Cloudinary URLs.
 * Non-Cloudinary URLs pass through untouched.
 */
export function cloudinaryUrl(url: string | null | undefined, width: number = 1200): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;
  // Don't double-transform
  if (url.includes("q_auto") || url.includes("w_")) return url;
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
}
