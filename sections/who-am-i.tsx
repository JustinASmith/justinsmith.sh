"use client";
import React from "react";
import Gallery from "@/components/ui/gallery";
import Link from "next/link";
import { BasicCard } from "@/components/ui/basic-card";
import Divider from "@/components/divider";
import { Noise } from "@/components/noise";

export function WhoAmISection() {
  return (
    <section
      id="#about"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-4 w-full mt-8"
    >
      <BasicCard
        className="!py-8"
        containerClassName="col-span-1 row-span-2 p-0 m-0 bg-cyan-700 relative rounded-2xl overflow-hidden"
      >
        <Noise />
        <h2 className="text-left text-balance text-2xl font-semibold tracking-[-0.015em] text-white mb-2">
          Who Am I?
        </h2>
        <Divider />
        <h3 className="text-left text-balance text-xs font-normal tracking-[0.015em] text-white/75 mt-8 uppercase">
          My Story
        </h3>
        <p className="mt-2 text-left text-base text-neutral-100">
          I was raised on the country roads of Northeast Mississippi. Since I
          was a young boy, I{"'"}ve had a passion for technology and computers.
          My first computer was a desktop that my cousin helped me build. I was
          so excited to play games and learn how to use it. I quickly became
          enamored by the inner workings of the software and how to create my
          own.
        </p>
        <h3 className="text-left text-balance text-xs font-normal tracking-[0.015em] text-white/75 mt-8 uppercase">
          What I do now?
        </h3>
        <p className="mt-2 text-left text-base text-neutral-100">
          Today I{"'"}m a Senior Data Engineer, working at{" "}
          <Link
            target="_blank"
            href="https://www.camgian.com/"
            className="z-20 underline hover:cursor-pointer"
          >
            Camgian
          </Link>{" "}
          helping fleet managers and maintenance supervisors to make data-driven
          decisions by prioritizing asset maintenance.
        </p>
      </BasicCard>
      <BasicCard
        containerClassName="col-span-1 row-span-1 bg-primary/10 p-0 m-0"
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
        containerClassName="relative col-span-1 row-span-1 bg-indigo-500"
        className="bg-dot-small-white/[0.2]"
      >
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </BasicCard>
      <BasicCard containerClassName="col-span-1 row-span-2 bg-blue-900">
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
    </section>
  );
}
