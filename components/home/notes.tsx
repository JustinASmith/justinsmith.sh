import Link from "next/link";
import { formatDate, publishedNotes } from "@/lib/notes";
import { SectionHeading } from "@/components/section-heading";
import { ArrowRight } from "@/components/icons";

export function Notes() {
  const notes = publishedNotes().slice(0, 3);
  if (!notes.length) return null;

  return (
    <section id="notes" aria-labelledby="notes-title" className="border-t border-rule/70 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="notes-title" index="✎" label="Notes" title={<>Field notes.</>} />
        <ul className="mt-12 divide-y divide-rule/80 border-y border-rule/80">
          {notes.map((note) => (
            <li key={note._id}>
              <Link href={note.slug} className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8">
                <time dateTime={note.date} className="font-mono text-[0.75rem] text-ink-3">
                  {formatDate(note.date)}
                </time>
                <span>
                  <span className="font-display text-[1.6rem] leading-tight font-soft group-hover:text-accent-ink">{note.title}</span>
                  {note.description ? <span className="mt-1 block text-ink-2">{note.description}</span> : null}
                </span>
                <ArrowRight size={18} className="hidden text-ink-3 transition-transform group-hover:translate-x-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/notes" className="link mt-8 inline-flex items-center gap-1.5">
          All notes <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
