"use client";
import React from "react";
import Gallery from "@/components/ui/gallery";
import { BasicCard } from "@/components/ui/basic-card";
import ToolsIUse from "@/components/tools-i-use";
import About from "@/components/about";

export function WhoAmISection() {
  return (
    <section
      id="#about"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-4 w-full mt-8"
    >
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-3 p-0 m-0 bg-cyan-600 relative rounded-2xl overflow-hidden shadow-md"
      >
        <About />
      </BasicCard>
      <BasicCard
        containerClassName="col-span-1 row-span-2 bg-primary/10 p-0 m-0 overflow-hidden shadow-md"
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
      <BasicCard containerClassName="col-span-1 row-span-2 bg-blue-900 overflow-hidden shadow-md">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
      </BasicCard>
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-1 p-0 m-0 bg-blue-500 relative rounded-2xl overflow-hidden shadow-md"
      >
        <ToolsIUse />
      </BasicCard>
    </section>
  );
}
