import type { Guide, GuideStep } from "@/lib/guides";
import GuideRouteMap from "@/components/GuideRouteMap";

const KICKER =
  "block text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#E3120B] mb-4 font-sans";

function StepNumber({ n }: { n: number }) {
  return (
    <span className="font-serif text-lg font-medium w-9 h-9 flex items-center justify-center bg-[#E3120B] text-white shrink-0 tabular-nums">
      {n}
    </span>
  );
}

function Steps({ steps }: { steps: GuideStep[] }) {
  return (
    <ol className="flex flex-col gap-7">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <StepNumber n={i + 1} />
          <div>
            <span className="font-serif text-lg font-medium block mb-1">{s.title}</span>
            <p className="text-foreground/80 leading-relaxed max-w-[58ch]">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function SectionHead({ kicker, heading }: { kicker: string; heading: string }) {
  return (
    <div className="border-b-2 border-foreground pb-3 mb-10">
      <span className={KICKER}>{kicker}</span>
      <h2 className="font-serif text-2xl md:text-4xl leading-tight">{heading}</h2>
    </div>
  );
}

export default function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <header>
          <span className={KICKER}>{guide.kicker}</span>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.03] mb-6 text-balance">
            {guide.title}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl">
            {guide.standfirst}
          </p>
        </header>

        {guide.route && guide.route.length > 1 ? <GuideRouteMap stops={guide.route} /> : null}

        {guide.sections.map((section, idx) => {
          switch (section.kind) {
            case "lead":
              return (
                <section key={idx} className="mt-10">
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/90">
                    {section.body}
                  </p>
                </section>
              );
            case "options":
              return (
                <section key={idx} className="mt-20">
                  <SectionHead kicker={section.kicker} heading={section.heading} />
                  {section.intro ? (
                    <p className="text-foreground/80 leading-relaxed mb-10 max-w-[62ch]">{section.intro}</p>
                  ) : null}
                  {section.options.map((opt, oi) => (
                    <div key={oi} className={oi === section.options.length - 1 ? "" : "mb-12"}>
                      <div className="flex items-baseline gap-3 flex-wrap mb-3">
                        <span className="font-serif text-2xl font-medium text-[#E3120B] leading-none tabular-nums">
                          {opt.num}
                        </span>
                        <h3 className="font-serif text-2xl leading-tight">{opt.title}</h3>
                        {opt.tag ? (
                          <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-foreground/50 border border-border px-2 py-1">
                            {opt.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-foreground/80 leading-relaxed max-w-[60ch]">{opt.body}</p>
                      {opt.cost ? (
                        <p className="font-sans text-sm text-foreground/60 mt-3 tabular-nums max-w-[60ch]">{opt.cost}</p>
                      ) : null}
                      {opt.steps ? (
                        <div className="mt-7">
                          <Steps steps={opt.steps} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </section>
              );
            case "steps":
              return (
                <section key={idx} className="mt-20">
                  <SectionHead kicker={section.kicker} heading={section.heading} />
                  {section.intro ? (
                    <p className="text-foreground/80 leading-relaxed mb-8 max-w-[62ch]">{section.intro}</p>
                  ) : null}
                  <Steps steps={section.steps} />
                </section>
              );
            case "prose":
              return (
                <section key={idx} className="mt-20">
                  <SectionHead kicker={section.kicker} heading={section.heading} />
                  <p className="text-foreground/80 leading-relaxed max-w-[62ch]">{section.body}</p>
                </section>
              );
            case "notes":
              return (
                <section key={idx} className="mt-20">
                  <SectionHead kicker={section.kicker} heading={section.heading} />
                  <ul className="flex flex-col gap-5">
                    {section.notes.map((note, ni) => (
                      <li key={ni} className="flex gap-4">
                        <span className="w-[7px] h-[7px] bg-[#E3120B] shrink-0 mt-[0.6em]" />
                        <p className="text-foreground/80 leading-relaxed max-w-[60ch]">
                          <span className="font-medium text-foreground">{note.bold}</span> {note.rest}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            case "closing":
              return (
                <section key={idx} className="mt-20">
                  <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90 max-w-[46ch]">
                    {section.body}
                  </p>
                </section>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
