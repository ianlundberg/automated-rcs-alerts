// Minimal static file server for previewing the site locally.
// Usage: npm run dev   (defaults to http://localhost:4321)
// Zero dependencies; cross-platform.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const publicDir = join(scriptDir, "..", "public");
const port = process.env.PORT ? Number(process.env.PORT) : 4321;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = join(publicDir, normalize(path));

    // Block path traversal outside of publicDir.
    if (!filePath.startsWith(publicDir)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let info = await stat(filePath).catch(() => null);
    if (info && info.isDirectory()) {
      filePath = join(filePath, "index.html");
      info = await stat(filePath).catch(() => null);
    }

    if (!info) {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    const body = await readFile(filePath);
    res.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(500).end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Serving apps/claude-lego-alerts/public at http://localhost:${port}`);
});
