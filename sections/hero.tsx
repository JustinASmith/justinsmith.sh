import React from "react";
import { SendIcon } from "lucide-react";
import { Button } from "../components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-background bg-grid-black/[0.05] dark:bg-grid-white/[0.05]">
      <div className="prose dark:prose-invert max-w-4xl mx-auto py-24">
        <div
          className="absolute pointer-events-none inset-0 h-full flex items-center justify-center
         bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"
        />
        <div className="hidden lg:block absolute left-0 top-[27ch] h-36 w-16 bg-transparent antialiased bg-dot-[#009969] dark:bg-dot-[#07cf90]"></div>
        <div className="hidden lg:block absolute top-[17ch] right-0 h-24 w-20 bg-transparent antialiased bg-dot-[#009969] dark:bg-dot-[#07cf90]"></div>
        <div className="container w-full flex flex-col items-start justify-center relative z-10">
          <p className="text-primary text-lg font-bold m-0">Hi my name is</p>

          <h1 className="text-[40px] md:text-5xl lg:text-6xl m-0 my-2 ">
            Justin Smith
          </h1>

          <h2 className="text-[20px] md:text-3xl lg:text-5xl m-0 my-3 font-semibold text-primary">
            A Full-Stack Engineer
          </h2>

          <p className="text-md lg:text-lg">
            I am a data-driven Software Engineer with a passion for delivering
            results and learning hard things. With my expertise in React and
            NextJS on the frontend, and TypeScript (tRPC) and Python
            (FastAPI/Flask) on the backend, I bring a unique combination of
            technical skills and creative problem-solving to every project I
            work on.
          </p>

          <Button
            variant="default"
            className="text-md text-white font-bold text-md"
            asChild
          >
            <a
              className="decoration-0 outline-none no-underline"
              href="mailto:contact@justinsmith.sh"
            >
              Get in touch
              <SendIcon className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
