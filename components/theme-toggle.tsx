"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./icons";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/lib/use-is-client";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink",
        className,
      )}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      {/* Render both and let CSS pick, so there's no flash before hydration. */}
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="block dark:hidden" />
    </button>
  );
}
