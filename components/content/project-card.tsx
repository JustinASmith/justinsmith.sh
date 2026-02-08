import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  name: string;
  description: string;
  url?: string | null;
  github?: string | null;
  techStack: readonly string[];
}

export function ProjectCard({
  name,
  description,
  url,
  github,
  techStack,
}: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-border p-5 transition-colors hover:border-primary/30">
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`${name} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Visit ${name}`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
