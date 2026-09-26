import { site } from "@/lib/site";
import { ArrowUpRight, Github, LinkedIn } from "@/components/icons";
import { CopyEmail } from "./copy-email";

const stripes = [
  { y: 17, h: 1 },
  { y: 21.5, h: 1.5 },
  { y: 26, h: 2 },
  { y: 30.5, h: 2.6 },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-rule/70 bg-paper-2/55 pb-0 pt-24 sm:pt-32"
    >
      <div className="container-page relative z-10 text-center">
        <div className="reveal mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-3">
            <span className="eyebrow !text-accent-ink">05</span>
            <span className="eyebrow">Say hello</span>
          </div>
          <h2
            id="contact-title"
            className="mt-7 font-display text-[clamp(2.7rem,7vw,5.6rem)] font-[400] leading-[0.95] tracking-[-0.035em] font-soft"
          >
            Let&rsquo;s build something that <span className="italic text-accent font-wonk">holds up</span>.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
            Got a gnarly data problem, an integration that keeps breaking, or a website that needs some love? Or maybe you
            need a fourth for disc golf. My inbox is open.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block break-all font-display text-[clamp(1.6rem,4.2vw,2.9rem)] italic tracking-[-0.02em] text-ink underline decoration-accent decoration-2 underline-offset-[10px] transition-colors font-soft hover:text-accent-ink"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CopyEmail />
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 !text-sm">
              <LinkedIn size={16} /> LinkedIn <ArrowUpRight size={14} className="text-ink-3" />
            </a>
            <a href={site.links.github} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 !text-sm">
              <Github size={16} /> GitHub <ArrowUpRight size={14} className="text-ink-3" />
            </a>
          </div>
          <p className="mt-10 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
            Based in {site.location} · Working remotely on Central Time
          </p>
        </div>
      </div>

      {/* The sun sets at the bottom of the page, bookending the one in the hero. */}
      <div aria-hidden="true" className="relative left-1/2 mt-16 aspect-[100/34] w-[min(820px,125vw)] -translate-x-1/2 overflow-hidden">
        <svg viewBox="0 0 100 50" className="absolute inset-x-0 top-0 w-full">
          <defs>
            <mask id="sunset-stripes">
              <rect width="100" height="50" fill="white" />
              {stripes.map((s) => (
                <rect key={s.y} x="0" y={s.y} width="100" height={s.h} fill="black" />
              ))}
            </mask>
            <linearGradient id="sunset-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "rgb(var(--gold))" }} />
              <stop offset="0.6" style={{ stopColor: "rgb(var(--accent))" }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#sunset-fill)" mask="url(#sunset-stripes)" />
        </svg>
      </div>
    </section>
  );
}
