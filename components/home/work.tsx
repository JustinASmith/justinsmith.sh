import { stats } from "@/lib/career";
import { SectionHeading } from "@/components/section-heading";
import { CareerTrace } from "./career-trace";

export function Work() {
  const now = new Date();
  const builtAt = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-rule/70 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          index="02"
          label="Work"
          aside="2019 → now"
          title={
            <>
              My career, <em>as a trace</em>.
            </>
          }
        >
          I spend my days in traces, spans, and telemetry, so here&rsquo;s my résumé in the same shape. Pick a span to
          see what happened inside it.
        </SectionHeading>

        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.value} className="reveal relative border-t border-ink/80 pt-5">
              <span aria-hidden="true" className="absolute -top-px left-0 h-[3px] w-10 bg-accent" />
              <p className="font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none tracking-[-0.03em] font-soft">{s.value}</p>
              <p className="mt-3 max-w-[16rem] text-[0.95rem] leading-snug text-ink-2">{s.label}</p>
            </li>
          ))}
        </ul>

        <CareerTrace builtAt={builtAt} />
      </div>
    </section>
  );
}
