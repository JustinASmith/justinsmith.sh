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
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Latest <span className="text-primary">Blog Posts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post._id}
              className="flex flex-col bg-white dark:bg-[#1e2a3a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 relative">
                <Image
                  src={post.image || "/default-image.jpg"}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6 flex-grow">
                <Link href={post.slug}>
                  <h3 className="text-xl font-semibold mb-2 text-primary dark:text-carrigreen hover:underline">
                    {post.title}
                  </h3>
                </Link>
                {post.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {post.description}
                  </p>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Read all blog posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
