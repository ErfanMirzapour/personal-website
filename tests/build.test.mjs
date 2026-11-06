import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const read = (path) => readFileSync(`dist/${path}`, 'utf8');
test('production output excludes the removed blog and design previews', () => {
  assert.equal(existsSync('dist/designs'), false);
  assert.equal(existsSync('dist/blog'), false);
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
    );
  for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /\/designs\/|\/blog\//);
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
  assert.deepEqual(schema.sameAs, [
    'https://www.linkedin.com/in/erfanmirzapour/',
    'https://github.com/ErfanMirzapour',
    'https://t.me/ErfanM96',
    'https://www.instagram.com/erfan_m96x/',
  ]);
  assert.doesNotMatch(html, /989367025844/);
});
test('home has contact, career, skills and education content', () => {
  const html = read('index.html');
  assert.match(html, /href="https:\/\/t.me\/ErfanM96"/);
  assert.match(html, /href="mailto:erfanmirzapour1@gmail.com"/);
  assert.match(html, /OMPFinex/);
  assert.match(html, /K. N. Toosi University of Technology/);
  assert.match(html, /TypeScript/);
});
test('sitemap, 404 and robots are present', () => {
  assert.match(read('404.html'), /Nothing here/);
  assert.match(read('sitemap-index.xml'), /sitemap-0.xml/);
  assert.doesNotMatch(read('sitemap-0.xml'), /designs|404|blog/);
  assert.match(read('robots.txt'), /User-agent: \*/);
});
