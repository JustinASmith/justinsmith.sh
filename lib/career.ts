export type Lane = "root" | "accent" | "pine" | "lake" | "gold";

export type Span = {
  id: string;
  /** Span name as it would appear in a trace viewer. */
  name: string;
  title: string;
  org: string;
  orgUrl?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; omitted while the span is still open. */
  end?: string;
  location: string;
  depth: 0 | 1 | 2;
  lane: Lane;
  summary: string;
  highlights: string[];
  attributes: [string, string][];
  stack: string[];
  events?: { date: string; name: string; note: string }[];
  logs?: { quote: string; by: string }[];
};

export const career: Span[] = [
  {
    id: "career",
    name: "justin.career",
    title: "Software engineer",
    org: "The whole trace",
    start: "2019-08",
    location: "Mississippi, mostly remote",
    depth: 0,
    lane: "root",
    summary:
      "Five-plus years building data-intensive products across Python, TypeScript/React, Rust, SQL, and real-time data systems. I like owning a problem end to end: the design, the prototype, the production rollout, and the observability that proves it works.",
    highlights: [
      "Turning fuzzy problems into shipped, observable software",
      "Streaming and real-time data: Kafka, CDC, ClickHouse, Postgres",
      "Product work end to end: React and Next.js front ends on async Python and Rust services",
      "Building with AI in the loop: agents, MCP, and LLM-powered features",
    ],
    attributes: [
      ["experience", "5+ years"],
      ["languages", "python, typescript, rust, sql, go, java"],
      ["clearance", "U.S. Secret (previously held)"],
      ["home", "starkville, ms"],
    ],
    stack: [],
  },
  {
    id: "msu",
    name: "mississippi-state",
    title: "B.S. in Software Engineering",
    org: "Mississippi State University",
    orgUrl: "https://www.msstate.edu",
    start: "2019-08",
    end: "2021-05",
    location: "Starkville, MS",
    depth: 1,
    lane: "gold",
    summary:
      "Studied software engineering at Mississippi State and graduated cum laude. A month later I was writing production code a few miles from campus.",
    highlights: ["Graduated cum laude with a 3.68 GPA", "Member of Phi Theta Kappa International Honor Society"],
    attributes: [
      ["degree", "B.S. Software Engineering"],
      ["gpa", "3.68"],
      ["honors", "cum laude"],
      ["graduated", "may 2021"],
    ],
    stack: [],
  },
  {
    id: "camgian",
    name: "camgian",
    title: "Software Engineer → Senior Data Engineer",
    org: "Camgian",
    orgUrl: "https://www.camgian.com",
    start: "2021-06",
    end: "2025-02",
    location: "Starkville, MS",
    depth: 1,
    lane: "pine",
    summary:
      "Camgian is a Starkville company building AI and data software for industrial and defense customers. I helped fleet managers and maintenance teams decide what to fix first by getting data off thousands of industrial assets and in front of them, reliably.",
    highlights: [
      "Led a customer-facing proof of concept that secured an $8M U.S. Army contract, iterating on requirements and demoing to engineers and executives",
      "Increased Kafka throughput by 300% and built Prometheus/Grafana monitoring for pipelines processing 13–20M events a day from 2,900+ assets across 50+ sites",
      "Built a fault-tolerant AVEVA PI Historian integration with circuit breakers, checkpointing, and parallel backfill that preserved data through connectivity outages",
      "Translated customer engineering needs into API schemas, streaming patterns, delivery SLAs, and production deployments on tight timelines",
      "Bootstrapped a TypeScript monorepo (Turborepo, Next.js, tRPC, Zustand, Zod, shadcn/ui, Tailwind) with shared components, linting, and code-quality foundations",
      "Helped found the company's first data science unit, opening up new recurring revenue",
    ],
    attributes: [
      ["events_per_day", "13–20M"],
      ["industrial_assets", "2,900+"],
      ["sites", "50+"],
      ["kafka.throughput", "+300%"],
      ["contract.secured", "$8M (U.S. Army)"],
    ],
    stack: ["Kafka", "Kafka Streams", "Avro", "Python", "TypeScript", "Next.js", "PostgreSQL", "Prometheus", "Grafana", "Docker", "Kubernetes"],
    logs: [
      {
        quote:
          "Justin's adaptability and quick uptake of new tools and technologies played a critical role in our team's success. He identified Apache Kafka as the most suitable data engineering tool for extracting, replicating, and transforming data from proprietary systems.",
        by: "Alexander Hines",
      },
    ],
  },
  {
    id: "camgian-swe",
    name: "software-engineer",
    title: "Software Engineer",
    org: "Camgian",
    orgUrl: "https://www.camgian.com",
    start: "2021-06",
    end: "2023-07",
    location: "Starkville, MS",
    depth: 2,
    lane: "pine",
    summary: "Joined a month after graduating and went straight into streaming data.",
    highlights: [],
    attributes: [
      ["parent", "camgian"],
      ["started", "june 2021"],
    ],
    stack: [],
  },
  {
    id: "camgian-sde",
    name: "senior-data-engineer",
    title: "Senior Data Engineer",
    org: "Camgian",
    orgUrl: "https://www.camgian.com",
    start: "2023-07",
    end: "2025-02",
    location: "Starkville, MS",
    depth: 2,
    lane: "pine",
    summary: "Promoted to senior data engineer in July 2023.",
    highlights: [],
    attributes: [
      ["parent", "camgian"],
      ["promoted", "july 2023"],
    ],
    stack: [],
    events: [
      {
        date: "2024-07",
        name: "crowdstrike-outage",
        note: "A client's servers went down in the global CrowdStrike outage.",
      },
    ],
    logs: [
      {
        quote:
          "When our client's servers went down during the CrowdStrike outage, Justin was quick to identify the root cause, reach out to the customer to confirm, and quickly resolve the issue once servers were back online.",
        by: "Camgian internal recognition",
      },
    ],
  },
  {
    id: "estuary",
    name: "estuary",
    title: "Software Engineer, Open Source (Connectors / Integration SDK)",
    org: "Estuary",
    orgUrl: "https://estuary.dev",
    start: "2025-02",
    end: "2026-03",
    location: "Remote",
    depth: 1,
    lane: "lake",
    summary:
      "Estuary is a real-time data integration platform. I worked on its open-source connectors and the Python SDK underneath them: the plumbing that keeps customer data flowing from source systems into warehouses, continuously.",
    highlights: [
      "Architected multi-tenant state management in the Python connector SDK, coordinating 500K+ concurrent streams across 6,500 accounts with independent checkpoints and zero data loss",
      "Scaled connector throughput to GB/min with asyncio and aiohttp for downstream analytics and ML pipelines",
      "Led a zero-downtime migration for 25 enterprise customers, re-architecting a legacy integration while preserving data continuity",
      "Led production incident response across 10+ connectors, working directly with enterprise customers to restore data flows and harden integrations",
      "Drafted an internal RFC for AI-assisted development with Claude Code: reusable practices and custom tooling for connector development",
    ],
    attributes: [
      ["concurrent_streams", "500K+"],
      ["accounts", "6,500"],
      ["data_loss", "0"],
      ["throughput", "GB/min"],
      ["recovery_log.storage", "−80%"],
    ],
    stack: ["Python", "asyncio", "aiohttp", "CDC", "REST APIs", "Docker"],
  },
  {
    id: "origin",
    name: "origin",
    title: "Founding Forward Deployed Engineer",
    org: "Origin",
    orgUrl: "https://www.originhq.com",
    start: "2026-03",
    location: "Remote",
    depth: 1,
    lane: "accent",
    summary:
      "Origin gives companies eyes on what their AI agents are actually doing across their machines: every request, tool call, and file change. I'm a founding forward-deployed engineer there, focused on core product engineering.",
    highlights: [
      "Cut peak memory 95%, bytes read 89%, and runtime 72% on planner-generated ClickHouse queries; moved endpoint-inventory filtering from per-row JSON scans to server-side Rust queries",
      "Expanded the analytics graph for cost attribution by model, provider, tool, effort, organization, and user, then redesigned the token-spend dashboard (it replaced a customer's R&D Grafana board)",
      "Built in-product bug reporting that files to Linear and gathers logs and telemetry from the Origin agent on the affected endpoint, with role-gated artifacts streamed from private S3 through a Google OAuth/RBAC-protected Rust tailnet service",
      "Shipped custom-provider support for any OpenAI-compatible endpoint in dashboard chat, plus an entitlement-gated managed path backed by a KMS-protected OpenRouter key",
      "Built Origin's first automated customer-intelligence brief, combining agent telemetry and traces, Slack context, Python/MCP analytics, and LLM analysis into daily Slack, PDF, and interactive reports",
    ],
    attributes: [
      ["clickhouse.peak_memory", "−95%"],
      ["clickhouse.bytes_read", "−89%"],
      ["clickhouse.runtime", "−72%"],
      ["focus", "core product engineering"],
      ["status", "in progress"],
    ],
    stack: ["Rust", "TypeScript", "React", "Python", "ClickHouse", "MCP", "OpenTelemetry", "AWS", "LLMs"],
  },
];

export const stats = [
  { value: "13–20M", label: "events a day through the Kafka pipelines I scaled and monitored at Camgian" },
  { value: "500K+", label: "concurrent streams kept in sync by the connector state I architected at Estuary" },
  { value: "−95%", label: "peak memory on planner-generated ClickHouse queries at Origin" },
  { value: "$8M", label: "U.S. Army contract secured by a proof of concept I led" },
];
