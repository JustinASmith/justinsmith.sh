import { site } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { Projects } from "@/components/home/projects";
import { Life } from "@/components/home/life";
import { Notes } from "@/components/home/notes";
import { Contact } from "@/components/home/contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: site.company.name, url: site.company.url },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mississippi State University" },
  address: { "@type": "PostalAddress", addressLocality: "Starkville", addressRegion: "MS", addressCountry: "US" },
  sameAs: [site.links.github, site.links.linkedin],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <Work />
      <Projects />
      <Life />
      <Notes />
      <Contact />
    </>
  );
}
