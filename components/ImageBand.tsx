import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";

/**
 * Full-bleed cinematic image band — the Black Tomato move. A single large, warm
 * Morocco photograph, edge to edge, with one restrained line of type over it.
 * This is where the page gets its colour and its breath — not from coloured
 * backgrounds, but from big warm imagery between the calm white sections.
 *
 * Uses background-attachment: fixed for a quiet parallax on desktop.
 */
export default function ImageBand({
  image,
  kicker,
  headline,
  href,
  linkText,
  height = "tall",
}: {
  image: string;
  kicker?: string;
  headline: string;
  href?: string;
  linkText?: string;
  height?: "tall" | "medium";
}) {
  const h =
    height === "tall"
      ? "h-[70vh] min-h-[520px] md:h-[80vh]"
      : "h-[52vh] min-h-[420px] md:h-[60vh]";

  const inner = (
    <div className={`relative w-full ${h} overflow-hidden`}>
      {/* Image — fixed on desktop for parallax, normal on mobile */}
      <div
        className="absolute inset-0 bg-center bg-cover md:bg-fixed"
        style={{ backgroundImage: `url(${cloudinaryUrl(image, 2000)})` }}
      />
      {/* Warm-to-dark gradient so type stays legible, without flattening the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
      {/* Type */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 lg:px-14 pb-14 md:pb-20">
        <div className="max-w-3xl">
          {kicker && (
            <span className="block text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/70 mb-4">
              {kicker}
            </span>
          )}
          <h2 className="font-serif text-white text-[clamp(1.8rem,4.5vw,3.75rem)] font-light tracking-[-0.02em] leading-[1.05]">
            {headline}
          </h2>
          {href && linkText && (
            <span className="mt-6 inline-block text-[11px] tracking-[0.16em] uppercase text-white/80 border-b border-white/40 pb-1 group-hover:text-white group-hover:border-white transition-colors">
              {linkText} →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {inner}
      </Link>
    );
  }
  return <section>{inner}</section>;
}
