import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, publishedNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Field notes from Justin Smith on data systems, customer engineering, and building things that hold up.",
  alternates: { canonical: "/notes" },
};

export default function NotesIndex() {
  const notes = publishedNotes();

  return (
    <div className="container-page py-20 sm:py-28">
      <p className="eyebrow">Notes</p>
      <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-[-0.04em] font-soft">
        Field <span className="italic text-accent font-wonk">notes</span>.
      </h1>
      {notes.length ? (
        <ul className="mt-14 divide-y divide-rule/80 border-y border-rule/80">
          {notes.map((note) => (
            <li key={note._id}>
              <Link href={note.slug} className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8">
                <time dateTime={note.date} className="font-mono text-[0.75rem] text-ink-3">
                  {formatDate(note.date)}
                </time>
                <span>
                  <span className="font-display text-[1.7rem] leading-tight font-soft group-hover:text-accent-ink">{note.title}</span>
                  {note.description ? <span className="mt-1 block text-ink-2">{note.description}</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 max-w-xl text-lg leading-relaxed text-ink-2">
          <p>Nothing here yet. I&rsquo;m saving this space for things worth writing down.</p>
          <p className="mt-4">
            In the meantime, you can{" "}
            <Link href="/#work" className="link">
              read the trace
            </Link>{" "}
            or{" "}
            <Link href="/#life" className="link">
              go fishing
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
