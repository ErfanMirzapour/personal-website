import { spawnSync } from 'node:child_process';
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
