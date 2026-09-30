import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Workbench } from "./workbench";
import somDesktop from "@/public/work/state-of-mind-desktop.jpg";
import somMobile from "@/public/work/state-of-mind-mobile.jpg";
import vexalDesktop from "@/public/work/vexal-desktop.jpg";
import vexalDesktopDark from "@/public/work/vexal-desktop-dark.jpg";
import vexalMobile from "@/public/work/vexal-mobile.jpg";
import vexalMobileDark from "@/public/work/vexal-mobile-dark.jpg";

/** A screenshot, with an optional dark-mode twin shown when this site is dark. */
type Shot = { light: StaticImageData; dark?: StaticImageData; alt: string };

type Showcase = {
  eyebrow: string;
  title: string;
  lede: string;
  body: ReactNode;
  chips: string[];
  url: string;
  domain: string;
  linkLabel: string;
  desktop: Shot;
  mobile: Shot;
  /** The pane behind the screenshots, tinted from this site's palette. */
  backdrop: string;
  /** Optional "How it works" steps, shown across the bottom of the card. */
  stack?: { label: string; body: ReactNode }[];
};

// Newest first.
const showcases: Showcase[] = [
  {
    eyebrow: "My company · Founder",
    title: "Vexal",
    lede: "Vexal is my small software studio. It builds custom websites, mobile apps, automation, and internal tools for businesses, and offers software consulting.",
    body: (
      <>
        I built vexal.dev end to end. Visitors can request an estimate, have a rough description turned into a project
        brief they review before sending, or chat with Ask Vexal, the site&rsquo;s assistant. State of Mind Psychiatry,
        below, is Vexal client work.
      </>
    ),
    chips: ["Astro", "Cloudflare Workers", "D1", "OpenRouter", "Jev", "Claude Haiku 4.5"],
    url: site.links.vexal,
    domain: "vexal.dev",
    linkLabel: "Visit vexal.dev",
    desktop: {
      light: vexalDesktop,
      dark: vexalDesktopDark,
      alt: "The Vexal homepage: 'We build websites that work hard' beside a grid of bold geometric shapes",
    },
    mobile: { light: vexalMobile, dark: vexalMobileDark, alt: "The same homepage on a phone, with the Ask Vexal button" },
    backdrop: "bg-[linear-gradient(140deg,rgb(var(--lake)/0.2),rgb(var(--accent)/0.12)_55%,rgb(var(--gold)/0.18))]",
    stack: [
      {
        label: "Static site",
        body: "Astro, TypeScript, and Tailwind, served as static pages from Cloudflare. Only /api/* runs code, in one small Cloudflare Worker.",
      },
      {
        label: "Jev routes first",
        body: "Every chat message, project description, and request goes to Jev, TypeSafe’s System One model on OpenRouter, as a few typed questions: what is this, does a ready answer fit, is anything sensitive? Safety replies and ready answers go straight back, no writing model needed.",
      },
      {
        label: "Claude writes the rest",
        body: "Claude Haiku 4.5, also through OpenRouter, answers only from facts generated from the site’s own config, and drafts project briefs as JSON the Worker validates.",
      },
      {
        label: "Requests",
        body: "Saved to Cloudflare D1, then emailed to me through Cloudflare Email Service unless Jev marks it as spam. Turnstile, rate limits, and a same-origin check guard chat, briefs, and requests alike.",
      },
    ],
  },
  {
    eyebrow: "Vexal client work · Starkville, MS",
    title: "State of Mind Psychiatry",
    lede: "A local psychiatry practice needed a website that felt calm and trustworthy, and made booking an appointment painless.",
    body: (
      <>
        I designed and built it with Astro, connected online scheduling through IntakeQ, and I keep it running. Now
        I&rsquo;m building a visual editor so the team can update their own pages, and refining and refreshing the design
        along the way.
      </>
    ),
    chips: ["Astro", "IntakeQ scheduling", "Responsive", "Visual editor (in progress)", "Design refresh (in progress)"],
    url: "https://stateofmindpsychiatric.com",
    domain: "stateofmindpsychiatric.com",
    linkLabel: "Visit the site",
    desktop: {
      light: somDesktop,
      alt: "The State of Mind Psychiatry homepage: 'Transform Struggles into Strengths' beside a puzzle-piece illustration of a head",
    },
    mobile: { light: somMobile, alt: "The same homepage on a phone" },
    backdrop: "bg-[linear-gradient(140deg,rgb(var(--pine)/0.22),rgb(var(--gold)/0.14)_60%,rgb(var(--accent)/0.12))]",
  },
];

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
    body: "The site you're on. Next.js, Tailwind, and MDX, plus a hand-built trace viewer, a putting game, and a tiny shell. Press / to try it.",
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
          aside="Now & shipped"
          title={
            <>
              Always <em>building</em> something.
            </>
          }
        >
          Client work, product ideas for disc golf, experiments with new AI tools, and building in public on X. Here&rsquo;s
          what&rsquo;s on the bench right now, and a few things that have shipped.
        </SectionHeading>

        <Workbench />

        <div className="reveal mt-24 flex items-center gap-3">
          <p className="eyebrow">Recently shipped</p>
          <span aria-hidden="true" className="h-px flex-1 bg-rule" />
        </div>

        <div className="mt-6 space-y-6">
          {showcases.map((showcase, i) => (
            <ShowcaseCard key={showcase.title} showcase={showcase} flip={i % 2 === 1} />
          ))}
        </div>

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

