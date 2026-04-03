"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Journey {
  slug: string;
  title: string;
  heroImage?: string;
  duration?: number;
}

export default function RelatedJourneys({ journeys }: { journeys: Journey[] }) {
  if (journeys.length === 0) return null;

  return (
    <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/[0.08]">
      <div className="flex items-baseline justify-between mb-10">
        <div className="mb-0">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-xl md:text-2xl text-foreground">
              Related journeys.
            </h2>
          </div>
          <div className="h-[1px] bg-foreground/15" />
        </div>
        <Link
          href="/journeys"
          className="text-[11px] text-foreground/35 hover:text-foreground/60 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
        {journeys.slice(0, 6).map((journey) => (
          <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group block">
            <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
              {journey.heroImage && (
                <img
                  src={cloudinaryUrl(journey.heroImage, 480)}
                  alt={journey.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                />
              )}
            </div>
            <p className="text-[10px] text-foreground/40 mb-1.5">
              {journey.duration ? `${journey.duration}-Day Journey` : "Private Journey"}
            </p>
            <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
              {journey.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
