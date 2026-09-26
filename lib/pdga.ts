import data from "@/data/pdga.json";
import {
  DAY,
  divisionRank,
  fmtDayShort,
  fmtMonth,
  isPro,
  ordinal,
  shortEventName,
  toIso,
  toTime,
} from "./pdga-format";

/*
 * My PDGA record, from data/pdga.json (refresh it with `pnpm pdga:sync`).
 * Everything here is derived at build time: headline stats, the rating chart's
 * model, milestones, and a projection of the next monthly ratings update.
 */

export type PdgaRound = {
  round: number | null;
  score: number | null;
  rating: number | null;
  holes: number;
  /** PDGA's "Included" flag for the current rating (official rounds only). */
  counted?: boolean;
};

export type PdgaEvent = {
  id: number;
  name: string;
  division: string;
  tier: string;
  start: string;
  end: string;
  place: number | null;
  points: number;
  prize: number;
  win: boolean;
  dnf?: boolean;
  /** Still in progress or not yet on my results list. */
  live?: boolean;
  ratings: "official" | "unofficial" | "none";
  rounds: PdgaRound[];
};

export type PdgaData = {
  player: number;
  url: string;
  syncedAt: string;
  profile: {
    name: string;
    location: string;
    classification: string;
    memberSince: number | null;
    rating: number;
    ratingDate: string | null;
    ratingChange: number | null;
    careerEvents: number | null;
    careerWins: number | null;
    careerEarnings: number;
    nextEvent: { id: number | null; name: string; location: string; start: string; end: string } | null;
  };
  ratings: { date: string; rating: number; rounds: number | null }[];
  events: PdgaEvent[];
};

export const pdga = data as PdgaData;

// ---------------------------------------------------------------------------
// The ratings formula

export type RatedRound = {
  key: string;
  eventId: number;
  event: string;
  date: string;
  t: number;
  /** When the event ended; decides which monthly update a round makes. */
  end: number;
  round: number;
  rating: number;
  holes: number;
  official: boolean;
};

export type RatingResult = {
  rating: number;
  exact: number;
  windowStart: number;
  /** Rounds that count, newest first. */
  counted: RatedRound[];
  /** Rounds in the window but dropped as outliers. */
  dropped: RatedRound[];
  /** The newest quarter of counted rounds, which count twice. */
  doubled: RatedRound[];
};

const weight = (r: RatedRound) => r.holes / 18;
const average = (rounds: RatedRound[]) =>
  rounds.reduce((sum, r) => sum + r.rating * weight(r), 0) / rounds.reduce((sum, r) => sum + weight(r), 0);
const deviation = (rounds: RatedRound[]) => {
  const mean = average(rounds);
  const total = rounds.reduce((sum, r) => sum + weight(r), 0);
  return Math.sqrt(rounds.reduce((sum, r) => sum + weight(r) * (r.rating - mean) ** 2, 0) / total);
};

/**
 * PDGA's published rules (pdga.com/faq/ratings/how-is-your-rating-calculated), with the
 * details the docs leave open filled in by backtesting against my official history:
 *
 * - Use rounds from the 12 months before the most recent rated round. With fewer than
 *   8 there, use the latest 8 from the last 24 months.
 * - With at least 7 rounds, drop any round more than 2.5 standard deviations or 100
 *   points (whichever is smaller) below the average of the other rounds.
 * - With at least 9 rounds left, the newest quarter (rounded up) count double.
 * - Weight every round by holes / 18, so a 27-hole round counts 1.5×.
 */
export function rateRounds(rounds: RatedRound[]): RatingResult | null {
  // Newest first; for rounds on the same day, the order PDGA's numbers match best.
  const sorted = [...rounds].sort((a, b) => b.t - a.t || a.round - b.round);
  if (!sorted.length) return null;
  const latest = sorted[0].t;
  const windowStart = latest - 366 * DAY;
  const lastYear = sorted.filter((r) => r.t >= windowStart);
  const window = lastYear.length >= 8 ? lastYear : sorted.filter((r) => r.t >= latest - 731 * DAY).slice(0, 8);

  const dropped =
    window.length >= 7
      ? window.filter((r) => {
          const others = window.filter((o) => o !== r);
          return average(others) - r.rating > Math.min(2.5 * deviation(others), 100);
        })
      : [];
  const counted = window.filter((r) => !dropped.includes(r));
  const doubled = counted.length >= 9 ? counted.slice(0, Math.ceil(counted.length / 4)) : [];
  const exact = average([...counted, ...doubled]);
  return { rating: Math.round(exact), exact, windowStart, counted, dropped, doubled };
}

