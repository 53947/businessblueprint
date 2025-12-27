import { Router } from "express";
import { db } from "../db";
import { 
  crmContacts, 
  crmCompanies, 
  crmDeals, 
  crmPipelines,
  crmPipelineStages,
  crmTasks, 
  crmNotes, 
  crmTimeline,
  crmSegments,
  crmAppointments,
  crmTags,
  crmSubscriptions,
  insertCrmContactSchema,
  insertCrmCompanySchema,
  insertCrmDealSchema,
  insertCrmPipelineSchema,
  insertCrmPipelineStageSchema,
  insertCrmTaskSchema,
  insertCrmNoteSchema,
  insertCrmTimelineSchema,
  insertCrmAppointmentSchema,
  insertCrmTagSchema,
} from "@shared/schema";
import { eq, and, desc, asc, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";

export const crmRouter = Router();

// ============================================================================
// CONTACTS
// ============================================================================

crmRouter.get("/contacts", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const companyId = parseInt(req.query.companyId as string);
    const search = req.query.search as string;
    const lifecycleStage = req.query.lifecycleStage as string;
    const leadSource = req.query.leadSource as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    let query = db.select().from(crmContacts);
    
    const conditions = [];
    if (clientId) {
      conditions.push(eq(crmContacts.clientId, clientId));
    }
    if (companyId) {
      conditions.push(eq(crmContacts.companyId, companyId));
    }
    if (lifecycleStage) {
      conditions.push(eq(crmContacts.lifecycleStage, lifecycleStage));
    }
    if (leadSource) {
      conditions.push(eq(crmContacts.leadSource, leadSource));
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

    const contacts = await db
      .select()
      .from(crmContacts)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmContacts.createdAt))
      .limit(limit)
      .offset(offset);

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmContacts)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    res.json({
      contacts,
      total: Number(countResult[0]?.count || 0),
      limit,
      offset,
    });
  } catch (error) {
    console.error("[CRM] Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

crmRouter.get("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contact = await db
      .select()
      .from(crmContacts)
      .where(eq(crmContacts.id, id))
      .limit(1);

    if (!contact.length) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact[0]);
  } catch (error) {
    console.error("[CRM] Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

crmRouter.post("/contacts", async (req, res) => {
  try {
    const validatedData = insertCrmContactSchema.parse(req.body);
    const [contact] = await db.insert(crmContacts).values(validatedData).returning();
    
    if (validatedData.clientId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: contact.id,
        eventType: "contact_created",
        title: `Contact created: ${validatedData.firstName || ""} ${validatedData.lastName || ""}`.trim(),
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "user",
      });
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error("[CRM] Error creating contact:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create contact" });
  }
});

crmRouter.patch("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmContactSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: new Date() };
    
    const [contact] = await db
      .update(crmContacts)
      .set(updateData)
      .where(eq(crmContacts.id, id))
      .returning();

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("[CRM] Error updating contact:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update contact" });
  }
});

crmRouter.delete("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmContacts).where(eq(crmContacts.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// ============================================================================
// COMPANIES
// ============================================================================

crmRouter.get("/companies", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const search = req.query.search as string;
    const type = req.query.type as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const conditions = [];
    if (clientId) {
      conditions.push(eq(crmCompanies.clientId, clientId));
    }
    if (type) {
      conditions.push(eq(crmCompanies.type, type));
    }
    if (search) {
      conditions.push(
        or(
          ilike(crmCompanies.name, `%${search}%`),
          ilike(crmCompanies.domain, `%${search}%`)
        )
      );
    }

    const companies = await db
      .select()
      .from(crmCompanies)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmCompanies.createdAt))
      .limit(limit)
      .offset(offset);

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmCompanies)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    res.json({
      companies,
      total: Number(countResult[0]?.count || 0),
      limit,
      offset,
    });
  } catch (error) {
    console.error("[CRM] Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

crmRouter.get("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await db
      .select()
      .from(crmCompanies)
      .where(eq(crmCompanies.id, id))
      .limit(1);

    if (!company.length) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company[0]);
  } catch (error) {
    console.error("[CRM] Error fetching company:", error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

crmRouter.post("/companies", async (req, res) => {
  try {
    const validatedData = insertCrmCompanySchema.parse(req.body);
    const [company] = await db.insert(crmCompanies).values(validatedData).returning();
    res.status(201).json(company);
  } catch (error) {
    console.error("[CRM] Error creating company:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create company" });
  }
});

crmRouter.patch("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmCompanySchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: new Date() };
    
    const [company] = await db
      .update(crmCompanies)
      .set(updateData)
      .where(eq(crmCompanies.id, id))
      .returning();

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("[CRM] Error updating company:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update company" });
  }
});

