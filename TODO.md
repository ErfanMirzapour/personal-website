# To do

- [ ] **Version management, with the version shown in the footer**
  - Choose how the version is bumped: by hand, with `npm version`-style scripts, or automatically (for example Changesets or release-please).
  - Keep `package.json` `version`, the git tag (`v1.0.0` exists) and the GitHub Release in sync. Production deploys run from a release (`.github/workflows/release.yml`).
  - Done: the footer shows the version from `package.json`, linked to its GitHub Release.
