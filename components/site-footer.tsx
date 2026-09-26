import Link from "next/link";
import { site } from "@/lib/site";
import { CowbellButton } from "./cowbell-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule/70">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-sm">
            <span className="text-ink-3">~/</span>justinsmith<span className="text-accent">.sh</span>
          </p>
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} {site.name}. Made in {site.location}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-3">
          <Link href="/colophon" className="hover:text-ink">
            Colophon
          </Link>
          <a href={site.links.source} className="hover:text-ink" target="_blank" rel="noreferrer">
            Source
          </a>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            Press <kbd className="kbd">/</kbd> for a shell
          </span>
          <CowbellButton />
        </div>
      </div>
    </footer>
  );
}
