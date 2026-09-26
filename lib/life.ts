export const photos = [
  { src: "/photos/first-dance.jpg", alt: "Justin and his wife sharing their first dance at their wedding", caption: "Our first dance." },
  { src: "/photos/disc-golf-cactus-rock.jpg", alt: "Justin throwing a disc from a tee pad in the woods", caption: "Teeing off at Cactus Rock." },
  { src: "/photos/jamaica-coconuts.jpg", alt: "Justin and his wife holding fresh coconuts in Jamaica", caption: "Honeymoon in Jamaica." },
  { src: "/photos/waterfall-hike.jpg", alt: "Justin and his wife smiling in front of a waterfall", caption: "Chasing waterfalls." },
  { src: "/photos/disc-golf-break.jpg", alt: "Justin sitting on a bench on a wooded disc golf course, his bag at his feet", caption: "Between holes." },
  { src: "/photos/gulf-shores-chair.jpg", alt: "Justin and his wife sitting in a giant beach chair in Gulf Shores, Alabama", caption: "Big chair, Gulf Shores." },
  { src: "/photos/hurts-donuts.jpg", alt: "Justin holding a Hurts Donut bag and a box of donuts", caption: "First trip to Hurts Donut." },
  { src: "/photos/sunset-bike-ride.jpg", alt: "Justin and his wife with bikes on a bridge at sunset", caption: "Sunset bike ride." },
] as const;

export type OffHours = {
  id: "disc" | "wife" | "dog" | "home";
  name: string;
  note: string;
  /** A trace-style attribute line under the note. */
  meta: string;
  /** Optional photo shown in place of the icon. */
  avatar?: string;
};

export const offHours: OffHours[] = [
  {
    id: "disc",
    name: "Disc golf",
    note: "I'm a heavy disc golfer, and I compete a good bit in the MPO (pro) division.",
    meta: "division: MPO",
  },
  {
    id: "wife",
    name: "My wife",
    note: "My best friend. We spend a ton of time together, growing and laughing, and most of the photos below are ours.",
    meta: "role: best friend",
  },
  {
    id: "dog",
    name: "Scout",
    note: "My best buddy, and my coworker since I work from home. We play, learn, and keep each other company.",
    meta: "role: best buddy, coworker",
    avatar: "/photos/scout-avatar.jpg",
  },
  {
    id: "home",
    name: "DIY home projects",
    note: "Lots of them. There's always a next project around the house.",
    meta: "status: always mid-project",
  },
];

export const scout = {
  name: "Scout",
  breed: "Springer Spaniel",
  born: "2024-09-01",
  photos: [
    { src: "/photos/scout-puppy.jpg", alt: "Scout as a puppy, sitting in front of a stone wall", caption: "Day one." },
    { src: "/photos/scout-christmas.jpg", alt: "Scout lying on a wood floor in front of a Christmas tree", caption: "Supervising Christmas." },
    { src: "/photos/scout.jpg", alt: "Scout, grown up, sitting in a yard with pine trees behind him at sunset", caption: "All grown up." },
  ],
} as const;

/** Every putt you sink reveals one of these. */
export const facts = [
  "My first computer was a Core 2 Duo desktop my cousin helped me build. I wanted it for games; I stayed for the software.",
  "I was born in Michigan and raised in Northeast Mississippi.",
  "I graduated cum laude from Mississippi State with a B.S. in Software Engineering.",
  "I used to hold a U.S. Secret security clearance.",
  "When the 2024 CrowdStrike outage took down a client's servers, I tracked down the root cause and got their data flowing again.",
  "The Kafka pipelines I worked on at Camgian moved 13–20 million events a day from 2,900+ industrial assets.",
  "I once cut a ClickHouse query's peak memory by 95%.",
  "At Estuary I helped keep 500,000+ concurrent streams in sync across 6,500 accounts, with zero data loss.",
  "I led the proof of concept that won an $8M U.S. Army contract.",
  "At Estuary I drafted an internal RFC on AI-assisted development with Claude Code.",
  "I compete in disc golf's MPO division. That's the pro one.",
  "My wife is my best friend. Most of the photos on this page are of the two of us.",
  "We honeymooned in Jamaica. Ziplines and coconut water were involved.",
  "Our Springer Spaniel, Scout, was born on September 1, 2024.",
  "We drove three and a half hours to bring Scout home. I had to convince my wife first.",
  "Scout is my full-time coworker. I work from home, so we play, learn, and keep each other company.",
  "I build and maintain the website for a psychiatry practice here in Starkville.",
  "I'm always building something: client work, disc golf product ideas, and experiments with new AI tools.",
];
