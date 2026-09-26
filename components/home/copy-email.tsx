"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Check, Copy } from "@/components/icons";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${site.email}`;
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card/70 px-3.5 py-2 text-sm text-ink-2 transition-colors hover:border-ink/30 hover:text-ink"
    >
      {copied ? <Check size={16} className="text-pine" /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}
