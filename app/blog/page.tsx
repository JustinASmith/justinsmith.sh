import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { BlogContent } from "@/components/content/blog-content";
import { getPublishedPosts } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about agentic coding, software engineering, career growth, and more.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const serializedPosts = posts.map((p) => ({
    slug: p.slug,
    entry: {
      title: p.entry.title,
      description: p.entry.description,
      date: p.entry.date,
      category: p.entry.category,
      tags: [...p.entry.tags],
    },
  }));

  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on agentic coding, software engineering, and the craft of
          building software.
        </p>
        <Suspense>
          <BlogContent posts={serializedPosts} />
        </Suspense>
      </section>
    </Container>
  );
}
