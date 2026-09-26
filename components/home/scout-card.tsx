import Image from "next/image";
import { scout } from "@/lib/life";
import { cn } from "@/lib/utils";

// Three polaroids fanned out: day one, Christmas, all grown up.
const fan = ["-rotate-[5deg] translate-y-4", "rotate-1 -translate-y-1", "rotate-[5deg] translate-y-5"];

const attributes: [string, string][] = [
  ["name", "scout"],
  ["breed", "springer spaniel"],
  ["born", scout.born],
  ["drive_home", "3.5 hours"],
  ["status", "good boy"],
];

export function ScoutCard() {
  return (
    <article
      aria-labelledby="scout-title"
      className="card-surface reveal mt-16 grid overflow-hidden lg:grid-cols-[1.2fr_1fr]"
    >
      <div className="relative order-2 flex items-center overflow-hidden bg-[linear-gradient(150deg,rgb(var(--gold)/0.22),rgb(var(--accent)/0.1)_55%,rgb(var(--pine)/0.14))] px-4 pb-14 pt-10 sm:px-10 lg:order-1 lg:py-14">
        <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-50" />
        <ul className="relative mx-auto grid w-full max-w-[620px] grid-cols-3 items-center gap-3 sm:gap-5">
          {scout.photos.map((p, i) => (
            <li key={p.src} className="relative">
              <figure
                className={cn(
                  "relative rounded-[6px] bg-card p-2 pb-2.5 shadow-[0_1px_2px_rgb(var(--shadow)/0.12),0_22px_40px_-22px_rgb(var(--shadow)/0.6)] ring-1 ring-rule/60 transition-transform duration-300 ease-out hover:z-20 hover:rotate-0 hover:scale-105",
                  fan[i],
                )}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-paper-2">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 200px, 30vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 px-0.5 font-display text-[0.92rem] italic leading-snug text-ink-2 font-wonk">
                  {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 flex flex-col justify-center p-7 sm:p-10 lg:order-2">
        <p className="eyebrow">Resident good boy</p>
        <h3
          id="scout-title"
          className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[0.98] tracking-[-0.03em] font-soft"
        >
          Meet <span className="italic text-accent font-wonk">Scout</span>.
        </h3>
        <p className="mt-5 text-[1.08rem] leading-relaxed text-ink-2">
          Our Springer Spaniel, born September 1, 2024. We drove three and a half hours to bring him home, and yes, I had
          to convince my wife first. He&rsquo;s been worth every mile.
        </p>
        <dl className="mt-7 divide-y divide-rule/70 rounded-xl border border-rule/80 bg-paper/60 font-mono text-[0.76rem]">
          {attributes.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-3.5 py-2">
              <dt className="text-ink-3">{k}</dt>
              <dd className={cn("text-right text-ink", k === "status" && "text-pine")}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
