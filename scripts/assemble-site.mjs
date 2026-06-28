// Assembles the combined GitHub Pages site from every app's build output.
// Each app declares where it is served via "deployPath" in its package.json
// (defaults to "/<app-name>"). Examples:
//   apps/personal     deployPath "/"                 -> site/
//   apps/notifly      deployPath "/notifly"          -> site/notifly/
//   apps/brick-alerts deployPath "/notifly/brick-alerts" -> site/notifly/brick-alerts/
// Run after `turbo run build`. Zero dependencies; cross-platform (Node 16.7+).
import { rmSync, mkdirSync, cpSync, existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repo = join(scriptDir, "..");
const appsDir = join(repo, "apps");
const out = join(repo, "site");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const apps = readdirSync(appsDir)
  .map((name) => {
    const dir = join(appsDir, name);
    const dist = join(dir, "dist");
    if (!existsSync(dist) || !statSync(dist).isDirectory()) return null;
    let deployPath = "/" + name;
    try {
      const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
      if (typeof pkg.deployPath === "string" && pkg.deployPath) deployPath = pkg.deployPath;
    } catch {}
    const rel = deployPath.replace(/^\/+|\/+$/g, ""); // "" for root
    return { name, dist, deployPath, rel };
  })
  .filter(Boolean)
  // shallow paths first so a nested app is never clobbered by a parent copy
  .sort((a, b) => (a.rel ? a.rel.split("/").length : 0) - (b.rel ? b.rel.split("/").length : 0));

for (const app of apps) {
  const target = app.rel ? join(out, app.rel) : out;
  mkdirSync(target, { recursive: true });
  cpSync(app.dist, target, { recursive: true });
  console.log(`+ ${"/" + app.rel}  <-  apps/${app.name}`);
}

console.log(`Assembled combined site -> ${out}`);
