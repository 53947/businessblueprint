import { Router, Request, Response, NextFunction } from "express";
import { db } from "../db";
import { 
  apiKeys,
  webhookSubscriptions,
  crmContacts,
  crmCompanies,
  crmDeals,
  crmTasks,
  crmNotes,
  crmPipelines,
  crmPipelineStages,
  crmSegments,
  crmSegmentMembers,
  crmTimeline,
  insertCrmContactSchema,
  insertCrmCompanySchema,
  insertCrmDealSchema,
  insertCrmTaskSchema,
  insertCrmNoteSchema,
} from "@shared/schema";
import { eq, and, desc, asc, ilike, or, sql, isNull } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";

export const publicApiRouter = Router();

interface AuthenticatedRequest extends Request {
  apiKey?: {
    id: number;
    clientId: number | null;
    scopes: string[];
    name: string;
  };
}

function hashApiKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function generateApiKey(): { key: string; hash: string; prefix: string } {
  const key = `bb_${crypto.randomBytes(32).toString("hex")}`;
  const hash = hashApiKey(key);
  const prefix = key.substring(0, 8);
  return { key, hash, prefix };
}

async function authenticateApiKey(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ 
      error: "Unauthorized",
      message: "Missing or invalid Authorization header. Use: Bearer <api_key>" 
    });
    return;
  }

  const key = authHeader.substring(7);
  const keyHash = hashApiKey(key);

  try {
    const [apiKeyRecord] = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.keyHash, keyHash));

    if (!apiKeyRecord) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid API key" });
      return;
    }

    if (!apiKeyRecord.isActive) {
      res.status(403).json({ error: "Forbidden", message: "API key is inactive" });
      return;
    }

    if (apiKeyRecord.expiresAt && new Date(apiKeyRecord.expiresAt) < new Date()) {
      res.status(403).json({ error: "Forbidden", message: "API key has expired" });
      return;
    }

    const now = new Date();
    const resetAt = apiKeyRecord.rateLimitResetAt ? new Date(apiKeyRecord.rateLimitResetAt) : null;
    
    if (!resetAt || resetAt < now) {
      await db.update(apiKeys)
        .set({ 
          requestsThisHour: 1,
          rateLimitResetAt: new Date(now.getTime() + 60 * 60 * 1000),
          lastUsedAt: now,
          totalRequests: sql`${apiKeys.totalRequests} + 1`,
        })
        .where(eq(apiKeys.id, apiKeyRecord.id));
    } else {
      if ((apiKeyRecord.requestsThisHour || 0) >= (apiKeyRecord.rateLimit || 1000)) {
        res.status(429).json({ 
          error: "Rate limit exceeded",
          message: `Rate limit of ${apiKeyRecord.rateLimit} requests per hour exceeded`,
          retryAfter: Math.ceil((resetAt.getTime() - now.getTime()) / 1000)
        });
        return;
      }
      
      await db.update(apiKeys)
        .set({ 
          requestsThisHour: sql`${apiKeys.requestsThisHour} + 1`,
          lastUsedAt: now,
          totalRequests: sql`${apiKeys.totalRequests} + 1`,
        })
        .where(eq(apiKeys.id, apiKeyRecord.id));
    }

    req.apiKey = {
      id: apiKeyRecord.id,
      clientId: apiKeyRecord.clientId,
      scopes: (apiKeyRecord.scopes as string[]) || [],
      name: apiKeyRecord.name,
    };

    next();
  } catch (error) {
    console.error("[API] Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function requireScope(...scopes: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.apiKey) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const keyScopes = req.apiKey.scopes || [];
    
    if (keyScopes.includes("*")) {
      next();
      return;
    }
    
    const hasRequiredScope = scopes.some(scope => keyScopes.includes(scope));
    
    if (!hasRequiredScope) {
      res.status(403).json({ 
        error: "Forbidden",
        message: `This endpoint requires one of the following scopes: ${scopes.join(", ")}`,
        requiredScopes: scopes,
        yourScopes: keyScopes
      });
      return;
    }

    next();
  };
}

