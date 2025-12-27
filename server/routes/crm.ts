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
  crmSegmentMembers,
  crmAppointments,
  crmTags,
  crmSubscriptions,
  crmLeadForms,
  crmAutomations,
  crmAutomationSteps,
  crmAutomationExecutions,
  insertCrmContactSchema,
  insertCrmLeadFormSchema,
  insertCrmCompanySchema,
  insertCrmDealSchema,
  insertCrmPipelineSchema,
  insertCrmPipelineStageSchema,
  insertCrmTaskSchema,
  insertCrmNoteSchema,
  insertCrmTimelineSchema,
  insertCrmAppointmentSchema,
  insertCrmTagSchema,
  insertCrmAutomationSchema,
  insertCrmAutomationStepSchema,
} from "@shared/schema";
import { eq, and, desc, asc, ilike, or, sql, inArray } from "drizzle-orm";
import { z } from "zod";

export const crmRouter = Router();

// ============================================================================
// AUTOMATION TRIGGER DISPATCHER
// ============================================================================
// MVP Implementation Notes:
// - Triggers: contact_created, deal_stage_changed, deal_won, deal_lost + manual
// - Step execution: synchronous (add_tag, remove_tag, update_contact, create_task, add_to_segment)
// - Async steps (wait, email, webhook): logged but require job queue for production
// - Conditions: basic evaluation (always, equals, contains, exists)
// ============================================================================

function evaluateCondition(
  conditionType: string | null,
  conditionConfig: Record<string, any> | null,
  triggerData: Record<string, any>,
  contact: any
): boolean {
  if (!conditionType || conditionType === 'always') {
    return true;
  }
  
  const config = conditionConfig || {};
  const fieldValue = config.field ? (triggerData[config.field] || contact?.[config.field]) : null;
  
  switch (conditionType) {
    case 'equals':
      return String(fieldValue) === String(config.value);
    case 'not_equals':
      return String(fieldValue) !== String(config.value);
    case 'contains':
      return String(fieldValue || '').includes(String(config.value || ''));
    case 'exists':
      return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
    case 'not_exists':
      return fieldValue === null || fieldValue === undefined || fieldValue === '';
    default:
      return true;
  }
}

