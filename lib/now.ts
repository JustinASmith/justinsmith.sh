import { site } from "./site";

export type NowStatus = "Day job" | "In progress" | "Exploring" | "Posting" | "Always";

export type NowItem = {
  id: "origin" | "client" | "disc" | "x" | "ai";
  title: string;
  status: NowStatus;
  body: string;
  href?: string;
  linkLabel?: string;
};

/** What's on the workbench. Update `updated` whenever this list changes. */
export const now = {
  updated: "September 2026",
  items: [
    {
      id: "origin",
      title: "Origin's core product",
      status: "Day job",
      body: "Founding FDE, focused on core product engineering for the platform that shows companies what their AI agents are actually doing.",
      href: site.company.url,
      linkLabel: "originhq.com",
    },
    {
      id: "client",
      title: "Visual editor + design refresh",
      status: "In progress",
      body: "For State of Mind Psychiatry: a visual editor so the team can update their own site, and a refined, refreshed design.",
      href: "https://stateofmindpsychiatric.com",
      linkLabel: "The site",
    },
    {
      id: "disc",
      title: "Disc golf product ideas",
      status: "Exploring",
      body: "Early ideas for tools I want as a competitive player.",
    },
    {
      id: "x",
      title: "Building in public on X",
      status: "Posting",
      body: "Sharing what I'm building and learning along the way.",
      href: site.links.x,
      linkLabel: "Follow along",
    },
    {
      id: "ai",
      title: "New AI tools, constantly",
      status: "Always",
      body: "New models, agents, and dev tools, mostly to see how they change the way software gets built.",
    },
  ] satisfies NowItem[],
};