publicApiRouter.get("/", (req, res) => {
  res.json({
    name: "BusinessBlueprint Public API",
    version: "1.0.0",
    documentation: "/api/v1/docs",
    endpoints: {
      contacts: "/api/v1/contacts",
      companies: "/api/v1/companies",
      deals: "/api/v1/deals",
      tasks: "/api/v1/tasks",
      notes: "/api/v1/notes",
      pipelines: "/api/v1/pipelines",
      segments: "/api/v1/segments",
      timeline: "/api/v1/timeline",
    },
    authentication: "Bearer token (API key)",
  });
});

publicApiRouter.get("/me", authenticateApiKey, (req: AuthenticatedRequest, res) => {
  res.json({
    apiKey: {
      id: req.apiKey?.id,
      name: req.apiKey?.name,
      scopes: req.apiKey?.scopes,
    }
  });
});

publicApiRouter.get("/contacts", authenticateApiKey, requireScope("read:contacts", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string;
    const lifecycleStage = req.query.lifecycleStage as string;

    let conditions: any[] = [];
    
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmContacts.clientId, req.apiKey.clientId));
    }
    
    if (search) {
      conditions.push(
        or(
          ilike(crmContacts.firstName, `%${search}%`),
          ilike(crmContacts.lastName, `%${search}%`),
          ilike(crmContacts.email, `%${search}%`)
        )
      );
    }
    
    if (lifecycleStage) {
      conditions.push(eq(crmContacts.lifecycleStage, lifecycleStage));
    }

    const query = conditions.length > 0
      ? db.select().from(crmContacts).where(and(...conditions))
      : db.select().from(crmContacts);

    const contacts = await query
      .orderBy(desc(crmContacts.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      data: contacts,
      pagination: {
        limit,
        offset,
        hasMore: contacts.length === limit
      }
    });
  } catch (error) {
    console.error("[API] Get contacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

publicApiRouter.get("/contacts/:id", authenticateApiKey, requireScope("read:contacts", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    
    let conditions = [eq(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmContacts.clientId, req.apiKey.clientId));
    }
    
    const [contact] = await db
      .select()
      .from(crmContacts)
      .where(and(...conditions));

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ data: contact });
  } catch (error) {
    console.error("[API] Get contact error:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

publicApiRouter.post("/contacts", authenticateApiKey, requireScope("write:contacts", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = insertCrmContactSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId,
    });

    const [contact] = await db.insert(crmContacts).values(validatedData).returning();

    res.status(201).json({ data: contact });
  } catch (error) {
    console.error("[API] Create contact error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create contact" });
  }
});

publicApiRouter.patch("/contacts/:id", authenticateApiKey, requireScope("write:contacts", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmContactSchema.partial();
    const validatedData = partialSchema.parse(req.body);

    let conditions = [eq(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmContacts.clientId, req.apiKey.clientId));
    }

    const [contact] = await db
      .update(crmContacts)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(and(...conditions))
      .returning();

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ data: contact });
  } catch (error) {
    console.error("[API] Update contact error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update contact" });
  }
});

publicApiRouter.delete("/contacts/:id", authenticateApiKey, requireScope("delete:contacts", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);

    let conditions = [eq(crmContacts.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmContacts.clientId, req.apiKey.clientId));
    }

    const [deleted] = await db
      .delete(crmContacts)
      .where(and(...conditions))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("[API] Delete contact error:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

publicApiRouter.get("/companies", authenticateApiKey, requireScope("read:companies", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string;

    let conditions: any[] = [];
    
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmCompanies.clientId, req.apiKey.clientId));
    }
    
    if (search) {
      conditions.push(ilike(crmCompanies.name, `%${search}%`));
    }

    const query = conditions.length > 0
      ? db.select().from(crmCompanies).where(and(...conditions))
      : db.select().from(crmCompanies);

    const companies = await query
      .orderBy(desc(crmCompanies.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      data: companies,
      pagination: { limit, offset, hasMore: companies.length === limit }
    });
  } catch (error) {
    console.error("[API] Get companies error:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

publicApiRouter.post("/companies", authenticateApiKey, requireScope("write:companies", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = insertCrmCompanySchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId,
    });

    const [company] = await db.insert(crmCompanies).values(validatedData).returning();

    res.status(201).json({ data: company });
  } catch (error) {
    console.error("[API] Create company error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create company" });
  }
});

