import { redirect } from "next/navigation";
import { getStories } from "@/lib/supabase";

/**
 * /stories/random — bounces to a random published essay.
 *
 * force-dynamic is not optional. Under ISR this would render once and
 * every reader for the next hour would land on the same "random" story.
 *
 * A redirect can't carry a noindex tag, so it's kept out of the sitemap
 * and disallowed in robots.txt instead.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RandomStoryPage() {
  const stories = await getStories({ published: true });

  if (stories.length === 0) redirect("/stories");

  const pick = stories[Math.floor(Math.random() * stories.length)];
  redirect(`/stories/${pick.slug}`);
}
