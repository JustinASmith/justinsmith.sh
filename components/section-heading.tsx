import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  index,
  label,
  aside,
  title,
  children,
  className,
}: {
  id?: string;
  index: string;
  label: string;
  aside?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("reveal", className)}>
      <div className="flex items-center gap-3">
        <span className="eyebrow !text-accent-ink">{index}</span>
        <span className="eyebrow">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-rule" />
        {aside ? <span className="eyebrow hidden sm:inline">{aside}</span> : null}
      </div>
      <h2 id={id} className="mt-7 max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-[400] leading-[0.98] tracking-[-0.03em] font-soft [&_em]:font-wonk [&_em]:text-accent">
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-[40rem] text-lg leading-relaxed text-ink-2">{children}</div> : null}
    </div>
  );
}
