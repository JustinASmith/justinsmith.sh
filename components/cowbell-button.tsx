"use client";

import { useEffect, useRef, useState } from "react";
import { ringCowbell } from "@/lib/cowbell";
import { Cowbell } from "./icons";
import { cn } from "@/lib/utils";

export function CowbellButton() {
  const [rings, setRings] = useState(0);
  const [toast, setToast] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => {
          ringCowbell();
          setRings((n) => n + 1);
          setToast(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setToast(false), 1800);
        }}
        className="grid h-9 w-9 place-items-center rounded-full text-ink-3 transition-colors hover:bg-ink/5 hover:text-accent"
        aria-label="Ring the cowbell"
        title="Ring the cowbell. Hail State!"
      >
        <Cowbell key={rings} size={18} className={cn("origin-top", rings > 0 && "animate-wiggle")} />
      </button>
      <span
        role="status"
        className={cn(
          "pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 font-mono text-[0.7rem] text-paper transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {toast ? (rings > 4 ? "Okay, that's plenty of cowbell." : "More cowbell! Hail State!") : ""}
      </span>
    </span>
  );
}
