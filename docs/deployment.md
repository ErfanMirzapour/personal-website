# Publication and SEO runbook

## Current checkpoint

Erfan must choose one of the five local designs before any deployment. No account, DNS, hosting, or Google Search Console changes have been made. The root route is an editorial test fallback, not a user selection. Preview builds default to noindex and robots disallow.

## After selection

1. Set `design` in `src/data/publication.json` to the agreed ID. Remove the unused design implementations and gallery in a follow-up PR; update browser tests to cover the selected production pages.
2. Review actual content, contact links, and the chosen layouts with Erfan. Leave the writing empty state until there is approved writing.
3. Run all checks. Run Lighthouse on the static production build for home, writing, and an actual article when available. Target ≥95 performance, accessibility, and SEO; inspect the underlying audits and record results. Scores are lab measurements, not ranking guarantees. Verify real-user Core Web Vitals after enough traffic exists.
4. Connect the GitHub repository to Cloudflare Pages, production branch `main`, Node 22, install with frozen pnpm lockfile, build command `pnpm build:release`, output `dist`.
5. The release script sets PUBLIC_SITE_ENV=production only for the production branch, and preview for non-main Cloudflare branches. Preview pages carry noindex. Keep comparison designs local-only. Validate this behavior on the actual platform before launch.
6. Verify the provider URL: asset loading, redirects, missing routes returning HTTP 404, canonical URLs, JSON-LD, sitemap, and empty writing state. The presence of `404.html` prevents Pages from treating the site as an SPA fallback.

## Domain: erfanmirzapour.ir

The domain owner has confirmed control. Earlier DNS lookups returned SERVFAIL; this is not proof of expiry. Do a fresh authoritative check at launch.

- Export/record the existing DNS zone before changes. Preserve MX, SPF, DKIM, DMARC and all other unrelated records. DNS checks alone cannot discover every service or selector; obtain the zone listing from the dashboard.
- Add the domain to the owner’s Cloudflare account. For the apex on Pages, Cloudflare DNS nameservers are required. Copy the **exact two assigned nameservers** from Cloudflare into the current domain registrar’s dashboard; do not guess values. If DNSSEC is enabled, coordinate DS records with the provider’s documented migration flow.
- Add `erfanmirzapour.ir` and `www.erfanmirzapour.ir` through Pages custom domains. Follow the records supplied by Cloudflare and wait for certificates to become active.
- `_redirects` redirects www to the canonical apex while retaining the path. Verify real HTTP behavior, including query strings, on Cloudflare. Configure the provider-hostname redirect via Cloudflare rules after validating the custom domain; do not guess a pages.dev hostname now.
- Verify HTTPS, apex/www redirects, deep article URLs, and existing email delivery after the DNS change.

## SEO

The site generates static HTML, unique titles/descriptions, canonical URLs, Open Graph/Twitter text metadata, Person JSON-LD, and article BlogPosting JSON-LD. No invented image metadata. Drafts and future articles do not produce routes. Sitemap excludes preview routes and 404.

Only the selected production build should allow indexing. Check final HTML robots metadata and robots.txt at the live domain. `noindex` is not access control; development samples must remain absent from deployed files.

Create a Google Search Console Domain property for erfanmirzapour.ir in the owner’s account. Add its exact TXT verification token to DNS, verify ownership, and submit https://erfanmirzapour.ir/sitemap-index.xml. Use URL Inspection for home, writing and the first real article. Search Console needs the owner’s account access; it is not configured by source code alone.

## Rollback

Select the last known-good production deployment in Cloudflare Pages and use its rollback action. Then revert the faulty PR through a new GitHub PR so source and deployed output converge. Avoid force-pushing main. Confirm the domain serves the restored content and canonical metadata. Save a known-good deployment before each launch.

## Codex GitHub review

The repository must be connected in Codex cloud and enabled in Codex Code review settings. Request review by commenting `@codex review` on the PR. A posted trigger alone is not a completed review: verify a reaction/review appears. If unavailable, ask the owner to enable the new repository, retaining the PR for review rather than claiming approval.
