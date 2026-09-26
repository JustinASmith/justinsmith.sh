"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Close, Menu, Terminal } from "./icons";
import { openShell } from "./shell/events";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState<string | null>(null);
  const active = pathname === "/" ? inView : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") return;
    // Watch every section (hero included) so the highlight clears outside the nav's sections.
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setInView(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-rule/70 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center font-mono text-[0.95rem] font-medium tracking-tight" aria-label="Justin Smith, home">
          <span className="text-ink-3 transition-colors group-hover:text-ink-2">~/</span>
          <span>justinsmith</span>
          <span className="text-accent">.sh</span>
          <span aria-hidden="true" className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[1px] animate-blink bg-accent/80" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.92rem] text-ink-2 transition-colors hover:text-ink",
                    active === item.id && "text-ink",
                  )}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openShell}
            className="hidden items-center gap-2 rounded-full border border-ink/10 bg-card/60 py-1.5 pl-2.5 pr-2 text-[0.85rem] text-ink-2 transition-colors hover:border-ink/25 hover:text-ink sm:inline-flex"
            aria-label="Open the shell"
          >
            <Terminal size={16} />
            <span>Shell</span>
            <kbd className="kbd">/</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-2 hover:bg-ink/5 hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-rule/70 md:hidden">
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-rule/70">
            {nav.map((item, i) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-3 font-display text-3xl font-soft"
                >
                  {item.label}
                  <span className="font-mono text-xs text-ink-3">0{i + 2}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openShell();
            }}
            className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-ink-2"
          >
            <Terminal size={16} /> Open the shell
          </button>
        </nav>
      </div>
    </header>
  );
}
