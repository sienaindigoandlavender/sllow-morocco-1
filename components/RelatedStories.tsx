"use client";

import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Story {
  slug: string;
  title: string;
  heroImage?: string;
  category?: string;
  excerpt?: string;
}

export default function RelatedStories({ stories }: { stories: Story[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="px-8 md:px-10 lg:px-14 py-16 md:py-24 border-t border-foreground/[0.08]">
      <div className="flex items-baseline justify-between mb-10">
        <div className="mb-0">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-xl md:text-2xl text-foreground">
              Related stories.
            </h2>
          </div>
          <div className="h-[1px] bg-foreground/15" />
        </div>
        <Link
          href="/stories"
          className="text-[11px] text-foreground/35 hover:text-foreground/60 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-10">
        {stories.slice(0, 6).map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
            <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
              {story.heroImage && (
                <img
                  src={cloudinaryUrl(story.heroImage, 480)}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                />
              )}
            </div>
            {story.category && (
              <p className="text-[10px] text-foreground/40 mb-1.5">
                {story.category}
              </p>
            )}
            <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
              {story.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
