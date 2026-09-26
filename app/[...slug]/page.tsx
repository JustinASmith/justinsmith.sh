import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPages } from "contentlayer2/generated";
import { Mdx } from "@/components/mdx-components";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

async function getPage(params: Props["params"]) {
  const { slug } = await params;
  return allPages.find((page) => page.slugAsParams === slug.join("/"));
}

export function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slugAsParams.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: page.slug.replace(/^\/pages/, "") } };
}

export default async function Page({ params }: Props) {
  const page = await getPage(params);
  if (!page) notFound();

  return (
    <article className="container-page py-20 sm:py-28">
      <p className="eyebrow">{page.title}</p>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] font-soft">
        {page.description ?? page.title}
      </h1>
      <div className="prose prose-lg mt-12 dark:prose-invert">
        <Mdx code={page.body.code} />
      </div>
    </article>
  );
}
