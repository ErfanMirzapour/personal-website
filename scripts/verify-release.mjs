import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
const tag = process.argv[2] ?? process.env.GITHUB_REF_NAME;
const mainRef = process.argv[3];

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

if (mainRef) {
  const revParse = (ref) => {
    const result = spawnSync('git', ['rev-parse', ref], { encoding: 'utf8' });
    if (result.status !== 0) {
      console.error(result.stderr || `Unable to resolve Git ref ${ref}.`);
      process.exit(1);
    }
    return result.stdout.trim();
  };
  const releaseCommit = revParse('HEAD');
  const mainCommit = revParse(mainRef);
  if (releaseCommit !== mainCommit) {
    console.error(
      `Release commit ${releaseCommit} is not the current ${mainRef} commit ${mainCommit}.`,
    );
    process.exit(1);
  }
}

console.log(`Release ${tag} matches package.json and is ready to build.`);