publicApiRouter.get("/deals", authenticateApiKey, requireScope("read:deals", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const status = req.query.status as string;
    const pipelineId = parseInt(req.query.pipelineId as string);

    let conditions: any[] = [];
    
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmDeals.clientId, req.apiKey.clientId));
    }
    
    if (status) {
      conditions.push(eq(crmDeals.status, status));
    }
    
    if (pipelineId) {
      conditions.push(eq(crmDeals.pipelineId, pipelineId));
    }

    const query = conditions.length > 0
      ? db.select().from(crmDeals).where(and(...conditions))
      : db.select().from(crmDeals);

    const deals = await query
      .orderBy(desc(crmDeals.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      data: deals,
      pagination: { limit, offset, hasMore: deals.length === limit }
    });
  } catch (error) {
    console.error("[API] Get deals error:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

publicApiRouter.post("/deals", authenticateApiKey, requireScope("write:deals", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = insertCrmDealSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId,
    });

    const [deal] = await db.insert(crmDeals).values(validatedData).returning();

    res.status(201).json({ data: deal });
  } catch (error) {
    console.error("[API] Create deal error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create deal" });
  }
});

publicApiRouter.get("/tasks", authenticateApiKey, requireScope("read:tasks", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const status = req.query.status as string;
    const contactId = parseInt(req.query.contactId as string);

    let conditions: any[] = [];
    
    // Tenant isolation
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmTasks.clientId, req.apiKey.clientId));
    }
    
    if (status) {
      conditions.push(eq(crmTasks.status, status));
    }
    
    if (contactId) {
      conditions.push(eq(crmTasks.contactId, contactId));
    }

    const query = conditions.length > 0
      ? db.select().from(crmTasks).where(and(...conditions))
      : db.select().from(crmTasks);

    const tasks = await query
      .orderBy(desc(crmTasks.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      data: tasks,
      pagination: { limit, offset, hasMore: tasks.length === limit }
    });
  } catch (error) {
    console.error("[API] Get tasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

publicApiRouter.post("/tasks", authenticateApiKey, requireScope("write:tasks", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = insertCrmTaskSchema.parse({
      ...req.body,
      clientId: req.apiKey?.clientId || req.body.clientId,
    });
    const [task] = await db.insert(crmTasks).values(validatedData).returning();
    res.status(201).json({ data: task });
  } catch (error) {
    console.error("[API] Create task error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
});

publicApiRouter.get("/pipelines", authenticateApiKey, requireScope("read:pipelines", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    let pipelinesQuery = db.select().from(crmPipelines);
    
    // Tenant isolation - only return pipelines for the API key's client, or global ones
    if (req.apiKey?.clientId) {
      pipelinesQuery = db.select().from(crmPipelines).where(
        or(
          eq(crmPipelines.clientId, req.apiKey.clientId),
          isNull(crmPipelines.clientId)
        )
      );
    }
    
    const pipelines = await pipelinesQuery.orderBy(asc(crmPipelines.id));

    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db
          .select()
          .from(crmPipelineStages)
          .where(eq(crmPipelineStages.pipelineId, pipeline.id))
          .orderBy(asc(crmPipelineStages.id));
        return { ...pipeline, stages };
      })
    );

    res.json({ data: pipelinesWithStages });
  } catch (error) {
    console.error("[API] Get pipelines error:", error);
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
});

publicApiRouter.get("/segments", authenticateApiKey, requireScope("read:segments", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    let segments;
    
    if (req.apiKey?.clientId) {
      segments = await db
        .select()
        .from(crmSegments)
        .where(eq(crmSegments.clientId, req.apiKey.clientId))
        .orderBy(asc(crmSegments.name));
    } else {
      segments = await db
        .select()
        .from(crmSegments)
        .orderBy(asc(crmSegments.name));
    }

    res.json({ data: segments });
  } catch (error) {
    console.error("[API] Get segments error:", error);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
});