async function executeAutomationTrigger(
  triggerType: string,
  contactId?: number,
  triggerData?: Record<string, any>
) {
  try {
    // Find all active automations with this trigger type
    const automations = await db
      .select()
      .from(crmAutomations)
      .where(and(
        eq(crmAutomations.triggerType, triggerType),
        eq(crmAutomations.isActive, true)
      ));

    for (const automation of automations) {
      // Get automation steps
      const steps = await db
        .select()
        .from(crmAutomationSteps)
        .where(eq(crmAutomationSteps.automationId, automation.id))
        .orderBy(asc(crmAutomationSteps.stepOrder));

      if (steps.length === 0) continue;

      // Create execution record
      const [execution] = await db.insert(crmAutomationExecutions).values({
        automationId: automation.id,
        contactId: contactId || null,
        status: 'running',
        currentStep: 0,
        totalSteps: steps.length,
        triggerData: triggerData || {},
      }).returning();

      // Update automation run count
      await db
        .update(crmAutomations)
        .set({ 
          runCount: sql`${crmAutomations.runCount} + 1`,
          lastRunAt: new Date(),
        })
        .where(eq(crmAutomations.id, automation.id));

      // Execute steps synchronously
      const executionLog: { step: number; action: string; result: string; timestamp: Date }[] = [];
      let finalStatus = 'completed';
      let errorMessage: string | null = null;
      
      // Fetch contact for condition evaluation
      let contact: any = null;
      if (contactId) {
        const [c] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
        contact = c;
      }

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const config = step.config as Record<string, any> || {};

        try {
          // Evaluate step condition
          const conditionMet = evaluateCondition(
            step.conditionType,
            step.conditionConfig as Record<string, any>,
            triggerData || {},
            contact
          );
          
          if (!conditionMet) {
            executionLog.push({ step: i + 1, action: step.stepType, result: 'Skipped: condition not met', timestamp: new Date() });
            continue;
          }

          await db
            .update(crmAutomationExecutions)
            .set({ currentStep: i + 1 })
            .where(eq(crmAutomationExecutions.id, execution.id));

          switch (step.stepType) {
            case 'add_tag':
              if (contactId && config.tag) {
                const [contact] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
                if (contact) {
                  const currentTags = Array.isArray(contact.tags) ? contact.tags : [];
                  if (!currentTags.includes(config.tag)) {
                    await db.update(crmContacts)
                      .set({ tags: [...currentTags, config.tag] })
                      .where(eq(crmContacts.id, contactId));
                  }
                }
              }
              executionLog.push({ step: i + 1, action: 'add_tag', result: `Added tag: ${config.tag || 'none'}`, timestamp: new Date() });
              break;

            case 'remove_tag':
              if (contactId && config.tag) {
                const [contact] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
                if (contact) {
                  const currentTags = Array.isArray(contact.tags) ? contact.tags : [];
                  await db.update(crmContacts)
                    .set({ tags: currentTags.filter((t: string) => t !== config.tag) })
                    .where(eq(crmContacts.id, contactId));
                }
              }
              executionLog.push({ step: i + 1, action: 'remove_tag', result: `Removed tag: ${config.tag || 'none'}`, timestamp: new Date() });
              break;

            case 'update_contact':
              if (contactId && config.field && config.value !== undefined) {
                await db.update(crmContacts)
                  .set({ [config.field]: config.value })
                  .where(eq(crmContacts.id, contactId));
              }
              executionLog.push({ step: i + 1, action: 'update_contact', result: `Updated ${config.field || 'field'}`, timestamp: new Date() });
              break;

            case 'create_task':
              const taskTitle = config.title || 'Automated task';
              await db.insert(crmTasks).values({
                contactId: contactId || null,
                title: taskTitle,
                description: config.description || `Created by automation: ${automation.name}`,
                status: 'pending',
                priority: config.priority || 'medium',
                dueDate: config.dueDate ? new Date(config.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              });
              executionLog.push({ step: i + 1, action: 'create_task', result: `Created task: ${taskTitle}`, timestamp: new Date() });
              break;

            case 'add_to_segment':
              if (contactId && config.segmentId) {
                await db.insert(crmSegmentMembers).values({
                  segmentId: parseInt(config.segmentId),
                  contactId,
                }).onConflictDoNothing();
              }
              executionLog.push({ step: i + 1, action: 'add_to_segment', result: `Added to segment ${config.segmentId || 'unknown'}`, timestamp: new Date() });
              break;

            case 'wait':
              const waitDuration = config.duration || '1 day';
              executionLog.push({ step: i + 1, action: 'wait', result: `Wait: ${waitDuration} (skipped in sync execution)`, timestamp: new Date() });
              break;

            case 'send_email':
              executionLog.push({ step: i + 1, action: 'send_email', result: `Email queued: ${config.subject || 'No subject'}`, timestamp: new Date() });
              break;

            case 'webhook':
              executionLog.push({ step: i + 1, action: 'webhook', result: `Webhook: ${config.url || 'No URL'}`, timestamp: new Date() });
              break;

            default:
              executionLog.push({ step: i + 1, action: step.stepType, result: 'Unknown step type', timestamp: new Date() });
          }
        } catch (stepError: any) {
          executionLog.push({ step: i + 1, action: step.stepType, result: `Error: ${stepError.message}`, timestamp: new Date() });
          finalStatus = 'failed';
          errorMessage = `Step ${i + 1} failed: ${stepError.message}`;
          break;
        }
      }

      await db
        .update(crmAutomationExecutions)
        .set({ 
          status: finalStatus,
          completedAt: new Date(),
          errorMessage,
          executionLog,
        })
        .where(eq(crmAutomationExecutions.id, execution.id));

      console.log(`[CRM] Automation "${automation.name}" ${finalStatus} for trigger "${triggerType}"${contactId ? ` (contact ${contactId})` : ''}`);
    }
  } catch (error) {
    console.error("[CRM] Automation trigger error:", error);
  }
}

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

    // Trigger automations for contact_created
    executeAutomationTrigger('contact_created', contact.id, {
      contactId: contact.id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("[CRM] Error creating contact:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create contact" });
  }
});

