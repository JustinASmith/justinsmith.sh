"use client";
import { useRef, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface IImage {
  url: string;
  alt: string;
  className?: string;
  overlayText?: string;
}

interface GalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index} className="relative aspect-square group">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className={cn("object-cover min-h-4xl", image.className)}
          />
          {image.overlayText && (
            <div className="absolute bottom-0 left-0 w-full text-center text-white font-medium text-lg bg-slate-600/75 py-4 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {image.overlayText}
            </div>
          )}
        </CarouselItem>
      )),
    [images]
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative w-full h-full max-w-4xl min-h-4xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="h-full min-h-4xl">
        {mainImage}
      </CarouselContent>
    </Carousel>
  );
};

export default Gallery;
