import type { ReactNode } from "react";
import { ArrowUpRight, DiscGolf } from "@/components/icons";
import { chart, milestones, modelCheck, pdga, projection, rounds, stats, type Milestone } from "@/lib/pdga";
import { fmtDay, fmtDayShort, fmtMonth, fmtMonthLong, numberWord, signed } from "@/lib/pdga-format";
import { cn } from "@/lib/utils";
import { RatingChart } from "./rating-chart";
import { ShowUntil } from "./show-until";

export function DiscGolfCard() {
  // The page is static, so this is the build date; client components use it to retire stale projections.
  const builtOn = new Date().toISOString().slice(0, 10);
  const thousand = [...rounds].sort((a, b) => a.t - b.t).find((r) => r.rating >= 1000);
  const best = stats.bestRound;

  return (
    <article id="disc-golf" aria-labelledby="disc-golf-title" className="card-surface reveal mt-16 overflow-hidden">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-2">
            <DiscGolf size={15} className="text-accent" />
            PDGA #{pdga.player}
          </p>
          <h3
            id="disc-golf-title"
            className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[0.98] tracking-[-0.03em] font-soft"
          >
            From {stats.firstDivision} to <span className="italic text-accent font-wonk">{stats.division}</span>.
          </h3>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-ink-2">
            I played my first PDGA tournament in {fmtMonthLong(stats.firstEventDate)}, and my first rating was an{" "}
            {stats.firstRating.rating}. Since then I&rsquo;ve worked my way up through the amateur divisions, won{" "}
            {numberWord(stats.wins)} tournaments, and now play {stats.division}, the pro division.
            {thousand ? (
              <>
                {" "}
                In {fmtMonthLong(thousand.date)} I threw my first 1000-rated round: a {thousand.rating}
                {thousand.official ? "" : ", still unofficial"}.
              </>
            ) : null}
          </p>
          <a
            href={pdga.url}
            target="_blank"
            rel="noreferrer"
            className="link mt-6 inline-flex items-center gap-1.5 text-[0.95rem]"
          >
            My PDGA profile <ArrowUpRight size={15} />
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-3 self-start sm:gap-4 lg:col-span-7">
          <Tile label="Rating" value={stats.rating} note={<Delta value={stats.gain} after="since my first rating" />} />
          <ShowUntil
            until={projection.date}
            builtOn={builtOn}
            fallback={<Tile label="Peak rating" value={stats.peak.rating} note={fmtMonth(stats.peak.date)} />}
          >
            <Tile
              label="Next update"
              value={`~${projection.rating}`}
              note={<Delta value={projection.change} after={`projected for ${fmtDayShort(projection.date)}`} />}
            />
          </ShowUntil>
          <Tile
            label="Best round"
            value={best.rating}
            note={`${best.event}, ${fmtMonth(best.date)}${best.official ? "" : " (unofficial)"}`}
          />
          <Tile label="Tournaments" value={stats.events} note={`${stats.wins} wins · ${stats.podiums} podiums`} />
        </dl>
      </div>

      <div className="border-t border-rule/70 px-4 py-7 sm:px-10 sm:py-9">
        <RatingChart model={chart} builtOn={builtOn} />
      </div>

      <div className="grid gap-12 border-t border-rule/70 p-6 sm:p-10 lg:grid-cols-12">
        <ShowUntil until={projection.date} builtOn={builtOn}>
          <NextUpdate className="lg:col-span-5" />
        </ShowUntil>
        <Milestones builtOn={builtOn} className="lg:col-span-7" />
      </div>

      <p className="border-t border-rule/70 px-6 py-4 font-mono text-[0.68rem] leading-relaxed text-ink-3 sm:px-10">
        From pdga.com · official ratings as of {fmtDay(stats.ratingDate)} · results through {fmtDay(stats.resultsThrough)} ·
        XC-tier events (usually doubles) aren&rsquo;t shown
      </p>
    </article>
  );
}

