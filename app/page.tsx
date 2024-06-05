import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Hero from "@/sections/hero";
import { WhoAmISection } from "@/sections/who-am-i";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhoAmISection />
      <section className="prose dark:prose-invert bg-background">
        {allPosts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
      </section>
    </div>
  );
}
