import type { MetadataRoute } from "next";
import { allPages } from "contentlayer2/generated";
import { publishedNotes } from "@/lib/notes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/notes`, changeFrequency: "monthly", priority: 0.6 },
    ...publishedNotes().map((note) => ({ url: `${site.url}${note.slug}`, lastModified: note.date, priority: 0.7 })),
    ...allPages.map((page) => ({ url: `${site.url}/${page.slugAsParams}`, priority: 0.3 })),
  ];
}