// ---------------------------------------------------------------------------
// Events and rounds

/** XC-tier events are usually doubles, and PDGA leaves them out of career totals. */
const counted = pdga.events.filter((e) => e.tier !== "XC");

export const rounds: RatedRound[] = counted.flatMap((e) =>
  e.rounds.flatMap((r, i) =>
    r.rating == null
      ? []
      : [
          {
            key: `${e.id}-${r.round ?? i + 1}`,
            eventId: e.id,
            event: shortEventName(e.name),
            date: e.start,
            t: toTime(e.start),
            end: toTime(e.end),
            round: r.round ?? i + 1,
            rating: r.rating,
            holes: r.holes || 18,
            official: e.ratings === "official",
          },
        ],
  ),
);

const history = pdga.ratings.map((r) => ({ ...r, t: toTime(r.date) }));

/** The official rating in effect on a given day, if I had one yet. */
export function ratingOn(t: number) {
  let rating: number | null = null;
  for (const h of history) if (h.t <= t) rating = h.rating;
  return rating;
}

// ---------------------------------------------------------------------------
// Next update

/** Ratings updates publish on the second Tuesday of each month. */
function secondTuesday(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  return Date.UTC(year, month, 1 + ((2 - first + 7) % 7) + 7);
}

function nextUpdateAfter(t: number) {
  const d = new Date(t);
  for (let i = 0; i < 3; i++) {
    const candidate = secondTuesday(d.getUTCFullYear(), d.getUTCMonth() + i);
    if (candidate > t) return candidate;
  }
  throw new Error("unreachable");
}

const lastUpdate = history.at(-1)!;
const nextUpdate = nextUpdateAfter(Math.max(lastUpdate.t, toTime(pdga.syncedAt.slice(0, 10))));
/** Tournament directors' reports are due the Sunday before an update. */
const reportCutoff = nextUpdate - 2 * DAY;

const officialModel = rateRounds(rounds.filter((r) => r.official))!;
const nextModel = rateRounds(rounds.filter((r) => r.end <= reportCutoff))!;

/** Which official rounds count today, per PDGA itself. */
const countedNow = new Set(
  counted.flatMap((e) => e.rounds.flatMap((r, i) => (r.counted ? [`${e.id}-${r.round ?? i + 1}`] : []))),
);

const byEvent = (list: RatedRound[]) => {
  const groups = new Map<number, { event: string; eventId: number; date: string; ratings: number[] }>();
  for (const r of [...list].sort((a, b) => a.t - b.t || a.round - b.round)) {
    const g = groups.get(r.eventId) ?? { event: r.event, eventId: r.eventId, date: r.date, ratings: [] };
    g.ratings.push(r.rating);
    groups.set(r.eventId, g);
  }
  return Array.from(groups.values());
};

/**
 * Projected next update: my official rating plus the change the formula predicts from
 * rounds played since. Using the change (not the raw model output) keeps the model's
 * small rounding differences from showing up as a fake move.
 */
export const projection = (() => {
  const nextKeys = new Set(nextModel.counted.map((r) => r.key));
  const rating = Math.round(pdga.profile.rating + nextModel.exact - officialModel.exact);
  return {
    date: toIso(nextUpdate),
    cutoff: toIso(reportCutoff),
    rating,
    change: rating - pdga.profile.rating,
    counted: nextModel.counted.length,
    doubled: nextModel.doubled.length,
    newRounds: byEvent(nextModel.counted.filter((r) => !r.official)),
    agingOut: byEvent(rounds.filter((r) => countedNow.has(r.key) && !nextKeys.has(r.key) && r.t < nextModel.windowStart)),
    dropped: byEvent(nextModel.dropped),
  };
})();

/** How well the formula reproduces past official updates (rounds reported by each cutoff). */
export const modelCheck = (() => {
  const recent = history.slice(-12);
  const errors = recent.map((h) => {
    const model = rateRounds(rounds.filter((r) => r.official && r.end <= h.t - 2 * DAY));
    return model ? Math.abs(model.rating - h.rating) : Infinity;
  });
  return { updates: recent.length, exact: errors.filter((e) => e === 0).length, withinOne: errors.filter((e) => e <= 1).length };
})();

// ---------------------------------------------------------------------------
// Headline numbers