crmRouter.post("/contacts/import", async (req, res) => {
  try {
    const { contacts, duplicateHandling = "skip", clientId } = req.body;
    
    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({ error: "No contacts provided" });
    }
    
    if (contacts.length > 5000) {
      return res.status(400).json({ error: "Maximum 5000 contacts per import" });
    }
    
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [] as { row: number; error: string }[],
    };
    
    for (let i = 0; i < contacts.length; i++) {
      try {
        const contact = contacts[i];
        
        // Add defaults for required/optional fields that might be missing from CSV
        const contactWithDefaults = {
          ...contact,
          clientId: contact.clientId || clientId || null,
          lifecycleStage: contact.lifecycleStage || "lead",
          leadSource: contact.leadSource || "csv_import",
        };
        
        // Use partial schema since we're providing sensible defaults
        const partialSchema = insertCrmContactSchema.partial().extend({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().email().optional(),
        });
        const validatedData = partialSchema.parse(contactWithDefaults);
        
        if (validatedData.email) {
          const existing = await db
            .select()
            .from(crmContacts)
            .where(eq(crmContacts.email, validatedData.email))
            .limit(1);
          
          if (existing.length > 0) {
            if (duplicateHandling === "update") {
              await db.update(crmContacts)
                .set({ ...validatedData, updatedAt: new Date() })
                .where(eq(crmContacts.id, existing[0].id));
              results.updated++;
            } else {
              results.skipped++;
            }
            continue;
          }
        }
        
        await db.insert(crmContacts).values(validatedData);
        results.created++;
      } catch (error) {
        results.errors.push({
          row: i + 1,
          error: error instanceof z.ZodError ? error.errors[0]?.message || "Validation error" : "Unknown error",
        });
      }
    }
    
    res.json({
      success: true,
      imported: results.created,
      updated: results.updated,
      skipped: results.skipped,
      errors: results.errors.slice(0, 10),
      totalErrors: results.errors.length,
    });
  } catch (error) {
    console.error("[CRM] Error importing contacts:", error);
    res.status(500).json({ error: "Failed to import contacts" });
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

    // Trigger automations for deal_stage_changed
    executeAutomationTrigger('deal_stage_changed', deal.contactId || undefined, {
      dealId: deal.id,
      stageName: stage[0].name,
      stageType: stage[0].stageType,
      status: deal.status,
    });

    // Also trigger deal_won or deal_lost if applicable
    if (stage[0].stageType === 'won') {
      executeAutomationTrigger('deal_won', deal.contactId || undefined, {
        dealId: deal.id,
        dealName: deal.name,
        amount: deal.amount,
      });
    } else if (stage[0].stageType === 'lost') {
      executeAutomationTrigger('deal_lost', deal.contactId || undefined, {
        dealId: deal.id,
        dealName: deal.name,
        amount: deal.amount,
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

// ==================== LEAD FORMS ====================

crmRouter.get("/forms", async (req, res) => {
  try {
    const clientId = parseInt(req.query.clientId as string);
    const conditions = clientId ? [eq(crmLeadForms.clientId, clientId)] : [];
    
    const forms = await db
      .select()
      .from(crmLeadForms)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(crmLeadForms.createdAt));
    
    res.json({ forms });
  } catch (error) {
    console.error("[CRM] Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});

crmRouter.get("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const form = await db
      .select()
      .from(crmLeadForms)
      .where(eq(crmLeadForms.id, id))
      .limit(1);
    
    if (!form.length) {
      return res.status(404).json({ error: "Form not found" });
    }
    
    res.json(form[0]);
  } catch (error) {
    console.error("[CRM] Error fetching form:", error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});

crmRouter.post("/forms", async (req, res) => {
  try {
    const validatedData = insertCrmLeadFormSchema.parse(req.body);
    const [form] = await db.insert(crmLeadForms).values(validatedData).returning();
    res.status(201).json(form);
  } catch (error) {
    console.error("[CRM] Error creating form:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create form" });
  }
});

crmRouter.patch("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partialSchema = insertCrmLeadFormSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    const updateData = { ...validatedData, updatedAt: new Date() };
    
    const [form] = await db
      .update(crmLeadForms)
      .set(updateData)
      .where(eq(crmLeadForms.id, id))
      .returning();
    
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    
    res.json(form);
  } catch (error) {
    console.error("[CRM] Error updating form:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update form" });
  }
});

crmRouter.delete("/forms/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(crmLeadForms)
      .where(eq(crmLeadForms.id, id))
      .returning();
    
    if (!deleted) {
      return res.status(404).json({ error: "Form not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("[CRM] Error deleting form:", error);
    res.status(500).json({ error: "Failed to delete form" });
  }
});

// Public endpoint for form submissions (no auth required)
crmRouter.post("/forms/:slug/submit", async (req, res) => {
  try {
    const slug = req.params.slug;
    const submission = req.body;
    
    // Find form by slug
    const [form] = await db
      .select()
      .from(crmLeadForms)
      .where(eq(crmLeadForms.slug, slug))
      .limit(1);
    
    if (!form || !form.isActive) {
      return res.status(404).json({ error: "Form not found" });
    }
    
    // Create contact from submission
    const contactData = {
      clientId: form.clientId,
      firstName: submission.firstName || null,
      lastName: submission.lastName || null,
      email: submission.email || null,
      phone: submission.phone || null,
      lifecycleStage: form.defaultLifecycleStage || "lead",
      leadSource: form.defaultLeadSource || "web_form",
    };
    
    // Check for existing contact by email
    if (contactData.email) {
      const existing = await db
        .select()
        .from(crmContacts)
        .where(eq(crmContacts.email, contactData.email))
        .limit(1);
      
      if (existing.length > 0) {
        // Update existing contact
        await db
          .update(crmContacts)
          .set({ ...contactData, updatedAt: new Date() })
          .where(eq(crmContacts.id, existing[0].id));
        
        // Increment submission count
        await db
          .update(crmLeadForms)
          .set({ submissionCount: sql`submission_count + 1` })
          .where(eq(crmLeadForms.id, form.id));
        
        res.json({ success: true, message: form.successMessage, contactId: existing[0].id });
        return;
      }
    }
    
    // Create new contact
    const [contact] = await db.insert(crmContacts).values(contactData).returning();
    
    // Increment submission count
    await db
      .update(crmLeadForms)
      .set({ submissionCount: sql`submission_count + 1` })
      .where(eq(crmLeadForms.id, form.id));
    
    // Add timeline event
    if (form.clientId) {
      await db.insert(crmTimeline).values({
        clientId: form.clientId,
        contactId: contact.id,
        eventType: "form_submission",
        title: `Form submission: ${form.name}`,
        occurredAt: new Date(),
        sourceApp: "relationships",
        actorType: "contact",
      });
    }
    
    res.json({ success: true, message: form.successMessage, contactId: contact.id });
  } catch (error) {
    console.error("[CRM] Error processing form submission:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

// ==================== INTEGRATION ENDPOINTS ====================
// These endpoints are used by other apps to pull contact data from /relationships

// Lookup contact by email or phone (used by /inbox, /livechat, etc.)
crmRouter.get("/integration/lookup", async (req, res) => {
  try {
    const { email, phone } = req.query;
    
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone required" });
    }
    
    let contact = null;
    
    if (email && typeof email === 'string') {
      const results = await db
        .select()
        .from(crmContacts)
        .where(eq(crmContacts.email, email.toLowerCase()))
        .limit(1);
      if (results.length > 0) contact = results[0];
    }
    
    if (!contact && phone && typeof phone === 'string') {
      const results = await db
        .select()
        .from(crmContacts)
        .where(eq(crmContacts.phone, phone))
        .limit(1);
      if (results.length > 0) contact = results[0];
    }
    
    if (!contact) {
      return res.json({ found: false, contact: null });
    }
    
    // Get related company
    let company = null;
    if (contact.companyId) {
      const companyResults = await db
        .select()
        .from(crmCompanies)
        .where(eq(crmCompanies.id, contact.companyId))
        .limit(1);
      if (companyResults.length > 0) company = companyResults[0];
    }
    
    res.json({
      found: true,
      contact: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        lifecycleStage: contact.lifecycleStage,
        leadSource: contact.leadSource,
        customFields: contact.customFields,
        tags: contact.tags,
      },
      company: company ? {
        id: company.id,
        name: company.name,
        industry: company.industry,
        website: company.website,
      } : null
    });
  } catch (error) {
    console.error("[CRM] Integration lookup error:", error);
    res.status(500).json({ error: "Failed to lookup contact" });
  }
});

// Get full contact context for an app (includes deals, recent activity)
crmRouter.get("/integration/context/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    
    // Get contact
    const contacts = await db
      .select()
      .from(crmContacts)
      .where(eq(crmContacts.id, contactId))
      .limit(1);
    
    if (contacts.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    
    const contact = contacts[0];
    
    // Get company
    let company = null;
    if (contact.companyId) {
      const companies = await db
        .select()
        .from(crmCompanies)
        .where(eq(crmCompanies.id, contact.companyId))
        .limit(1);
      if (companies.length > 0) company = companies[0];
    }
    
    // Get open deals
    const deals = await db
      .select()
      .from(crmDeals)
      .where(eq(crmDeals.contactId, contactId))
      .orderBy(desc(crmDeals.updatedAt))
      .limit(5);
    
    // Get recent timeline
    const recentActivity = await db
      .select()
      .from(crmTimeline)
      .where(eq(crmTimeline.contactId, contactId))
      .orderBy(desc(crmTimeline.occurredAt))
      .limit(10);
    
    // Tags are stored directly on the contact
    const contactTags = contact.tags || [];
    
    res.json({
      contact: {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        lifecycleStage: contact.lifecycleStage,
        leadSource: contact.leadSource,
        customFields: contact.customFields,
      },
      company: company ? {
        id: company.id,
        name: company.name,
        industry: company.industry,
        website: company.website,
        size: company.size,
      } : null,
      deals: deals.map(d => ({
        id: d.id,
        title: d.title,
        value: d.value,
        stage: d.stage,
        probability: d.probability,
      })),
      recentActivity: recentActivity.map(a => ({
        id: a.id,
        eventType: a.eventType,
        title: a.title,
        description: a.description,
        sourceApp: a.sourceApp,
        occurredAt: a.occurredAt,
      })),
      tags: contactTags,
      totalDealValue: deals.reduce((sum, d) => sum + (Number(d.value) || 0), 0),
    });
  } catch (error) {
    console.error("[CRM] Integration context error:", error);
    res.status(500).json({ error: "Failed to get contact context" });
  }
});

// Get segments for targeting (used by /send, /content)
crmRouter.get("/integration/segments", async (req, res) => {
  try {
    const segments = await db
      .select({
        id: crmSegments.id,
        name: crmSegments.name,
        description: crmSegments.description,
        memberCount: crmSegments.memberCount,
        segmentType: crmSegments.segmentType,
      })
      .from(crmSegments)
      .orderBy(crmSegments.name);
    
    res.json({ segments });
  } catch (error) {
    console.error("[CRM] Integration segments error:", error);
    res.status(500).json({ error: "Failed to get segments" });
  }
});

// Get segment members (for email campaigns, etc.)
crmRouter.get("/integration/segments/:id/members", async (req, res) => {
  try {
    const segmentId = parseInt(req.params.id);
    const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000);
    const offset = parseInt(req.query.offset as string) || 0;
    
    const members = await db
      .select({
        id: crmContacts.id,
        firstName: crmContacts.firstName,
        lastName: crmContacts.lastName,
        email: crmContacts.email,
        phone: crmContacts.phone,
      })
      .from(crmSegmentMembers)
      .innerJoin(crmContacts, eq(crmSegmentMembers.contactId, crmContacts.id))
      .where(eq(crmSegmentMembers.segmentId, segmentId))
      .limit(limit)
      .offset(offset);
    
    res.json({ members, segmentId });
  } catch (error) {
    console.error("[CRM] Integration segment members error:", error);
    res.status(500).json({ error: "Failed to get segment members" });
  }
});

// Add timeline event from another app
crmRouter.post("/integration/timeline", async (req, res) => {
  try {
    const { contactId, companyId, eventType, title, description, sourceApp, sourceEntityType, sourceEntityId, metadata } = req.body;
    
    if (!eventType || !title || !sourceApp) {
      return res.status(400).json({ error: "eventType, title, and sourceApp are required" });
    }
    
    // Lookup contactId if email provided
    let resolvedContactId = contactId;
    if (!resolvedContactId && req.body.email) {
      const contacts = await db
        .select({ id: crmContacts.id, clientId: crmContacts.clientId })
        .from(crmContacts)
        .where(eq(crmContacts.email, req.body.email))
        .limit(1);
      if (contacts.length > 0) {
        resolvedContactId = contacts[0].id;
      }
    }
    
    // Get clientId from contact if available
    let clientId = null;
    if (resolvedContactId) {
      const contacts = await db
        .select({ clientId: crmContacts.clientId })
        .from(crmContacts)
        .where(eq(crmContacts.id, resolvedContactId))
        .limit(1);
      if (contacts.length > 0) {
        clientId = contacts[0].clientId;
      }
    }
    
    const [event] = await db.insert(crmTimeline).values({
      clientId,
      contactId: resolvedContactId,
      companyId,
      eventType,
      title,
      description,
      sourceApp,
      sourceEntityType,
      sourceEntityId,
      metadata: metadata || {},
      occurredAt: new Date(),
      actorType: 'system',
    }).returning();
    
    res.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("[CRM] Integration timeline error:", error);
    res.status(500).json({ error: "Failed to add timeline event" });
  }
});

// Bulk lookup contacts by emails (used by /send for campaign targeting)
crmRouter.post("/integration/bulk-lookup", async (req, res) => {
  try {
    const { emails } = req.body;
    
    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "emails array required" });
    }
    
    if (emails.length > 1000) {
      return res.status(400).json({ error: "Maximum 1000 emails per request" });
    }
    
    const contacts = await db
      .select({
        id: crmContacts.id,
        firstName: crmContacts.firstName,
        lastName: crmContacts.lastName,
        email: crmContacts.email,
        phone: crmContacts.phone,
        lifecycleStage: crmContacts.lifecycleStage,
      })
      .from(crmContacts)
      .where(inArray(crmContacts.email, emails.map((e: string) => e.toLowerCase())));
    
    const contactMap: Record<string, any> = {};
    contacts.forEach(c => {
      if (c.email) contactMap[c.email.toLowerCase()] = c;
    });
    
    res.json({ contacts: contactMap, found: contacts.length });
  } catch (error) {
    console.error("[CRM] Integration bulk lookup error:", error);
    res.status(500).json({ error: "Failed to bulk lookup contacts" });
  }
});

// ============================================================================
// AUTOMATIONS (Performance Tier)
// ============================================================================

// List automations
crmRouter.get("/automations", async (req, res) => {
  try {
    const automations = await db
      .select()
      .from(crmAutomations)
      .orderBy(desc(crmAutomations.createdAt));
    
    res.json({ automations });
  } catch (error) {
    console.error("[CRM] List automations error:", error);
    res.status(500).json({ error: "Failed to fetch automations" });
  }
});

// Get automation with steps
crmRouter.get("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const [automation] = await db
      .select()
      .from(crmAutomations)
      .where(eq(crmAutomations.id, id));
    
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    
    const steps = await db
      .select()
      .from(crmAutomationSteps)
      .where(eq(crmAutomationSteps.automationId, id))
      .orderBy(asc(crmAutomationSteps.stepOrder));
    
    // Recent executions
    const executions = await db
      .select()
      .from(crmAutomationExecutions)
      .where(eq(crmAutomationExecutions.automationId, id))
      .orderBy(desc(crmAutomationExecutions.startedAt))
      .limit(10);
    
    res.json({ automation, steps, executions });
  } catch (error) {
    console.error("[CRM] Get automation error:", error);
    res.status(500).json({ error: "Failed to fetch automation" });
  }
});