crmRouter.delete("/companies/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmCompanies).where(eq(crmCompanies.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

// ============================================================================
// PIPELINES & STAGES
// ============================================================================

crmRouter.get("/pipelines", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);

    const conditions = [];
    if (clientId) {
      conditions.push(eq(crmPipelines.clientId, clientId));
    }

    const pipelines = await db
      .select()
      .from(crmPipelines)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(crmPipelines.displayOrder));

    const pipelinesWithStages = await Promise.all(
      pipelines.map(async (pipeline) => {
        const stages = await db
          .select()
          .from(crmPipelineStages)
          .where(eq(crmPipelineStages.pipelineId, pipeline.id))
          .orderBy(asc(crmPipelineStages.displayOrder));
        return { ...pipeline, stages };
      })
    );

    res.json(pipelinesWithStages);
  } catch (error) {
    console.error("[CRM] Error fetching pipelines:", error);
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
});

crmRouter.post("/pipelines", async (req, res) => {
  try {
    const validatedData = insertCrmPipelineSchema.parse(req.body);
    const [pipeline] = await db.insert(crmPipelines).values(validatedData).returning();
    
    const defaultStages = [
      { name: "Qualified", probability: 10, displayOrder: 0, stageType: "active", color: "#3B82F6" },
      { name: "Meeting Scheduled", probability: 30, displayOrder: 1, stageType: "active", color: "#8B5CF6" },
      { name: "Proposal Sent", probability: 50, displayOrder: 2, stageType: "active", color: "#F59E0B" },
      { name: "Negotiation", probability: 70, displayOrder: 3, stageType: "active", color: "#EF4444" },
      { name: "Won", probability: 100, displayOrder: 4, stageType: "won", color: "#22C55E" },
      { name: "Lost", probability: 0, displayOrder: 5, stageType: "lost", color: "#6B7280" },
    ];

    for (const stage of defaultStages) {
      await db.insert(crmPipelineStages).values({
        pipelineId: pipeline.id,
        ...stage,
      });
    }

    res.status(201).json(pipeline);
  } catch (error) {
    console.error("[CRM] Error creating pipeline:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create pipeline" });
  }
});

crmRouter.post("/pipelines/:pipelineId/stages", async (req, res) => {
  try {
    const pipelineId = parseInt(req.params.pipelineId);
    const validatedData = insertCrmPipelineStageSchema.parse({ ...req.body, pipelineId });
    const [stage] = await db.insert(crmPipelineStages).values(validatedData).returning();
    res.status(201).json(stage);
  } catch (error) {
    console.error("[CRM] Error creating stage:", error);
    res.status(500).json({ error: "Failed to create stage" });
  }
});

// ============================================================================
// DEALS
// ============================================================================

