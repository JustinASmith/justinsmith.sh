"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  githubLink?: string;
  demoLink?: string;
  technologies: string[];
}

interface ProjectWithStars extends Project {
  stars: number | null;
}

async function fetchGitHubStars(url: string): Promise<number | null> {
  if (!url) return null;
  const repoPath = url.replace("https://github.com/", "");
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return null;
  }
}

export default function Projects() {
  const [projectsWithStars, setProjectsWithStars] = useState<
    ProjectWithStars[]
  >([]);

  useEffect(() => {
    const fetchStars = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => ({
          ...project,
          stars: project.githubLink
            ? await fetchGitHubStars(project.githubLink)
            : null,
        }))
      );
      setProjectsWithStars(updatedProjects as ProjectWithStars[]);
    };

    fetchStars();
  }, []);

  const displayProjects = () => {
    return projectsWithStars.map((project) => (
      <Link
        key={project.title}
        href={project.githubLink || project.demoLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-auto sm:w-[30rem]"
      >
        <CardContainer className="inter-var">
          <CardBody className="relative group/card hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] bg-white dark:bg-[#1e2a3a] border-black/[0.1] dark:border-white/[0.2] w-full h-auto rounded-xl p-6 border">
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
                {project.stars !== null && (
                  <span className="text-neutral-700 dark:text-white mr-2">
                    {project.stars} ★
                  </span>
                )}
                <Github className="w-5 h-5 text-neutral-700 dark:text-white" />
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
      </Link>
    ));
  };

  return (
    <div
      className="py-20 bg-gray-100 dark:bg-[#1f2d39] text-gray-800 dark:text-white"
      id="projects"
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        A Small Selection of{" "}
        <span className="text-primary">Recent Projects</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-8">
        {displayProjects()}
      </div>
    </div>
  );
}

const projects = [
  {
    title: "This Website",
    description:
      "This website is a portfolio of my work and a blog of my thoughts. Built with Next.js, TailwindCSS, and MDX. Deployed on Vercel.",
    image: "/projects/website.png",
    githubLink: "https://github.com/JustinASmith/justinsmith.sh",
    demoLink: "https://justinsmith.sh",
    technologies: ["TypeScript", "React", "TailwindCSS", "Next.js", "MDX"],
  },
] as Project[];
