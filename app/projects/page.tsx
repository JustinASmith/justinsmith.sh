import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/content/project-card";
import { getProjects } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and contributed to.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Container className="max-w-4xl">
      <section className="py-16">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Things I&apos;ve built and contributed to.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              name={project.entry.name}
              description={project.entry.description}
              url={project.entry.url}
              github={project.entry.github}
              techStack={project.entry.techStack}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            Projects coming soon.
          </p>
        )}
      </section>
    </Container>
  );
}
