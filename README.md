# Erfan Mirzapour — personal website

Astro + TypeScript personal site for **erfanmirzapour.ir**: photo, short summary, skills, career, education, and how to get in touch. Content is kept in Git; no CMS, database, or contact form is required.

## Run locally

Requires Bun 1.4.2 or newer.

```sh
bun install --frozen-lockfile
bun run dev
```

Open **http://127.0.0.1:4321/**.

## Design

The site is a single page built in `src/components/Orbit.astro`: a dark blue-grey space theme inspired by cosmology and quantum physics.

- A canvas starfield (`src/scripts/cosmos.ts`) with depth-based scroll and pointer parallax, plus small particle pairs that appear and annihilate.
- The portrait as the nucleus of a 3D atom, with skills orbiting on three tilted shells (CSS 3D transforms and an animated `@property` angle).
- Scroll-driven animations for the hero parallax, the summary lighting up word by word, skill tiles, the career timeline beam and the progress bar. They are progressive enhancement: browsers without scroll-driven animations, such as Firefox, show the finished state.
- Everything respects `prefers-reduced-motion`.

## Content

- `src/data/site.ts`: summary, email/Telegram/social links, skills, career, and education.
- `src/components/SocialIcons.astro`: footer icons (from `simple-icons`, with LinkedIn and email drawn by hand).
- `src/assets/images/erfan-portrait.jpg`: the portrait. Astro generates the responsive AVIF/WebP versions.
- Fonts are self-hosted through `@fontsource` packages, so they work with the site's Content Security Policy.

## Checks

```sh
bun run check
bun run build:release
bun run test:build
bunx playwright install chromium firefox webkit
bun run test
```

Browser tests cover the production design in Chromium, Firefox, and WebKit on desktop and mobile. They verify content, the skip link, horizontal overflow, and axe accessibility checks. Build tests check metadata, schema, sitemap, and that the removed blog stays out of production. GitHub Actions runs these checks on PRs and `main`.

## Workflow

Create a linked issue → branch under `codex/` → implement and test → open a PR → request Codex review → address findings → merge after checks. Merging prepares a release but does not deploy production. A stable GitHub Release with a tag matching `package.json` (for example, `v1.0.0`) triggers the production deployment.

See the [deployment and SEO runbook](docs/deployment.md) for launch, releases, DNS, indexing, and rollback, and [platform decisions](docs/platform.md) for browser support, images, and Cloudflare services.
