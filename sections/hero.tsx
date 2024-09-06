import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 md:px-20 max-w-7xl mx-auto min-h-screen flex items-center">
      <span
        aria-hidden="true"
        className="bg-text absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 text-gray-100 dark:text-[#21303c] text-9xl scale-150 tracking-wide font-bold select-none pointer-events-none text-center z-0 w-full"
      >
        PASSIONATE ENGINEER CREATIVE DATA-DRIVEN
      </span>

      <div className="z-10 relative flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <span className="text-primary text-xl font-bold dark:text-carrigreen block">
              Hi, my name is
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Justin Smith
            </h1>
            <span className="text-2xl md:text-3xl lg:text-4xl block text-primary dark:text-carrigreen font-semibold">
              Engineer & Data Specialist
            </span>
          </div>
          <div className="space-y-4">
            <p className="text-xl leading-relaxed">
              I&apos;m a Senior Data Engineer passionate about transforming
              complex data into powerful, actionable insights.
            </p>
            <p className="text-xl leading-relaxed">
              I architect and build powerful distributed systems and scalable
              software solutions. My expertise spans complex backend
              infrastructures and intuitive frontend experiences. Let&apos;s
              connect and explore how my skills in data engineering and software
              development can propel your next big project forward.
            </p>
          </div>
          <button className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Contact Me
          </button>
        </div>

        <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/headshot.png"
              alt="Justin Smith headshot"
              width={1715}
              height={2196}
              priority
              className="w-full h-auto block dark:hidden"
            />
            <Image
              src="/headshot-dark.png"
              alt="Justin Smith headshot (dark mode)"
              width={1715}
              height={2196}
              priority
              className="w-full h-auto hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
