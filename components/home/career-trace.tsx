"use client";

import { useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { career, type Lane, type Span } from "@/lib/career";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@/components/icons";

const barColor: Record<Lane, string> = {
  root: "bg-ink/30",
  accent: "bg-accent",
  pine: "bg-pine",
  lake: "bg-lake",
  gold: "bg-gold",
};

const dotColor: Record<Lane, string> = { ...barColor, root: "bg-ink/70" };

const toMonths = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const monthName = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};

const duration = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m}mo`;
  return m ? `${y}y ${m}mo` : `${y}y`;
};

// Short, stable, fake span ids so the details panel reads like a real trace.
const spanId = (name: string) => {
  let h = 2166136261;
  for (const c of name) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0");
};

// Nearest earlier span that sits one level up.
const parentOf = (span: Span) => {
  for (let j = career.indexOf(span) - 1; j >= 0; j--) if (career[j].depth < span.depth) return career[j].name;
  return null;
};

// For each row: which ancestor levels keep going below it, so we can draw tree guides.
const guides = career.map((s, i) => {
  const levels = [];
  for (let level = 1; level <= s.depth; level++) {
    let continues = false;
    for (let j = i + 1; j < career.length; j++) {
      if (career[j].depth < level) break;
      if (career[j].depth === level) {
        continues = true;
        break;
      }
    }
    levels.push({ level, continues, elbow: level === s.depth });
  }
  return { levels, hasChildren: (career[i + 1]?.depth ?? -1) > s.depth };
});

const INDENT = 1.1; // rem per depth level
const guideX = (level: number) => `calc(0.5rem + ${(level - 1) * INDENT}rem + 3.5px)`;

const neverChanges = () => () => {};
const thisMonth = () => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
};

export function CareerTrace({ builtAt }: { builtAt: string }) {
  // The server renders with the build month; the browser catches up to today.
  const nowMonth = useSyncExternalStore(neverChanges, thisMonth, () => toMonths(builtAt));
  const [selected, setSelected] = useState("origin");
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const domain = useMemo(() => {
    const start = toMonths(career[0].start) - 2;
    const end = nowMonth + 3;
    return { start, end, span: end - start };
  }, [nowMonth]);

  const pos = (month: number) => ((month - domain.start) / domain.span) * 100;
  const endOf = (s: Span) => (s.end ? toMonths(s.end) : nowMonth + 1);

  const years = useMemo(() => {
    const first = Math.ceil((domain.start + 1) / 12);
    const last = Math.floor(domain.end / 12);
    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
  }, [domain]);

  const current = career.find((s) => s.id === selected) ?? career[0];
  const total = nowMonth + 1 - toMonths(career[0].start);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const clamped = Math.max(0, Math.min(career.length - 1, next));
    setSelected(career[clamped].id);
    rowRefs.current[clamped]?.focus();
  };

  return (
    <div className="card-surface reveal mt-16 overflow-hidden">
      {/* trace header */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 border-b border-rule/80 bg-paper-2/60 px-4 py-3 font-mono text-[0.72rem] text-ink-3 sm:px-6">
        <span className="flex items-center gap-2 text-ink">
          <span className="h-2 w-2 rounded-full bg-pine" aria-hidden="true" />
          trace · justin.career
        </span>
        <span>
          spans <span className="text-ink-2">{career.length}</span>
        </span>
        <span>
          duration <span className="text-ink-2">{duration(total)}</span>
        </span>
        <span>
          status <span className="text-pine">OK</span>
        </span>
        <span className="ml-auto hidden md:inline" title="Hexspeak for disc golf and code.">
          trace_id d15c601f-c0de
        </span>
      </div>

      {/* waterfall */}
      <div className="px-4 pb-3 pt-4 sm:px-6">
        <div className="grid grid-cols-1 px-2 md:grid-cols-[15rem_1fr] md:gap-x-4">
          <div className="hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3 md:block">span</div>
          <div className="relative h-5" aria-hidden="true">
            {years.map((y) => (
              <span
                key={y}
                className={cn(
                  "absolute top-0 -translate-x-1/2 font-mono text-[0.68rem] text-ink-3",
                  y % 2 === 1 && "hidden sm:inline",
                )}
                style={{ left: `${pos(y * 12)}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>

        <ul className="relative mt-1" aria-label="Career spans. Use the arrow keys to move between spans.">
          {career.map((s, i) => {
            const left = pos(toMonths(s.start));
            const width = Math.max(1.2, pos(endOf(s)) - left);
            const open = !s.end;
            // Only the open leaf gets the "live" treatment; its open parent stays solid.
            const live = open && s.depth > 0 && !guides[i].hasChildren;
            const nearEnd = left + width > 82;
            const isSelected = s.id === selected;
            return (
              <li key={s.id}>
                <button
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="span-details"
                  onClick={() => setSelected(s.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group relative grid w-full grid-cols-1 items-center gap-1 rounded-lg px-2 py-2 text-left transition-colors md:grid-cols-[15rem_1fr] md:gap-x-4",
                    isSelected ? "bg-ink/[0.055]" : "hover:bg-ink/[0.03]",
                  )}
                >
                  {/* gridlines */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2 hidden md:left-[calc(15rem+1.5rem)] md:block">
                    {years.map((y) => (
                      <span key={y} className="absolute inset-y-0 w-px bg-rule/60" style={{ left: `${pos(y * 12)}%` }} />
                    ))}
                  </span>

                  {/* tree guides */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
                    {guides[i].levels.map(({ level, continues, elbow }) =>
                      elbow ? (
                        <span key={level}>
                          <span className="absolute top-0 h-1/2 w-px bg-ink/20" style={{ left: guideX(level) }} />
                          <span
                            className="absolute top-1/2 h-px bg-ink/20"
                            style={{ left: guideX(level), width: `calc(${INDENT}rem - 5px)` }}
                          />
                          {continues ? <span className="absolute bottom-0 top-1/2 w-px bg-ink/20" style={{ left: guideX(level) }} /> : null}
                        </span>
                      ) : continues ? (
                        <span key={level} className="absolute inset-y-0 w-px bg-ink/20" style={{ left: guideX(level) }} />
                      ) : null,
                    )}
                    {guides[i].hasChildren ? (
                      <span className="absolute bottom-0 top-1/2 w-px bg-ink/20" style={{ left: guideX(s.depth + 1) }} />
                    ) : null}
                  </span>

                  <span
                    className="relative flex min-w-0 items-center gap-2 font-mono text-[0.8rem]"
                    style={{ paddingLeft: `${s.depth * INDENT}rem` }}
                  >
                    <span aria-hidden="true" className={cn("relative h-2 w-2 shrink-0 rounded-sm", dotColor[s.lane])} />
                    <span className={cn("truncate", isSelected ? "text-ink" : "text-ink-2 group-hover:text-ink")}>{s.name}</span>
                    <span className="sr-only">
                      , {s.title} at {s.org}, {monthName(s.start)} to {s.end ? monthName(s.end) : "now"}
                    </span>
                  </span>

                  <span className="relative block h-6" aria-hidden="true">
                    <span
                      className={cn(
                        "bar-grow absolute inset-y-0 my-auto rounded-[5px]",
                        s.depth === 0 ? "h-1.5" : "h-3.5",
                        barColor[s.lane],
                        live && "bar-live",
                        isSelected && "ring-2 ring-ink/25 ring-offset-2 ring-offset-card",
                      )}
                      style={{ left: `${left}%`, width: `${width}%` }}
                    >
                      {live ? (
                        <span className="absolute -right-1 inset-y-0 my-auto h-2.5 w-2.5 animate-ring rounded-full bg-accent" />
                      ) : open ? (
                        <span className="absolute -right-0.5 inset-y-0 my-auto h-2 w-2 rounded-full bg-ink/50" />
                      ) : null}
                    </span>
                    {s.events?.map((ev) => (
                      <span
                        key={ev.name}
                        title={`${ev.name}: ${ev.note}`}
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-card bg-ink"
                        style={{ left: `${pos(toMonths(ev.date))}%` }}
                      />
                    ))}
                    {s.depth > 0 ? (
                      <span
                        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.68rem] text-ink-3"
                        style={nearEnd ? { right: `${100 - left + 1.2}%` } : { left: `calc(${left + width}% + 0.5rem)` }}
                      >
                        {duration(endOf(s) - toMonths(s.start))}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* details */}
      <div id="span-details" className="border-t border-rule/80">
        <p className="sr-only" aria-live="polite">
          Showing {current.title}, {current.org}, {monthName(current.start)} to {current.end ? monthName(current.end) : "now"}.
        </p>
        <div key={current.id} className="grid animate-fade-up gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <p className="font-mono text-[0.72rem] text-ink-3">
              span <span className="text-ink-2">{current.name}</span> · id {spanId(current.name)}
              {parentOf(current) ? <> · parent {parentOf(current)}</> : null}
            </p>
            <h3 className="mt-3 font-display text-[1.9rem] leading-tight tracking-[-0.02em] font-soft sm:text-[2.2rem]">{current.title}</h3>
            <p className="mt-2 text-ink-2">
              {current.orgUrl ? (
                <a href={current.orgUrl} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                  {current.org}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                current.org
              )}
              <span className="text-ink-3"> · {current.location}</span>
            </p>
            <p className="mt-1 font-mono text-[0.78rem] text-ink-3">
              {monthName(current.start)} → {current.end ? monthName(current.end) : "now"} ·{" "}
              {duration(endOf(current) - toMonths(current.start))}
            </p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-2">{current.summary}</p>
            {current.highlights.length ? (
              <ul className="mt-6 space-y-3">
                {current.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow">Attributes</p>
              <dl className="mt-3 divide-y divide-rule/70 rounded-xl border border-rule/80 bg-paper/60 font-mono text-[0.76rem]">
                {current.attributes.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-3.5 py-2">
                    <dt className="text-ink-3">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {current.events?.length ? (
              <div>
                <p className="eyebrow">Events</p>
                <ul className="mt-3 space-y-2 font-mono text-[0.76rem]">
                  {current.events.map((ev) => (
                    <li key={ev.name} className="flex gap-3">
                      <span className="text-ink-3">{monthName(ev.date)}</span>
                      <span className="text-ink-2">
                        <span className="text-ink">{ev.name}</span> · {ev.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {current.logs?.length ? (
              <div>
                <p className="eyebrow">Logs</p>
                {current.logs.map((log) => (
                  <figure key={log.by} className="mt-3 border-l-2 border-accent pl-4">
                    <blockquote className="font-display text-[1.02rem] italic leading-relaxed text-ink font-soft">
                      &ldquo;{log.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 font-mono text-[0.72rem] text-ink-3">{log.by}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}

            {current.stack.length ? (
              <div>
                <p className="eyebrow">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {current.stack.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