crmRouter.get("/deals", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const companyId = parseInt(req.query.companyId as string);
    const contactId = parseInt(req.query.contactId as string);
    const pipelineId = parseInt(req.query.pipelineId as string);
    const stageId = parseInt(req.query.stageId as string);
    const status = req.query.status as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const conditions = [];
    if (clientId) conditions.push(eq(crmDeals.clientId, clientId));
    if (companyId) conditions.push(eq(crmDeals.companyId, companyId));
    if (contactId) conditions.push(eq(crmDeals.contactId, contactId));
    if (pipelineId) conditions.push(eq(crmDeals.pipelineId, pipelineId));
    if (stageId) conditions.push(eq(crmDeals.stageId, stageId));
    if (status) conditions.push(eq(crmDeals.status, status));

    const deals = await db
      .select()
      .from(crmDeals)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmDeals.createdAt))
      .limit(limit)
      .offset(offset);

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmDeals)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const totalValueResult = await db
      .select({ total: sql<number>`COALESCE(SUM(amount), 0)` })
      .from(crmDeals)
      .where(
        and(
          ...(conditions.length > 0 ? conditions : []),
          eq(crmDeals.status, "open")
        )
      );

    res.json({
      deals,
      total: Number(countResult[0]?.count || 0),
      totalValue: Number(totalValueResult[0]?.total || 0),
      limit,
      offset,
    });
  } catch (error) {
    console.error("[CRM] Error fetching deals:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

crmRouter.get("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deal = await db
      .select()
      .from(crmDeals)
      .where(eq(crmDeals.id, id))
      .limit(1);

    if (!deal.length) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(deal[0]);
  } catch (error) {
    console.error("[CRM] Error fetching deal:", error);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
});

crmRouter.post("/deals", async (req, res) => {
  try {
    const validatedData = insertCrmDealSchema.parse(req.body);
    const [deal] = await db.insert(crmDeals).values(validatedData).returning();

    if (validatedData.clientId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        dealId: deal.id,
        eventType: "deal_created",
        title: `Deal created: ${validatedData.name}`,
        description: validatedData.amount ? `Value: $${validatedData.amount}` : undefined,
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "user",
      });
    }

    res.status(201).json(deal);
  } catch (error) {
    console.error("[CRM] Error creating deal:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create deal" });
  }
});

crmRouter.patch("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmDealSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: new Date() };
    
    const [deal] = await db
      .update(crmDeals)
      .set(updateData)
      .where(eq(crmDeals.id, id))
      .returning();

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.error("[CRM] Error updating deal:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update deal" });
  }
});

crmRouter.patch("/deals/:id/stage", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { stageId } = req.body;

    const stage = await db
      .select()
      .from(crmPipelineStages)
      .where(eq(crmPipelineStages.id, stageId))
      .limit(1);

    if (!stage.length) {
      return res.status(404).json({ error: "Stage not found" });
    }

    const updateData: any = {
      stageId,
      probability: stage[0].probability,
      updatedAt: new Date(),
    };

    if (stage[0].stageType === "won") {
      updateData.status = "won";
      updateData.actualCloseDate = new Date();
    } else if (stage[0].stageType === "lost") {
      updateData.status = "lost";
      updateData.actualCloseDate = new Date();
    } else {
      updateData.status = "open";
    }

    const [deal] = await db
      .update(crmDeals)
      .set(updateData)
      .where(eq(crmDeals.id, id))
      .returning();

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    if (deal.clientId) {
      await db.insert(crmTimeline).values({
        clientId: deal.clientId,
        contactId: deal.contactId,
        dealId: deal.id,
        eventType: "deal_stage_changed",
        title: `Deal moved to: ${stage[0].name}`,
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "user",
      });
    }

    res.json(deal);
  } catch (error) {
    console.error("[CRM] Error updating deal stage:", error);
    res.status(500).json({ error: "Failed to update deal stage" });
  }
});

crmRouter.delete("/deals/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmDeals).where(eq(crmDeals.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting deal:", error);
    res.status(500).json({ error: "Failed to delete deal" });
  }
});

// ============================================================================
// TASKS
// ============================================================================

