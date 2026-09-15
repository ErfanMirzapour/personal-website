import { test } from 'bun:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  cpSync,
  symlinkSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('isolated production build renders approved MDX and excludes drafts and future posts', () => {
  const root = mkdtempSync(join(tmpdir(), 'erfan-content-test-'));
  try {
    for (const path of [
      'src',
      'public',
      'astro.config.mjs',
      'tsconfig.json',
      'package.json',
    ])
      cpSync(path, join(root, path), { recursive: true });
    symlinkSync(resolve('node_modules'), join(root, 'node_modules'), 'dir');
    const fixture = (name, extra, body) =>
      writeFileSync(
        join(root, 'src/content/blog', `${name}.mdx`),
        `---\ntitle: ${name}\ndescription: Integration fixture for article publishing.\npubDate: 2020-01-01\n${extra}\n---\n${body}\n`,
      );
    fixture(
      'published-fixture',
      'draft: false\nupdatedDate: 2020-02-01',
      '## A real heading\n\nArticle body fixture.\n\n<strong>MDX rendered content</strong>',
    );
    fixture('hidden-fixture', 'draft: true', 'Do not publish this draft.');
    writeFileSync(
      join(root, 'src/content/blog/future.md'),
      '---\ntitle: Future\ndescription: Future scheduled post.\npubDate: 2999-01-01\ndraft: false\n---\nFuture content.',
    );
    const result = spawnSync(
      process.execPath,
      [resolve('node_modules/astro/bin/astro.mjs'), 'build'],
      {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, PUBLIC_SITE_ENV: 'preview' },
      },
    );
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const article = readFileSync(
      join(root, 'dist/blog/published-fixture/index.html'),
      'utf8',
    );
    assert.match(article, /MDX rendered content/);
    assert.match(article, /A real heading/);
    const json = JSON.parse(
      article.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(json['@type'], 'BlogPosting');
    assert.equal(json.dateModified, '2020-02-01T00:00:00.000Z');
    assert.equal(json.author.name, 'Erfan Mirzapour');
    assert.match(
      article,
      /https:\/\/erfanmirzapour.ir\/blog\/published-fixture\//,
    );
    for (const id of ['hidden-fixture', 'future', 'welcome-draft'])
      assert.equal(existsSync(join(root, `dist/blog/${id}`)), false);
    const sitemap = readFileSync(join(root, 'dist/sitemap-0.xml'), 'utf8');
    assert.match(sitemap, /published-fixture/);
    assert.doesNotMatch(sitemap, /hidden-fixture|future|welcome-draft/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}, 60000);
