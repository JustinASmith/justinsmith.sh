import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import Hero from "@/sections/hero";
import { WhoAmISection } from "@/sections/who-am-i";
import Projects from "@/sections/projects";
import BlogPosts from "@/sections/blog-posts";
import ContactSection from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoAmISection />
      <Projects />
      <BlogPosts />
      <ContactSection />
    </>
  );
}
