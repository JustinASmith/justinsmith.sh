"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { facts, fish } from "@/lib/life";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// A ragged line of pines along the far shore.
const PINES = Array.from({ length: 46 }, (_, i) => {
  const x = i * 13.5 + ((i * 7) % 5);
  const h = 12 + ((i * 37) % 17) + (i % 4 === 0 ? 8 : 0);
  return `M${x - 6.5} 70L${x} ${70 - h}L${x + 6.5} 70Z`;
}).join("");

type Phase = "idle" | "casting" | "waiting" | "bite" | "caught" | "missed" | "spooked";
type Catch = { name: string; lbs: number | null; fact: number | null };

const STORAGE_KEY = "pond:caught";

// The catch log: remembered in localStorage when it's available, in memory when it isn't.
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
    /* private mode or storage disabled; the pond still works */
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

function roll(caught: number[]): Catch {
  const total = fish.reduce((sum, f) => sum + f.weight, 0);
  let r = Math.random() * total;
  const f = fish.find((x) => (r -= x.weight) < 0) ?? fish[0];
  if (!f.max) return { name: f.name, lbs: null, fact: null };
  const fresh = facts.map((_, i) => i).filter((i) => !caught.includes(i));
  const pool = fresh.length ? fresh : facts.map((_, i) => i);
  return {
    name: f.name,
    lbs: Math.round((f.min + Math.random() * (f.max - f.min)) * 10) / 10,
    fact: pool[Math.floor(Math.random() * pool.length)],
  };
}