// Create automation
crmRouter.post("/automations", async (req, res) => {
  try {
    const parsed = insertCrmAutomationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    
    const [automation] = await db.insert(crmAutomations).values(parsed.data).returning();
    res.status(201).json({ automation });
  } catch (error) {
    console.error("[CRM] Create automation error:", error);
    res.status(500).json({ error: "Failed to create automation" });
  }
});

// Update automation
crmRouter.patch("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const [automation] = await db
      .update(crmAutomations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(crmAutomations.id, id))
      .returning();
    
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    
    res.json({ automation });
  } catch (error) {
    console.error("[CRM] Update automation error:", error);
    res.status(500).json({ error: "Failed to update automation" });
  }
});

// Delete automation
crmRouter.delete("/automations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    await db.delete(crmAutomations).where(eq(crmAutomations.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("[CRM] Delete automation error:", error);
    res.status(500).json({ error: "Failed to delete automation" });
  }
});

// Add steps to automation
crmRouter.post("/automations/:id/steps", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    const { steps } = req.body;
    
    if (!Array.isArray(steps)) {
      return res.status(400).json({ error: "steps array required" });
    }
    
    // Delete existing steps and replace
    await db.delete(crmAutomationSteps).where(eq(crmAutomationSteps.automationId, automationId));
    
    // Insert new steps
    if (steps.length > 0) {
      const stepsToInsert = steps.map((step: any, index: number) => ({
        automationId,
        stepOrder: index + 1,
        stepType: step.stepType,
        config: step.config || {},
        conditionType: step.conditionType,
        conditionConfig: step.conditionConfig || {},
      }));
      
      await db.insert(crmAutomationSteps).values(stepsToInsert);
    }
    
    const insertedSteps = await db
      .select()
      .from(crmAutomationSteps)
      .where(eq(crmAutomationSteps.automationId, automationId))
      .orderBy(asc(crmAutomationSteps.stepOrder));
    
    res.json({ steps: insertedSteps });
  } catch (error) {
    console.error("[CRM] Add automation steps error:", error);
    res.status(500).json({ error: "Failed to add automation steps" });
  }
});