publicApiRouter.get("/timeline", authenticateApiKey, requireScope("read:timeline", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const contactId = parseInt(req.query.contactId as string);
    const companyId = parseInt(req.query.companyId as string);

    let conditions: any[] = [];
    
    if (req.apiKey?.clientId) {
      conditions.push(eq(crmTimeline.clientId, req.apiKey.clientId));
    }
    
    if (contactId) {
      conditions.push(eq(crmTimeline.contactId, contactId));
    }
    
    if (companyId) {
      conditions.push(eq(crmTimeline.companyId, companyId));
    }

    const query = conditions.length > 0
      ? db.select().from(crmTimeline).where(and(...conditions))
      : db.select().from(crmTimeline);

    const events = await query
      .orderBy(desc(crmTimeline.occurredAt))
      .limit(limit)
      .offset(offset);

    res.json({
      data: events,
      pagination: { limit, offset, hasMore: events.length === limit }
    });
  } catch (error) {
    console.error("[API] Get timeline error:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
});

publicApiRouter.post("/api-keys", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const { name, scopes, rateLimit, expiresAt } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const { key, hash, prefix } = generateApiKey();

    const [apiKey] = await db.insert(apiKeys).values({
      clientId: req.apiKey?.clientId,
      name,
      keyHash: hash,
      keyPrefix: prefix,
      scopes: scopes || ["*"],
      rateLimit: rateLimit || 1000,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    }).returning();

    res.status(201).json({
      message: "API key created. Save this key - it cannot be retrieved again.",
      key,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        prefix: apiKey.keyPrefix,
        scopes: apiKey.scopes,
        rateLimit: apiKey.rateLimit,
        expiresAt: apiKey.expiresAt,
        createdAt: apiKey.createdAt,
      }
    });
  } catch (error) {
    console.error("[API] Create API key error:", error);
    res.status(500).json({ error: "Failed to create API key" });
  }
});

publicApiRouter.get("/api-keys", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const keys = await db
      .select({
        id: apiKeys.id,
        name: apiKeys.name,
        prefix: apiKeys.keyPrefix,
        scopes: apiKeys.scopes,
        rateLimit: apiKeys.rateLimit,
        isActive: apiKeys.isActive,
        lastUsedAt: apiKeys.lastUsedAt,
        totalRequests: apiKeys.totalRequests,
        expiresAt: apiKeys.expiresAt,
        createdAt: apiKeys.createdAt,
      })
      .from(apiKeys)
      .where(req.apiKey?.clientId ? eq(apiKeys.clientId, req.apiKey.clientId) : sql`true`);

    res.json({ data: keys });
  } catch (error) {
    console.error("[API] List API keys error:", error);
    res.status(500).json({ error: "Failed to list API keys" });
  }
});

publicApiRouter.delete("/api-keys/:id", authenticateApiKey, requireScope("admin:api-keys", "*"), async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);

    // Tenant isolation: only allow deletion of keys within the same tenant
    let conditions = [eq(apiKeys.id, id)];
    if (req.apiKey?.clientId) {
      conditions.push(eq(apiKeys.clientId, req.apiKey.clientId));
    }

    const [deleted] = await db
      .delete(apiKeys)
      .where(and(...conditions))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "API key not found" });
    }

    res.json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error("[API] Delete API key error:", error);
    res.status(500).json({ error: "Failed to delete API key" });
  }
});

// Development-only test key generator - restricted in production
publicApiRouter.post("/generate-test-key", async (req, res) => {
  // Only allow in development environment
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ 
      error: "Forbidden",
      message: "Test key generation is disabled in production. Use the admin API to create keys."
    });
  }
  
  try {
    const { key, hash, prefix } = generateApiKey();

    const [apiKey] = await db.insert(apiKeys).values({
      name: "Test API Key (Dev)",
      keyHash: hash,
      keyPrefix: prefix,
      scopes: ["*"],
      rateLimit: 1000,
    }).returning();

    res.status(201).json({
      message: "Test API key created (development only). Save this key - it cannot be retrieved again.",
      key,
      id: apiKey.id,
      prefix: apiKey.keyPrefix,
    });
  } catch (error) {
    console.error("[API] Generate test key error:", error);
    res.status(500).json({ error: "Failed to generate test key" });
  }
});
