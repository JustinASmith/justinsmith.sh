import { now, type NowItem, type NowStatus } from "@/lib/now";
import { cn } from "@/lib/utils";
import { ArrowUpRight, DiscGolf, Hammer, Sparkle, Terminal, XLogo } from "@/components/icons";

const icon: Record<NowItem["id"], typeof Terminal> = {
  origin: Terminal,
  client: Hammer,
  disc: DiscGolf,
  x: XLogo,
  ai: Sparkle,
};

const dot: Record<NowStatus, string> = {
  "Day job": "bg-pine",
  "In progress": "bg-accent animate-ring",
  Exploring: "bg-gold",
  Posting: "bg-lake",
  Always: "bg-ink/60",
};

export function Workbench() {
  return (
    <div className="mt-16">
      <div className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="eyebrow">On the workbench</p>
          <h3 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.05] tracking-[-0.02em] font-soft">
            What I&rsquo;m building right now.
          </h3>
        </div>
        <p className="font-mono text-[0.72rem] text-ink-3">updated {now.updated.toLowerCase()}</p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {now.items.map((item, i) => {
          const Icon = icon[item.id];
          return (
            <li key={item.id} className={cn("reveal", i === 0 && "md:col-span-2")}>
              <article className="card-surface relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                {i === 0 ? <MiniTrace /> : null}
                <div className="relative flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-2.5 py-1 font-mono text-[0.7rem] text-ink-2">
                    <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", dot[item.status])} />
                    {item.status}
                  </span>
                  <Icon size={item.id === "x" ? 16 : 20} className="text-ink-3" />
                </div>
                <h4 className="relative mt-5 font-display text-[1.45rem] leading-tight tracking-[-0.015em] font-soft">
                  {item.title}
                </h4>
                <p className={cn("relative mt-2 leading-relaxed text-ink-2", i === 0 && "max-w-md")}>{item.body}</p>
                {item.href ? (
                  <div className="relative mt-auto pt-5">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1.5 text-[0.95rem] font-medium"
                    >
                      {item.linkLabel ?? "Take a look"} <ArrowUpRight size={15} />
                    </a>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A few trace lanes in the corner of the day-job card: a nod to what Origin does.
function MiniTrace() {
  const lanes = [
    { x: 8, w: 70, c: "fill-ink/15" },
    { x: 20, w: 38, c: "fill-accent/70" },
    { x: 46, w: 26, c: "fill-pine/60" },
    { x: 52, w: 44, c: "fill-lake/60" },
    { x: 70, w: 22, c: "fill-gold/70" },
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 110 70"
      className="pointer-events-none absolute -right-2 bottom-3 hidden h-28 w-44 opacity-80 lg:block"
    >
      {lanes.map((l, i) => (
        <rect key={i} x={l.x} y={8 + i * 11} width={l.w} height="6" rx="3" className={l.c} />
      ))}
    </svg>
  );
}