// Trigger automation manually (for testing)
crmRouter.post("/automations/:id/trigger", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    const { contactId, triggerData } = req.body;
    
    const [automation] = await db
      .select()
      .from(crmAutomations)
      .where(eq(crmAutomations.id, automationId));
    
    if (!automation) {
      return res.status(404).json({ error: "Automation not found" });
    }
    
    const steps = await db
      .select()
      .from(crmAutomationSteps)
      .where(eq(crmAutomationSteps.automationId, automationId))
      .orderBy(asc(crmAutomationSteps.stepOrder));
    
    // Create execution record
    const [execution] = await db.insert(crmAutomationExecutions).values({
      automationId,
      contactId,
      status: 'running',
      currentStep: 0,
      totalSteps: steps.length,
      triggerData: triggerData || {},
    }).returning();
    
    // Update automation run count
    await db
      .update(crmAutomations)
      .set({ 
        runCount: sql`${crmAutomations.runCount} + 1`,
        lastRunAt: new Date(),
      })
      .where(eq(crmAutomations.id, automationId));
    
    // Execute steps synchronously (MVP implementation)
    const executionLog: { step: number; action: string; result: string; timestamp: Date }[] = [];
    let finalStatus = 'completed';
    let errorMessage: string | null = null;
    
    // Fetch contact for condition evaluation
    let contact: any = null;
    if (contactId) {
      const [c] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
      contact = c;
    }
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const config = step.config as Record<string, any> || {};
      
      try {
        // Evaluate step condition
        const conditionMet = evaluateCondition(
          step.conditionType,
          step.conditionConfig as Record<string, any>,
          triggerData || {},
          contact
        );
        
        if (!conditionMet) {
          executionLog.push({ step: i + 1, action: step.stepType, result: 'Skipped: condition not met', timestamp: new Date() });
          continue;
        }
        
        // Update current step
        await db
          .update(crmAutomationExecutions)
          .set({ currentStep: i + 1 })
          .where(eq(crmAutomationExecutions.id, execution.id));
        
        // Execute step based on type
        switch (step.stepType) {
          case 'add_tag':
            if (contactId && config.tag) {
              const [contactData] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
              if (contactData) {
                const currentTags = Array.isArray(contactData.tags) ? contactData.tags : [];
                if (!currentTags.includes(config.tag)) {
                  await db.update(crmContacts)
                    .set({ tags: [...currentTags, config.tag] })
                    .where(eq(crmContacts.id, contactId));
                }
              }
            }
            executionLog.push({ step: i + 1, action: 'add_tag', result: `Added tag: ${config.tag || 'none'}`, timestamp: new Date() });
            break;
            
          case 'remove_tag':
            if (contactId && config.tag) {
              const [contact] = await db.select().from(crmContacts).where(eq(crmContacts.id, contactId));
              if (contact) {
                const currentTags = Array.isArray(contact.tags) ? contact.tags : [];
                await db.update(crmContacts)
                  .set({ tags: currentTags.filter((t: string) => t !== config.tag) })
                  .where(eq(crmContacts.id, contactId));
              }
            }
            executionLog.push({ step: i + 1, action: 'remove_tag', result: `Removed tag: ${config.tag || 'none'}`, timestamp: new Date() });
            break;
            
          case 'update_contact':
            if (contactId && config.field && config.value !== undefined) {
              await db.update(crmContacts)
                .set({ [config.field]: config.value })
                .where(eq(crmContacts.id, contactId));
            }
            executionLog.push({ step: i + 1, action: 'update_contact', result: `Updated ${config.field || 'field'}`, timestamp: new Date() });
            break;
            
          case 'create_task':
            const taskTitle = config.title || 'Automated task';
            await db.insert(crmTasks).values({
              contactId: contactId || null,
              title: taskTitle,
              description: config.description || `Created by automation: ${automation.name}`,
              status: 'pending',
              priority: config.priority || 'medium',
              dueDate: config.dueDate ? new Date(config.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days default
            });
            executionLog.push({ step: i + 1, action: 'create_task', result: `Created task: ${taskTitle}`, timestamp: new Date() });
            break;
            
          case 'add_to_segment':
            if (contactId && config.segmentId) {
              await db.insert(crmSegmentMembers).values({
                segmentId: parseInt(config.segmentId),
                contactId,
              }).onConflictDoNothing();
            }
            executionLog.push({ step: i + 1, action: 'add_to_segment', result: `Added to segment ${config.segmentId || 'unknown'}`, timestamp: new Date() });
            break;
            
          case 'wait':
            // For MVP, just log the wait step (real implementation would use a job queue)
            const waitDuration = config.duration || '1 day';
            executionLog.push({ step: i + 1, action: 'wait', result: `Wait step: ${waitDuration} (skipped in sync execution)`, timestamp: new Date() });
            break;
            
          case 'send_email':
            // Log email action (real implementation would send email)
            executionLog.push({ step: i + 1, action: 'send_email', result: `Email queued: ${config.subject || 'No subject'} (requires email integration)`, timestamp: new Date() });
            break;
            
          case 'webhook':
            // Log webhook action (real implementation would call webhook)
            executionLog.push({ step: i + 1, action: 'webhook', result: `Webhook: ${config.url || 'No URL'} (requires async execution)`, timestamp: new Date() });
            break;
            
          default:
            executionLog.push({ step: i + 1, action: step.stepType, result: 'Unknown step type', timestamp: new Date() });
        }
      } catch (stepError: any) {
        executionLog.push({ step: i + 1, action: step.stepType, result: `Error: ${stepError.message}`, timestamp: new Date() });
        finalStatus = 'failed';
        errorMessage = `Step ${i + 1} failed: ${stepError.message}`;
        break;
      }
    }
    
    // Update execution with final status
    await db
      .update(crmAutomationExecutions)
      .set({ 
        status: finalStatus,
        completedAt: new Date(),
        errorMessage,
        executionLog,
      })
      .where(eq(crmAutomationExecutions.id, execution.id));
    
    res.json({ 
      success: finalStatus === 'completed', 
      execution: { 
        ...execution, 
        status: finalStatus,
        executionLog,
        errorMessage 
      },
      message: finalStatus === 'completed' 
        ? `Automation completed successfully (${steps.length} steps executed)` 
        : `Automation failed: ${errorMessage}`
    });
  } catch (error) {
    console.error("[CRM] Trigger automation error:", error);
    res.status(500).json({ error: "Failed to trigger automation" });
  }
});

