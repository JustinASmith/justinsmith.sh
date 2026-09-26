export const photos = [
  { src: "/photos/first-dance.jpg", alt: "Justin and his wife sharing their first dance at their wedding", caption: "Our first dance." },
  { src: "/photos/disc-golf-cactus-rock.jpg", alt: "Justin throwing a disc from a tee pad in the woods", caption: "Teeing off at Cactus Rock." },
  { src: "/photos/jamaica-coconuts.jpg", alt: "Justin and his wife holding fresh coconuts in Jamaica", caption: "Honeymoon in Jamaica." },
  { src: "/photos/waterfall-hike.jpg", alt: "Justin and his wife smiling in front of a waterfall", caption: "Chasing waterfalls." },
  { src: "/photos/hurts-donuts.jpg", alt: "Justin holding a Hurts Donut bag and a box of donuts", caption: "First trip to Hurts Donut." },
  { src: "/photos/gulf-shores-chair.jpg", alt: "Justin and his wife sitting in a giant beach chair in Gulf Shores, Alabama", caption: "Big chair, Gulf Shores." },
  { src: "/photos/jamaica-zipline.jpg", alt: "Justin and his wife in helmets before ziplining", caption: "Ziplining in Jamaica." },
  { src: "/photos/sunset-bike-ride.jpg", alt: "Justin and his wife with bikes on a bridge at sunset", caption: "Sunset bike ride." },
] as const;

export type Interest = { id: "disc" | "fish" | "dog" | "home"; name: string; note: string; detail: string };

export const interests: Interest[] = [
  { id: "disc", name: "Disc golf", note: "Casual leagues and competitive tournaments.", detail: "Habitat: wooded courses" },
  { id: "fish", name: "Bass fishing", note: "Early mornings on the water, waiting on a bite.", detail: "Habitat: any lake with a boat ramp" },
  { id: "dog", name: "Our Springer Spaniel", note: "Training is ongoing. It is unclear who is training whom.", detail: "Habitat: wherever the tennis ball went" },
  { id: "home", name: "Home projects", note: "DIY, landscaping, and a lot of painting.", detail: "Habitat: the garage" },
];

/** Every catch in the pond reels in one of these. */
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
  "We honeymooned in Jamaica. Ziplines and coconut water were involved.",
  "I play disc golf in casual leagues and in competitive tournaments.",
  "Our Springer Spaniel is in training. So am I, honestly.",
  "I build and maintain the website for a psychiatry practice here in Starkville.",
];

export const fish = [
  { name: "largemouth bass", min: 1.2, max: 7.5, weight: 34 },
  { name: "spotted bass", min: 0.8, max: 3.6, weight: 18 },
  { name: "crappie", min: 0.4, max: 2.3, weight: 16 },
  { name: "bluegill", min: 0.2, max: 1.1, weight: 14 },
  { name: "channel catfish", min: 1.5, max: 12, weight: 12 },
  { name: "old boot", min: 0, max: 0, weight: 6 },
] as const;
