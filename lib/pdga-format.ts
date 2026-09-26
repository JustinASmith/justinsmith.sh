/*
 * Small, data-free helpers for PDGA dates, names, and divisions. Kept apart from
 * lib/pdga.ts so client components can use them without bundling the data file.
 */

export const DAY = 86_400_000;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-09-12" → UTC milliseconds. */
export const toTime = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
export const toIso = (t: number) => new Date(t).toISOString().slice(0, 10);

const parts = (iso: string) => ({ y: +iso.slice(0, 4), m: +iso.slice(5, 7) - 1, d: +iso.slice(8, 10) });
/** "Sep 2026" */
export const fmtMonth = (iso: string) => `${MONTHS[parts(iso).m]} ${parts(iso).y}`;
/** "September 2026" */
export const fmtMonthLong = (iso: string) => `${MONTHS_LONG[parts(iso).m]} ${parts(iso).y}`;
/** "Sep 12, 2026" */
export const fmtDay = (iso: string) => `${MONTHS[parts(iso).m]} ${parts(iso).d}, ${parts(iso).y}`;
/** "Sep 12" */
export const fmtDayShort = (iso: string) => `${MONTHS[parts(iso).m]} ${parts(iso).d}`;

export const ordinal = (n: number) => {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  return `${n}${teen ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th")}`;
};

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const numberWord = (n: number) => WORDS[n] ?? String(n);

/** A signed change with a real minus sign: "+6", "−3", "±0". */
export const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "±0");

/** Tournament names come with sponsors and "Annual" attached; keep the part people say out loud. */
export function shortEventName(name: string) {
  return name
    .replace(/\s+(?:presented|sponsored|powered)\s+by\b.*$/i, "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/^The\s+/i, "")
    .replace(/\b(\d+(?:st|nd|rd|th))\s+Annual\s+/i, "$1 ")
    .replace(/\s*-\s+/g, " – ")
    .replace(/\s+/g, " ")
    .trim();
}

export const isPro = (division: string) => /^[MF]P/.test(division);

/** Higher is more competitive: pro divisions, then MA1 → MA4. */
export function divisionRank(division: string) {
  if (division === "MPO" || division === "FPO") return 10;
  if (isPro(division)) return 9;
  const am = division.match(/^[MF]A(\d)$/);
  return am ? 5 - Number(am[1]) : 0;
}

export const eventUrl = (id: number) => `https://www.pdga.com/tour/event/${id}`;