// Get automation execution history
crmRouter.get("/automations/:id/executions", async (req, res) => {
  try {
    const automationId = parseInt(req.params.id);
    
    const executions = await db
      .select({
        id: crmAutomationExecutions.id,
        status: crmAutomationExecutions.status,
        currentStep: crmAutomationExecutions.currentStep,
        totalSteps: crmAutomationExecutions.totalSteps,
        startedAt: crmAutomationExecutions.startedAt,
        completedAt: crmAutomationExecutions.completedAt,
        errorMessage: crmAutomationExecutions.errorMessage,
        contact: {
          id: crmContacts.id,
          firstName: crmContacts.firstName,
          lastName: crmContacts.lastName,
          email: crmContacts.email,
        },
      })
      .from(crmAutomationExecutions)
      .leftJoin(crmContacts, eq(crmAutomationExecutions.contactId, crmContacts.id))
      .where(eq(crmAutomationExecutions.automationId, automationId))
      .orderBy(desc(crmAutomationExecutions.startedAt))
      .limit(50);
    
    res.json({ executions });
  } catch (error) {
    console.error("[CRM] Get automation executions error:", error);
    res.status(500).json({ error: "Failed to fetch automation executions" });
  }
});

// ============================================================================
// ANALYTICS (Performance Tier)
// ============================================================================

