// Builds the static site by copying public/ into dist/.
// Zero dependencies; cross-platform (requires Node 16.7+ for fs.cpSync).
import { rmSync, mkdirSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = join(scriptDir, "..");
const publicDir = join(projectDir, "public");
const distDir = join(projectDir, "dist");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(publicDir, distDir, { recursive: true });

console.log(`Built static site: ${publicDir} -> ${distDir}`);
