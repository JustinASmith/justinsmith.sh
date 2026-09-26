export const site = {
  name: "Justin Smith",
  url: "https://justinsmith.sh",
  email: "contact@justinsmith.sh",
  role: "Software Engineer",
  company: { name: "Origin", url: "https://www.originhq.com" },
  location: "Starkville, Mississippi",
  locationShort: "Starkville, MS",
  timeZone: "America/Chicago",
  description:
    "Software engineer in Starkville, Mississippi, building Origin's core product. I build data-heavy software, from the pipelines underneath to the interfaces people use, and I'm always building something on the side.",
  links: {
    github: "https://github.com/JustinASmith",
    /** Set to the full profile URL (e.g. "https://x.com/handle") to show X links across the site. */
    x: undefined as string | undefined,
    linkedin: "https://www.linkedin.com/in/justin-a-smith662/",
    source: "https://github.com/JustinASmith/justinsmith.sh",
    estuaryPrs:
      "https://github.com/estuary/connectors/pulls?q=is%3Apr+is%3Amerged+author%3AJustinASmith",
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Life", href: "/#life", id: "life" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
