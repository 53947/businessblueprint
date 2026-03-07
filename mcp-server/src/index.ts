#!/usr/bin/env node

import express from "express";
import crypto from "crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_ORG = process.env.GITHUB_ORG || "TRIADBLUE";
const GITHUB_API = "https://api.github.com";

// --- CORS middleware ---
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, x-api-key, Authorization, mcp-session-id, Mcp-Session-Id, Last-Event-ID, MCP-Protocol-Version");
  res.setHeader("Access-Control-Expose-Headers", "mcp-session-id, Mcp-Session-Id, MCP-Protocol-Version");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json());

// --- GitHub API helper ---
function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "triadblue-mcp-server/1.0",
  };
  if (process.env.GITHUB_TOKEN) {
    h["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function ghFetch(path: string): Promise<any> {
  const url = `${GITHUB_API}${path}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status}: ${body}`);
  }
  return res.json();
}

// --- In-memory event store for session resumability ---
class InMemoryEventStore {
  private events = new Map<string, { streamId: string; message: any }>();

  async storeEvent(streamId: string, message: any): Promise<string> {
    const eventId = `${streamId}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    this.events.set(eventId, { streamId, message });
    if (this.events.size > 1000) {
      const keys = [...this.events.keys()];
      for (let i = 0; i < keys.length - 1000; i++) {
        this.events.delete(keys[i]);
      }
    }
    return eventId;
  }

  async replayEventsAfter(lastEventId: string, { send }: { send: (eventId: string, message: any) => Promise<void> }): Promise<string> {
    if (!lastEventId || !this.events.has(lastEventId)) return "";
    const parts = lastEventId.split("_");
    const streamId = parts.length > 0 ? parts[0] : "";
    if (!streamId) return "";
    let foundLast = false;
    const sorted = [...this.events.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    for (const [eventId, { streamId: sid, message }] of sorted) {
      if (sid !== streamId) continue;
      if (eventId === lastEventId) { foundLast = true; continue; }
      if (foundLast) await send(eventId, message);
    }
    return streamId;
  }
}

// --- MCP Server setup ---
function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "triadblue-github",
    version: "1.0.0",
  });

  server.tool("list_repos", "List all repositories in the TRIADBLUE org", {}, async () => {
    const repos = await ghFetch(`/orgs/${GITHUB_ORG}/repos?per_page=100`);
    const summary = repos.map((r: any) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      updated_at: r.updated_at,
      html_url: r.html_url,
      default_branch: r.default_branch,
      private: r.private,
    }));
    return { content: [{ type: "text" as const, text: JSON.stringify(summary, null, 2) }] };
  });

  // @ts-ignore - MCP SDK type depth issue with zod
  server.tool("get_repo", "Get details about a specific repo", {
    repo: z.string().describe("Repository name"),
  }, async ({ repo }: { repo: string }) => {
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}`);
    return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
  });

  server.tool("list_files", "List files and directories in a repo path", {
    repo: z.string().describe("Repository name"),
    path: z.string().optional().describe("Directory path (empty for root)"),
  }, async ({ repo, path }) => {
    const p = path || "";
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/contents/${p}`);
    const listing = Array.isArray(data)
      ? data.map((f: any) => ({ name: f.name, type: f.type, size: f.size, path: f.path }))
      : [{ name: data.name, type: data.type, size: data.size, path: data.path }];
    return { content: [{ type: "text" as const, text: JSON.stringify(listing, null, 2) }] };
  });

  server.tool("read_file", "Read the contents of a file in a repo", {
    repo: z.string().describe("Repository name"),
    path: z.string().describe("File path"),
  }, async ({ repo, path }) => {
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/contents/${path}`);
    if (data.type !== "file") {
      return { content: [{ type: "text" as const, text: `Error: ${path} is a ${data.type}, not a file` }], isError: true };
    }
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return { content: [{ type: "text" as const, text: content }] };
  });

  server.tool("list_branches", "List branches of a repo", {
    repo: z.string().describe("Repository name"),
  }, async ({ repo }) => {
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/branches?per_page=100`);
    const branches = data.map((b: any) => ({ name: b.name, sha: b.commit.sha }));
    return { content: [{ type: "text" as const, text: JSON.stringify(branches, null, 2) }] };
  });

  // @ts-ignore - MCP SDK type depth issue with zod
  server.tool("list_issues", "List open issues for a repo", {
    repo: z.string().describe("Repository name"),
    state: z.enum(["open", "closed", "all"]).optional().describe("Issue state filter"),
  }, async ({ repo, state }: { repo: string; state?: string }) => {
    const s = state || "open";
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/issues?state=${s}&per_page=50`);
    const issues = data.map((i: any) => ({
      number: i.number,
      title: i.title,
      state: i.state,
      user: i.user.login,
      created_at: i.created_at,
      labels: i.labels.map((l: any) => l.name),
    }));
    return { content: [{ type: "text" as const, text: JSON.stringify(issues, null, 2) }] };
  });

  server.tool("list_pulls", "List pull requests for a repo", {
    repo: z.string().describe("Repository name"),
    state: z.enum(["open", "closed", "all"]).optional().describe("PR state filter"),
  }, async ({ repo, state }) => {
    const s = state || "open";
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/pulls?state=${s}&per_page=50`);
    const prs = data.map((p: any) => ({
      number: p.number,
      title: p.title,
      state: p.state,
      user: p.user.login,
      created_at: p.created_at,
      head: p.head.ref,
      base: p.base.ref,
    }));
    return { content: [{ type: "text" as const, text: JSON.stringify(prs, null, 2) }] };
  });

  server.tool("search_code", "Search for code across all TRIADBLUE repos", {
    query: z.string().describe("Search query (code, filename, etc.)"),
  }, async ({ query }) => {
    const data = await ghFetch(`/search/code?q=${encodeURIComponent(query)}+org:${GITHUB_ORG}&per_page=20`);
    const results = data.items.map((i: any) => ({
      repo: i.repository.full_name,
      file: i.path,
      url: i.html_url,
    }));
    return { content: [{ type: "text" as const, text: JSON.stringify(results, null, 2) }] };
  });

  server.tool("list_commits", "List recent commits for a repo", {
    repo: z.string().describe("Repository name"),
    branch: z.string().optional().describe("Branch name (defaults to main)"),
  }, async ({ repo, branch }) => {
    const b = branch ? `&sha=${branch}` : "";
    const data = await ghFetch(`/repos/${GITHUB_ORG}/${repo}/commits?per_page=20${b}`);
    const commits = data.map((c: any) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      author: c.commit.author.name,
      date: c.commit.author.date,
    }));
    return { content: [{ type: "text" as const, text: JSON.stringify(commits, null, 2) }] };
  });

  return server;
}

// --- MCP session management ---
const sessions = new Map<string, { server: McpServer; transport: StreamableHTTPServerTransport; createdAt: number }>();
const eventStore = new InMemoryEventStore();

function isInitializeRequest(body: any): boolean {
  if (Array.isArray(body)) return body.some((m) => m.method === "initialize");
  return body?.method === "initialize";
}

function getSessionId(req: express.Request): string | undefined {
  return (req.headers["mcp-session-id"] || req.headers["Mcp-Session-Id"]) as string | undefined;
}

async function handleMcpPost(req: express.Request, res: express.Response): Promise<void> {
  const ts = new Date().toISOString();
  const method = Array.isArray(req.body) ? req.body.map((m: any) => m.method).join(",") : req.body?.method;
  const sessionId = getSessionId(req);
  console.log(`[${ts}] MCP POST method=${method} session=${sessionId || "none"}`);

  try {
    // Existing session — forward request
    if (sessionId && sessions.has(sessionId)) {
      console.log(`[${ts}] MCP → reusing session ${sessionId}`);
      const { transport } = sessions.get(sessionId)!;
      await transport.handleRequest(req, res, req.body);
      return;
    }

    // New session — initialize
    if (!sessionId && isInitializeRequest(req.body)) {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(),
        eventStore,
        enableJsonResponse: true,
        onsessioninitialized: (sid: string) => {
          sessions.set(sid, { server, transport, createdAt: Date.now() });
          console.log(`[${ts}] MCP session created: ${sid} (total: ${sessions.size})`);
        },
        onsessionclosed: (sid: string) => {
          sessions.delete(sid);
          console.log(`[${ts}] MCP session explicitly closed: ${sid}`);
        },
      });
      const server = createMcpServer();

      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
      return;
    }

    // Session not found
    console.log(`[${ts}] MCP → session not found: ${sessionId}, active: [${[...sessions.keys()].join(", ")}]`);
    res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "Bad request — missing or invalid session" },
      id: null,
    });
  } catch (err) {
    console.error(`[${ts}] MCP POST error:`, err);
    if (!res.headersSent) {
      res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal error" }, id: null });
    }
  }
}

async function handleMcpGet(req: express.Request, res: express.Response): Promise<void> {
  const ts = new Date().toISOString();
  const sessionId = getSessionId(req);
  console.log(`[${ts}] MCP GET session=${sessionId || "none"}`);

  if (sessionId && sessions.has(sessionId)) {
    const { transport } = sessions.get(sessionId)!;
    await transport.handleRequest(req, res);
    return;
  }

  res.setHeader("Allow", "POST, HEAD");
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed — use POST" },
    id: null,
  });
}

async function handleMcpDelete(req: express.Request, res: express.Response): Promise<void> {
  const ts = new Date().toISOString();
  const sessionId = getSessionId(req);
  console.log(`[${ts}] MCP DELETE session=${sessionId || "none"}`);

  if (sessionId && sessions.has(sessionId)) {
    const { transport } = sessions.get(sessionId)!;
    await transport.handleRequest(req, res);
    return;
  }

  res.status(404).json({
    jsonrpc: "2.0",
    error: { code: -32001, message: "Session not found" },
    id: null,
  });
}

function handleMcpHead(_req: express.Request, res: express.Response): void {
  res.setHeader("MCP-Protocol-Version", "2025-11-25");
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
}

// --- Mount MCP on /mcp ---
app.head("/mcp", handleMcpHead);
app.post("/mcp", handleMcpPost);
app.get("/mcp", handleMcpGet);
app.delete("/mcp", handleMcpDelete);

// --- Mount MCP on root / too (Claude.ai may use root path) ---
app.head("/", handleMcpHead);
app.post("/", handleMcpPost);
app.delete("/", handleMcpDelete);

// --- Health check ---
app.get("/", (_req, res) => {
  const sessionId = getSessionId(_req);
  if (sessionId && sessions.has(sessionId)) {
    handleMcpGet(_req, res);
    return;
  }
  res.json({
    status: "ok",
    service: "triadblue-mcp-server",
    version: "1.0.0",
    mcp: "/mcp",
    activeSessions: sessions.size,
  });
});

app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