const firstRating = history[0];
const peak = history.reduce((best, h) => (h.rating > best.rating ? h : best));
const bestRound = rounds.reduce((best, r) => (r.rating > best.rating || (r.rating === best.rating && r.t < best.t) ? r : best));
const firstEvent = counted[0];
const latestEvent = counted.at(-1)!;

export const stats = {
  rating: pdga.profile.rating,
  ratingDate: pdga.profile.ratingDate ?? lastUpdate.date,
  firstRating: { rating: firstRating.rating, date: firstRating.date },
  gain: pdga.profile.rating - firstRating.rating,
  peak: { rating: peak.rating, date: peak.date },
  bestRound,
  events: pdga.profile.careerEvents ?? counted.filter((e) => !e.live).length,
  wins: pdga.profile.careerWins ?? counted.filter((e) => e.win).length,
  podiums: counted.filter((e) => !e.live && e.place != null && e.place <= 3).length,
  firstDivision: firstEvent.division,
  division: latestEvent.division,
  firstEventDate: firstEvent.start,
  /** The most recent day with results in the data. */
  resultsThrough: pdga.events.reduce((latest, e) => (e.end > latest ? e.end : latest), firstEvent.end),
};

// ---------------------------------------------------------------------------
// Milestones

export type Milestone = {
  key: string;
  date: string;
  title: string;
  detail: string;
  tone?: "win" | "unofficial" | "next";
};

export const milestones: Milestone[] = (() => {
  const list: Milestone[] = [];
  const done = counted.filter((e) => !e.live || e.ratings !== "none");

  list.push({
    key: "first-event",
    date: firstEvent.start,
    title: "First tournament",
    detail: `${shortEventName(firstEvent.name)}, ${firstEvent.division}`,
  });

  let best = divisionRank(firstEvent.division);
  for (const e of done) {
    const rank = divisionRank(e.division);
    if (rank <= best) continue;
    best = rank;
    list.push({
      key: `division-${e.division}`,
      date: e.start,
      title: isPro(e.division) ? `First ${e.division} event` : `Moved up to ${e.division}`,
      detail: shortEventName(e.name),
    });
  }

  for (const threshold of [900, 950, 1000]) {
    const hit = history.find((h) => h.rating >= threshold);
    if (hit && firstRating.rating < threshold) {
      list.push({ key: `rated-${threshold}`, date: hit.date, title: `Rated ${threshold}+`, detail: `Official rating: ${hit.rating}` });
    }
  }

  const firstWin = done.find((e) => e.win);
  if (firstWin) {
    list.push({ key: "first-win", date: firstWin.start, title: "First win", detail: `${shortEventName(firstWin.name)}, ${firstWin.division}`, tone: "win" });
  }
  const proWin = done.find((e) => e.win && isPro(e.division));
  if (proWin) {
    list.push({ key: "pro-win", date: proWin.start, title: "First pro win", detail: shortEventName(proWin.name), tone: "win" });
  }
  const proCash = done.find((e) => isPro(e.division) && e.prize > 0);
  if (proCash?.place) {
    list.push({ key: "pro-cash", date: proCash.start, title: "First pro cash", detail: `${ordinal(proCash.place)} at ${shortEventName(proCash.name)}` });
  }
  const dgpt = done.find((e) => /\bDGPT\b/.test(e.name));
  if (dgpt) list.push({ key: "dgpt", date: dgpt.start, title: "First DGPT event", detail: shortEventName(dgpt.name) });

  if (peak !== firstRating) {
    list.push({ key: "peak", date: peak.date, title: "Peak rating", detail: `Official rating: ${peak.rating}` });
  }

  const thousand = [...rounds].sort((a, b) => a.t - b.t).find((r) => r.rating >= 1000);
  if (thousand) {
    list.push({
      key: "first-1000",
      date: thousand.date,
      title: "First 1000-rated round",
      detail: `${thousand.rating} at ${thousand.event}${thousand.official ? "" : " (unofficial)"}`,
      tone: thousand.official ? undefined : "unofficial",
    });
  }

  const next = pdga.profile.nextEvent;
  if (next) {
    list.push({ key: "next", date: next.start, title: "Up next", detail: `${shortEventName(next.name)}, ${next.location}`, tone: "next" });
  }

  const order = (m: Milestone) => (m.tone === "next" ? 1 : 0);
  return list.sort((a, b) => order(a) - order(b) || a.date.localeCompare(b.date));
})();

// ---------------------------------------------------------------------------
// Chart model (plain data, so the client component can import it)

