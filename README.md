# justinsmith.sh

My personal site: a warm "field notes" look with a few moving parts. It has a career timeline drawn like an observability trace, a live "right now in Starkville" status, a disc golf putting game that reveals fun facts, and a tiny shell (press <kbd>/</kbd>).

Built with Next.js (App Router), Tailwind CSS, and MDX via Contentlayer. Deployed on Vercel.

## Run it

```bash
pnpm install
pnpm dev        # contentlayer + next dev
pnpm build      # production build
pnpm lint
pnpm typecheck
```

## Editing content

Most of the words live in plain data files, so you rarely need to touch components.

| What | Where |
| --- | --- |
| Name, email, links (set `links.x` to show X everywhere), time zone | `lib/site.ts` |
| Career trace spans and stats | `lib/career.ts` |
| "On the workbench" board | `lib/now.ts` |
| "Right now in Starkville" guesses | `lib/time.ts` |
| Photos, captions, off-hours list, Scout, putting-game facts | `lib/life.ts` |
| Projects | `components/home/projects.tsx` |
| Pages (e.g. `/colophon`) | `content/pages/*.mdx` |
| Notes (blog posts) | `content/notes/*.mdx` |

A note needs `title` and `date` front matter. Set `draft: true` to hide it. The Notes section on the home page appears automatically once there's at least one published note.

```mdx
---
title: Hello, again
description: Why I rebuilt this site.
date: 2026-10-01
---

Words go here.
```

## Structure

```
app/                  routes, metadata, icons, OG image, sitemap/robots
components/home/      home page sections (hero, work/trace, projects, life, contact)
components/shell/     the "/" command palette
lib/                  content data and small helpers
public/images         the headshot cut-out
public/photos         camera-roll photos
public/work           project screenshots
```
