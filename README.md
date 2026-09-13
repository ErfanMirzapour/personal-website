# Erfan Mirzapour — personal website

Astro + TypeScript portfolio and writing site for **erfanmirzapour.ir**. Content is kept in Git; no CMS, database, analytics, or contact form is required.

## Run locally

Requires Node.js 22.12+ and pnpm 9.12.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://127.0.0.1:4321/designs/** to compare five working designs. Each has a homepage, writing index, and clearly marked sample article. These routes exist only during development.

**No design has been selected and nothing is deployed.** The root route uses editorial solely as a build-test fallback. `pnpm build:release` refuses publication until `design` is set after Erfan’s choice.

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
pnpm check
pnpm build
pnpm test:build
pnpm exec playwright install chromium
pnpm test
```

Browser tests cover each design on desktop and mobile, keyboard navigation, writing routes, overflow, and axe accessibility checks. Build tests check metadata, schema, sitemap and unpublished-content exclusion. GitHub Actions runs these on PRs and main.

## Workflow

Create a linked issue → branch under `codex/` → implement and test → open a PR → request Codex review → address findings → merge after checks. The initial design PR remains open for selection. Hosting is not connected yet.

See [deployment and SEO runbook](docs/deployment.md) for launch, DNS, indexing, and rollback.