/** A shipped site: the story on one side, desktop and phone screenshots on the other. */
function ShowcaseCard({ showcase: s, flip }: { showcase: Showcase; flip?: boolean }) {
  return (
    <article
      className={cn(
        "card-surface reveal grid overflow-hidden",
        flip ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1fr_1.2fr]",
      )}
    >
      <div className={cn("flex flex-col p-7 sm:p-10", flip && "lg:order-2")}>
        <p className="eyebrow">{s.eyebrow}</p>
        <h3 className="mt-4 font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.02] tracking-[-0.025em] font-soft">
          {s.title}
        </h3>
        <p className="mt-5 text-[1.12rem] leading-relaxed text-ink">{s.lede}</p>
        <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {s.chips.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <a href={s.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5 font-medium">
            {s.linkLabel} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div
        className={cn(
          "relative min-h-[300px] overflow-hidden px-6 pb-10 pt-8 sm:px-10 sm:pt-10",
          s.backdrop,
          flip && "lg:order-1",
        )}
      >
        <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-50" />
        <figure className="relative rounded-xl border border-ink/10 bg-card shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.6)]">
          <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            </span>
            <span className="mx-auto truncate rounded-full bg-paper-2 px-3 py-0.5 font-mono text-[0.68rem] text-ink-3">
              {s.domain}
            </span>
          </div>
          <ThemedImage shot={s.desktop} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full rounded-b-xl" />
        </figure>
        <figure className="absolute -bottom-10 right-5 w-[26%] min-w-[92px] max-w-[150px] rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-[0_24px_40px_-18px_rgb(var(--shadow)/0.7)] sm:right-8">
          <ThemedImage shot={s.mobile} sizes="150px" className="h-auto w-full rounded-[1rem]" />
        </figure>
      </div>

      {s.stack ? (
        <div className="border-t border-rule/70 bg-paper-2/40 px-7 py-8 sm:px-10 lg:order-3 lg:col-span-2">
          <p className="eyebrow">How it works</p>
          <ol className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.stack.map((step, i) => (
              <li key={step.label}>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">
                  <span className="text-accent-ink">{String(i + 1).padStart(2, "0")}</span> {step.label}
                </p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </article>
  );
}

/** Renders the light screenshot, and swaps in the dark one when this site is in dark mode. */
function ThemedImage({ shot, sizes, className }: { shot: Shot; sizes: string; className: string }) {
  if (!shot.dark) return <Image src={shot.light} alt={shot.alt} sizes={sizes} placeholder="blur" className={className} />;
  return (
    <>
      <Image src={shot.light} alt={shot.alt} sizes={sizes} placeholder="blur" className={cn(className, "dark:hidden")} />
      <Image src={shot.dark} alt={shot.alt} sizes={sizes} placeholder="blur" className={cn(className, "hidden dark:block")} />
    </>
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
        guest:~$ <tspan className="fill-[#ECE5D6]">putt</tspan>
      </text>
      <text x="80" y="86" className="fill-[#D8D0BF] font-mono" style={{ fontSize: 12 }}>
        chains! 🥏
      </text>
      <rect x="80" y="96" width="7" height="13" className="fill-[#FF6B4A]" />
      <circle cx="232" cy="98" r="14" className="fill-accent" />
      <rect x="214" y="98" width="36" height="2.5" className="fill-[#15130F]" />
      <rect x="214" y="104" width="36" height="3.5" className="fill-[#15130F]" />
    </svg>
  );
}
