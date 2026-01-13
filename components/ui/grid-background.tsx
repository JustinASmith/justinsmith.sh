"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function GridBackground({
  children,
  className,
  containerClassName,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center bg-background",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]",
          "pointer-events-none"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

export function DotBackground({
  children,
  className,
  containerClassName,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center bg-background",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]",
          "pointer-events-none"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

export function GridSmallBackground({
  children,
  className,
  containerClassName,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center bg-background",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]",
          "pointer-events-none"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
