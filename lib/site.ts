export const site = {
  name: "Justin Smith",
  url: "https://justinsmith.sh",
  email: "contact@justinsmith.sh",
  role: "Founding Forward Deployed Engineer",
  company: { name: "Origin", url: "https://www.originhq.com" },
  location: "Starkville, Mississippi",
  locationShort: "Starkville, MS",
  timeZone: "America/Chicago",
  description:
    "Software engineer in Starkville, Mississippi. Founding forward-deployed engineer at Origin. I build data-heavy software and the integrations that hold it together, usually right alongside the customers who depend on it.",
  links: {
    github: "https://github.com/JustinASmith",
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
