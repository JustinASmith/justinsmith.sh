import React from "react";
import { Noise } from "./noise";
import Divider from "./divider";
import Link from "next/link";

type Props = {};

export default function About({}: Props) {
  return (
    <>
      <Noise />
      <h2 className="text-left text-balance text-2xl font-semibold tracking-[-0.015em] text-white mb-2">
        Who Am I?
      </h2>
      <Divider />
      <h3 className="text-left text-balance text-xs font-normal tracking-[0.015em] text-white/75 mt-8 uppercase">
        My Story
      </h3>
      <p className="mt-2 text-left text-base text-neutral-100">
        I was raised on the country roads of Northeast Mississippi. Since I was
        a young boy, I{"'"}ve had a passion for technology and computers. My
        first computer was a desktop that my cousin helped me build. I was so
        excited to play games and learn how to use it. I quickly became enamored
        by the inner workings of the software and how to create my own.
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
    </>
  );
}
