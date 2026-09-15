# Erfan Mirzapour — personal website

Astro + TypeScript portfolio and writing site for **erfanmirzapour.ir**. Content is kept in Git; no CMS, database, or contact form is required.

## Run locally

Requires Bun 1.4.2 or newer.

```sh
bun install --frozen-lockfile
bun run dev
```

Open **http://127.0.0.1:4321/designs/** to compare five working designs. Each has a homepage, writing index, and clearly marked sample article. These routes exist only during development.

The selected production design is the dark developer notebook. The comparison routes are development-only and production builds exclude them. The provider deployment is available at **https://erfanmirzapour.pages.dev** while the custom domain is being activated.

## Content

- `src/data/site.ts`: profile, email/social links, skills, experience, and hobbies.
- `src/content/blog/`: trusted Markdown or MDX articles. The filename determines the stable URL (`my-post.md` → `/blog/my-post/`).
- `src/data/publication.json`: comparison directions and the final selection.

Example article frontmatter:

```yaml
---
title: Your article title
description: A specific summary for readers and search engines.
pubDate: 2026-09-14
draft: true
---
```

Add the body below the frontmatter. Use `updatedDate` only for a real revision. Drafts default to true, and future-dated posts are excluded. Scheduled posts need a new build after the publication date; there is no background scheduler. Set `draft: false` only after the writing is ready. Do not commit confidential drafts to this **public repository**: draft filtering hides them from the website, not GitHub history. MDX is trusted executable repository content.

## Checks

```sh
bun run check
bun run build:release
bun run test:build
bunx playwright install chromium firefox webkit
bun run test
```

Browser tests cover the production design in Chromium, Firefox, and WebKit on desktop and mobile. They verify keyboard navigation, writing routes, overflow, and axe accessibility checks. Build tests check metadata, schema, sitemap, and unpublished-content exclusion. GitHub Actions runs these checks on PRs and `main`.

## Workflow

Create a linked issue → branch under `codex/` → implement and test → open a PR → request Codex review → address findings → merge after checks. Merging prepares a release but does not deploy production. A stable GitHub Release with a tag matching `package.json` (for example, `v1.0.0`) triggers the production deployment.

See the [deployment and SEO runbook](docs/deployment.md) for launch, releases, DNS, indexing, and rollback, and [platform decisions](docs/platform.md) for browser support, images, and Cloudflare services.