crmRouter.get("/analytics", async (req, res) => {
  try {
    // Contact lifecycle distribution
    const lifecycleStats = await db
      .select({
        stage: crmContacts.lifecycleStage,
        count: sql<number>`count(*)::int`,
      })
      .from(crmContacts)
      .groupBy(crmContacts.lifecycleStage);
    
    // Deal pipeline stats
    const dealStats = await db
      .select({
        status: crmDeals.status,
        count: sql<number>`count(*)::int`,
        totalValue: sql<number>`coalesce(sum(${crmDeals.amount}::float), 0)::float`,
      })
      .from(crmDeals)
      .groupBy(crmDeals.status);
    
    // Pipeline stage breakdown
    const pipelineBreakdown = await db
      .select({
        stageName: crmPipelineStages.name,
        stageId: crmDeals.stageId,
        count: sql<number>`count(*)::int`,
        totalValue: sql<number>`coalesce(sum(${crmDeals.amount}::float), 0)::float`,
      })
      .from(crmDeals)
      .leftJoin(crmPipelineStages, eq(crmDeals.stageId, crmPipelineStages.id))
      .where(eq(crmDeals.status, 'open'))
      .groupBy(crmDeals.stageId, crmPipelineStages.name);
    
    // Lead source distribution
    const leadSourceStats = await db
      .select({
        source: crmContacts.leadSource,
        count: sql<number>`count(*)::int`,
      })
      .from(crmContacts)
      .where(sql`${crmContacts.leadSource} is not null`)
      .groupBy(crmContacts.leadSource);
    
    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activityByDay = await db
      .select({
        date: sql<string>`date(${crmTimeline.occurredAt})`,
        count: sql<number>`count(*)::int`,
      })
      .from(crmTimeline)
      .where(sql`${crmTimeline.occurredAt} >= ${thirtyDaysAgo.toISOString()}`)
      .groupBy(sql`date(${crmTimeline.occurredAt})`)
      .orderBy(sql`date(${crmTimeline.occurredAt})`);
    
    // Task completion stats
    const taskStats = await db
      .select({
        status: crmTasks.status,
        count: sql<number>`count(*)::int`,
      })
      .from(crmTasks)
      .groupBy(crmTasks.status);
    
    // Win rate calculation
    const wonDeals = dealStats.find(d => d.status === 'won');
    const lostDeals = dealStats.find(d => d.status === 'lost');
    const totalClosed = (wonDeals?.count || 0) + (lostDeals?.count || 0);
    const winRate = totalClosed > 0 ? ((wonDeals?.count || 0) / totalClosed) * 100 : 0;
    
    // Total pipeline value
    const openDeals = dealStats.find(d => d.status === 'open');
    const pipelineValue = openDeals?.totalValue || 0;
    
    // Average deal value
    const allDealsCount = dealStats.reduce((sum, d) => sum + d.count, 0);
    const allDealsValue = dealStats.reduce((sum, d) => sum + d.totalValue, 0);
    const avgDealValue = allDealsCount > 0 ? allDealsValue / allDealsCount : 0;
    
    // Totals
    const totalContacts = lifecycleStats.reduce((sum, s) => sum + s.count, 0);
    const totalDeals = dealStats.reduce((sum, d) => sum + d.count, 0);
    
    res.json({
      summary: {
        totalContacts,
        totalDeals,
        pipelineValue,
        winRate: Math.round(winRate * 10) / 10,
        avgDealValue: Math.round(avgDealValue * 100) / 100,
        openDeals: openDeals?.count || 0,
        wonDeals: wonDeals?.count || 0,
        lostDeals: lostDeals?.count || 0,
      },
      lifecycleDistribution: lifecycleStats,
      dealsByStatus: dealStats,
      pipelineBreakdown,
      leadSources: leadSourceStats,
      activityTrend: activityByDay,
      taskStats,
    });
  } catch (error) {
    console.error("[CRM] Analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default crmRouter;