crmRouter.get("/tasks", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const contactId = parseInt(req.query.contactId as string);
    const status = req.query.status as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const conditions = [];
    if (clientId) conditions.push(eq(crmTasks.clientId, clientId));
    if (contactId) conditions.push(eq(crmTasks.contactId, contactId));
    if (status) conditions.push(eq(crmTasks.status, status));

    const tasks = await db
      .select()
      .from(crmTasks)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(crmTasks.dueDate))
      .limit(limit)
      .offset(offset);

    res.json({ tasks });
  } catch (error) {
    console.error("[CRM] Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

crmRouter.post("/tasks", async (req, res) => {
  try {
    const validatedData = insertCrmTaskSchema.parse(req.body);
    const [task] = await db.insert(crmTasks).values(validatedData).returning();
    res.status(201).json(task);
  } catch (error) {
    console.error("[CRM] Error creating task:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
});

crmRouter.patch("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmTaskSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData: any = { ...validatedData, updatedAt: new Date() };
    
    if (updateData.status === "completed" && !updateData.completedAt) {
      updateData.completedAt = new Date();
    }

    const [task] = await db
      .update(crmTasks)
      .set(updateData)
      .where(eq(crmTasks.id, id))
      .returning();

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("[CRM] Error updating task:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update task" });
  }
});

crmRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmTasks).where(eq(crmTasks.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// ============================================================================
// NOTES
// ============================================================================

crmRouter.get("/notes", async (req, res) => {
  try {
    const contactId = parseInt(req.query.contactId as string);
    const companyId = parseInt(req.query.companyId as string);
    const dealId = parseInt(req.query.dealId as string);

    const conditions = [];
    if (contactId) conditions.push(eq(crmNotes.contactId, contactId));
    if (companyId) conditions.push(eq(crmNotes.companyId, companyId));
    if (dealId) conditions.push(eq(crmNotes.dealId, dealId));

    const notes = await db
      .select()
      .from(crmNotes)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmNotes.isPinned), desc(crmNotes.createdAt));

    res.json({ notes });
  } catch (error) {
    console.error("[CRM] Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

crmRouter.post("/notes", async (req, res) => {
  try {
    const validatedData = insertCrmNoteSchema.parse(req.body);
    const [note] = await db.insert(crmNotes).values(validatedData).returning();

    if (validatedData.clientId && validatedData.contactId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        eventType: "note_added",
        title: "Note added",
        description: validatedData.content.substring(0, 100) + (validatedData.content.length > 100 ? "..." : ""),
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "user",
      });
    }

    res.status(201).json(note);
  } catch (error) {
    console.error("[CRM] Error creating note:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create note" });
  }
});

crmRouter.patch("/notes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmNoteSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: new Date() };

    const [note] = await db
      .update(crmNotes)
      .set(updateData)
      .where(eq(crmNotes.id, id))
      .returning();

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("[CRM] Error updating note:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update note" });
  }
});

crmRouter.delete("/notes/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmNotes).where(eq(crmNotes.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// ============================================================================
// TIMELINE
// ============================================================================

crmRouter.get("/timeline", async (req, res) => {
  try {
    const contactId = parseInt(req.query.contactId as string);
    const companyId = parseInt(req.query.companyId as string);
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const conditions = [];
    if (contactId) conditions.push(eq(crmTimeline.contactId, contactId));
    if (companyId) conditions.push(eq(crmTimeline.companyId, companyId));

    const events = await db
      .select()
      .from(crmTimeline)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmTimeline.occurredAt))
      .limit(limit)
      .offset(offset);

    res.json({ events });
  } catch (error) {
    console.error("[CRM] Error fetching timeline:", error);
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
});

crmRouter.post("/timeline", async (req, res) => {
  try {
    const validatedData = insertCrmTimelineSchema.parse(req.body);
    const [event] = await db.insert(crmTimeline).values(validatedData).returning();
    res.status(201).json(event);
  } catch (error) {
    console.error("[CRM] Error creating timeline event:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create timeline event" });
  }
});

// ============================================================================
// APPOINTMENTS (Scheduler - Starter tier)
// ============================================================================

