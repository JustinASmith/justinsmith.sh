import { Github, Linkedin } from "lucide-react";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Justin Smith
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/JustinASmith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/justin-a-smith662/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
