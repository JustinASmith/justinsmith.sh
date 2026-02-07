import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { NewsletterForm } from "@/components/integrations/newsletter-form";
import {
  getPostBySlug,
  getPostSlugs,
  formatDate,
  getCategoryLabel,
} from "@/lib/keystatic";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Justin Smith"],
      tags: [...post.tags],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.draft) {
    notFound();
  }

  const content = await post.content();

  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: "Justin Smith",
            url: "https://justinsmith.sh/about",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://justinsmith.sh/blog/${slug}`,
          },
        }}
      />

      <article className="py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-sm">
            <time className="font-mono text-muted-foreground">
              {formatDate(post.date)}
            </time>
            <Badge variant="outline">{getCategoryLabel(post.category)}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {post.description}
          </p>
        </header>

        <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-sm prose-pre:bg-card prose-pre:border prose-pre:border-border">
          {Markdoc.renderers.react(
            Markdoc.transform(content.node),
            React
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>

      {/* Newsletter CTA */}
      <section className="rounded-lg border border-border p-6 mb-16">
        <h2 className="text-lg font-semibold">Enjoyed this post?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Subscribe to get notified when I publish something new.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </section>
    </Container>
  );
}
