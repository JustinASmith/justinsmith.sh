import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { getAuthor, getSettings } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "About",
  description: "About Justin Smith - Software engineer and writer.",
};

export default async function AboutPage() {
  const author = await getAuthor();
  const settings = await getSettings();

  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          About
        </h1>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{author?.name}</h2>
            {author?.role && (
              <p className="mt-1 text-sm text-muted-foreground">
                {author.role}
                {author.company && (
                  <>
                    {" at "}
                    {author.companyUrl ? (
                      <a
                        href={author.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {author.company}
                      </a>
                    ) : (
                      author.company
                    )}
                  </>
                )}
              </p>
            )}
            {author?.location && (
              <p className="text-sm text-muted-foreground">{author.location}</p>
            )}
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">{author?.bio}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 pt-2">
            {settings?.socialLinks?.github && (
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {settings?.socialLinks?.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            {settings?.socialLinks?.email && (
              <a
                href={`mailto:${settings.socialLinks.email}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
