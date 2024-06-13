"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BasicCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "mx-auto w-full bg-primary relative rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.25),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <div className={cn("h-full px-4 py-20 sm:px-10", className)}>
          {children}
        </div>
      </div>
    </section>
  );
};
