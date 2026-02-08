"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCategoryLabel } from "@/lib/content-utils";

const categories = [
  { value: "", label: "All" },
  { value: "agentic-coding", label: "Agentic Coding" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "career", label: "Career" },
  { value: "tools", label: "Tools & Workflow" },
  { value: "thoughts", label: "Thoughts" },
];

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.value}
          href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-mono transition-colors",
            current === cat.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
