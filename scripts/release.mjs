import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const { design } = JSON.parse(
  readFileSync(
    new URL('../src/data/publication.json', import.meta.url),
    'utf8',
  ),
);
if (!['editorial', 'swiss', 'notebook', 'dark', 'journal'].includes(design)) {
  console.error(
    'Release blocked: Erfan must select a design before publishing. Set design in src/data/publication.json after selection.',
  );
  process.exit(1);
}
const result = spawnSync('bun', ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PUBLIC_SITE_ENV:
      process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main'
        ? 'preview'
        : 'production',
  },
});
process.exit(result.status ?? 1);
