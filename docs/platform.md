# Platform decisions

## Runtime and package manager

Bun owns dependency installation, local scripts, release builds, and GitHub Actions. The pinned version is recorded in `package.json` and the text `bun.lock` is committed.

The website itself has no server runtime. Astro renders static HTML, CSS, and a small amount of browser JavaScript during the build, then Cloudflare Pages serves those files from its network. If the site later adds dynamic Astro routes, the server runtime will be Cloudflare Workers' `workerd` environment rather than Bun. Keep Bun-specific server APIs out of request handlers intended for Workers.

## Browser support and responsive behavior

The compatibility policy is **Baseline Newly available**. Features that have become interoperable across the core browser set may be used, while essential navigation, reading, and contact functions must retain a simple fallback when a newer enhancement is unavailable.

GitHub Actions exercises the selected production design in current Chromium, Firefox, and WebKit, including representative Android and iPhone viewports. Tests check horizontal overflow, keyboard navigation, usable links, and WCAG A/AA issues through axe. Manual launch checks still cover 320px width, 200% text zoom, touch targets, real Safari on iPhone, and real Chrome on Android.

## Images

Use repository-managed images by default:

1. Put photographs and article illustrations under `src/assets/images/`.
2. Import them through Astro's image APIs so builds generate responsive dimensions and modern formats.
3. Set intrinsic width and height, meaningful alt text for informative images, and an empty alt attribute for decorative images.
4. Keep source files reasonably sized and commit only images approved for public use.
5. Put files in `public/` only when they must keep an exact filename and do not need optimization, such as the favicon or a verification file.

Use Cloudflare R2 only when media becomes numerous, large, updated independently from releases, or uploaded through an authenticated tool. Serve R2 through a custom media subdomain and configure cache headers and CORS deliberately. R2 is not needed for the current portfolio.

## Cloudflare capabilities

| Capability        | Status                     | Add when                                                                       |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------ |
| Pages and CDN     | Use now                    | Static site delivery, HTTPS, caching, and atomic rollback                      |
| Web Analytics     | Add after consent decision | Privacy-focused traffic and Core Web Vitals are useful                         |
| R2 object storage | Defer                      | Images or downloads outgrow the repository workflow                            |
| Workers           | Defer                      | A dynamic endpoint, scheduled job, or server-side integration is required      |
| KV                | Defer                      | Globally read-heavy, eventually consistent configuration or flags are required |
| D1                | Defer                      | The site needs relational content or application data                          |
| Turnstile         | Defer                      | A public form is added and needs abuse protection                              |
| Images            | Consider later             | On-demand transformations are needed for externally stored media               |

Adding storage or Workers today would create bindings, security responsibilities, and runtime code without improving the static portfolio. Introduce a service only with the feature that needs it.

## Security, performance, accessibility, and SEO

- Security headers deny framing and browser capabilities the site does not use, enforce HTTPS after launch, constrain resource origins, and prevent MIME sniffing.
- Hashed Astro assets receive immutable caching. The site uses system fonts and minimal client JavaScript to avoid font delays and reduce execution cost.
- Semantic landmarks, visible focus states, skip navigation, reduced-motion behavior, fluid sizing, responsive layouts, and automated axe checks form the accessibility baseline.
- Every indexable page has a unique title, description, canonical URL, social text metadata, and appropriate structured data. Production emits a sitemap and crawlable robots policy; drafts and development routes stay out of the build.

After the custom domain is active, run Lighthouse against the real homepage and writing page, verify security headers with the deployed response, and monitor Search Console and real-user Core Web Vitals instead of relying only on laboratory scores.
