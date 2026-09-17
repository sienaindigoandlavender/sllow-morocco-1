import Link from "next/link";
import { cloudinaryUrl } from "@/lib/cloudinary";

/**
 * Journey card — the premium "doorway" treatment (Black Tomato style).
 * Portrait image fills the whole card; title, optional route, duration badge,
 * and an EXPLORE CTA all sit OVER the image at the foot. Reserved for journeys —
 * stories and places keep the plain text-below Kinfolk tile.
 */
export default function JourneyCard({
  href,
  image,
  title,
  route,
  duration,
}: {
  href: string;
  image?: string | null;
  title: string;
  route?: string | null;
  duration?: string | null;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
        {image && (
          <img
            src={cloudinaryUrl(image, 800)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[900ms] ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
        {duration && (
          <span className="absolute top-4 right-4 text-[10px] tracking-[0.18em] uppercase text-white/90 font-sans">
            {duration}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3 className="font-serif text-white text-[17px] md:text-[19px] font-light tracking-[-0.01em] leading-snug mb-1">
            {title}
          </h3>
          {route && (
            <p className="text-white/70 text-[12px] leading-relaxed mb-4 font-sans">{route}</p>
          )}
          <span className="inline-block text-[10px] tracking-[0.18em] uppercase text-white border border-white/50 px-4 py-2 group-hover:bg-white group-hover:text-[#0a0a0a] transition-colors duration-300 font-sans">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}