function Tile({ label, value, note }: { label: string; value: ReactNode; note: ReactNode }) {
  return (
    <div className="rounded-2xl border border-rule/80 bg-paper/60 p-4 sm:p-5">
      <dt className="text-[0.82rem] text-ink-3">{label}</dt>
      <dd className="mt-2.5 text-[clamp(1.9rem,3.4vw,2.5rem)] font-semibold leading-none tracking-[-0.02em] text-ink">
        {value}
      </dd>
      <dd className="mt-2.5 text-[0.8rem] leading-snug text-ink-3">{note}</dd>
    </div>
  );
}

/** A change with direction shown by arrow and word, not color alone. */
function Delta({ value, after }: { value: number; after: string }) {
  return (
    <span>
      <span className={cn("font-medium", value > 0 ? "text-pine" : value < 0 ? "text-accent-ink" : "text-ink-2")}>
        <span aria-hidden="true">{value > 0 ? "▲ " : value < 0 ? "▼ " : ""}</span>
        {signed(value)}
      </span>{" "}
      {after}
    </span>
  );
}

function NextUpdate({ className }: { className?: string }) {
  const groups = [
    { sign: "+", label: "New rounds", note: null, items: projection.newRounds },
    { sign: "−", label: "Aging out", note: "More than 12 months older than my newest round.", items: projection.agingOut },
    { sign: "×", label: "Left out as outliers", note: "Too far below my other rounds to count.", items: projection.dropped },
  ].filter((g) => g.items.length);

  return (
    <section aria-labelledby="next-update-title" className={className}>
      <p className="eyebrow">Next ratings update</p>
      <h4 id="next-update-title" className="mt-3 text-[1.4rem] font-semibold tracking-[-0.01em] text-ink">
        ~{projection.rating} on {fmtDayShort(projection.date)}{" "}
        <span className="text-[1rem]">
          <Delta value={projection.change} after="" />
        </span>
      </h4>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
        Projected from the {projection.counted} rounds that should count
        {projection.doubled ? `, with the newest ${projection.doubled} counting double` : ""}. PDGA publishes updates on
        the second Tuesday of each month.
      </p>
      <ul className="mt-5 space-y-4">
        {groups.map((g) => (
          <li key={g.label} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-rule font-mono text-[0.7rem] text-ink-2"
            >
              {g.sign}
            </span>
            <div className="min-w-0 text-[0.9rem]">
              <p className="font-medium text-ink">{g.label}</p>
              <ul className="mt-1 space-y-0.5 text-ink-2">
                {g.items.map((it) => (
                  <li key={it.eventId} className="flex flex-wrap gap-x-2">
                    <span>{it.event}</span>
                    <span className="font-mono text-[0.8rem] tabular-nums text-ink-3">{it.ratings.join(" · ")}</span>
                  </li>
                ))}
              </ul>
              {g.note ? <p className="mt-1 text-[0.8rem] text-ink-3">{g.note}</p> : null}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[0.8rem] leading-relaxed text-ink-3">
        An estimate from PDGA&rsquo;s published formula. Run against my history, it matched {modelCheck.exact} of the
        last {modelCheck.updates} official updates exactly and {modelCheck.withinOne} within a point.
      </p>
    </section>
  );
}

const holeTone: Record<NonNullable<Milestone["tone"]> | "default", string> = {
  default: "border-rule text-ink-2",
  win: "border-accent bg-accent text-on-accent",
  unofficial: "border-accent text-accent-ink",
  next: "border-dashed border-ink-3 text-ink-3",
};

function Milestones({ builtOn, className }: { builtOn: string; className?: string }) {
  const next = pdga.profile.nextEvent;
  return (
    <section aria-labelledby="milestones-title" className={className}>
      <p id="milestones-title" className="eyebrow">
        Along the way
      </p>
      <ol className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {milestones.map((m, i) => {
          const item = (
            <li key={m.key} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[0.68rem]",
                  holeTone[m.tone ?? "default"],
                )}
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-3">{fmtMonth(m.date)}</p>
                <p className="mt-0.5 font-medium leading-snug text-ink">{m.title}</p>
                <p className="text-[0.85rem] leading-snug text-ink-3">{m.detail}</p>
              </div>
            </li>
          );
          return m.tone === "next" && next ? (
            <ShowUntil key={m.key} until={next.end} builtOn={builtOn}>
              {item}
            </ShowUntil>
          ) : (
            item
          );
        })}
      </ol>
    </section>
  );
}
