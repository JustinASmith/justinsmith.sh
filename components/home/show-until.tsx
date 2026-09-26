"use client";

import type { ReactNode } from "react";
import { useToday } from "@/lib/use-today";

/** Renders `children` through `until` (inclusive), then `fallback`. */
export function ShowUntil({
  until,
  builtOn,
  fallback = null,
  children,
}: {
  until: string;
  builtOn: string;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  return useToday(builtOn) <= until ? children : fallback;
}
