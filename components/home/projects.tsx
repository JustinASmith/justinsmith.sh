import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";
import somDesktop from "@/public/work/state-of-mind-desktop.jpg";
import somMobile from "@/public/work/state-of-mind-mobile.jpg";

type Card = {
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  link?: { href: string; label: string };
  art: ReactNode;
};

const cards: Card[] = [
  {
    kicker: "Internal tool · Origin",
    title: "Customer-intelligence briefs",
    body: "Daily briefs for 15 customers that blend agent telemetry and traces, Slack context, MCP-powered analytics, and LLM analysis, delivered to Slack, PDF, and interactive reports for Sales, GTM, and Engineering.",
    tags: ["Python", "MCP", "LLMs", "Slack"],
    art: <BriefArt />,
  },
  {
    kicker: "Open source · Estuary",
    title: "Real-time data connectors",
    body: "Work on Estuary's Python connector SDK: multi-tenant state for 500K+ concurrent streams, async throughput measured in GB/min, and a zero-downtime migration for 25 enterprise customers.",
    tags: ["Python", "asyncio", "CDC"],
    link: { href: site.links.estuaryPrs, label: "Merged pull requests" },
    art: <StreamsArt />,
  },
  {
    kicker: "Personal · 2026",
    title: "justinsmith.sh",
    body: "The site you're on. Next.js, Tailwind, and MDX, plus a hand-built trace viewer, a fishing pond, and a tiny shell. Press / to try it.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: { href: site.links.source, label: "View the source" },
    art: <ShellArt />,
  },
];

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-rule/70 bg-paper-2/55 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Projects"
          aside="Selected"
          title={
            <>
              Built for real people, <em>out in the world</em>.
            </>
          }
        >
          A few things I&rsquo;ve made lately, from a local practice&rsquo;s website to the plumbing behind half a million
          data streams.
        </SectionHeading>

        <article className="card-surface reveal mt-16 grid overflow-hidden lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col p-7 sm:p-10">
            <p className="eyebrow">Client work · Starkville, MS</p>
            <h3 className="mt-4 font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.02] tracking-[-0.025em] font-soft">
              State of Mind Psychiatry
            </h3>
            <p className="mt-5 text-[1.12rem] leading-relaxed text-ink">
              A local psychiatry practice needed a website that felt calm and trustworthy, and made booking an
              appointment painless.
            </p>
            <p className="mt-3 leading-relaxed text-ink-2">
              I designed and built it with Astro, connected online scheduling through IntakeQ, and I keep it running. Next
              up: a visual editor, so the team can update their own pages without calling me.
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {["Astro", "IntakeQ scheduling", "Responsive", "Visual editor (in progress)"].map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href="https://stateofmindpsychiatric.com"
                target="_blank"
                rel="noreferrer"
                className="link inline-flex items-center gap-1.5 font-medium"
              >
                Visit the site <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[linear-gradient(140deg,rgb(var(--pine)/0.22),rgb(var(--gold)/0.14)_60%,rgb(var(--accent)/0.12))] px-6 pb-10 pt-8 sm:px-10 sm:pt-10">
            <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-50" />
            <figure className="relative rounded-xl border border-ink/10 bg-card shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.6)]">
              <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                </span>
                <span className="mx-auto truncate rounded-full bg-paper-2 px-3 py-0.5 font-mono text-[0.68rem] text-ink-3">
                  stateofmindpsychiatric.com
                </span>
              </div>
              <Image
                src={somDesktop}
                alt="The State of Mind Psychiatry homepage: 'Transform Struggles into Strengths' beside a puzzle-piece illustration of a head"
                sizes="(min-width: 1024px) 560px, 90vw"
                placeholder="blur"
                className="h-auto w-full rounded-b-xl"
              />
            </figure>
            <figure className="absolute -bottom-10 right-5 w-[26%] min-w-[92px] max-w-[150px] rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-[0_24px_40px_-18px_rgb(var(--shadow)/0.7)] sm:right-8">
              <Image
                src={somMobile}
                alt="The same homepage on a phone"
                sizes="150px"
                placeholder="blur"
                className="h-auto w-full rounded-[1rem]"
              />
            </figure>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="card-surface reveal flex flex-col overflow-hidden">
              <div className="border-b border-rule/70 bg-paper-2/70" aria-hidden="true">
                {card.art}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="eyebrow">{card.kicker}</p>
                <h3 className="mt-3 font-display text-[1.6rem] leading-tight tracking-[-0.02em] font-soft">{card.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-2">{card.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {card.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                {card.link ? (
                  <div className="mt-auto pt-6">
                    <a
                      href={card.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1.5 text-[0.95rem] font-medium"
                    >
                      {card.link.label} <ArrowUpRight size={15} />
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BriefArt() {
  return (
    <svg viewBox="0 0 320 140" className="h-auto w-full">
      <rect x="92" y="18" width="136" height="104" rx="10" className="fill-card stroke-rule" />
      <rect x="106" y="32" width="64" height="6" rx="3" className="fill-ink/70" />
      <rect x="106" y="46" width="104" height="4" rx="2" className="fill-ink/20" />
      <rect x="106" y="56" width="90" height="4" rx="2" className="fill-ink/20" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={108 + i * 17}
          y={108 - [18, 30, 24, 40, 34, 48][i]}
          width="10"
          height={[18, 30, 24, 40, 34, 48][i]}
          rx="2"
          className={i === 5 ? "fill-accent" : "fill-pine/60"}
        />
      ))}
      <path d="M244 36l3.5 10.5L258 50l-10.5 3.5L244 64l-3.5-10.5L230 50l10.5-3.5z" className="fill-gold" />
      <path d="M68 90l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" className="fill-accent/70" />
    </svg>
  );
}

