"use client";

import { useEffect, useState } from "react";
import { guessStatus, starkvilleNow } from "@/lib/time";
import { cn } from "@/lib/utils";

export function LocalStatus({ className }: { className?: string }) {
  const [now, setNow] = useState<ReturnType<typeof starkvilleNow> | null>(null);

  useEffect(() => {
    const tick = () => setNow(starkvilleNow());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-start gap-3 rounded-2xl border border-rule/80 bg-card/70 px-4 py-3 shadow-[0_12px_32px_-24px_rgb(var(--shadow)/0.5)] backdrop-blur",
        className,
      )}
      title="An educated guess, based on the time in Starkville."
    >
      <span aria-hidden="true" className="mt-[0.4rem] h-2.5 w-2.5 shrink-0 animate-ring rounded-full bg-accent" />
      <div className="min-w-0">
        <p className="eyebrow">
          Right now in Starkville ·{" "}
          <time suppressHydrationWarning className="text-ink-2">
            {now ? `${now.label} ${now.zone}` : "--:--"}
          </time>
        </p>
        <p className="mt-1 font-display text-[1.08rem] italic leading-snug text-ink font-soft" aria-live="polite">
          {now ? guessStatus(now) : "Checking the clock…"}
        </p>
      </div>
    </div>
  );
}
