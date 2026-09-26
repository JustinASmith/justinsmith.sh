"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { facts } from "@/lib/life";
import { site } from "@/lib/site";
import { rattleChains } from "@/lib/sfx";
import { cn } from "@/lib/utils";

type Phase = "ready" | "aiming" | "flying" | "made" | "short" | "long";
type Outcome = "made" | "short" | "long";

// A putting ladder: every make steps you back. Circle 1 ends at 10 m.
const LADDER = [
  { m: 6, window: 0.28 },
  { m: 8, window: 0.23 },
  { m: 10, window: 0.19 },
  { m: 13, window: 0.15 },
  { m: 16, window: 0.12 },
  { m: 20, window: 0.09 },
];
const SWEET = 0.6; // centre of the green window on the meter
const SWEEP_MS = 1700; // one full out-and-back of the marker

// Disc flight paths as [left%, top%] waypoints over the 600×230 scene.
const PATHS: Record<Outcome, [number, number][]> = {
  made: [
    [12, 66],
    [45, 24],
    [77, 36],
    [78, 50],
  ],
  short: [
    [12, 66],
    [36, 40],
    [63, 86],
  ],
  long: [
    [12, 66],
    [50, 10],
    [88, 22],
    [104, 70],
  ],
};

// A ragged line of pines along the far edge of the fairway.
const PINES = Array.from({ length: 46 }, (_, i) => {
  const x = i * 13.5 + ((i * 7) % 5);
  const h = 12 + ((i * 37) % 17) + (i % 4 === 0 ? 8 : 0);
  return `M${x - 6.5} 150L${x} ${150 - h}L${x + 6.5} 150Z`;
}).join("");

// Chains hang from the band and gather at the collar above the basket.
const CHAINS = Array.from({ length: 9 }, (_, k) => {
  const x0 = 446 + k * 5;
  const x1 = 459 + k * 2.25;
  return `M${x0} 58Q${x0 + (x1 - x0) * 0.3} 80 ${x1} 100`;
});

// ---- facts collected so far: localStorage when available, memory otherwise ----
const STORAGE_KEY = "putts:facts";
let memory: string | null = null;
const listeners = new Set<() => void>();

function readLog() {
  if (memory === null) {
    try {
      memory = window.localStorage.getItem(STORAGE_KEY) ?? "[]";
    } catch {
      memory = "[]";
    }
  }
  return memory;
}

function writeLog(ids: number[]) {
  memory = JSON.stringify(ids);
  try {
    window.localStorage.setItem(STORAGE_KEY, memory);
  } catch {
    /* private mode or storage disabled; the game still works */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    memory = e.newValue ?? "[]";
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function parseLog(raw: string): number[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => Number.isInteger(n) && n >= 0 && n < facts.length) : [];
  } catch {
    return [];
  }
}

function pickFact(collected: number[]) {
  const fresh = facts.map((_, i) => i).filter((i) => !collected.includes(i));
  const pool = fresh.length ? fresh : facts.map((_, i) => i);
  return pool[Math.floor(Math.random() * pool.length)];
}

// prefers-reduced-motion, read as an external store
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const prefersReducedMotion = () => window.matchMedia(MOTION_QUERY).matches;

