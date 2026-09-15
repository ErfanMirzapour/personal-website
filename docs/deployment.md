# Publication and SEO runbook

## Current checkpoint

The selected dark developer-notebook design is deployed at `https://erfanmirzapour.pages.dev`. The apex and `www` custom domains are attached to the Pages project and are waiting for the Cloudflare DNS zone and nameserver change. Google Search Console is not configured yet.

Preview builds default to `noindex` and a disallowing `robots.txt`. Production builds use `PUBLIC_SITE_ENV=production`, exclude comparison designs and draft content, and allow indexing.

## Release policy

Pull requests run checks but never publish the production site. Merges to `main` accumulate releasable work. Publish a stable GitHub Release when the change should become public:

- Patch (`v1.0.1`): copy corrections, dependency/security updates, accessibility fixes, and small styling bugs.
- Minor (`v1.1.0`): a new article, portfolio section, major content update, or backward-compatible feature.
- Major (`v2.0.0`): a redesign, route migration, or other change that intentionally breaks stable URLs or established behavior.

Before publishing a release, update the `package.json` version in a PR, merge it after checks and review, then create a GitHub Release from that exact `main` commit with a matching `vX.Y.Z` tag. Draft and prerelease releases do not deploy. Publishing a stable release triggers `.github/workflows/release.yml`, which verifies the version, rebuilds with Bun, runs production-output tests, and uploads `dist` to Cloudflare Pages.

Configure the GitHub `production` environment with `CLOUDFLARE_ACCOUNT_ID` and a scoped `CLOUDFLARE_API_TOKEN` that can edit Pages. Add a required reviewer if a separate approval after publishing the release is desired. Keep Cloudflare automatic Git production builds disabled so GitHub Releases remain the single production trigger.

The initial `v1.0.0` release is gated on the custom domain becoming active, live Lighthouse checks reaching the agreed targets, and Search Console readiness.

On 2026-09-15, local production builds of the homepage and writing index each scored 100 for Lighthouse performance, accessibility, best practices, and SEO, with zero layout shift and zero total blocking time. Repeat these measurements on the custom domain because local laboratory results do not include real Cloudflare, DNS, or network behavior.

## Domain: erfanmirzapour.ir

The domain owner has confirmed control. Earlier DNS lookups returned SERVFAIL; this is not proof of expiry. Do a fresh authoritative check at launch.

- Export/record the existing DNS zone before changes. Preserve MX, SPF, DKIM, DMARC and all other unrelated records. DNS checks alone cannot discover every service or selector; obtain the zone listing from the dashboard.
- Add the domain to the owner’s Cloudflare account. For the apex on Pages, Cloudflare DNS nameservers are required. Copy the **exact two assigned nameservers** from Cloudflare into the current domain registrar’s dashboard; do not guess values. If DNSSEC is enabled, coordinate DS records with the provider’s documented migration flow.
- Add `erfanmirzapour.ir` and `www.erfanmirzapour.ir` through Pages custom domains. Follow the records supplied by Cloudflare and wait for certificates to become active.
- `_redirects` redirects www to the canonical apex while retaining the path. Verify real HTTP behavior, including query strings, on Cloudflare. Configure the provider-hostname redirect via Cloudflare rules after validating the custom domain; do not guess a pages.dev hostname now.
- Verify HTTPS, apex/www redirects, deep article URLs, and existing email delivery after the DNS change.

## SEO

The site generates static HTML, unique titles/descriptions, canonical URLs, Open Graph/Twitter text metadata, Person JSON-LD, and article BlogPosting JSON-LD. No invented image metadata. Drafts and future articles do not produce routes. Sitemap excludes preview routes and 404.

Only the selected production build allows indexing. CI verifies unique titles, descriptions, and canonical URLs; matching Open Graph metadata; logical page headings; structured data; sitemap membership; and draft exclusion. Check the final HTML and `robots.txt` again at the live domain. `noindex` is not access control; development samples remain absent from deployed files.

Create a Google Search Console Domain property for erfanmirzapour.ir in the owner’s account. Add its exact TXT verification token to DNS, verify ownership, and submit https://erfanmirzapour.ir/sitemap-index.xml. Use URL Inspection for home, writing and the first real article. Search Console needs the owner’s account access; it is not configured by source code alone.

## Rollback

Select the last known-good production deployment in Cloudflare Pages and use its rollback action. Then revert the faulty PR through a new GitHub PR and publish a new patch release so source, release history, and deployed output converge. Avoid force-pushing `main` or moving an existing release tag. Confirm the domain serves the restored content and canonical metadata.

## Codex GitHub review

The repository must be connected in Codex cloud and enabled in Codex Code review settings. Request review by commenting `@codex review` on the PR. A posted trigger alone is not a completed review: verify a reaction/review appears. If unavailable, ask the owner to enable the new repository, retaining the PR for review rather than claiming approval.