crmRouter.get("/appointments", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const contactId = parseInt(req.query.contactId as string);
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const conditions = [];
    if (clientId) conditions.push(eq(crmAppointments.clientId, clientId));
    if (contactId) conditions.push(eq(crmAppointments.contactId, contactId));
    if (startDate) conditions.push(sql`start_time >= ${new Date(startDate)}`);
    if (endDate) conditions.push(sql`start_time <= ${new Date(endDate)}`);

    const appointments = await db
      .select()
      .from(crmAppointments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(crmAppointments.startTime));

    res.json({ appointments });
  } catch (error) {
    console.error("[CRM] Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

crmRouter.post("/appointments", async (req, res) => {
  try {
    // Convert string dates to Date objects
    const body = { ...req.body };
    if (typeof body.startTime === "string") body.startTime = new Date(body.startTime);
    if (typeof body.endTime === "string") body.endTime = new Date(body.endTime);
    if (typeof body.reminderDate === "string") body.reminderDate = new Date(body.reminderDate);
    
    const validatedData = insertCrmAppointmentSchema.parse(body);
    const [appointment] = await db.insert(crmAppointments).values(validatedData).returning();

    if (validatedData.clientId && validatedData.contactId) {
      await db.insert(crmTimeline).values({
        clientId: validatedData.clientId,
        contactId: validatedData.contactId,
        eventType: "appointment_scheduled",
        title: `Appointment scheduled: ${validatedData.title}`,
        description: `${new Date(validatedData.startTime).toLocaleString()}`,
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "user",
      });
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error("[CRM] Error creating appointment:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

crmRouter.patch("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Convert string dates to Date objects
    const body = { ...req.body };
    if (typeof body.startTime === "string") body.startTime = new Date(body.startTime);
    if (typeof body.endTime === "string") body.endTime = new Date(body.endTime);
    if (typeof body.reminderDate === "string") body.reminderDate = new Date(body.reminderDate);
    
    const partialSchema = insertCrmAppointmentSchema.partial();
    const validatedData = partialSchema.parse(body);
    const updateData = { ...validatedData, updatedAt: new Date() };

    const [appointment] = await db
      .update(crmAppointments)
      .set(updateData)
      .where(eq(crmAppointments.id, id))
      .returning();

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("[CRM] Error updating appointment:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

crmRouter.delete("/appointments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(crmAppointments).where(eq(crmAppointments.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("[CRM] Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// ============================================================================
// TAGS
// ============================================================================

crmRouter.get("/tags", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);

    const conditions = [];
    if (clientId) conditions.push(eq(crmTags.clientId, clientId));

    const tags = await db
      .select()
      .from(crmTags)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmTags.usageCount));

    res.json({ tags });
  } catch (error) {
    console.error("[CRM] Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

crmRouter.post("/tags", async (req, res) => {
  try {
    const validatedData = insertCrmTagSchema.parse(req.body);
    const [tag] = await db.insert(crmTags).values(validatedData).returning();
    res.status(201).json(tag);
  } catch (error) {
    console.error("[CRM] Error creating tag:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create tag" });
  }
});

// ============================================================================
// SEGMENTS
// ============================================================================

crmRouter.get("/segments", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);

    const conditions = [];
    if (clientId) conditions.push(eq(crmSegments.clientId, clientId));

    const segments = await db
      .select()
      .from(crmSegments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(crmSegments.name));

    res.json({ segments });
  } catch (error) {
    console.error("[CRM] Error fetching segments:", error);
    res.status(500).json({ error: "Failed to fetch segments" });
  }
});

// ============================================================================
// CRM SUBSCRIPTION (Tier Management)
// ============================================================================

crmRouter.get("/subscription", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required" });
    }

    const subscription = await db
      .select()
      .from(crmSubscriptions)
      .where(eq(crmSubscriptions.clientId, clientId))
      .limit(1);

    if (!subscription.length) {
      return res.json({ tier: "starter", status: "active" });
    }

    res.json(subscription[0]);
  } catch (error) {
    console.error("[CRM] Error fetching subscription:", error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
});

// ============================================================================
// DASHBOARD STATS
// ============================================================================

crmRouter.get("/stats", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);

    const conditions = clientId ? [eq(crmContacts.clientId, clientId)] : [];
    const dealConditions = clientId ? [eq(crmDeals.clientId, clientId)] : [];
    const taskConditions = clientId ? [eq(crmTasks.clientId, clientId)] : [];

    const [contactCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmContacts)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const [companyCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmCompanies)
      .where(clientId ? eq(crmCompanies.clientId, clientId) : undefined);

    const [openDeals] = await db
      .select({ 
        count: sql<number>`count(*)`,
        value: sql<number>`COALESCE(SUM(amount), 0)`
      })
      .from(crmDeals)
      .where(and(
        ...dealConditions,
        eq(crmDeals.status, "open")
      ));

    const [pendingTasks] = await db
      .select({ count: sql<number>`count(*)` })
      .from(crmTasks)
      .where(and(
        ...taskConditions,
        eq(crmTasks.status, "pending")
      ));

    res.json({
      contacts: Number(contactCount?.count || 0),
      companies: Number(companyCount?.count || 0),
      openDeals: Number(openDeals?.count || 0),
      dealValue: Number(openDeals?.value || 0),
      pendingTasks: Number(pendingTasks?.count || 0),
    });
  } catch (error) {
    console.error("[CRM] Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default crmRouter;
