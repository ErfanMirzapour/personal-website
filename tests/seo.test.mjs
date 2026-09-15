import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const pages = walk('dist')
  .filter((path) => path.endsWith('.html'))
  .map((path) => ({ path, html: readFileSync(path, 'utf8') }));

const valueOf = (html, pattern) => html.match(pattern)?.[1];

describe('production SEO output', () => {
  test('every page has one title, description, canonical and h1', () => {
    for (const { path, html } of pages) {
      expect(html.match(/<title>/g)?.length, path).toBe(1);
      expect(html.match(/name="description"/g)?.length, path).toBe(1);
      expect(html.match(/rel="canonical"/g)?.length, path).toBe(1);
      expect(html.match(/<h1(?:\s|>)/g)?.length, path).toBe(1);
      expect(html, path).toContain('<html lang="en">');
    }
  });

  test('indexable pages use unique titles, descriptions and canonicals', () => {
    const indexable = pages.filter(
      ({ html }) => !html.includes('content="noindex, nofollow"'),
    );
    const fields = {
      title: indexable.map(({ html }) =>
        valueOf(html, /<title>(.*?)<\/title>/s),
      ),
      description: indexable.map(({ html }) =>
        valueOf(html, /<meta name="description" content="(.*?)"/s),
      ),
      canonical: indexable.map(({ html }) =>
        valueOf(html, /<link rel="canonical" href="(.*?)"/s),
      ),
    };

    for (const [name, values] of Object.entries(fields)) {
      expect(values.every(Boolean), name).toBe(true);
      expect(new Set(values).size, name).toBe(values.length);
    }
  });

  test('social metadata matches canonical page metadata', () => {
    for (const { path, html } of pages) {
      const title = valueOf(html, /<title>(.*?)<\/title>/s);
      const description = valueOf(
        html,
        /<meta name="description" content="(.*?)"/s,
      );
      const canonical = valueOf(html, /<link rel="canonical" href="(.*?)"/s);
      expect(
        valueOf(html, /<meta property="og:title" content="(.*?)"/s),
        path,
      ).toBe(title);
      expect(
        valueOf(html, /<meta property="og:description" content="(.*?)"/s),
        path,
      ).toBe(description);
      expect(
        valueOf(html, /<meta property="og:url" content="(.*?)"/s),
        path,
      ).toBe(canonical);
    }
  });
});
