import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/content/post-list";
import { NewsletterForm } from "@/components/integrations/newsletter-form";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedPosts, getAuthor } from "@/lib/keystatic";

export default async function HomePage() {
  const posts = await getPublishedPosts();
  const author = await getAuthor();
  const latestPosts = posts.slice(0, 3);

  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Justin Smith",
          url: "https://justinsmith.sh",
          author: {
            "@type": "Person",
            name: author?.name ?? "Justin Smith",
            url: "https://justinsmith.sh/about",
          },
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <p className="font-mono text-sm text-primary">Hi, I&apos;m Justin</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Building the future of
          <br />
          <span className="text-primary">agentic coding</span>
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {author?.shortBio ??
            "Software engineer writing about agentic coding, software engineering, and the future of how we build software."}
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read the blog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest Writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="mt-4">
          <PostList posts={latestPosts} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="rounded-lg border border-border p-6 mb-16">
        <h2 className="text-lg font-semibold">Stay Updated</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Get notified when I publish new posts about agentic coding and
          software engineering.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </section>
    </Container>
  );
}
