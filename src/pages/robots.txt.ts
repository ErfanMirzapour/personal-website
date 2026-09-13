import { selectedDesign } from '../data/designs';
export function GET() {
  const production =
    selectedDesign && import.meta.env.PUBLIC_SITE_ENV === 'production';
  return new Response(
    production
      ? 'User-agent: *\nAllow: /\nSitemap: https://erfanmirzapour.ir/sitemap-index.xml\n'
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
