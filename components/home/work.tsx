import { stats, toolbox } from "@/lib/career";
import { SectionHeading } from "@/components/section-heading";
import { CareerTrace } from "./career-trace";

const trayAccent = ["bg-accent", "bg-gold", "bg-pine", "bg-lake", "bg-ink/70", "bg-accent"];

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

        <div className="mt-28">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">The tackle box</p>
            <h3 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.05] tracking-[-0.02em] font-soft">
              Every angler has one. These are the tools I reach for.
            </h3>
          </div>
          <div className="reveal relative mt-14">
            {/* the handle */}
            <div
              aria-hidden="true"
              className="absolute -top-7 left-1/2 h-10 w-40 -translate-x-1/2 rounded-t-[2.5rem] border-[7px] border-b-0 border-rule"
            />
            <div className="relative rounded-[1.75rem] border border-rule bg-paper-2 p-2.5 shadow-[0_30px_60px_-40px_rgb(var(--shadow)/0.45)] sm:p-3">
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-card/80" />
              <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {toolbox.map((t, i) => (
                  <li
                    key={t.tray}
                    className="rounded-[1.1rem] border border-rule/70 bg-card p-5 shadow-[inset_0_2px_8px_rgb(var(--shadow)/0.07)]"
                  >
                    <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${trayAccent[i]}`} />
                      {t.tray}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {t.items.map((item) => (
                        <li key={item} className="chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
