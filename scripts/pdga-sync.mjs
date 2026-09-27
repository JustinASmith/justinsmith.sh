#!/usr/bin/env node
/**
 * Refreshes data/pdga.json from my public PDGA pages.
 *
 *   pnpm pdga:sync                  fetch from pdga.com
 *   pnpm pdga:sync --from <dir>     parse pages saved earlier (player.html, history.html,
 *                                   details.html, wins.html, stats-<year>.html, event-<id>.html)
 *   pnpm pdga:sync --dry-run        parse and check everything, but don't write the file
 *   pnpm pdga:sync --changes <file>  also write a Markdown summary of what changed (for the sync PR)
 *
 * Official round ratings come from the player's ratings detail page. Rounds played
 * since the last monthly ratings update only have unofficial ratings, and those live
 * on each tournament's own page, so the sync also reads the page of every recent
 * result (and any event the profile says I'm playing right now) to pick them up.
 *
 * pdga.com's robots.txt asks for 10 seconds between requests, so a full sync takes
 * a couple of minutes. The file is only rewritten when the data itself changed, so
 * running this on a schedule won't churn commits.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { parse } from "node-html-parser";

const PLAYER = 200786;
const ORIGIN = "https://www.pdga.com";
const OUT = new URL("../data/pdga.json", import.meta.url);
const CRAWL_DELAY_MS = 10_000;
const USER_AGENT = "justinsmith.sh pdga-sync (+https://justinsmith.sh)";

const { values: args } = parseArgs({
  options: {
    from: { type: "string" },
    "dry-run": { type: "boolean", default: false },
    changes: { type: "string" },
  },
});

// ---------------------------------------------------------------------------
// Fetching (politely) or reading saved pages

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let lastRequest = 0;

async function fetchPage(path) {
  const wait = lastRequest + CRAWL_DELAY_MS - Date.now();
  if (lastRequest && wait > 0) await sleep(wait);
  console.log(`  GET ${path}`);
  try {
    const res = await fetch(ORIGIN + path, { headers: { "user-agent": USER_AGENT, accept: "text/html" } });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    lastRequest = Date.now();
  }
}

const PATHS = {
  player: `/player/${PLAYER}`,
  history: `/player/${PLAYER}/history`,
  details: `/player/${PLAYER}/details`,
  wins: `/player/${PLAYER}/wins`,
};

const pathFor = (name) =>
  PATHS[name] ??
  (name.startsWith("event-") ? `/tour/event/${name.slice(6)}` : `/player/${PLAYER}/stats/${name.replace("stats-", "")}`);

async function load(name) {
  const html = args.from ? await readFile(join(args.from, `${name}.html`), "utf8") : await fetchPage(pathFor(name));
  return parse(html);
}

/** Like load(), but a missing or failed page is a warning rather than a failed sync. */
async function loadOptional(name, warnings) {
  try {
    return await load(name);
  } catch (error) {
    warnings.push(`skipped ${pathFor(name)}: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Parsing helpers

const text = (el) => (el?.text ?? "").replace(/\s+/g, " ").trim();

const int = (value) => {
  const n = Number.parseInt(String(value ?? "").replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
};

const money = (value) => Number(String(value ?? "").replace(/[^\d.]/g, "")) || 0;

const eventId = (href) => int(href?.match(/\/tour\/event\/(\d+)/)?.[1]);

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** "20-Aug-2022", "15-Sep to 17-Sep-2023", or "28-Dec-2025 to 02-Jan-2026" → ISO start and end dates. */
function parseDates(value) {
  const m = value.match(/^(\d{1,2})-([a-z]{3})(?:-(\d{4}))?(?:\s+to\s+(\d{1,2})-([a-z]{3})-(\d{4}))?$/i);
  const month1 = MONTHS.indexOf(m?.[2]?.toLowerCase()) + 1;
  const month2 = m?.[5] ? MONTHS.indexOf(m[5].toLowerCase()) + 1 : month1;
  const endYear = Number(m?.[6] ?? m?.[3]);
  if (!m || !month1 || !month2 || !endYear) throw new Error(`Unrecognized PDGA date: "${value}"`);
  const startYear = m[3] ? Number(m[3]) : month1 > month2 ? endYear - 1 : endYear;
  const start = iso(startYear, month1, m[1]);
  return { start, end: m[4] ? iso(endYear, month2, m[4]) : start };
}

// ---------------------------------------------------------------------------
// Pages

function parseProfile(doc) {
  const info = doc.querySelector("ul.player-info");
  if (!info) throw new Error("Couldn't find the player info list on the profile page.");
  // Everything after the "Label:" in a list item.
  const field = (cls) => {
    const li = info.querySelector(`li.${cls}`);
    return li ? text(li).slice(text(li.querySelector("strong")).length).trim() : "";
  };
  const upcoming = (cls) => {
    const a = info.querySelector(`li.${cls} a`);
    if (!a) return null;
    const name = text(a);
    // title="<name> in <City, ST> on <dates>"
    const where = (a.getAttribute("title") ?? "").slice(name.length).match(/^ in (.+) on (.+)$/);
    if (!where) return null;
    return { id: eventId(a.getAttribute("href")), name, location: where[1], ...parseDates(where[2]) };
  };
  const ratingDate = text(info.querySelector("li.current-rating small.rating-date")).match(/\d{1,2}-[a-z]{3}-\d{4}/i)?.[0];

  return {
    name: text(doc.querySelector("h1#page-title")).replace(/\s*#\d+$/, ""),
    location: text(info.querySelector("li.location a")),
    classification: field("classification"),
    memberSince: int(field("join-date")),
    rating: int(field("current-rating").match(/^\d+/)?.[0]),
    ratingDate: ratingDate ? parseDates(ratingDate).start : null,
    ratingChange: int(text(info.querySelector("li.current-rating a.rating-difference"))),
    careerEvents: int(field("career-events")),
    careerWins: int(field("career-wins")),
    careerEarnings: money(field("career-earnings")),
    nextEvent: upcoming("next-event"),
  };
}

/** Tournament results, one table per division. Returns the season the page shows. */
function parseResults(doc) {
  const heading = doc.querySelectorAll("h3").map(text).find((t) => /Season Totals$/i.test(t));
  const season = int(heading?.match(/^\d{4}/)?.[0]);
  const results = [];
  for (const table of doc.querySelectorAll('table[id^="player-results-"]')) {
    const division = table.id.replace("player-results-", "").toUpperCase();
    if (division === "HISTORY" || division === "DETAILS") continue;
    for (const tr of table.querySelectorAll("tbody tr")) {
      const cell = (cls) => tr.querySelector(`td.${cls}`);
      const link = cell("tournament")?.querySelector("a");
      results.push({
        id: eventId(link?.getAttribute("href")),
        name: text(link),
        division,
        tier: text(cell("tier")),
        ...parseDates(text(cell("dates"))),
        place: int(text(cell("place"))),
        points: Number(text(cell("points"))) || 0,
        prize: money(text(cell("prize"))),
      });
    }
  }
  return { season, results };
}

function parseHistory(doc) {
  return doc
    .querySelectorAll("#player-results-history tbody tr")
    .map((tr) => ({
      date: parseDates(text(tr.querySelector("td.date"))).start,
      rating: int(text(tr.querySelector("td.player-rating"))),
      rounds: int(text(tr.querySelector("td.round"))),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Layout tooltips read like "Course - Tees; 18 holes; Par 56; 6,110 ft." Longer layouts count for more. */
const holesFor = (doc, event, division, round) =>
  int(text(doc.querySelector(`#layout-details-${event}-${division}-round-${round}`)).match(/(\d+) holes/)?.[1]) ?? 18;

/** Officially rated rounds. `counted` mirrors the page's "Included" column for the current rating. */
function parseRounds(doc) {
  return doc.querySelectorAll("#player-results-details tbody tr").map((tr) => {
    const event = eventId(tr.querySelector("td.tournament a")?.getAttribute("href"));
    const division = text(tr.querySelector("td.division"));
    const round = int(text(tr.querySelector("td.round")));
    return {
      event,
      division,
      round,
      score: int(text(tr.querySelector("td.score"))),
      rating: int(text(tr.querySelector("td.round-rating"))),
      holes: holesFor(doc, event, division, round),
      counted: text(tr.querySelector("td.included")) === "Yes",
    };
  });
}

function parseWins(doc) {
  return new Set(doc.querySelectorAll("#player-wins td.tournament a").map((a) => eventId(a.getAttribute("href"))));
}

/** Events the profile says I'm playing right now. They show up on the results list once the TD reports them. */
function parseNowPlaying(doc) {
  return doc.querySelectorAll("ul.player-info li.current-events a").map((a) => eventId(a.getAttribute("href"))).filter(Boolean);
}

/** My row on a tournament's own page, which carries unofficial round ratings before the monthly update. */
function parseEventPage(doc, id) {
  const row = doc
    .querySelectorAll("table.results tbody tr")
    .find((tr) => text(tr.querySelector("td.pdga-number")) === String(PLAYER));
  if (!row) return null;
  const division = row.closest("details")?.querySelector("h3.division")?.id ?? "";
  const rounds = row.querySelectorAll("td.round").map((td, i) => {
    const round = int(td.querySelector("a")?.getAttribute("href")?.match(/round=(\d+)/)?.[1]) ?? i + 1;
    const score = int(text(td));
    const next = td.nextElementSibling;
    return {
      round,
      // PDGA records a DNF round with a placeholder score of 888 (or 999).
      score: score != null && score < 888 ? score : null,
      rating: next?.classList.contains("round-rating") ? int(text(next)) : null,
      holes: holesFor(doc, id, division, round),
    };
  });
  return {
    name: text(doc.querySelector("h1#page-title")),
    division,
    tier: text(doc.querySelector(".pane-tournament-event-info h4")).match(/\b(XA|XB|XC|A|B|C|L)-Tier\b/i)?.[1].toUpperCase() ?? "",
    ...parseDates(text(doc.querySelector("li.tournament-date")).replace(/^Date:\s*/i, "")),
    place: int(text(row.querySelector("td.place"))),
    prize: money(text(row.querySelector("td.prize"))),
    dnf: /DNF/i.test(text(row.querySelector("td.total"))),
    rounds,
  };
}

// ---------------------------------------------------------------------------
// Checks: refuse to write anything that looks like a parsing failure.

function check(data, wins) {
  const problems = [];
  const warnings = [];
  const { profile, ratings, events } = data;
  const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d ?? "");

  if (!profile.name) problems.push("missing player name");
  if (!(profile.rating >= 400 && profile.rating <= 1200)) problems.push(`implausible rating: ${profile.rating}`);
  if (!ratings.length) problems.push("no rating history");
  for (const r of ratings) {
    if (!isDate(r.date) || !(r.rating >= 400 && r.rating <= 1200)) problems.push(`bad rating row: ${JSON.stringify(r)}`);
  }
  if (!events.length) problems.push("no tournament results");
  for (const e of events) {
    if (!e.id || !e.name || !/^[A-Z]+\d*$/.test(e.division) || !isDate(e.start) || !isDate(e.end)) {
      problems.push(`bad result row: ${JSON.stringify(e)}`);
    }
  }
  if (profile.careerEvents != null && events.length < profile.careerEvents) {
    problems.push(`found ${events.length} results, but PDGA reports ${profile.careerEvents} career events`);
  }
  const ids = new Set(events.map((e) => e.id));
  for (const id of wins) if (!ids.has(id)) problems.push(`win at event ${id} has no matching result`);

  if (profile.careerWins != null && wins.size !== profile.careerWins) {
    warnings.push(`the wins page lists ${wins.size} wins, but the profile says ${profile.careerWins}`);
  }
  const latest = ratings.at(-1);
  if (latest && latest.rating !== profile.rating) {
    warnings.push(`latest history rating (${latest.rating}) differs from the profile rating (${profile.rating})`);
  }
  return { problems, warnings };
}

/** Pretty JSON, but one line per rating and per event so monthly diffs stay readable. */
function format(data) {
  const rows = (list) => `[\n${list.map((item) => `    ${JSON.stringify(item)}`).join(",\n")}\n  ]`;
  return `${JSON.stringify({ ...data, ratings: "__RATINGS__", events: "__EVENTS__" }, null, 2)
    .replace('"__RATINGS__"', () => rows(data.ratings))
    .replace('"__EVENTS__"', () => rows(data.events))}\n`;
}

// ---------------------------------------------------------------------------
// What changed, in words, for the pull request the scheduled sync opens.

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (d) => (d ? `${MONTH_NAMES[Number(d.slice(5, 7)) - 1]} ${Number(d.slice(8, 10))}, ${d.slice(0, 4)}` : "unknown date");
const ordinal = (n) => {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  return `${n}${teen ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th")}`;
};

/** Same trimming as shortEventName() in lib/pdga-format.ts: drop sponsors and "Annual". */
const shortName = (name) =>
  name
    .replace(/\s+(?:presented|sponsored|powered)\s+by\b.*$/i, "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/^The\s+/i, "")
    .replace(/\b(\d+(?:st|nd|rd|th))\s+Annual\s+/i, "$1 ")
    .replace(/\s*-\s+/g, " – ")
    .replace(/\s+/g, " ")
    .trim();

function describeChanges(before, after) {
  if (!before) return ["First snapshot."];
  const lines = [];
  const was = before.profile;
  const now = after.profile;
  if (was.ratingDate !== now.ratingDate || was.rating !== now.rating) {
    lines.push(
      was.rating === now.rating
        ? `Official rating unchanged at ${now.rating} (${fmtDate(now.ratingDate)} update)`
        : `Official rating: ${was.rating} → ${now.rating} (${fmtDate(now.ratingDate)} update)`,
    );
  }

  const rated = (e) => e.rounds.filter((r) => r.rating != null).map((r) => r.rating);
  const list = (ratings) => (ratings.length ? ratings.join(" and ") : "none");
  const label = (e) => `${shortName(e.name)} (${e.division}, ${fmtDate(e.start)})`;
  const place = (p) => (p ? ordinal(p) : "none");
  const old = new Map(before.events.map((e) => [e.id, e]));
  for (const e of after.events) {
    const prev = old.get(e.id);
    old.delete(e.id);
    if (!prev) {
      const finish = e.dnf ? "DNF" : e.place ? ordinal(e.place) : "no place yet";
      const rounds = rated(e).length ? `round ratings ${list(rated(e))}${e.ratings === "unofficial" ? " (unofficial)" : ""}` : "no round ratings yet";
      lines.push(`New result: ${label(e)}: ${finish}, ${rounds}${e.live ? "; not reported to PDGA yet" : ""}`);
      continue;
    }
    if (prev.live && !e.live) lines.push(`Now reported to PDGA: ${label(e)}`);
    if (prev.place !== e.place) lines.push(`Place changed: ${label(e)}: ${place(prev.place)} → ${place(e.place)}`);
    if (prev.win !== e.win) lines.push(`${e.win ? "Official win" : "No longer listed as a win"}: ${label(e)}`);
    const same = JSON.stringify(rated(prev)) === JSON.stringify(rated(e));
    if (prev.ratings !== e.ratings && e.ratings === "official") {
      lines.push(`Round ratings now official: ${label(e)}: ${list(rated(e))}${same ? "" : ` (unofficially ${list(rated(prev))})`}`);
    } else if (!same) {
      lines.push(`Round ratings: ${label(e)}: ${list(rated(prev))} → ${list(rated(e))}${e.ratings === "unofficial" ? " (unofficial)" : ""}`);
    }
  }
  for (const e of old.values()) lines.push(`Removed: ${label(e)}`);

  if (now.nextEvent && now.nextEvent.id !== was.nextEvent?.id) {
    lines.push(`Up next: ${shortName(now.nextEvent.name)}, ${now.nextEvent.location} (${fmtDate(now.nextEvent.start)})`);
  }
  return lines.length ? lines : ["Only small details changed; see the diff."];
}

const changesMarkdown = (lines) =>
  `New data from my [PDGA profile](${ORIGIN}/player/${PLAYER}):\n\n${lines.map((l) => `- ${l}`).join("\n")}\n\n` +
  "Opened by the daily PDGA sync. Merging it updates the site. If the next sync finds more, it refreshes this pull request.\n";

// ---------------------------------------------------------------------------

async function main() {
  console.log(args.from ? `Reading saved pages from ${args.from}` : `Syncing PDGA #${PLAYER} (10 s between requests)`);
  const skipped = [];

  const playerDoc = await load("player");
  const profile = parseProfile(playerDoc);
  const season = parseResults(playerDoc);
  const nowPlaying = parseNowPlaying(playerDoc);
  const years = [
    ...new Set(
      playerDoc
        .querySelectorAll(`a[href^="/player/${PLAYER}/stats/"]`)
        .map((a) => int(a.getAttribute("href").split("/").pop()))
        .filter((y) => y && y !== season.season),
    ),
  ].sort();

  const history = parseHistory(await load("history"));
  const rounds = parseRounds(await load("details"));
  const wins = parseWins(await load("wins"));

  const results = [...season.results];
  for (const year of years) {
    const page = parseResults(await load(`stats-${year}`));
    if (page.season !== year) throw new Error(`Asked for the ${year} season but got ${page.season}.`);
    results.push(...page.results);
  }

  const events = results.map((e) => {
    const rated = rounds
      .filter((r) => r.event === e.id && r.division === e.division)
      .map(({ round, score, rating, holes, counted }) => ({ round, score, rating, holes, counted }))
      .sort((a, b) => a.round - b.round);
    return { ...e, win: wins.has(e.id), ratings: rated.some((r) => r.rating != null) ? "official" : "none", rounds: rated };
  });

  // Anything without official ratings yet: look for unofficial ones on the tournament page.
  // (XC-tier events are usually doubles and never rated.)
  for (const e of events.filter((e) => e.ratings === "none" && e.tier !== "XC")) {
    const page = await loadOptional(`event-${e.id}`, skipped);
    const mine = page && parseEventPage(page, e.id);
    if (!mine) continue;
    if (mine.division !== e.division) {
      skipped.push(`event ${e.id} lists me in ${mine.division || "no division"}, not ${e.division}`);
      continue;
    }
    if (mine.dnf) e.dnf = true;
    if (mine.rounds.some((r) => r.rating != null)) Object.assign(e, { ratings: "unofficial", rounds: mine.rounds });
  }

  // Events I'm playing right now aren't on the results list until the TD reports them.
  for (const id of nowPlaying.filter((id) => !events.some((e) => e.id === id))) {
    const page = await loadOptional(`event-${id}`, skipped);
    const mine = page && parseEventPage(page, id);
    if (!mine?.division) continue;
    events.push({
      id,
      ...mine,
      points: 0,
      win: false,
      live: true,
      ratings: mine.rounds.some((r) => r.rating != null) ? "unofficial" : "none",
    });
  }

  // Fixed key order keeps the file's diffs tidy.
  const record = (e) => ({
    id: e.id,
    name: e.name,
    division: e.division,
    tier: e.tier,
    start: e.start,
    end: e.end,
    place: e.place,
    points: e.points,
    prize: e.prize,
    win: e.win,
    ...(e.dnf ? { dnf: true } : {}),
    ...(e.live ? { live: true } : {}),
    ratings: e.ratings,
    rounds: e.rounds,
  });
  const sorted = events.map(record).sort((a, b) => a.start.localeCompare(b.start) || a.id - b.id);

  const orphans = rounds.filter((r) => !sorted.some((e) => e.id === r.event));
  const data = {
    player: PLAYER,
    url: `${ORIGIN}/player/${PLAYER}`,
    syncedAt: new Date().toISOString(),
    profile,
    ratings: history,
    events: sorted,
  };

  const { problems, warnings } = check(data, wins);
  warnings.push(...skipped);
  if (orphans.length) warnings.push(`${orphans.length} rated rounds don't match a listed result`);
  for (const w of warnings) console.warn(`  warning: ${w}`);
  if (problems.length) {
    for (const p of problems) console.error(`  problem: ${p}`);
    throw new Error("PDGA pages didn't parse cleanly; data/pdga.json was left alone.");
  }

  const rated = sorted.flatMap((e) => e.rounds.filter((r) => r.rating != null).map(() => e.ratings));
  const unofficial = rated.filter((r) => r === "unofficial").length;
  console.log(
    `${profile.name} · rating ${profile.rating} (as of ${profile.ratingDate}) · ${history.length} rating updates · ` +
      `${sorted.length} results · ${rated.length} rated rounds (${unofficial} unofficial) · ${wins.size} wins`,
  );

  const previous = await readFile(OUT, "utf8").then(JSON.parse, () => null);
  const withoutTimestamp = ({ syncedAt: _syncedAt, ...rest }) => JSON.stringify(rest);
  if (previous && withoutTimestamp(previous) === withoutTimestamp(data)) {
    console.log("No changes since the last sync.");
    return;
  }
  const changes = describeChanges(previous, data);
  console.log("Changes:");
  for (const line of changes) console.log(`  - ${line}`);
  if (args["dry-run"]) {
    console.log("Dry run: data/pdga.json not written.");
    return;
  }
  await writeFile(OUT, format(data));
  console.log("Wrote data/pdga.json");
  if (args.changes) await writeFile(args.changes, changesMarkdown(changes));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
