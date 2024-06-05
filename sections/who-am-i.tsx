"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

function OverTheYears() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        <CarouselItem>
          <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-6">
              <Image
                src="/IMG_0800.JPG"
                fill
                alt="Wedding Day!"
                className="rounded-md"
                style={{ objectFit: "cover" }}
              />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-6">
              <Image
                src="/IMG_5400.JPG"
                fill
                alt="Hurts Donut!"
                className="rounded-md"
                style={{ objectFit: "cover" }}
              />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

const items = [
  {
    header: <OverTheYears />,
    className: "",
  },
  {
    header: <OverTheYears />,
    className: "",
  },
  {
    header: <OverTheYears />,
    className: "",
  },
];

export function WhoAmISection() {
  return (
    <section id="#about" className="w-full bg-">
      <BentoGrid className="mx-auto max-w-4xl lg:max-w-6xl py-8">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            className={item.className}
            header={item.header}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
