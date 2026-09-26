import { allPosts } from "contentlayer2/generated";

export function publishedNotes() {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
