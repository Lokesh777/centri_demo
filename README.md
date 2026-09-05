# Ballance — Next.js 16 design study

A multi-page marketing site rebuilt in Next.js 16, modelled on the layout and
information architecture of the [Ballance Framer template](https://ballance.framer.website).
The visual system mirrors the reference (night-navy hero, `#f93f28` accent, warm
cream neutrals, mono eyebrow labels); all body copy is written from scratch.

## Stack

| Concern       | Choice                                                    |
| ------------- | --------------------------------------------------------- |
| Framework     | Next.js 16.3 (App Router, Turbopack, React 19.2)           |
| Language      | TypeScript, `strict`                                       |
| Styling       | Tailwind CSS v4 with an `@theme` token layer               |
| Animation     | `motion` v13 via `LazyMotion` + `m.*`                      |
| Fonts         | Inter Tight + JetBrains Mono through `next/font`           |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Routes

| Route              | Rendering | Notes                                        |
| ------------------ | --------- | -------------------------------------------- |
| `/`                | Static    | Hero → stats → capabilities → audiences → stories → compliance → FAQ → CTA |
| `/pricing`         | Static    | Three tiers, monthly/yearly toggle           |
| `/company`         | Static    | Story, values, timeline                      |
| `/customers`       | Static    | Story index                                  |
| `/customers/[slug]`| SSG       | Full case-study pages                        |
| `/blog`            | Static    | Featured post + grid                         |
| `/blog/[slug]`     | SSG       | Article pages                                |
| `/careers`         | Static    | Roles by team, benefits                      |
| `/contact`         | Dynamic   | Server Action form; prefills `?email=`       |
| `/legal/[slug]`    | SSG       | Terms, privacy, cookies                      |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from content modules    |
| `*`                | Static    | Custom `not-found`                           |

## Architecture

```
app/                routes only — pages compose sections, hold no styling logic
components/
  layout/           header (full-screen menu) and footer
  motion/           MotionProvider, Reveal/RevealGroup, Counter
  sections/         page-level compositions
  seo/              JSON-LD builders
  ui/               primitives (button, section, accordion, icons)
content/            typed readonly content modules — the single source of copy
  media.ts          every remote image URL, in one file
lib/utils.ts        cn(), price and date formatting
```

Four rules keep it navigable:

1. **Content is data.** Every string a visitor reads lives in `content/*.ts` as a
   typed `readonly` export. Components take content as props, never inline copy.
2. **Tokens are the only colours.** `app/globals.css` defines the whole palette,
   type scale, radii and easing in one `@theme` block. No hex value appears
   anywhere else in the codebase.
3. **All imagery flows through `content/media.ts`.** One file to repoint when the
   assets move.
4. **Client components are leaves.** `"use client"` appears on six files: the
   header, motion provider, Reveal, Counter, accordion, story rail, pricing
   toggle and contact form. Everything else renders on the server.

## Motion

`MotionProvider` wraps the tree once and does three jobs:

- `LazyMotion` + `domAnimation` loads roughly a third of the full `motion`
  bundle, and `strict` makes `m.*` the only usable API — importing `motion.*`
  below it throws rather than silently shipping the whole library.
- `MotionConfig reducedMotion="user"` disables transform and opacity animation
  for anyone who has asked their OS for reduced motion, so no component needs
  its own media query.
- `Reveal` / `RevealGroup` / `RevealItem` cover scroll-in and stagger; `Counter`
  tweens the stat figures and collapses to zero duration under reduced motion.

The story rail deliberately uses native scroll-snap rather than a drag library:
keyboard and trackpad behaviour come free, it works before hydration, and it
costs nothing in bundle size.

## SEO

- Per-route `metadata` with a title template, canonicals, Open Graph and Twitter.
- JSON-LD for `Organization`, `WebSite`, `FAQPage`, `BreadcrumbList` and
  `Article`, built from the same content modules that render the pages.
- `app/sitemap.ts` and `app/robots.ts` generated from content, so new posts and
  stories appear automatically.

## Performance notes

- The hero image carries `priority` + `fetchPriority="high"` as the LCP element;
  everything else lazy-loads with explicit `sizes`.
- AVIF/WebP negotiated by the built-in optimizer, with a 30-day cache TTL.
- `preconnect` + `dns-prefetch` to the image CDN in `<head>`.
- Every image has intrinsic dimensions or `fill` inside a fixed-ratio box, so
  there is no layout shift.
- The home-page email capture is a plain GET form — zero JS, works before
  hydration, and hands off to the real form on `/contact`.

## Deliberate choices worth knowing

- **Every interior page gets a dark masthead.** That way the fixed header only
  ever renders white-on-dark and needs no per-route tone switching.
- **Light-only.** `color-scheme: light`; the design supplies its own dark
  sections rather than inverting.
- **`content/legal.ts` is placeholder text.** It reads plausibly, which makes it
  more dangerous than obvious lorem ipsum — replace before any real use.
- **Remote images are hotlinked from Framer's CDN** at the URLs supplied. See
  the caveat below.

## Before this goes anywhere public

The images in `content/media.ts` are served from `framerusercontent.com` — they
belong to that template, not to this project, and hotlinking a third party's CDN
is neither reliable nor licensed. Swap them for your own assets (one file to
edit, plus the `remotePatterns` host in `next.config.ts`).
