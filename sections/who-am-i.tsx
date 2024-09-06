"use client";
import React from "react";
import Gallery from "@/components/ui/gallery";
import { BasicCard } from "@/components/ui/basic-card";
import ToolsIUse from "@/components/tools-i-use";
import About from "@/components/about";
import Divider from "@/components/divider";

export function WhoAmISection() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-4 w-full my-8"
    >
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-3 p-0 m-0 bg-cyan-600 relative rounded-2xl overflow-hidden shadow-md"
      >
        <About />
      </BasicCard>
      <BasicCard
        containerClassName="col-span-1 row-span-2 p-0 m-0 overflow-hidden shadow-md"
        className="!m-0 !p-0"
      >
        <Gallery
          images={[
            {
              url: "/gallery/big_beach_chair.jpg",
              alt: "Big beach chair",
              overlayText: "Big beach chair!",
            },
            {
              url: "/gallery/first_dance.jpg",
              alt: "wedding day first dance",
              overlayText: "Our first dance!",
            },
            {
              url: "/gallery/hurts_donuts.jpg",
              alt: "Hurt Donuts!",
              overlayText: "First time eating Hurt Donuts!",
            },
            {
              url: "/gallery/cactus_rock.jpg",
              alt: "Disc Golf at Cactus Rock",
              overlayText: "Disc Golf at Cactus Rock!",
            },
            {
              url: "/gallery/coconut_water.jpg",
              alt: "Coconut water on honeymoon in jamaica",
              overlayText: "Coconut water in Jamaica!",
            },
            {
              url: "/gallery/zipline_in_jamacia.jpg",
              alt: "Zipline in on honeymoon in jamaica",
              overlayText: "Ziplining in Jamaica!",
            },
          ]}
        />
      </BasicCard>
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-1 p-0 m-0 bg-blue-500 relative rounded-2xl overflow-hidden shadow-md"
      >
        <ToolsIUse />
      </BasicCard>
      <BasicCard
        containerClassName="col-span-1 row-span-2 bg-emerald-600 overflow-hidden shadow-md"
        className=""
      >
        <div className="">
          <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-2">
            Tools Require an Architect
          </h2>
          <Divider />
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Using tools effectively requires more than just familiarity; it
            demands architectural expertise. I design robust, future-proof
            systems by integrating components seamlessly and optimizing data
            flows, ensuring each tool serves its purpose within the bigger
            picture.
          </p>
        </div>
      </BasicCard>
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-1 p-0 m-0 bg-rose-500 relative rounded-2xl overflow-hidden shadow-md"
      >
        <div className="max-w-sm">
          <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-2">
            Engineering Excellence
          </h2>
          <Divider />
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            From mastering web technologies to optimizing high-throughput data
            solutions, I tackle technical challenges head-on. My solutions are
            practical, powerful, and meticulously crafted from code to
            production.
          </p>
        </div>
      </BasicCard>
    </section>
  );
}
