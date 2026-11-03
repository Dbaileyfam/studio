import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../../studio/website portfolio");
const dest = path.resolve(here, "../public/portfolio");
const files = ["index.html", "styles.css", "main.js", "projects.js", "background.js"];

if (!fs.existsSync(path.join(source, "index.html"))) {
  console.error(`Portfolio source not found at ${source}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(source, file), path.join(dest, file));
}

fs.cpSync(path.join(source, "assets"), path.join(dest, "assets"), { recursive: true });
console.log(`Copied portfolio to ${dest}`);