export function FishingPond({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [spot, setSpot] = useState(55);
  const [result, setResult] = useState<Catch | null>(null);
  const raw = useSyncExternalStore(subscribe, readLog, () => "[]");
  const caught = useMemo(() => parseLog(raw), [raw]);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const later = (ms: number, fn: () => void) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const cast = () => {
    setResult(null);
    setSpot(30 + Math.random() * 45);
    setPhase("casting");
    later(650, () => {
      setPhase("waiting");
      later(1300 + Math.random() * 2600, () => {
        setPhase("bite");
        later(1500, () => setPhase("missed"));
      });
    });
  };

  const reel = () => {
    window.clearTimeout(timer.current);
    const c = roll(caught);
    setResult(c);
    setPhase("caught");
    if (c.fact !== null && !caught.includes(c.fact)) writeLog([...caught, c.fact]);
  };

  const onButton = () => {
    if (phase === "bite") return reel();
    if (phase === "waiting") {
      window.clearTimeout(timer.current);
      return setPhase("spooked");
    }
    if (phase === "casting") return;
    cast();
  };

  const inWater = phase === "waiting" || phase === "bite";
  const allCaught = caught.length === facts.length;

  const message: Record<Phase, string> = {
    idle: "Press the button to cast. When the bobber dips, reel it in.",
    casting: "Casting…",
    waiting: "Waiting on a bite. Patience.",
    bite: "Something's biting! Reel it in!",
    caught: "",
    missed: "It got away. They do that.",
    spooked: "Too early. You spooked it.",
  };

  const buttonLabel =
    phase === "bite" ? "Reel it in!" : phase === "waiting" ? "Reel in (too early?)" : phase === "idle" ? "Cast a line" : "Cast again";

  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6 sm:px-7">
        <div>
          <p className="eyebrow">Cast a line</p>
          <h3 className="mt-2 font-display text-[1.6rem] leading-tight tracking-[-0.02em] font-soft">Every catch is a fact about me.</h3>
        </div>
        <p className="font-mono text-[0.72rem] text-ink-3" aria-live="polite">
          {caught.length}/{facts.length} facts caught
        </p>
      </div>

      {/* the pond */}
      <div
        className="relative mt-5 h-44 select-none overflow-hidden bg-[linear-gradient(to_bottom,rgb(var(--card)),rgb(var(--paper-2)))] sm:h-52"
        aria-hidden="true"
      >
        {/* far shore: a low sun behind the pines */}
        <svg viewBox="0 0 600 70" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 top-0 h-[35%] w-full">
          <circle cx="440" cy="72" r="30" style={{ fill: "rgb(var(--accent) / 0.85)" }} />
          <path d={PINES} style={{ fill: "color-mix(in srgb, rgb(var(--pine)) 55%, rgb(var(--card)))" }} />
        </svg>
        <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="pond-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "rgb(var(--lake) / 0.55)" }} />
              <stop offset="1" style={{ stopColor: "rgb(var(--lake) / 0.95)" }} />
            </linearGradient>
          </defs>
          <rect x="0" y="70" width="600" height="130" fill="url(#pond-water)" />
          <g className="pond-waves" fill="none" strokeLinecap="round" style={{ stroke: "rgb(var(--card) / 0.45)" }}>
            <path d="M-40 96 q 20 -6 40 0 t 40 0 t 40 0 t 40 0 t 40 0" strokeWidth="2" />
            <path d="M260 120 q 20 -6 40 0 t 40 0 t 40 0 t 40 0" strokeWidth="2" />
            <path d="M80 150 q 20 -6 40 0 t 40 0 t 40 0" strokeWidth="2" />
            <path d="M400 168 q 20 -6 40 0 t 40 0 t 40 0 t 40 0" strokeWidth="2" />
            <path d="M160 184 q 20 -6 40 0 t 40 0" strokeWidth="2" />
          </g>
        </svg>

        {/* reeds */}
        <svg viewBox="0 0 80 120" className="absolute bottom-6 left-1 h-32 w-auto sm:left-4" fill="none" strokeLinecap="round">
          <path d="M20 120 C 20 80 16 50 12 20" className="stroke-pine" strokeWidth="3" />
          <path d="M34 120 C 34 84 38 58 44 34" className="stroke-pine" strokeWidth="3" />
          <path d="M48 120 C 50 96 56 80 66 64" className="stroke-pine/70" strokeWidth="3" />
          <rect x="7.5" y="16" width="9" height="26" rx="4.5" className="fill-[#7a5230]" transform="rotate(-8 12 29)" />
          <rect x="40" y="30" width="9" height="24" rx="4.5" className="fill-[#7a5230]" transform="rotate(10 44 42)" />
        </svg>
        <svg viewBox="0 0 80 120" className="absolute bottom-4 right-2 h-24 w-auto -scale-x-100 sm:right-5" fill="none" strokeLinecap="round">
          <path d="M20 120 C 20 84 18 60 14 36" className="stroke-pine" strokeWidth="3" />
          <path d="M36 120 C 38 92 44 72 54 52" className="stroke-pine/70" strokeWidth="3" />
          <rect x="9.5" y="32" width="9" height="22" rx="4.5" className="fill-[#7a5230]" transform="rotate(-6 14 43)" />
        </svg>

        {/* bobber */}
        <div
          className={cn(
            "absolute top-[35%] -ml-3.5 -mt-4",
            phase === "idle" || phase === "caught" || phase === "missed" || phase === "spooked" ? "opacity-0" : "opacity-100",
          )}
          style={{ left: `${spot}%` }}
        >
          <div className={cn(phase === "casting" && "animate-[plop_0.65s_cubic-bezier(0.3,0,0.6,1)_both]")}>
            <div className={cn(phase === "waiting" && "animate-bob", phase === "bite" && "animate-[dip_0.45s_ease-in-out_infinite]")}>
              <svg viewBox="0 0 28 40" className="h-10 w-7 drop-shadow-[0_3px_2px_rgb(0_0_0/0.25)]">
                <rect x="12.5" y="0" width="3" height="12" rx="1.5" className="fill-ink/70" />
                <path d="M3 22a11 11 0 0 1 22 0Z" className="fill-accent" />
                <path d="M3 22a11 11 0 0 0 22 0Z" fill="#fffaf2" />
              </svg>
            </div>
          </div>
          {inWater ? (
            <span className="absolute left-1/2 top-[70%] -ml-6 h-4 w-12 animate-ripple rounded-[50%] border-2 border-card/70" />
          ) : null}
          {phase === "bite" ? (
            <span className="absolute -top-8 left-1/2 -ml-3 grid h-6 w-6 place-items-center rounded-full bg-card font-display text-lg font-semibold text-accent shadow">
              !
            </span>
          ) : null}
        </div>

        {/* the catch */}
        {phase === "caught" && result?.lbs ? (
          <div className="absolute top-[18%] -ml-8 animate-[leap_0.9s_cubic-bezier(0.2,0.8,0.3,1)_both]" style={{ left: `${spot}%` }}>
            <svg viewBox="0 0 64 36" className="h-10 w-16">
              <path d="M4 18c8-12 30-15 44-1-14 15-36 13-44 1Z" className="fill-pine" />
              <path d="M47 17 62 6v24Z" className="fill-pine" />
              <circle cx="15" cy="15" r="2.2" className="fill-card" />
              <path d="M26 9c3 3 4 6 4 9s-1 6-4 9" className="stroke-card/60" strokeWidth="2" fill="none" />
            </svg>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-rule/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="min-h-[3.5rem] text-[0.98rem] leading-relaxed text-ink-2" aria-live="polite">
          {phase === "caught" && result ? (
            result.lbs ? (
              <>
                <p className="font-medium text-ink">
                  You caught a {result.lbs} lb {result.name}!
                </p>
                <p className="mt-1">{result.fact !== null ? facts[result.fact] : null}</p>
              </>
            ) : (
              <p>
                <span className="font-medium text-ink">You reeled in an old boot.</span> 404: fish not found. Cast again.
              </p>
            )
          ) : (
            <p>{message[phase]}</p>
          )}
          {allCaught && phase === "caught" ? (
            <p className="mt-2 text-ink">
              That&rsquo;s every fact. You basically know me now, so{" "}
              <a className="link" href={`mailto:${site.email}`}>
                say hi
              </a>
              .
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onButton}
          disabled={phase === "casting"}
          className={cn(
            "shrink-0 self-start sm:self-auto",
            phase === "bite" ? "btn-primary animate-[shake_0.4s_ease-in-out_infinite]" : "btn-ghost",
            phase === "casting" && "opacity-60",
          )}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
