"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, Star, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  image?: string;
  githubLink?: string;
  demoLink?: string;
  technologies: string[];
  featured?: boolean;
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

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectWithStars;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50",
        project.featured ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      {/* Image */}
      {project.image && (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={cn("p-6", project.image ? "-mt-12 relative z-10" : "")}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {!project.image && (
              <div className="p-2 rounded-lg bg-primary/10">
                <Folder className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              {project.stars !== null && project.stars > 0 && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span>{project.stars}</span>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            )}
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">Demo</span>
              </Link>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default function Projects() {
  const [projectsWithStars, setProjectsWithStars] = useState<ProjectWithStars[]>([]);

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

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I&apos;ve worked on, from data pipelines to
            full-stack applications.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithStars.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link
              href="https://github.com/JustinASmith"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View more on GitHub
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "This modern portfolio website built with Next.js, featuring a git-based CMS with MDX support, dark mode, and beautiful animations. Showcases my work and thoughts through blog posts.",
    image: "/projects/website.png",
    githubLink: "https://github.com/JustinASmith/justinsmith.sh",
    demoLink: "https://justinsmith.sh",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    featured: true,
  },
  {
    title: "Data Pipeline Framework",
    description:
      "A scalable data processing framework built with Python and Apache Kafka for handling high-throughput event streams and real-time analytics.",
    technologies: ["Python", "Kafka", "PostgreSQL", "Docker", "AWS"],
  },
  {
    title: "API Gateway Service",
    description:
      "Microservice architecture implementation with rate limiting, authentication, and request routing for distributed systems.",
    technologies: ["Go", "Redis", "Kubernetes", "gRPC"],
  },
  {
    title: "Real-time Dashboard",
    description:
      "Interactive dashboard for monitoring system metrics and KPIs with real-time updates and customizable visualizations.",
    technologies: ["React", "D3.js", "WebSocket", "Node.js"],
  },
  {
    title: "ML Model Serving",
    description:
      "Production-ready machine learning model serving infrastructure with A/B testing and model versioning capabilities.",
    technologies: ["Python", "FastAPI", "Docker", "MLflow"],
  },
];
