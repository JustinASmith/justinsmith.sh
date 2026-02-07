"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PostList } from "@/components/content/post-list";
import { CategoryFilter } from "@/components/content/category-filter";

interface Post {
  slug: string;
  entry: {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: readonly string[];
  };
}

export function BlogContent({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const filteredPosts = useMemo(
    () =>
      category ? posts.filter((p) => p.entry.category === category) : posts,
    [posts, category]
  );

  return (
    <>
      <div className="mt-6">
        <CategoryFilter />
      </div>
      <div className="mt-6">
        <PostList posts={filteredPosts} />
      </div>
    </>
  );
}