export type ChartEvent = {
  id: number;
  t: number;
  date: string;
  name: string;
  division: string;
  tier: string;
  place: number | null;
  win: boolean;
  podium: boolean;
  cashed: boolean;
  dnf: boolean;
  live: boolean;
  ratings: PdgaEvent["ratings"];
  rounds: number[];
  /** My official rating going into the event. */
  ratingIn: number | null;
};

const chartEvents: ChartEvent[] = counted.map((e) => ({
  id: e.id,
  t: toTime(e.start),
  date: e.start,
  name: shortEventName(e.name),
  division: e.division,
  tier: e.tier,
  place: e.place,
  win: e.win,
  podium: !e.live && e.place != null && e.place <= 3,
  cashed: isPro(e.division) && e.prize > 0,
  dnf: Boolean(e.dnf),
  live: Boolean(e.live),
  ratings: e.ratings,
  rounds: e.rounds.flatMap((r) => (r.rating == null ? [] : [r.rating])),
  ratingIn: ratingOn(toTime(e.start) - 1),
}));

const synced = toTime(pdga.syncedAt.slice(0, 10));
const allRatings = [...history.map((h) => h.rating), ...rounds.map((r) => r.rating), projection.rating];
const yMin = Math.floor((Math.min(...allRatings) - 6) / 25) * 25;
const yMax = Math.ceil((Math.max(...allRatings) + 6) / 25) * 25;
const x0 = chartEvents[0].t - 30 * DAY;
const x1 = Math.max(nextUpdate, synced) + 24 * DAY;

export const chart = {
  x0,
  x1,
  y0: yMin,
  y1: yMax,
  yTicks: Array.from({ length: Math.floor((yMax - yMin) / 50) + 1 }, (_, i) => Math.ceil(yMin / 50) * 50 + i * 50).filter(
    (v) => v >= yMin && v <= yMax,
  ),
  years: Array.from(
    { length: new Date(x1).getUTCFullYear() - new Date(x0).getUTCFullYear() },
    (_, i) => new Date(x0).getUTCFullYear() + 1 + i,
  ).map((y) => ({ t: Date.UTC(y, 0, 1), label: String(y) })),
  /** Top lane first, so the climb reads bottom-left to top-right. */
  lanes: Array.from(new Set(chartEvents.map((e) => e.division))).sort((a, b) => divisionRank(b) - divisionRank(a)),
  history: history.map(({ t, date, rating, rounds: count }) => ({ t, date, rating, rounds: count })),
  events: chartEvents,
  /** The official line runs to the sync date; the projection picks up from there. */
  syncedT: synced,
  current: { rating: pdga.profile.rating, date: stats.ratingDate },
  peak: { t: toTime(peak.date), rating: peak.rating },
  best: { t: bestRound.t, rating: bestRound.rating, official: bestRound.official },
  projection: { t: nextUpdate, date: toIso(nextUpdate), rating: projection.rating },
};

export type ChartModel = typeof chart;

// ---------------------------------------------------------------------------
// The shell's `pdga` command

export function shellSummary(today: string) {
  const ticks = "▁▂▃▄▅▆▇█";
  const values = history.map((h) => h.rating);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const spark = values.map((v) => ticks[Math.round(((v - lo) / (hi - lo || 1)) * 7)]).join("");
  const next = pdga.profile.nextEvent;
  const rows: [string, string][] = [
    ["rating", `${stats.rating} (peak ${stats.peak.rating}, first ${stats.firstRating.rating})`],
    ["history", `${spark}  ${fmtMonth(firstRating.date).toLowerCase()} → ${fmtMonth(lastUpdate.date).toLowerCase()}`],
    ["record", `${stats.events} events · ${stats.wins} wins · ${stats.podiums} podiums`],
    [
      "best",
      `${bestRound.rating} (${bestRound.event}, ${fmtMonth(bestRound.date)}${bestRound.official ? "" : ", unofficial"})`,
    ],
  ];
  if (today <= projection.date) {
    const sign = projection.change > 0 ? "+" : "";
    rows.push(["next", `~${projection.rating} (${sign}${projection.change}) at the ${fmtDayShort(projection.date)} update`]);
  }
  if (next && today <= next.end) rows.push(["up next", `${shortEventName(next.name)}, ${fmtDayShort(next.start)}`]);
  return [
    `${pdga.profile.name} · PDGA #${pdga.player} · ${stats.division}`,
    ...rows.map(([k, v]) => `${k.padEnd(8)} ${v}`),
    "",
    "full profile: open pdga",
  ].join("\n");
}
