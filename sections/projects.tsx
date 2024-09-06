import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Github, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  stars?: number;
  githubLink?: string;
  demoLink?: string;
  technologies: string[];
}

export default function Projects() {
  const displayProjects = () => {
    return projects.map((project) => (
      <CardContainer key={project.title} className="inter-var">
        <CardBody className="relative group/card hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-white dark:bg-[#1e2a3a] border-black/[0.1] dark:border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="100" className="w-full mb-4">
            <Image
              src={project.image}
              height={1000}
              width={1000}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={`${project.title} thumbnail`}
            />
          </CardItem>
          <div className="flex justify-between items-center mb-2">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-800 dark:text-[#4ade80]"
            >
              {project.title}
            </CardItem>
            <CardItem
              translateZ={20}
              as="div"
              className="flex items-center gap-2"
            >
              {project.stars && (
                <span className="text-neutral-700 dark:text-white mr-2">
                  {project.stars} ★
                </span>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 text-neutral-700 dark:text-white" />
                </Link>
              )}
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowRight className="w-5 h-5 text-neutral-700 dark:text-white" />
                </Link>
              )}
            </CardItem>
          </div>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 dark:text-neutral-300 text-sm mt-2 mb-4"
          >
            {project.description}
          </CardItem>
          <CardItem translateZ={20} as="div" className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 text-gray-800 dark:bg-[#2d3b4d] dark:text-white text-sm px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </CardItem>
        </CardBody>
      </CardContainer>
    ));
  };

  return (
    <div
      className="py-20 bg-gray-100 dark:bg-[#1f2d39] text-gray-800 dark:text-white"
      id="projects"
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        A small selection of{" "}
        <span className="text-primary">recent projects</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center mt-20 p-4 gap-8">
        {displayProjects()}
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    title: "AstroPaper",
    description:
      "A minimal, accessible and SEO-friendly Astro blog theme. One of the most starred blog templates built with Astro.",
    image:
      "https://images.unsplash.com/photo-1721332155637-8b339526cf4c?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stars: 2271,
    githubLink: "https://github.com/username/astropaper",
    demoLink: "https://astropaper-demo.com",
    technologies: ["Astro", "TypeScript", "React", "TailwindCSS"],
  },
];
