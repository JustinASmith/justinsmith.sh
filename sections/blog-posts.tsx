"use client";

import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";

export default function BlogPosts() {
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <section
      className="py-20 bg-background text-gray-800 dark:text-white"
      id="blog"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Latest from the <span className="text-primary">Blog</span>
        </h2>
        {featuredPosts.length > 0 ? (
          <>
            <ul className="mt-20 space-y-6">
              {featuredPosts.map((post) => (
                <li
                  key={post._id}
                  className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                >
                  <article>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link
                        href={post.slug}
                        className="text-primary dark:text-carrigreen hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        {post.description}
                      </p>
                    )}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="text-primary hover:underline font-medium"
              >
                Read all blog posts &rarr;
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No blog posts available yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
