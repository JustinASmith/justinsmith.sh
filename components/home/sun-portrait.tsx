import Image from "next/image";
import portrait from "@/public/images/justin.png";

// Stripes cut into the lower half of the sun: a retro sunset over the water.
const stripes = [
  { y: 57, h: 1.4 },
  { y: 63.5, h: 2 },
  { y: 70, h: 2.7 },
  { y: 76.5, h: 3.4 },
  { y: 83, h: 4.1 },
  { y: 89.5, h: 4.8 },
  { y: 96, h: 6 },
];

export function SunPortrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[270px] sm:max-w-[360px] lg:max-w-[460px]">
      <svg viewBox="0 0 100 100" className="absolute left-[6%] top-[6%] w-[88%]" aria-hidden="true">
        <defs>
          <mask id="sun-stripes">
            <rect width="100" height="100" fill="white" />
            {stripes.map((s) => (
              <rect key={s.y} x="0" y={s.y} width="100" height={s.h} fill="black" />
            ))}
          </mask>
          <linearGradient id="sun-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "rgb(var(--gold))" }} />
            <stop offset="0.55" style={{ stopColor: "rgb(var(--accent))" }} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#sun-fill)" mask="url(#sun-stripes)" />
      </svg>

      <Image
        src={portrait}
        alt="Justin Smith, smiling, in a dark quarter-zip"
        priority
        sizes="(min-width: 1024px) 460px, (min-width: 640px) 360px, 270px"
        className="mask-fade-b absolute inset-x-0 bottom-0 h-auto w-full drop-shadow-[0_18px_30px_rgb(var(--shadow)/0.25)]"
      />

      {/* Slowly turning badge */}
      <div className="absolute -left-2 top-[4%] h-20 w-20 sm:h-28 sm:w-28" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
          <defs>
            <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <circle cx="60" cy="60" r="58" style={{ fill: "rgb(var(--card))", stroke: "rgb(var(--rule))" }} />
          <text className="fill-ink font-mono" style={{ fontSize: "9.6px", letterSpacing: "0.2em" }}>
            <textPath href="#badge-circle">FORWARD DEPLOYED · STARKVILLE, MS · </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="currentColor">
            <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
          </svg>
        </span>
      </div>

      {/* A hand-drawn note */}
      <div className="absolute -right-6 -top-2 hidden xl:block" aria-hidden="true">
        <p className="rotate-[6deg] font-display text-lg italic text-ink-2 font-wonk">that&rsquo;s me!</p>
        <svg viewBox="0 0 80 70" className="-ml-7 h-16 w-[4.5rem] text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 4C58 22 50 46 22 60" />
          <path d="M33 60H21l6-11" />
        </svg>
      </div>
    </div>
  );
}
