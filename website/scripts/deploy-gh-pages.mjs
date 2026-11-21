#!/usr/bin/env node
/**
 * Production deploy to gh-pages.
 * Only allowed from `main` so feature-branch builds cannot overwrite live prices/content.
 *
 * Emergency override: ALLOW_FEATURE_DEPLOY=1 npm run deploy
 */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const websiteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(websiteDir, "..");

function run(command, cwd = websiteDir) {
  execSync(command, { cwd, stdio: "inherit" });
}

function git(command) {
  return execSync(`git ${command}`, { cwd: repoRoot, encoding: "utf8" }).trim();
}

const branch = git("rev-parse --abbrev-ref HEAD");
const allowFeature = process.env.ALLOW_FEATURE_DEPLOY === "1";

if (branch !== "main" && !allowFeature) {
  console.error(`
Refusing to deploy from branch "${branch}".

Live site deploys must come from main so feature work cannot wipe pricing,
portfolio, or other production content.

Do this instead:
  1. Commit your work on this branch
  2. Merge (or open a PR) into main
  3. Checkout main and run: npm run deploy

Emergency only: ALLOW_FEATURE_DEPLOY=1 npm run deploy
`);
  process.exit(1);
}

if (branch !== "main" && allowFeature) {
  console.warn(`\nWARNING: deploying from "${branch}" with ALLOW_FEATURE_DEPLOY=1\n`);
}

console.log(`Deploying website from ${branch} → gh-pages…`);
run("npm run build");
run(
  "npx gh-pages -d dist -b gh-pages -r https://github.com/Dbaileyfam/studio.git --dotfiles"
);
console.log("Published.");
