"use client";

import { useId, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import type { ChartEvent, ChartModel } from "@/lib/pdga";
import { eventUrl, fmtDay, fmtDayShort, fmtMonth, ordinal, signed } from "@/lib/pdga-format";
import { useToday } from "@/lib/use-today";
import { cn } from "@/lib/utils";

// Fixed heights keep the gutters (axis and lane labels) lined up with the plot.
const PLOT = "h-[210px] sm:h-[250px]";
const LANE = 22;
const AXIS = "h-7";

const pct = (n: number) => `${n.toFixed(3)}%`;
const r2 = (n: number) => Math.round(n * 100) / 100;

const DOT = "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_2px_rgb(var(--card))]";
const HOLLOW = "border-[1.5px] border-viz-muted bg-card";

function describe(e: ChartEvent) {
  const finish = e.dnf ? "did not finish" : e.place ? `${ordinal(e.place)} place${e.win ? ", a win" : ""}` : "no result yet";
  const rounds = e.rounds.length
    ? `round ratings ${e.rounds.join(" and ")}${e.ratings === "unofficial" ? " (unofficial)" : ""}`
    : "no rated rounds";
  return `${fmtDay(e.date)}: ${e.name}, ${e.division}. ${finish}; ${rounds}.`;
}

export function RatingChart({ model: m, builtOn }: { model: ChartModel; builtOn: string }) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [active, setActive] = useState<number | null>(null);
  const showProjection = useToday(builtOn) <= m.projection.date;
  const summaryId = useId();

  const px = (t: number) => ((t - m.x0) / (m.x1 - m.x0)) * 100;
  const py = (rating: number) => ((m.y1 - rating) / (m.y1 - m.y0)) * 100;

  // Ratings only change on update days, so the line is a staircase.
  const first = m.history[0];
  let line = `M${r2(px(first.t))} ${r2(py(first.rating))}`;
  for (const h of m.history.slice(1)) line += `H${r2(px(h.t))}V${r2(py(h.rating))}`;
  line += `H${r2(px(m.syncedT))}`;
  const area = `${line}V100H${r2(px(first.t))}Z`;
  const projected = `M${r2(px(m.syncedT))} ${r2(py(m.current.rating))}H${r2(px(m.projection.t))}V${r2(py(m.projection.rating))}`;

  const last = m.events.length - 1;
  const current = active == null ? null : m.events[active];
  const hasUnofficial = m.events.some((e) => e.ratings === "unofficial");
  const lanesHeight = m.lanes.length * LANE;

  const nearest = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const t = m.x0 + ((clientX - rect.left) / rect.width) * (m.x1 - m.x0);
    let best = 0;
    m.events.forEach((e, i) => {
      if (Math.abs(e.t - t) < Math.abs(m.events[best].t - t)) best = i;
    });
    return best;
  };

  const onPointer = (e: PointerEvent<HTMLDivElement>) => setActive(nearest(e.clientX, e.currentTarget));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") return setActive(null);
    const from = active ?? last;
    const steps: Record<string, number> = {
      ArrowLeft: from - 1,
      ArrowDown: from - 1,
      ArrowRight: from + 1,
      ArrowUp: from + 1,
      PageDown: from - 5,
      PageUp: from + 5,
      Home: 0,
      End: last,
    };
    if (!(e.key in steps)) return;
    e.preventDefault();
    setActive(Math.max(0, Math.min(last, steps[e.key])));
  };

  const summary =
    `My official PDGA rating went from ${first.rating} in ${fmtMonth(first.date)} to a peak of ${m.peak.rating}, ` +
    `and it's ${m.current.rating} as of ${fmtDay(m.current.date)}` +
    (showProjection ? `, projected to be about ${m.projection.rating} after the ${fmtDayShort(m.projection.date)} update. ` : ". ") +
    "Each tournament also sits in a lane for the division I played. Use the arrow keys to step through tournaments, or switch to the table.";

  return (
    <figure>
      <figcaption className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div>
          <p className="font-medium text-ink">Rating, round by round</p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] text-ink-2">
            {view === "chart" ? (
              <>
                <Key mark={<span className="h-0.5 w-4 rounded-full bg-viz-accent" />}>Official rating</Key>
                {showProjection ? (
                  <Key
                    mark={
                      <svg width="16" height="4" aria-hidden="true" className="overflow-visible">
                        <line x1="1" y1="2" x2="15" y2="2" className="stroke-viz-accent" strokeWidth="2" strokeDasharray="3 3" />
                      </svg>
                    }
                  >
                    Projected
                  </Key>
                ) : null}
                <Key mark={<span className="size-2 rounded-full bg-viz-muted" />}>Round rating</Key>
                {hasUnofficial ? <Key mark={<span className={cn("size-2 rounded-full", HOLLOW)} />}>Unofficial round</Key> : null}
              </>
            ) : null}
            <Key mark={<WinMark />}>Win</Key>
            <Key mark={<PodiumMark />}>Podium</Key>
          </ul>
        </div>
        <div role="group" aria-label="View as" className="inline-flex rounded-full border border-rule bg-paper/70 p-0.5 font-mono text-[0.72rem]">
          {(["chart", "table"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-full px-3 py-1 capitalize transition-colors",
                view === v ? "bg-ink text-paper" : "text-ink-3 hover:text-ink",
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </figcaption>
      <p id={summaryId} className="sr-only">
        {summary}
      </p>

      {view === "table" ? (
        <Tables model={m} showProjection={showProjection} />
      ) : (
        <>
          <div className="mt-6 flex">
            {/* left gutter: rating axis, then division names */}
            <div aria-hidden="true" className="w-9 shrink-0 font-mono text-[0.66rem] tabular-nums text-ink-3 sm:w-11">
              <div className={cn("relative", PLOT)}>
                {m.yTicks.map((v) => (
                  <span key={v} className="absolute right-2 -translate-y-1/2 sm:right-3" style={{ top: pct(py(v)) }}>
                    {v}
                  </span>
                ))}
              </div>
              <div className="relative mt-3" style={{ height: lanesHeight }}>
                {m.lanes.map((lane, i) => (
                  <span
                    key={lane}
                    className="absolute right-2 -translate-y-1/2 text-[0.62rem] tracking-[0.06em] sm:right-3"
                    style={{ top: (i + 0.5) * LANE }}
                  >
                    {lane}
                  </span>
                ))}
              </div>
            </div>

            {/* plot + lanes + year axis share one pointer surface and one crosshair */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Tournaments"
              aria-describedby={summaryId}
              aria-valuemin={1}
              aria-valuemax={m.events.length}
              aria-valuenow={(active ?? last) + 1}
              aria-valuetext={describe(m.events[active ?? last])}
              onPointerMove={onPointer}
              onPointerDown={onPointer}
              onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
              onFocus={() => setActive((a) => a ?? last)}
              onBlur={() => setActive(null)}
              onKeyDown={onKeyDown}
              className="relative min-w-0 flex-1 cursor-crosshair touch-pan-y select-none"
            >
              <div className={cn("relative", PLOT)}>
                {m.yTicks.map((v) => (
                  <span key={v} aria-hidden="true" className="absolute inset-x-0 h-px bg-rule/70" style={{ top: pct(py(v)) }} />
                ))}
                {m.years.map((y) => (
                  <span key={y.label} aria-hidden="true" className="absolute inset-y-0 w-px bg-rule/50" style={{ left: pct(px(y.t)) }} />
                ))}

                <div aria-hidden="true" className="draw-in absolute inset-0">
                  {m.events.flatMap((e, i) =>
                    e.rounds.map((rating, j) => (
                      <span
                        key={`${e.id}-${j}`}
                        className={cn(
                          DOT,
                          "transition-transform duration-150",
                          e.ratings === "unofficial" ? HOLLOW : "bg-viz-muted",
                          i === active && "z-10 scale-125 border-ink bg-ink",
                          i === active && e.ratings === "unofficial" && "bg-card",
                        )}
                        style={{ left: pct(px(e.t)), top: pct(py(rating)) }}
                      />
                    )),
                  )}

                  <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d={area} className="fill-viz-accent/[0.07]" />
                    <path
                      d={line}
                      fill="none"
                      className="stroke-viz-accent"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {showProjection ? (
                      <path
                        d={projected}
                        fill="none"
                        className="stroke-viz-accent"
                        strokeWidth={2}
                        strokeDasharray="3 4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ) : null}
                  </svg>

                  {/* the few marks worth a label: the peak, the best round, where the line ends */}
                  <span className={cn(DOT, "bg-viz-accent")} style={{ left: pct(px(m.peak.t)), top: pct(py(m.peak.rating)) }} />
                  <span
                    className={cn(
                      "absolute -translate-y-full whitespace-nowrap pb-2 font-mono text-[0.66rem] text-ink-2",
                      px(m.peak.t) > 85 && "-translate-x-full",
                    )}
                    style={{ left: pct(px(m.peak.t)), top: pct(py(m.peak.rating)) }}
                  >
                    <span className="hidden sm:inline">peak </span>
                    {m.peak.rating}
                  </span>
                  <span
                    className={cn(
                      "absolute -translate-y-1/2 whitespace-nowrap font-mono text-[0.66rem] text-ink-2",
                      px(m.best.t) < 25 ? "pl-2.5" : "-translate-x-full pr-2.5",
                    )}
                    style={{ left: pct(px(m.best.t)), top: pct(py(m.best.rating)) }}
                  >
                    <span className="hidden sm:inline">best round </span>
                    {m.best.rating}
                  </span>
                  <span
                    className={cn(DOT, "bg-viz-accent")}
                    style={{ left: pct(px(m.syncedT)), top: pct(py(m.current.rating)) }}
                  />
                  {showProjection ? (
                    <span
                      className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-viz-accent bg-card"
                      style={{ left: pct(px(m.projection.t)), top: pct(py(m.projection.rating)) }}
                    />
                  ) : null}
                </div>
              </div>

              <div className="relative mt-3" style={{ height: lanesHeight }}>
                {m.years.map((y) => (
                  <span key={y.label} aria-hidden="true" className="absolute inset-y-0 w-px bg-rule/50" style={{ left: pct(px(y.t)) }} />
                ))}
                {m.lanes.map((lane, i) => (
                  <span key={lane} aria-hidden="true" className="absolute inset-x-0 h-px bg-rule/80" style={{ top: (i + 0.5) * LANE }} />
                ))}
                <div aria-hidden="true" className="draw-in absolute inset-0">
                  {m.events.map((e, i) => (
                    <span
                      key={e.id}
                      className="absolute"
                      style={{ left: pct(px(e.t)), top: (m.lanes.indexOf(e.division) + 0.5) * LANE }}
                    >
                      {e.win ? <WinMark centered /> : e.podium ? <PodiumMark centered /> : null}
                      <span
                        className={cn(
                          DOT,
                          "transition-transform duration-150",
                          e.win ? "bg-viz-accent" : e.live ? HOLLOW : "bg-viz-muted",
                          i === active && "z-10 scale-150 border-ink bg-ink",
                          i === active && e.live && "bg-card",
                        )}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div aria-hidden="true" className={cn("relative", AXIS)}>
                {m.years.map((y) => (
                  <span
                    key={y.label}
                    className="absolute top-2 -translate-x-1/2 font-mono text-[0.68rem] tabular-nums text-ink-3"
                    style={{ left: pct(px(y.t)) }}
                  >
                    {y.label}
                  </span>
                ))}
              </div>

              {current ? (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 w-px bg-ink/40"
                    style={{ left: pct(px(current.t)), bottom: "1.75rem" }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1 z-20 hidden w-[17rem] rounded-xl border border-rule bg-card/95 p-3.5 shadow-[0_1px_2px_rgb(var(--shadow)/0.1),0_16px_32px_-18px_rgb(var(--shadow)/0.5)] backdrop-blur-sm sm:block"
                    style={
                      px(current.t) > 58
                        ? { right: `calc(${pct(100 - px(current.t))} + 14px)` }
                        : { left: `calc(${pct(px(current.t))} + 14px)` }
                    }
                  >
                    <Readout e={current} />
                  </div>
                </>
              ) : null}
            </div>

            {/* right gutter: where the line ends up */}
            <div aria-hidden="true" className="w-10 shrink-0 sm:w-12">
              <div className={cn("relative", PLOT)}>
                <span
                  className="absolute left-2 -translate-y-1/2 whitespace-nowrap leading-none sm:left-3"
                  style={{ top: pct(py(showProjection ? m.projection.rating : m.current.rating)) }}
                >
                  <span className="block text-[0.8rem] font-semibold tabular-nums text-ink">
                    {showProjection ? `~${m.projection.rating}` : m.current.rating}
                  </span>
                  <span className="mt-1 block font-mono text-[0.6rem] text-ink-3">
                    {showProjection ? fmtDayShort(m.projection.date) : "now"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* phones get the readout docked below instead of floating over a narrow plot */}
          <div aria-hidden="true" className="mt-4 min-h-[10.5rem] rounded-xl border border-rule/80 bg-paper/60 p-3.5 sm:hidden">
            <p className="mb-2 text-[0.75rem] text-ink-3">{current ? "Selected" : "Latest · tap or drag across the chart to explore"}</p>
            <Readout e={current ?? m.events[last]} />
          </div>
        </>
      )}
    </figure>
  );
}

function Key({ mark, children }: { mark: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <span aria-hidden="true" className="relative grid h-4 w-4 place-items-center">
        {mark}
      </span>
      {children}
    </li>
  );
}

/*
 * Scorecard notation: circle the podiums, double-circle the wins. `centered` draws
 * the rings around a lane dot; otherwise it's the legend's small, self-contained key.
 */
const RING = "absolute rounded-full border-[1.5px]";
const AROUND = "-translate-x-1/2 -translate-y-1/2";
const INSIDE = "inset-0 m-auto";

function PodiumMark({ centered }: { centered?: boolean }) {
  if (centered) return <span className={cn(RING, AROUND, "size-3.5 border-ink-2")} />;
  return (
    <>
      <span className={cn(RING, INSIDE, "size-3.5 border-ink-2")} />
      <span className={cn("absolute size-1.5 rounded-full bg-viz-muted", INSIDE)} />
    </>
  );
}

function WinMark({ centered }: { centered?: boolean }) {
  if (centered) {
    return (
      <>
        <span className={cn(RING, AROUND, "size-5 border-viz-accent")} />
        <span className={cn(RING, AROUND, "size-3.5 border-viz-accent")} />
      </>
    );
  }
  return (
    <>
      <span className={cn(RING, INSIDE, "size-4 border-viz-accent")} />
      <span className={cn(RING, INSIDE, "size-2.5 border-viz-accent")} />
      <span className={cn("absolute size-1 rounded-full bg-viz-accent", INSIDE)} />
    </>
  );
}

function Readout({ e }: { e: ChartEvent }) {
  const unofficial = e.ratings === "unofficial";
  const finish = e.dnf ? "DNF" : e.place ? ordinal(e.place) : "—";
  const finishNote = [e.dnf ? null : "place", e.cashed ? "cashed" : null, e.live ? "unofficial" : null]
    .filter(Boolean)
    .join(" · ");
  const roundsNote = e.rounds.length
    ? unofficial
      ? "round ratings, unofficial"
      : "round ratings"
    : e.dnf
      ? "no rated rounds"
      : "no round ratings";

  return (
    <div>
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-3">
        {fmtDay(e.date)} · {e.division}
        {e.tier ? ` · ${e.tier}-tier` : ""}
      </p>
      <p className="mt-1 text-[0.92rem] font-medium leading-snug text-ink">{e.name}</p>
      <dl className="mt-2.5 space-y-1.5 text-[0.8rem]">
        <Stat label={finishNote} value={finish} mark={e.win ? <WinMark /> : e.podium ? <PodiumMark /> : null} />
        <Stat
          label={roundsNote}
          value={e.rounds.length ? e.rounds.join(" · ") : "—"}
          mark={<span className={cn("size-2 rounded-full", unofficial ? HOLLOW : "bg-viz-muted")} />}
        />
        {e.ratingIn != null ? (
          <Stat label="rating going in" value={e.ratingIn} mark={<span className="h-0.5 w-3 rounded-full bg-viz-accent" />} />
        ) : null}
      </dl>
    </div>
  );
}

/** Value first, label after: in a tooltip the reader already knows the series and wants the number. */
function Stat({ label, value, mark }: { label: string; value: ReactNode; mark?: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="order-2 text-ink-3">{label}</dt>
      <dd className="order-1 flex shrink-0 items-center gap-1.5 whitespace-nowrap font-semibold tabular-nums text-ink">
        <span aria-hidden="true" className="relative grid size-4 shrink-0 place-items-center self-center">
          {mark}
        </span>
        {value}
      </dd>
    </div>
  );
}

function Tables({ model: m, showProjection }: { model: ChartModel; showProjection: boolean }) {
  const updates = [...m.history].reverse();
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="min-w-0">
        <p className="eyebrow">Tournaments, newest first</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[38rem] text-left text-[0.84rem]">
            <thead className="border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-3">
              <tr>
                <th scope="col" className="py-2 pr-3 font-normal">Date</th>
                <th scope="col" className="py-2 pr-3 font-normal">Tournament</th>
                <th scope="col" className="py-2 pr-3 font-normal">Div</th>
                <th scope="col" className="py-2 pr-3 text-right font-normal">Place</th>
                <th scope="col" className="py-2 pr-3 text-right font-normal">Round ratings</th>
                <th scope="col" className="py-2 text-right font-normal">Rating in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/70 tabular-nums">
              {[...m.events].reverse().map((e) => (
                <tr key={e.id}>
                  <td className="whitespace-nowrap py-2 pr-3 text-ink-3">{fmtDay(e.date)}</td>
                  <td className="py-2 pr-3">
                    <a href={eventUrl(e.id)} className="link" target="_blank" rel="noreferrer">
                      {e.name}
                    </a>
                    {e.live ? <span className="ml-1.5 text-[0.75rem] text-ink-3">(unofficial)</span> : null}
                  </td>
                  <td className="py-2 pr-3 font-mono text-[0.75rem] text-ink-2">{e.division}</td>
                  <td className="whitespace-nowrap py-2 pr-3">
                    <span className="flex items-center justify-end gap-2">
                      {e.dnf ? "DNF" : e.place ? ordinal(e.place) : "—"}
                      <span aria-hidden="true" className="relative size-4 shrink-0">
                        {e.win ? <WinMark /> : e.podium ? <PodiumMark /> : null}
                      </span>
                      {e.win ? <span className="sr-only">, a win</span> : null}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-2 pr-3 text-right">
                    {e.rounds.length ? e.rounds.join(" · ") : "—"}
                    {e.ratings === "unofficial" ? <span className="ml-1.5 text-[0.75rem] text-ink-3">unofficial</span> : null}
                  </td>
                  <td className="py-2 text-right text-ink-2">{e.ratingIn ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="eyebrow">Official rating updates</p>
        <table className="mt-3 w-full text-left text-[0.84rem]">
          <thead className="border-b border-rule font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-3">
            <tr>
              <th scope="col" className="py-2 pr-3 font-normal">Date</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">Rating</th>
              <th scope="col" className="py-2 text-right font-normal">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/70 tabular-nums">
            {showProjection ? (
              <tr className="text-ink-3">
                <td className="py-2 pr-3">{fmtDay(m.projection.date)} (projected)</td>
                <td className="py-2 pr-3 text-right">~{m.projection.rating}</td>
                <td className="py-2 text-right">{signed(m.projection.rating - m.current.rating)}</td>
              </tr>
            ) : null}
            {updates.map((h, i) => (
              <tr key={h.date}>
                <td className="whitespace-nowrap py-2 pr-3 text-ink-3">{fmtDay(h.date)}</td>
                <td className="py-2 pr-3 text-right font-medium">{h.rating}</td>
                <td className="py-2 text-right text-ink-2">{updates[i + 1] ? signed(h.rating - updates[i + 1].rating) : "first"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
