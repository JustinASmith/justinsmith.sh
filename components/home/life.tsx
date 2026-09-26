import Image from "next/image";
import { interests, photos, type Interest } from "@/lib/life";
import { SectionHeading } from "@/components/section-heading";
import { DiscGolf, Fish, Paw, Roller } from "@/components/icons";
import { cn } from "@/lib/utils";
import { FishingPond } from "./fishing-pond";
import { ScoutCard } from "./scout-card";

const interestIcon: Record<Interest["id"], typeof Fish> = { disc: DiscGolf, fish: Fish, dog: Paw, home: Roller };
const interestTint: Record<Interest["id"], string> = {
  disc: "bg-accent/10 text-accent-ink",
  fish: "bg-lake/15 text-lake",
  dog: "bg-gold/20 text-ink",
  home: "bg-pine/15 text-pine",
};

// Pinned-to-a-corkboard feel: every photo sits a little crooked.
const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];

export function Life() {
  return (
    <section id="life" aria-labelledby="life-title" className="border-t border-rule/70 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="life-title"
          index="04"
          label="Life"
          aside="Off the clock"
          title={
            <>
              Off the clock, you&rsquo;ll usually <em>find me outside</em>.
            </>
          }
        >
          I was born in Michigan, raised in Northeast Mississippi, and I&rsquo;ve been a Starkville local since my
          Mississippi State days. My cousin helped me build my first computer, a Core 2 Duo desktop. I wanted it for
          games. I stayed for the software.
        </SectionHeading>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">A field guide to my weekends</p>
            <ul className="mt-5 divide-y divide-rule/80 border-y border-rule/80">
              {interests.map((it) => {
                const Icon = interestIcon[it.id];
                return (
                  <li key={it.id} className="flex gap-4 py-5">
                    {it.avatar ? (
                      <Image
                        src={it.avatar}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-gold/40"
                      />
                    ) : (
                      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full", interestTint[it.id])}>
                        <Icon size={22} />
                      </span>
                    )}
                    <div>
                      <p className="font-display text-[1.3rem] leading-tight font-soft">{it.name}</p>
                      <p className="mt-1 text-ink-2">{it.note}</p>
                      <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">{it.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <FishingPond className="reveal lg:col-span-7 lg:self-start" />
        </div>

        <ScoutCard />

        <div className="mt-20">
          <p className="eyebrow">From the camera roll</p>
          <ul className="reveal scrollbar-none -mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 pt-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0">
            {photos.map((p, i) => (
              <li
                key={p.src}
                className={cn("w-[62vw] max-w-[260px] shrink-0 snap-center sm:w-auto sm:max-w-none", i % 2 === 1 && "sm:mt-8")}
              >
                <figure
                  className={cn(
                    "rounded-[6px] bg-card p-2.5 pb-3 shadow-[0_1px_2px_rgb(var(--shadow)/0.12),0_18px_36px_-22px_rgb(var(--shadow)/0.55)] ring-1 ring-rule/60 transition-transform duration-300 ease-out hover:z-10 hover:rotate-0 hover:scale-[1.035]",
                    tilt[i % tilt.length],
                  )}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-paper-2">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1180px) 270px, (min-width: 640px) 23vw, 62vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 px-1 font-display text-[1rem] italic leading-snug text-ink-2 font-wonk">
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
