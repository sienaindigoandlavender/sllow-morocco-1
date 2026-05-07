import { Metadata } from "next";
import { getPlaceBySlug, convertDriveUrl } from "@/lib/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    return {
      title: "Place Not Found",
      description: "The requested place could not be found.",
    };
  }

  const dest = place.destination
    ? place.destination.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : '';
  const title = dest ? `${place.title}, ${dest}` : place.title;
  const bodyText = place.body?.replace(/<[^>]*>/g, '') || '';
  const description = place.excerpt?.slice(0, 160) ||
    bodyText.slice(0, 160) ||
    `Discover ${place.title} in ${dest || 'Morocco'} - a guide from Slow Morocco.`;
  const heroImage = place.hero_image ? convertDriveUrl(place.hero_image) : null;

  return {
    title,
    description: description,
    keywords: [
      place.title?.toLowerCase(),
      place.destination?.toLowerCase(),
      place.category?.toLowerCase(),
      "morocco places",
      "morocco guide",
    ].filter((k): k is string => Boolean(k)),
    openGraph: {
      title: `${title} | Slow Morocco`,
      description: description,
      url: `https://www.slowmorocco.com/places/${slug}`,
      type: "website",
      images: [
        {
          url: heroImage || "https://www.slowmorocco.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: heroImage ? title : "Slow Morocco — Private Journeys Through Morocco",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Slow Morocco`,
      description: description,
      images: [heroImage || "https://www.slowmorocco.com/og-image.jpg"],
    },
    alternates: {
      canonical: `https://www.slowmorocco.com/places/${slug}`,
    },
  };
}

export default function PlaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
