import React from "react";
import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="pb-16 pt-24">
      <div className="flex flex-col items-start justify-center relative z-10">
        <p className="text-primary text-lg font-bold m-0">Hi my name is</p>

        <h1 className="text-[40px] md:text-5xl lg:text-6xl m-0 my-2">
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
          technical skills and creative problem-solving to every project I work
          on.
        </p>

        <Button
          variant="default"
          className="text-md text-secondary font-bold"
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
  );
};

export default Hero;
