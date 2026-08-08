import { ImageResponse } from "next/og";
import { getPlaceBySlug } from "@/lib/supabase";

export const runtime = "nodejs";
export const alt = "Slow Morocco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG-specific Cloudinary transform — force f_jpg (Satori cannot decode AVIF/WebP).
function ogHero(url: string | null | undefined): string | null {
  if (!url || !url.includes("res.cloudinary.com")) return null;
  if (url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/w_1200,h_630,c_fill,q_auto,f_jpg/");
  }
  return null;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "Slow Morocco";
  let kicker = "Slow Morocco";
  let hero: string | null = null;

  try {
    const place = await getPlaceBySlug(slug);
    if (place) {
      title = place.title || title;
      kicker = place.destination || place.category || "Place";
      hero = ogHero(place.hero_image);
    }
  } catch {
    // fall through to branded fallback
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          background: "#0a0a0a",
          fontFamily: "Georgia, serif",
        }}
      >
        {hero ? (
          <img
            src={hero}
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.15) 45%, rgba(10,10,10,0.85) 100%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "64px 72px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 20,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 55 ? 52 : 66,
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            {title.length > 110 ? title.slice(0, 107) + "…" : title}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 56,
            left: 72,
            display: "flex",
            fontSize: 15,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Slow Morocco
        </div>
      </div>
    ),
    { ...size }
  );
}
