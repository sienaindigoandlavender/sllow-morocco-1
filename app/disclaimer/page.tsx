import Link from "next/link";
import { getList } from "@/lib/data";

export default async function DisclaimerPage() {
  const sections = await getList("disclaimer");
  const intro = sections.find((s: any) => s.Section === "intro");

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#2a2520]">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#2a2520]/40 mb-6">Important Information</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2a2520]">{intro?.Title || "Before You Book"}</h1>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="border-t border-[#2a2520]/10 pt-12 space-y-8 text-[#2a2520]/80 leading-relaxed">
            {sections.map((section: any, i: number) => (
              section.Content && <p key={i}>{section.Content}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-[#2a2520]/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
            <Link href="/booking-conditions" className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors">Booking Conditions</Link>
            <Link href="/house-rules" className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors">House Rules</Link>
            <Link href="/faq" className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors">FAQ</Link>
            <Link href="/philosophy" className="text-xs tracking-[0.2em] uppercase text-[#2a2520]/50 hover:text-[#2a2520] transition-colors">Philosophy</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
