import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { PostList } from "@/components/content/post-list";
import { CategoryFilter } from "@/components/content/category-filter";
import { getPublishedPosts } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about agentic coding, software engineering, career growth, and more.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const posts = await getPublishedPosts();

  const filteredPosts = params.category
    ? posts.filter((p) => p.entry.category === params.category)
    : posts;

  return (
    <Container>
      <section className="py-16">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on agentic coding, software engineering, and the craft of
          building software.
        </p>
        <div className="mt-6">
          <Suspense>
            <CategoryFilter />
          </Suspense>
        </div>
        <div className="mt-6">
          <PostList posts={filteredPosts} />
        </div>
      </section>
    </Container>
  );
}