export function PuttingGame({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [rung, setRung] = useState(0);
  const [streak, setStreak] = useState(0);
  const [fact, setFact] = useState<number | null>(null);
  const [from, setFrom] = useState(LADDER[0].m);
  const raw = useSyncExternalStore(subscribe, readLog, () => "[]");
  const collected = useMemo(() => parseLog(raw), [raw]);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);
  const markerRef = useRef<HTMLSpanElement>(null);
  const discRef = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const pos = useRef(0.5);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const spot = LADDER[rung];

  const aim = () => {
    setFact(null);
    discRef.current?.getAnimations().forEach((a) => a.cancel());
    setPhase("aiming");
    if (reduced) return;
    const start = performance.now();
    const tick = (now: number) => {
      pos.current = (1 - Math.cos((2 * Math.PI * (now - start)) / SWEEP_MS)) / 2;
      markerRef.current?.style.setProperty("--p", pos.current.toFixed(4));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const settle = (outcome: Outcome) => {
    if (outcome === "made") {
      rattleChains();
      const next = pickFact(collected);
      setFact(next);
      if (!collected.includes(next)) writeLog([...collected, next]);
      setStreak((s) => s + 1);
      setRung((r) => Math.min(r + 1, LADDER.length - 1));
    } else {
      setStreak(0);
    }
    setPhase(outcome);
  };

  const putt = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    const p = reduced ? Math.random() : pos.current;
    const half = spot.window / 2;
    const outcome: Outcome = p < SWEET - half ? "short" : p > SWEET + half ? "long" : "made";
    setFrom(spot.m);
    setPhase("flying");
    const disc = discRef.current;
    if (!disc || reduced) {
      settle(outcome);
      return;
    }
    const waypoints = PATHS[outcome];
    const flight = disc.animate(
      waypoints.map(([left, top], i) => ({
        left: `${left}%`,
        top: `${top}%`,
        scale: i === 0 || i === waypoints.length - 1 ? "1" : "0.85",
      })),
      { duration: outcome === "made" ? 950 : 800, easing: "cubic-bezier(0.3, 0.6, 0.4, 1)", fill: "forwards" },
    );
    flight.finished.then(() => settle(outcome)).catch(() => {});
  };

  const onButton = () => {
    if (phase === "aiming") putt();
    else if (phase !== "flying") aim();
  };

  const buttonLabel =
    phase === "aiming"
      ? "Putt!"
      : phase === "flying"
        ? "…"
        : phase === "made"
          ? spot.m === from
            ? `Again from ${spot.m} m`
            : `Step back to ${spot.m} m`
          : phase === "ready"
            ? "Step up"
            : "Try again";

  const message: Record<Exclude<Phase, "made">, string> = {
    ready: reduced ? "Press Putt and hope for chains." : "Stop the marker in the green to hit chains.",
    aiming: reduced ? `Putting from ${spot.m} m.` : `Putting from ${spot.m} m. Stop the marker in the green.`,
    flying: "…",
    short: `Came up short from ${from} m. Never up, never in.`,
    long: `Too much juice. It sailed past from ${from} m.`,
  };

  const allCollected = collected.length === facts.length;
  // While a putt is in the air or just landed, label the distance it was thrown from.
  const shownDistance = phase === "ready" || phase === "aiming" ? spot.m : from;
  const greenLeft = (SWEET - spot.window / 2) * 100;

  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6 sm:px-7">
        <div>
          <p className="eyebrow">Sink a putt</p>
          <h3 className="mt-2 font-display text-[1.6rem] leading-tight tracking-[-0.02em] font-soft">
            Every putt you make is a fact about me.
          </h3>
        </div>
        <p className="font-mono text-[0.72rem] text-ink-3" aria-live="polite">
          {collected.length}/{facts.length} facts
        </p>
      </div>

      {/* the green */}
      <div className="relative mt-5 aspect-[600/230] w-full select-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 600 230" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="putt-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "rgb(var(--card))" }} />
              <stop offset="1" style={{ stopColor: "rgb(var(--paper-2))" }} />
            </linearGradient>
          </defs>
          <rect width="600" height="230" fill="url(#putt-sky)" />
          <circle cx="150" cy="152" r="30" style={{ fill: "rgb(var(--accent) / 0.85)" }} />
          <path d={PINES} style={{ fill: "color-mix(in srgb, rgb(var(--pine)) 55%, rgb(var(--card)))" }} />
          <rect y="150" width="600" height="80" style={{ fill: "color-mix(in srgb, rgb(var(--pine)) 30%, rgb(var(--card)))" }} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={i * 110 + 40} y="150" width="55" height="80" transform="skewX(-25)" style={{ fill: "rgb(var(--card) / 0.14)" }} />
          ))}
          <path d="M92 207H436" strokeDasharray="4 7" strokeWidth="2" style={{ stroke: "rgb(var(--ink) / 0.25)" }} />
          <ellipse cx="72" cy="199" rx="12" ry="3.5" style={{ fill: "rgb(var(--ink) / 0.22)" }} />

          {/* the basket */}
          <ellipse cx="468" cy="202" rx="17" ry="4" style={{ fill: "rgb(var(--ink) / 0.3)" }} />
          <rect x="466" y="56" width="4" height="146" rx="2" style={{ fill: "rgb(var(--ink) / 0.7)" }} />
          <g className={cn(phase === "made" && "chains-rattle")} fill="none" strokeWidth="1.4" style={{ stroke: "rgb(var(--ink) / 0.45)" }}>
            {CHAINS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <rect x="455" y="98" width="26" height="3.5" rx="1.5" style={{ fill: "rgb(var(--ink) / 0.55)" }} />
          <rect x="442" y="50" width="52" height="8" rx="3" style={{ fill: "rgb(var(--accent))" }} />
          <path d="M437 107H499L491 132H445Z" style={{ fill: "rgb(var(--ink) / 0.08)", stroke: "rgb(var(--ink) / 0.6)" }} strokeWidth="1.5" />
          {[449, 458.5, 468, 477.5, 487].map((x) => (
            <path key={x} d={`M${x} 107V132`} strokeWidth="1" style={{ stroke: "rgb(var(--ink) / 0.3)" }} />
          ))}
          <rect x="434" y="104" width="68" height="4.5" rx="2" style={{ fill: "rgb(var(--ink) / 0.6)" }} />
        </svg>

        <span
          ref={discRef}
          className="absolute -ml-[11px] -mt-[4px] h-2 w-[22px] rounded-[50%] bg-accent shadow-[inset_0_-2px_0_rgb(0_0_0/0.25)]"
          style={{ left: "12%", top: "66%" }}
        />
        <span className="absolute bottom-[6%] left-[44%] -translate-x-1/2 rounded-full bg-card/85 px-2 py-0.5 font-mono text-[0.66rem] text-ink-2">
          {shownDistance} m · {shownDistance <= 10 ? "circle 1" : "circle 2"}
        </span>
      </div>

      {/* the meter */}
      <div className="px-6 pt-5 sm:px-7" aria-hidden="true">
        <div className="relative h-3 rounded-full bg-paper-2 ring-1 ring-rule">
          <span
            className="absolute inset-y-0 rounded-full bg-pine/70 transition-[left,width] duration-300"
            style={{ left: `${greenLeft}%`, width: `${spot.window * 100}%` }}
          />
          <span
            ref={markerRef}
            className="absolute -top-1.5 h-6 w-1.5 -translate-x-1/2 rounded-full bg-ink shadow"
            style={{ left: "calc(var(--p, 0.5) * 100%)" }}
          />
        </div>
        <div className="relative mt-1.5 h-4 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-3">
          <span className="absolute left-0">short</span>
          <span className="absolute -translate-x-1/2" style={{ left: `${SWEET * 100}%` }}>
            chains
          </span>
          <span className="absolute right-0">long</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="min-h-[3.5rem] text-[0.98rem] leading-relaxed text-ink-2" aria-live="polite">
          {phase === "made" ? (
            <>
              <p className="font-medium text-ink">
                Chains! You drained it from {from} m.{streak > 1 ? ` That's ${streak} in a row.` : ""}
              </p>
              {fact !== null ? <p className="mt-1">{facts[fact]}</p> : null}
              {allCollected ? (
                <p className="mt-2 text-ink">
                  That&rsquo;s every fact. You basically know me now, so{" "}
                  <a className="link" href={`mailto:${site.email}`}>
                    say hi
                  </a>
                  .
                </p>
              ) : null}
            </>
          ) : (
            <p>{message[phase]}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onButton}
          disabled={phase === "flying"}
          className={cn("shrink-0 self-start sm:self-auto", phase === "aiming" ? "btn-primary" : "btn-ghost", phase === "flying" && "opacity-60")}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
