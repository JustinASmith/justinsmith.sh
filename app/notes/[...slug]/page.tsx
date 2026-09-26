import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, publishedNotes } from "@/lib/notes";
import { Mdx } from "@/components/mdx-components";
import { ArrowRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

async function getNote(params: Props["params"]) {
  const { slug } = await params;
  return publishedNotes().find((note) => note.slugAsParams === slug.join("/"));
}

export function generateStaticParams() {
  return publishedNotes().map((note) => ({ slug: note.slugAsParams.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNote(params);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: note.slug },
    openGraph: { type: "article", title: note.title, description: note.description, publishedTime: note.date },
  };
}

export default async function NotePage({ params }: Props) {
  const note = await getNote(params);
  if (!note) notFound();

  return (
    <article className="container-page py-20 sm:py-28">
      <Link href="/notes" className="eyebrow inline-flex items-center gap-1.5 hover:text-ink">
        <ArrowRight size={14} className="rotate-180" /> All notes
      </Link>
      <header className="mt-8 max-w-3xl">
        <time dateTime={note.date} className="font-mono text-[0.78rem] text-ink-3">
          {formatDate(note.date)}
        </time>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.035em] font-soft">
          {note.title}
        </h1>
        {note.description ? <p className="mt-5 text-xl leading-relaxed text-ink-2">{note.description}</p> : null}
      </header>
      <div className="prose prose-lg mt-12 dark:prose-invert">
        <Mdx code={note.body.code} />
      </div>
    </article>
  );
}
