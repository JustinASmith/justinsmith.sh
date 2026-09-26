import { site } from "./site";

type Parts = { weekday: number; minutes: number; label: string; zone: string; monthDay: string };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Wall-clock time in Starkville, independent of the visitor's time zone. */
export function starkvilleNow(date = new Date()): Parts {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const hour24 = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: site.timeZone, hour: "numeric", hourCycle: "h23" }).format(date),
  );
  const minute = Number(parts.minute);
  const monthDay = new Intl.DateTimeFormat("en-US", { timeZone: site.timeZone, month: "2-digit", day: "2-digit" }).format(date);
  return {
    weekday: WEEKDAYS.indexOf(parts.weekday),
    minutes: hour24 * 60 + minute,
    label: `${parts.hour}:${parts.minute} ${parts.dayPeriod}`,
    zone: parts.timeZoneName ?? "CT",
    monthDay, // "MM/DD"
  };
}

type Slot = { until: number; text: string };

const at = (h: number, m = 0) => h * 60 + m;

// A tongue-in-cheek guess at what I'm up to. Edit freely.
const weekday: Slot[] = [
  { until: at(6), text: "Asleep, probably. Unless something's on fire." },
  { until: at(8), text: "Coffee, inbox, and a walk with Scout." },
  { until: at(12), text: "Heads-down on Origin's core product. Scout is supervising." },
  { until: at(13), text: "Lunch break. Scout wants to play." },
  { until: at(17, 30), text: "Building something at Origin." },
  { until: at(20), text: "Off the clock. Probably out throwing discs." },
  { until: at(22, 30), text: "Hanging out with my wife, or tinkering with a side project." },
  { until: at(24), text: "Asleep, probably." },
];

const weekend: Slot[] = [
  { until: at(6, 30), text: "Asleep, probably." },
  { until: at(12), text: "On a disc golf course somewhere. Maybe a tournament." },
  { until: at(17), text: "Throwing discs, or knee-deep in a DIY project." },
  { until: at(22), text: "Off the clock with my wife and Scout." },
  { until: at(24), text: "Asleep, probably." },
];

export function guessStatus(parts: Pick<Parts, "weekday" | "minutes" | "monthDay">) {
  if (parts.monthDay === "09/01" && parts.minutes >= at(7) && parts.minutes < at(22)) {
    return "Celebrating Scout's birthday. Extra treats all around.";
  }
  const slots = parts.weekday === 0 || parts.weekday === 6 ? weekend : weekday;
  return (slots.find((s) => parts.minutes < s.until) ?? slots[slots.length - 1]).text;
}
