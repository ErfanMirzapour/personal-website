import { readFileSync } from 'node:fs';

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const tag = process.argv[2] ?? process.env.GITHUB_REF_NAME;

if (!tag) {
  console.error('Release verification requires a tag such as v1.0.0.');
  process.exit(1);
}

if (tag !== `v${version}`) {
  console.error(
    `Release tag ${tag} does not match package.json version ${version}. Expected v${version}.`,
  );
  process.exit(1);
}

console.log(`Release ${tag} matches package.json and is ready to build.`);
