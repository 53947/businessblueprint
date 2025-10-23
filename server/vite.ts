import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Use import.meta.dirname for consistent path resolution
  const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
  const indexPath = path.join(distPath, "index.html");

  log(`Checking for static files at: ${distPath}`, "static");

  // Verify build directory exists
  if (!fs.existsSync(distPath)) {
    const errorMsg = `Build directory not found at ${distPath}. Run 'npm run build' first.`;
    log(`❌ ${errorMsg}`, "static");
    throw new Error(errorMsg);
  }

  // Verify index.html exists
  if (!fs.existsSync(indexPath)) {
    const errorMsg = `index.html not found at ${indexPath}`;
    log(`❌ ${errorMsg}`, "static");
    throw new Error(errorMsg);
  }

  // Log what we're serving
  const files = fs.readdirSync(distPath);
  log(`Found ${files.length} files in dist/public`, "static");

  // Serve static files with caching - this MUST come before the catch-all route
  app.use(express.static(distPath, {
    maxAge: '1y',
    etag: true,
    index: false, // Don't auto-serve index.html, we'll handle that
    setHeaders: (res, path) => {
      // Log what files are being served for debugging
      log(`Serving static file: ${path}`, "static");
    }
  }));

  // SPA fallback - this catches everything that wasn't a static file
  // IMPORTANT: This must be registered LAST
  app.use("*", (req, res) => {
    // Only serve index.html if it's not a static asset request
    if (!req.originalUrl.startsWith('/assets/')) {
      log(`Serving index.html for SPA route: ${req.originalUrl}`, "static");
      res.sendFile(indexPath);
    } else {
      log(`Static asset not found: ${req.originalUrl}`, "static");
      res.status(404).send('Asset not found');
    }
  });

  log(`✅ Serving static files from ${distPath}`, "static");
}