import Link from "next/link";
import { Metadata } from "next";
import { getWebsiteTeam, getPageBannerBySlug, convertDriveUrl } from "@/lib/supabase";
import { cloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "About | Slow Morocco",
  description:
    "Slow Morocco is a guide to Morocco built on real knowledge — stories, places, and private journeys for people who want to understand the country, not just visit it.",
  openGraph: {
    title: "About Slow Morocco",
    description:
      "A guide to Morocco for people who want to understand the country, not just visit it.",
    url: "https://www.slowmorocco.com/about",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/about",
  },
};

export const revalidate = 3600;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  image: string;
}

async function getAboutContent() {
  try {
    const [banner, teamData] = await Promise.all([
      getPageBannerBySlug("about"),
      getWebsiteTeam(),
    ]);

    const team = teamData.map((t) => ({
      id: t.team_id || "",
      name: t.name || "",
      role: t.role || "",
      quote: t.quote || "",
      bio: t.bio || "",
      image: t.image_url
        ? t.image_url.startsWith("/")
          ? t.image_url
          : t.image_url.includes("cloudinary")
          ? cloudinaryUrl(t.image_url, 600)
          : convertDriveUrl(t.image_url)
        : "",
    }));

    return { banner, team: team as TeamMember[] };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return { banner: null, team: [] };
  }
}

export default async function AboutPage() {
  const { banner, team } = await getAboutContent();

  return (
    <div className="bg-background min-h-screen">

      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-10 px-8 md:px-10 lg:px-14">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          About
        </h1>
        <div className="h-[1px] bg-foreground/12 mt-10" />
      </section>

      {/* ── Who we are ───────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-20 md:pb-28">
        <div className="max-w-2xl space-y-7 text-[15px] text-foreground/80 leading-[1.8]">

          <p className="text-foreground text-lg leading-[1.7]">
            We live in Morocco. We write about what we know.
          </p>

          <p>
            The things that take time to notice. Why the medina is shaped the
            way it is. What the call to prayer actually says. Why the bread
            arrives before anything else. Where the Jewish quarter was, and
            why it moved. The story behind the door everyone photographs but
            nobody explains.
          </p>

          <p>
            Most Morocco content tells you where to go and what to wear.
            We go further back. How the dye got into the leather. Who built
            the tower and why it stopped. What the carpet is actually saying.
            The kind of knowledge you absorb by living somewhere — not by
            visiting.
          </p>

          <p>
            We also design private journeys for people who want the knowledge
            made physical. Every guide we work with, every riad we recommend,
            every road we suggest — it's all been walked by us first. We don't
            recommend what we haven't experienced.
          </p>

        </div>
      </section>

      {/* ── The Team ─────────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="bg-[#c8c4b8]/30 py-20 md:py-28">
          <div className="px-8 md:px-10 lg:px-14">
            <div className="text-center mb-14 md:mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-3">
                The Team
              </p>
              <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground/80">
                The people behind the journeys.
              </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {team.map((member) => (
                <div key={member.id}>
                  <div className="aspect-[29/39] relative overflow-hidden bg-[#d5d0c8] mb-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#d5d0c8]" />
                    )}
                  </div>
                  <h3 className="text-[12px] tracking-[0.04em] uppercase leading-[1.35] text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[10px] text-foreground/40 mb-3">
                    {member.role}
                  </p>
                  {member.quote && (
                    <p className="text-[13px] text-foreground/50 italic leading-[1.6]">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── What lives here ──────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-20 md:py-28 border-t border-foreground/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-4xl">
          {[
            {
              title: "Stories",
              body: "The history, craft, food, music, and people — written the way you'd hear it from someone who lives here.",
              href: "/stories",
            },
            {
              title: "Places",
              body: "Cities, villages, and landmarks with the context a guidebook can't carry. What they are and why they matter.",
              href: "/places",
            },
            {
              title: "Journeys",
              body: "Private trips shaped around what you're curious about. Every route is a starting point, not a script.",
              href: "/journeys",
            },
          ].map((item) => (
            <div key={item.title}>
              <Link href={item.href} className="group block">
                <h2 className="text-[12px] tracking-[0.04em] uppercase text-foreground group-hover:text-foreground/60 transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-[14px] text-foreground/50 leading-[1.7]">{item.body}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <p className="text-[14px] text-foreground/40">
            Questions, commissions, or just want to say hello.
          </p>
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.12em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

    </div>
  );
}
