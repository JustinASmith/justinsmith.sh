import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getPublishedPosts() {
  const posts = await reader.collections.posts.all();
  return posts
    .filter((post) => !post.entry.draft)
    .sort(
      (a, b) =>
        new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime()
    );
}

export async function getPostBySlug(slug: string) {
  return reader.collections.posts.read(slug);
}

export async function getPostSlugs() {
  return reader.collections.posts.list();
}

export async function getSettings() {
  return reader.singletons.settings.read();
}

export async function getAuthor() {
  return reader.singletons.author.read();
}

export async function getProjects() {
  const projects = await reader.collections.projects.all();
  return projects.sort(
    (a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0)
  );
}

export { formatDate, getCategoryLabel } from "./content-utils";
