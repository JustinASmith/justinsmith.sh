import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">Error 404 · Out of bounds</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-[-0.04em] font-soft">
          That one went in the <span className="italic text-accent font-wonk">water</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-2">
          The page you were looking for doesn&rsquo;t exist. Take the penalty stroke and head back to the tee.
        </p>
        <Link href="/" className="btn-primary mt-9">
          Back to the tee <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
