import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const read = (path) => readFileSync(`dist/${path}`, 'utf8');
test('production output excludes designs, samples, and unpublished drafts', () => {
  assert.equal(existsSync('dist/designs'), false);
  assert.equal(existsSync('dist/blog/welcome-draft'), false);
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
    );
  for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    assert.doesNotMatch(
      html,
      /Typography specimen|Unpublished writing placeholder|\/designs\//,
    );
  }
});
test('home has canonical, metadata, verified Person schema and no phone', () => {
  const html = read('index.html');
  assert.match(html, /https:\/\/erfanmirzapour.ir\//);
  assert.match(html, /name="description"/);
  assert.match(html, /property="og:title"/);
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema['@type'], 'Person');
  assert.equal(schema.name, 'Erfan Mirzapour');
  assert.doesNotMatch(html, /989367025844/);
});
test('sitemap, writing empty state, 404 and release guard are present', () => {
  assert.match(read('blog/index.html'), /No articles published yet/);
  assert.match(read('404.html'), /Nothing here/);
  assert.match(read('sitemap-index.xml'), /sitemap-0.xml/);
  const xml = read('sitemap-0.xml');
  assert.match(xml, /https:\/\/erfanmirzapour.ir\/blog\//);
  assert.doesNotMatch(xml, /designs|404|welcome-draft/);
  assert.match(read('robots.txt'), /Disallow: \//);
});