function StreamsArt() {
  const ys = [26, 46, 66, 86, 106];
  return (
    <svg viewBox="0 0 320 140" className="h-auto w-full" fill="none">
      {ys.map((y, i) => (
        <path
          key={y}
          d={`M16 ${y} C 110 ${y}, 150 70, 210 70`}
          className={["stroke-lake/50", "stroke-pine/50", "stroke-gold/60", "stroke-lake/50", "stroke-pine/50"][i]}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <path d="M210 70 H 304" className="stroke-lake" strokeWidth="7" strokeLinecap="round" />
      {ys.map((y) => (
        <circle key={y} cx="16" cy={y} r="4.5" className="fill-card stroke-ink/40" strokeWidth="2" />
      ))}
      <circle cx="304" cy="70" r="7" className="fill-accent" />
    </svg>
  );
}

function ShellArt() {
  return (
    <svg viewBox="0 0 320 140" className="h-auto w-full">
      <rect x="64" y="20" width="192" height="100" rx="10" className="fill-[#15130F]" />
      <circle cx="80" cy="33" r="3" className="fill-white/20" />
      <circle cx="91" cy="33" r="3" className="fill-white/20" />
      <circle cx="102" cy="33" r="3" className="fill-white/20" />
      <text x="80" y="66" className="fill-[#7FC2A6] font-mono" style={{ fontSize: 12 }}>
        guest:~$ <tspan className="fill-[#ECE5D6]">fish</tspan>
      </text>
      <text x="80" y="86" className="fill-[#D8D0BF] font-mono" style={{ fontSize: 12 }}>
        casting… 🎣
      </text>
      <rect x="80" y="96" width="7" height="13" className="fill-[#FF6B4A]" />
      <circle cx="232" cy="98" r="14" className="fill-accent" />
      <rect x="214" y="98" width="36" height="2.5" className="fill-[#15130F]" />
      <rect x="214" y="104" width="36" height="3.5" className="fill-[#15130F]" />
    </svg>
  );
}
