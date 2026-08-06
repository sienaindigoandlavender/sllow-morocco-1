import Link from "next/link";
import { getWebsiteTeam, convertDriveUrl } from "@/lib/supabase";
import { cloudinaryUrl } from "@/lib/cloudinary";

export const revalidate = 3600;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  image: string;
}

async function getTeam(): Promise<TeamMember[]> {
  try {
    const teamData = await getWebsiteTeam();
    return teamData.map((t) => ({
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
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

export default async function AboutJourneysPage() {
  const team = await getTeam();

  return (
    <div className="bg-background min-h-screen">

      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-10 px-8 md:px-10 lg:px-14">
        <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/30 mb-4">
          The Journeys
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
          The people behind the journeys.
        </h1>
        <div className="h-[1px] bg-foreground/12 mt-10" />
      </section>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 pb-16 md:pb-20">
        <div className="max-w-2xl space-y-7 text-[15px] text-foreground/80 leading-[1.8]">
          <p>
            Alongside the writing, we arrange a small number of private
            journeys each year — for readers who want to see the Morocco we
            write about, in the company of the people who know it.
          </p>
          <p>
            These are not packages. Nothing runs to a fixed departure, and you
            travel only with your own party. Each route is shaped around what
            you are curious about, then handled quietly, end to end, by the
            people below.
          </p>
        </div>
      </section>

      {/* ── The Team ─────────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="bg-[#c8c4b8]/30 py-20 md:py-28">
          <div className="px-8 md:px-10 lg:px-14">
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

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-10 lg:px-14 py-14 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <p className="text-[14px] text-foreground/40">
            To begin a private journey, or ask a question.
          </p>
          <Link
            href="/plan-your-trip"
            className="text-[11px] tracking-[0.12em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
          >
            Plan a journey
          </Link>
        </div>
      </section>

    </div>
  );
}
