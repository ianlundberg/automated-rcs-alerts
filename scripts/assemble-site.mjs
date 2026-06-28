// Assembles the combined GitHub Pages site from every app's build output:
//   site/                 <- umbrella landing (copied from site-root/)
//   site/<app-name>/...   <- each app's built dist/
// Run after `turbo run build`. Zero dependencies; cross-platform (Node 16.7+).
import { rmSync, mkdirSync, cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repo = join(scriptDir, "..");
const appsDir = join(repo, "apps");
const siteRoot = join(repo, "site-root");
const out = join(repo, "site");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1) Umbrella landing at the site root.
if (existsSync(siteRoot)) {
  cpSync(siteRoot, out, { recursive: true });
  console.log("+ /                  (umbrella landing)");
}

// 2) Each app's built dist/ -> site/<app-name>/
for (const name of readdirSync(appsDir)) {
  const dist = join(appsDir, name, "dist");
  if (existsSync(dist) && statSync(dist).isDirectory()) {
    cpSync(dist, join(out, name), { recursive: true });
    console.log(`+ /${name}/`);
  }
}

console.log(`Assembled combined site -> ${out}`);
