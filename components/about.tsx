import React from "react";
import { Noise } from "./noise";
import Divider from "./divider";
import Link from "next/link";

type Props = {};

export default function About({}: Props) {
  return (
    <>
      <Noise />
      <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-2">
        Who Am I?
      </h2>
      <Divider />
      <h3 className="text-left text-balance text-xs font-normal tracking-[0.015em] text-white/75 mt-8 uppercase">
        My Story
      </h3>
      <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        I was born in Michigan and raised in Northeast Mississippi. Since I was
        young, I{"'"}ve had a passion for technology and computers. My first
        computer was a desktop with a Core 2 Duo that my cousin helped me build.
        I was so excited to play games and learn how to use it. I quickly became
        fasinated by the inner workings of the software and how to create my
        own.
      </p>
      <h3 className="text-left text-balance text-xs font-normal tracking-[0.015em] text-white/75 mt-8 uppercase">
        What I do now?
      </h3>
      <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Today I{"'"}m a Senior Data Engineer, working at{" "}
        <Link
          target="_blank"
          href="https://www.camgian.com/"
          className="z-20 underline hover:cursor-pointer"
        >
          Camgian
        </Link>
        {", "}
        helping fleet managers and maintenance supervisors to make data-driven
        decisions by prioritizing asset maintenance.
      </p>
    </>
  );
}
