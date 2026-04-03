import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

interface Story {
  slug: string;
  title: string;
  heroImage?: string;
  category?: string;
  subtitle?: string;
}

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-3.5">
        {story.heroImage ? (
          <img
            src={cloudinaryUrl(story.heroImage, 480)}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-foreground/15 text-sm">No image</span>
          </div>
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
  );
}
