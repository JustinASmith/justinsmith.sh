import { site } from "@/lib/site";
import { ArrowDown, Mail } from "@/components/icons";
import { LocalStatus } from "./local-status";
import { SunPortrait } from "./sun-portrait";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_65%_60%_at_72%_42%,black,transparent)]"
      />
      <div className="container-page relative grid items-center gap-10 pb-20 pt-8 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="eyebrow">
            Software engineer · <span className="sm:hidden">{site.locationShort}</span>
            <span className="hidden sm:inline">{site.location}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(3.7rem,10.5vw,8.25rem)] font-[400] leading-[0.88] tracking-[-0.045em] font-soft"
          >
            Hey, I&rsquo;m <span className="italic text-accent font-wonk">Justin</span>.
          </h1>
          <p className="mt-9 max-w-[34rem] text-[1.28rem] leading-relaxed text-ink sm:text-[1.36rem]">
            I build data-heavy software, from the pipelines underneath to the interfaces people use. And I&rsquo;m almost
            always building something on the side.
          </p>
          <p className="mt-4 max-w-[34rem] text-[1.06rem] leading-relaxed text-ink-2">
            Right now I&rsquo;m a founding forward-deployed engineer at{" "}
            <a href={site.company.url} className="link" target="_blank" rel="noreferrer">
              Origin
            </a>
            , focused on core product engineering: helping companies see what their AI agents are actually doing. Before
            that, I kept real-time data flowing at Estuary and wrangled industrial sensor data at Camgian.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              Say hello <Mail size={18} />
            </a>
            <a href="#work" className="btn-ghost">
              See the work <ArrowDown size={18} />
            </a>
          </div>
          <LocalStatus className="mt-11" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <SunPortrait />
        </div>
      </div>
    </section>
  );
}
