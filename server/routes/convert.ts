/**
 * / convert — Lead Capture and Conversion Tool
 * Routes for forms, fields, submissions, templates, and public form endpoints.
 *
 * Auth model: authenticated endpoints use `requireAuth` (JWT) + inline clientId
 * check so clients cannot see other clients' forms. Public endpoints
 * (`/public/*` and `/submit/*`) have no auth — they back the embed script and
 * hosted form page.
 */

import express, { Router, Request, Response, NextFunction } from "express";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";
import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "../db";
import {
  convertForms,
  convertFormFields,
  convertSubmissions,
  convertTemplates,
  crmContacts,
  sendContacts,
  clients,
} from "@shared/schema";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";
import { ResendEmailService } from "../services/resend-email";
import { logContactActivity } from "../services/timeline-logger";

const router = Router();
const emailService = new ResendEmailService();

// ─── Helpers ───

function generateSlug(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").substring(0, 80);
  return `${base || "form"}-${randomBytes(3).toString("hex")}`;
}

function getConsentIp(req: Request): string | null {
  const fwd = (req.headers["x-forwarded-for"] as string) || "";
  return fwd.split(",")[0]?.trim() || req.ip || null;
}

// Inline owner check — rejects if the JWT clientId doesn't match the URL clientId.
function requireClientMatch(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const urlClientId = parseInt(req.params.clientId);
  if (isNaN(urlClientId)) {
    res.status(400).json({ error: "Invalid client ID" });
    return;
  }
  if (req.clientId !== urlClientId) {
    res.status(403).json({ error: "Forbidden: client mismatch" });
    return;
  }
  next();
}

// CORS middleware for public endpoints used by the embed script on third-party sites.
// Matches the pattern used by the / engage chat widget in server/routes/chat.ts.
function convertPublicCors(req: Request, res: Response, next: NextFunction): void {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
}

/**
 * Runs steps 2-5 of the submission pipeline against a submission that's already
 * been inserted into convert_submissions:
 *   (2) CRM contact upsert + form_submitted timeline event
 *   (3) sendContacts upsert with TCPA-compliant consent flags
 *   (4) Autoresponder email (fire-and-forget, respects autoresponderDelayMinutes)
 *   (5) Owner notification email (fire-and-forget)
 *
 * Both POST /submit (synchronous) and the SwipesBlue webhook (after successful
 * payment) call this helper. It re-derives the mapped values (email, phone,
 * name, consent flags) from submission.data + the form's fields so callers
 * don't need to stash them separately.
 */
async function runPostSubmissionPipeline(submissionId: number): Promise<void> {
  const [submission] = await db.select().from(convertSubmissions)
    .where(eq(convertSubmissions.id, submissionId))
    .limit(1);
  if (!submission) {
    console.warn(`[Convert] runPostSubmissionPipeline: submission ${submissionId} not found`);
    return;
  }

  const [form] = await db.select().from(convertForms)
    .where(eq(convertForms.id, submission.formId))
    .limit(1);
  if (!form) {
    console.warn(`[Convert] runPostSubmissionPipeline: form ${submission.formId} not found`);
    return;
  }

  const fields = await db.select().from(convertFormFields)
    .where(eq(convertFormFields.formId, form.id));

  const data = (submission.data as any) || {};

  // Extract mapped values — mirror of the logic in POST /submit
  let crmEmail: string | null = null;
  let crmPhone: string | null = null;
  let crmFirstName: string | null = null;
  let crmLastName: string | null = null;
  let emailConsent = !!submission.emailConsent;
  let smsConsent = !!submission.smsConsent;

  for (const field of fields) {
    const value = data[field.id.toString()] ?? data[field.label];
    if (value === undefined || value === null || value === "") continue;
    switch (field.mapsTo) {
      case "crm_email": crmEmail = String(value).trim().toLowerCase(); break;
      case "crm_phone": crmPhone = String(value).trim(); break;
      case "crm_first_name": crmFirstName = String(value).trim(); break;
      case "crm_last_name": crmLastName = String(value).trim(); break;
      case "email_consent": emailConsent = Boolean(value); break;
      case "sms_consent": smsConsent = Boolean(value); break;
    }
  }
  // Fallback: identify by field type if no explicit mapping
  for (const field of fields) {
    const value = data[field.id.toString()] ?? data[field.label];
    if (!value) continue;
    if (field.fieldType === "email" && !crmEmail) crmEmail = String(value).trim().toLowerCase();
    if (field.fieldType === "phone" && !crmPhone) crmPhone = String(value).trim();
  }

  const clientId = submission.clientId;
  const consentIp = submission.consentIp;

  // STEP 2: CRM upsert + timeline
  let crmContactId: number | null = null;
  if (crmEmail || crmPhone) {
    try {
      let existingContact: typeof crmContacts.$inferSelect | undefined;
      if (crmEmail) {
        const [found] = await db.select().from(crmContacts)
          .where(and(eq(crmContacts.clientId, clientId), eq(crmContacts.email, crmEmail)))
          .limit(1);
        existingContact = found;
      }

      if (existingContact) {
        crmContactId = existingContact.id;
        const crmUpdates: Record<string, any> = { updatedAt: new Date() };
        if (crmPhone && !existingContact.phone) crmUpdates.phone = crmPhone;
        if (crmFirstName && (!existingContact.firstName || existingContact.firstName === "New")) crmUpdates.firstName = crmFirstName;
        if (crmLastName && existingContact.lastName === "Client") crmUpdates.lastName = crmLastName;
        if (Object.keys(crmUpdates).length > 1) {
          await db.update(crmContacts).set(crmUpdates).where(eq(crmContacts.id, existingContact.id));
        }
      } else {
        const [newContact] = await db.insert(crmContacts).values({
          clientId,
          firstName: crmFirstName || "Form",
          lastName: crmLastName || "Submission",
          email: crmEmail || null,
          phone: crmPhone || null,
          lifecycleStage: "lead",
          leadSource: "convert_form",
          sourceType: "form",
          sourceId: String(form.id),
          sourceMetadata: { formName: form.name, formType: form.formType, submissionId: submission.id },
        }).returning();
        crmContactId = newContact.id;
      }

      await db.update(convertSubmissions)
        .set({ crmContactId })
        .where(eq(convertSubmissions.id, submission.id));

      await logContactActivity({
        clientId,
        contactId: crmContactId,
        eventType: "form_submitted",
        title: `Form submitted: ${form.name}`,
        description: `Via ${form.deployTarget} — ${form.formType}`,
        sourceApp: "convert",
        sourceEntityType: "convert_submission",
        sourceEntityId: String(submission.id),
        metadata: { formId: form.id, submissionId: submission.id, formType: form.formType },
        actorType: "system",
      });
    } catch (crmError) {
      console.error("[Convert] CRM contact upsert failed:", crmError);
    }
  }

  // STEP 3: sendContacts upsert with consent
  if (crmEmail && emailConsent) {
    try {
      const [existingSend] = await db.select().from(sendContacts)
        .where(and(eq(sendContacts.clientId, clientId), eq(sendContacts.email, crmEmail)))
        .limit(1);

      if (!existingSend) {
        const [sendContact] = await db.insert(sendContacts).values({
          clientId,
          email: crmEmail,
          phone: crmPhone || null,
          firstName: crmFirstName || null,
          lastName: crmLastName || null,
          emailConsent: true,
          emailConsentDate: new Date(),
          emailConsentIp: consentIp,
          emailConsentMethod: "convert_form",
          smsConsent,
          smsConsentDate: smsConsent ? new Date() : null,
          smsConsentIp: smsConsent ? consentIp : null,
          smsConsentMethod: smsConsent ? "convert_form" : null,
          emailStatus: form.doubleOptin ? "pending" : "subscribed",
          smsStatus: smsConsent ? "subscribed" : "unsubscribed",
          source: "convert_form",
        }).returning();

        await db.update(convertSubmissions)
          .set({ sendContactId: sendContact.id })
          .where(eq(convertSubmissions.id, submission.id));
      } else {
        const sendUpdates: Record<string, any> = {};
        if (!existingSend.emailConsent && emailConsent) {
          sendUpdates.emailConsent = true;
          sendUpdates.emailConsentDate = new Date();
          sendUpdates.emailConsentIp = consentIp;
          sendUpdates.emailConsentMethod = "convert_form";
          sendUpdates.emailStatus = "subscribed";
        }
        if (!existingSend.smsConsent && smsConsent) {
          sendUpdates.smsConsent = true;
          sendUpdates.smsConsentDate = new Date();
          sendUpdates.smsConsentIp = consentIp;
          sendUpdates.smsConsentMethod = "convert_form";
          sendUpdates.smsStatus = "subscribed";
        }
        if (Object.keys(sendUpdates).length > 0) {
          await db.update(sendContacts).set(sendUpdates).where(eq(sendContacts.id, existingSend.id));
        }
        await db.update(convertSubmissions)
          .set({ sendContactId: existingSend.id })
          .where(eq(convertSubmissions.id, submission.id));
      }
    } catch (sendError) {
      console.error("[Convert] Send contact upsert failed:", sendError);
    }
  }

  // STEP 4: autoresponder (fire-and-forget)
  if (form.autoresponderEnabled && crmEmail && form.autoresponderSubject && form.autoresponderBody) {
    const delay = (form.autoresponderDelayMinutes || 0) * 60 * 1000;
    const subject = form.autoresponderSubject;
    const body = form.autoresponderBody;
    const toEmail = crmEmail;
    setTimeout(() => {
      emailService.sendRawEmail(toEmail, subject, body).catch((autoErr) => {
        console.error("[Convert] Autoresponder send failed:", autoErr);
      });
    }, delay);
  }

  // STEP 5: owner notification
  if (form.notifyEnabled && form.notifyEmail) {
    const subject = `New form submission: ${form.name}`;
    const contactLine = crmEmail || crmPhone || "unknown";
    const body = `<h2>New submission on "${form.name}"</h2>
      <p><strong>From:</strong> ${crmFirstName || ""} ${crmLastName || ""} (${contactLine})</p>
      <p><strong>Form type:</strong> ${form.formType}</p>
      <p><strong>Source:</strong> ${submission.sourceUrl || "direct"}</p>
      <p><strong>Email consent:</strong> ${emailConsent ? "Yes" : "No"}</p>
      <p><strong>SMS consent:</strong> ${smsConsent ? "Yes" : "No"}</p>
      ${submission.paymentStatus === "completed" ? `<p><strong>Payment:</strong> Received (${submission.paymentAmount ? `${(submission.paymentAmount / 100).toFixed(2)} ${submission.paymentCurrency?.toUpperCase() || "USD"}` : "amount unknown"})</p>` : ""}
      <p><a href="https://businessblueprint.io/convert/dashboard">View in Dashboard</a></p>`;
    emailService.sendRawEmail(form.notifyEmail, subject, body).catch((notifErr) => {
      console.error("[Convert] Notification send failed:", notifErr);
    });
  }

  console.log(`[Convert] Pipeline completed for submission ${submission.id} on form "${form.name}" (client ${clientId})`);
}

// ─── TEMPLATES (authenticated — any logged-in client can browse) ───

router.get("/templates", requireAuth, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const templates = await db.select().from(convertTemplates)
      .where(eq(convertTemplates.isActive, true))
      .orderBy(convertTemplates.sortOrder);
    res.json({ success: true, templates });
  } catch (error: any) {
    console.error("[Convert] List templates error:", error);
    res.status(500).json({ error: "Failed to list templates" });
  }
});

// ─── FORMS CRUD ───

router.get("/:clientId/forms", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const forms = await db.select().from(convertForms)
      .where(eq(convertForms.clientId, clientId))
      .orderBy(desc(convertForms.updatedAt));
    res.json({ success: true, forms });
  } catch (error: any) {
    console.error("[Convert] List forms error:", error);
    res.status(500).json({ error: "Failed to list forms" });
  }
});

router.post("/:clientId/forms", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const { name, formType, deployTarget, templateId, ...rest } = req.body;
    if (!name || !formType) {
      return res.status(400).json({ error: "Name and form type are required" });
    }
    const slug = generateSlug(name);
    const [form] = await db.insert(convertForms).values({
      clientId,
      name,
      slug,
      formType,
      deployTarget: deployTarget || "website",
      templateId: templateId || null,
      ...rest,
    }).returning();
    res.json({ success: true, form });
  } catch (error: any) {
    console.error("[Convert] Create form error:", error);
    res.status(500).json({ error: "Failed to create form" });
  }
});

router.get("/:clientId/forms/:formId", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });
    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, formId))
      .orderBy(convertFormFields.sortOrder);
    res.json({ success: true, form, fields });
  } catch (error: any) {
    console.error("[Convert] Get form error:", error);
    res.status(500).json({ error: "Failed to get form" });
  }
});

router.patch("/:clientId/forms/:formId", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [existing] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!existing) return res.status(404).json({ error: "Form not found" });

    const updates: Record<string, any> = { ...req.body, updatedAt: new Date() };
    delete updates.id;
    delete updates.clientId;
    delete updates.slug;
    delete updates.createdAt;

    const [updated] = await db.update(convertForms).set(updates)
      .where(eq(convertForms.id, formId)).returning();
    res.json({ success: true, form: updated });
  } catch (error: any) {
    console.error("[Convert] Update form error:", error);
    res.status(500).json({ error: "Failed to update form" });
  }
});

router.delete("/:clientId/forms/:formId", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [existing] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!existing) return res.status(404).json({ error: "Form not found" });
    await db.delete(convertForms).where(eq(convertForms.id, formId));
    res.json({ success: true, message: "Form deleted" });
  } catch (error: any) {
    console.error("[Convert] Delete form error:", error);
    res.status(500).json({ error: "Failed to delete form" });
  }
});

router.post("/:clientId/forms/:formId/publish", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);

    const [existingForm] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!existingForm) return res.status(404).json({ error: "Form not found" });

    // Pre-publish validation: must have an input-capable field and a way to reach the submitter.
    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, formId));

    const LAYOUT_TYPES = new Set(["heading", "paragraph", "divider", "spacer", "image", "page_break"]);
    const inputFields = fields.filter((f) => !LAYOUT_TYPES.has(f.fieldType));
    if (inputFields.length === 0) {
      return res.status(400).json({ error: "Add at least one input field before publishing." });
    }

    const hasEmailField = fields.some((f) => f.fieldType === "email" || f.mapsTo === "crm_email");
    const hasPhoneField = fields.some((f) => f.fieldType === "phone" || f.mapsTo === "crm_phone");
    if (!hasEmailField && !hasPhoneField) {
      return res.status(400).json({
        error: "Add an email or phone field so submissions can reach / connect.",
      });
    }

    const missingLabels = fields.filter((f) => !f.label || f.label.trim() === "");
    if (missingLabels.length > 0) {
      return res.status(400).json({ error: "Every field needs a label before publishing." });
    }

    const [form] = await db.update(convertForms)
      .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .returning();
    res.json({ success: true, form });
  } catch (error: any) {
    console.error("[Convert] Publish error:", error);
    res.status(500).json({ error: "Failed to publish form" });
  }
});

router.post("/:clientId/forms/:formId/unpublish", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.update(convertForms)
      .set({ status: "draft", updatedAt: new Date() })
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .returning();
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.json({ success: true, form });
  } catch (error: any) {
    console.error("[Convert] Unpublish error:", error);
    res.status(500).json({ error: "Failed to unpublish form" });
  }
});

// ─── BUILDER (visual form builder state) ───

// Returns form + fields + design + settings in the shape the builder expects.
// Field names are mapped from Phase A's column names to the builder's vocabulary:
//   pageNumber → step, columnSpan → width (1=half/2=full), mapsTo → crmMapping,
//   conditionalRules → conditions.
router.get("/:clientId/forms/:formId/builder", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);

    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, formId))
      .orderBy(convertFormFields.sortOrder);

    const builderFields = fields.map((f) => ({
      fieldId: f.id,
      type: f.fieldType,
      label: f.label,
      placeholder: f.placeholder || "",
      helpText: f.helpText || "",
      required: !!f.isRequired,
      width: (f.columnSpan === 1 ? "half" : "full") as "half" | "full",
      sortOrder: f.sortOrder,
      step: f.pageNumber || 1,
      options: (f.options as any) || [],
      defaultValue: f.defaultValue || "",
      validation: {
        minLength: f.minLength ?? undefined,
        maxLength: f.maxLength ?? undefined,
        pattern: f.validationPattern ?? undefined,
      },
      crmMapping: f.mapsTo || null,
      conditions: (f.conditionalRules as any) || null,
      config: (f.config as any) || {},
    }));

    res.json({
      success: true,
      form: {
        id: form.id,
        name: form.name,
        slug: form.slug,
        formType: form.formType,
        status: form.status,
        submissionCount: form.submissionCount || 0,
        viewCount: form.viewCount || 0,
      },
      fields: builderFields,
      design: (form.design as any) || null,
      settings: (form.settings as any) || null,
    });
  } catch (error: any) {
    console.error("[Convert] Builder get error:", error);
    res.status(500).json({ error: "Failed to load builder state" });
  }
});

// Single-shot save: replaces form name/design/settings and upserts fields.
// Fields are matched by fieldId — missing IDs = insert, missing rows = delete.
router.put("/:clientId/forms/:formId/builder", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);

    const [existingForm] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!existingForm) return res.status(404).json({ error: "Form not found" });

    const body = req.body || {};
    const incomingFields: any[] = Array.isArray(body.fields) ? body.fields : [];

    // Update form-level builder state
    const formUpdates: Record<string, any> = { updatedAt: new Date() };
    if (typeof body.name === "string" && body.name.trim() !== "") {
      formUpdates.name = body.name.trim();
    }
    if (body.design !== undefined) formUpdates.design = body.design;
    if (body.settings !== undefined) formUpdates.settings = body.settings;
    await db.update(convertForms).set(formUpdates).where(eq(convertForms.id, formId));

    // Diff existing fields vs incoming. Match by fieldId.
    const existingFields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, formId));
    const existingById = new Map<number, typeof existingFields[number]>();
    for (const f of existingFields) existingById.set(f.id, f);

    const keptIds = new Set<number>();
    const savedFields: Array<{ fieldId: number; tempId?: string }> = [];

    for (let i = 0; i < incomingFields.length; i++) {
      const f = incomingFields[i] || {};
      if (!f.type || !f.label) continue;

      const fieldRow = {
        formId,
        fieldType: String(f.type),
        label: String(f.label),
        placeholder: f.placeholder || null,
        helpText: f.helpText || null,
        isRequired: !!f.required,
        columnSpan: f.width === "half" ? 1 : 2,
        pageNumber: Number.isFinite(f.step) ? f.step : 1,
        sortOrder: i,
        options: f.options ?? null,
        defaultValue: f.defaultValue || null,
        mapsTo: f.crmMapping || null,
        conditionalRules: f.conditions ?? null,
        config: f.config ?? null,
        validationPattern: f.validation?.pattern || null,
        minLength: f.validation?.minLength ?? null,
        maxLength: f.validation?.maxLength ?? null,
      };

      if (f.fieldId && existingById.has(f.fieldId)) {
        await db.update(convertFormFields).set(fieldRow)
          .where(and(eq(convertFormFields.id, f.fieldId), eq(convertFormFields.formId, formId)));
        keptIds.add(f.fieldId);
        savedFields.push({ fieldId: f.fieldId, tempId: f.tempId });
      } else {
        const [inserted] = await db.insert(convertFormFields)
          .values(fieldRow)
          .returning({ id: convertFormFields.id });
        savedFields.push({ fieldId: inserted.id, tempId: f.tempId });
      }
    }

    // Delete any existing field rows that weren't in the incoming set
    const existingIds = Array.from(existingById.keys());
    for (const id of existingIds) {
      if (!keptIds.has(id)) {
        await db.delete(convertFormFields).where(eq(convertFormFields.id, id));
      }
    }

    res.json({ success: true, savedFields });
  } catch (error: any) {
    console.error("[Convert] Builder save error:", error);
    res.status(500).json({ error: "Failed to save builder state" });
  }
});

router.get("/:clientId/forms/:formId/embed-code", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const baseUrl = "https://businessblueprint.io";
    const commonAttrs = `src="${baseUrl}/convert/embed.js" data-form-id="${form.slug}" data-client-id="${clientId}"`;

    // Embed code variants:
    //   - formType: "popup"  → centered modal with overlay
    //   - formType: "optin"  with popup trigger → slide-in panel from edge
    //   - everything else    → inline render at the script tag position
    let embedCode: string;
    if (form.formType === "popup") {
      embedCode = `<script ${commonAttrs} data-type="popup" data-trigger="${form.popupTrigger || "time_delay"}" data-delay="${form.popupDelaySeconds || 5}" data-position="${form.popupPosition || "center"}" data-frequency="${form.popupShowFrequency || "once_per_session"}"></script>`;
    } else if (form.formType === "optin" && form.popupTrigger) {
      embedCode = `<script ${commonAttrs} data-type="slide_in" data-trigger="${form.popupTrigger || "time_delay"}" data-delay="${form.popupDelaySeconds || 5}" data-position="${form.popupPosition || "bottom_right"}" data-frequency="${form.popupShowFrequency || "once_per_session"}"></script>`;
    } else {
      embedCode = `<script ${commonAttrs}></script>`;
    }

    // Alternate: explicit-container inline embed. Useful when the host site
    // wants to control exactly where the form renders (e.g., inside a grid cell).
    const inlineEmbed = `<div id="bb-convert-${form.slug}"></div>\n<script ${commonAttrs} data-container="#bb-convert-${form.slug}"></script>`;

    const hostedUrl = `${baseUrl}/convert/f/${form.slug}?client=${clientId}`;

    res.json({ success: true, embedCode, inlineEmbed, hostedUrl });
  } catch (error: any) {
    console.error("[Convert] Embed code error:", error);
    res.status(500).json({ error: "Failed to generate embed code" });
  }
});

// ─── FIELDS CRUD ───

router.get("/:clientId/forms/:formId/fields", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });
    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, formId))
      .orderBy(convertFormFields.sortOrder);
    res.json({ success: true, fields });
  } catch (error: any) {
    console.error("[Convert] Get fields error:", error);
    res.status(500).json({ error: "Failed to get fields" });
  }
});

router.post("/:clientId/forms/:formId/fields", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const { fieldType, label, ...rest } = req.body;
    if (!fieldType || !label) {
      return res.status(400).json({ error: "Field type and label are required" });
    }
    const [field] = await db.insert(convertFormFields).values({
      formId, fieldType, label, ...rest,
    }).returning();
    res.json({ success: true, field });
  } catch (error: any) {
    console.error("[Convert] Add field error:", error);
    res.status(500).json({ error: "Failed to add field" });
  }
});

router.patch("/:clientId/forms/:formId/fields/:fieldId", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const fieldId = parseInt(req.params.fieldId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const updates: Record<string, any> = { ...req.body };
    delete updates.id;
    delete updates.formId;

    const [field] = await db.update(convertFormFields).set(updates)
      .where(and(eq(convertFormFields.id, fieldId), eq(convertFormFields.formId, formId)))
      .returning();
    if (!field) return res.status(404).json({ error: "Field not found" });
    res.json({ success: true, field });
  } catch (error: any) {
    console.error("[Convert] Update field error:", error);
    res.status(500).json({ error: "Failed to update field" });
  }
});

router.delete("/:clientId/forms/:formId/fields/:fieldId", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const fieldId = parseInt(req.params.fieldId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    await db.delete(convertFormFields)
      .where(and(eq(convertFormFields.id, fieldId), eq(convertFormFields.formId, formId)));
    res.json({ success: true, message: "Field deleted" });
  } catch (error: any) {
    console.error("[Convert] Delete field error:", error);
    res.status(500).json({ error: "Failed to delete field" });
  }
});

router.post("/:clientId/forms/:formId/fields/reorder", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const { fieldIds } = req.body;
    if (!Array.isArray(fieldIds)) {
      return res.status(400).json({ error: "fieldIds array required" });
    }
    for (let i = 0; i < fieldIds.length; i++) {
      await db.update(convertFormFields).set({ sortOrder: i })
        .where(and(eq(convertFormFields.id, fieldIds[i]), eq(convertFormFields.formId, formId)));
    }
    res.json({ success: true, message: "Fields reordered" });
  } catch (error: any) {
    console.error("[Convert] Reorder error:", error);
    res.status(500).json({ error: "Failed to reorder fields" });
  }
});

// ─── TEMPLATE → FORM ───

router.post("/:clientId/forms/from-template/:slug", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const templateSlug = req.params.slug;
    const [template] = await db.select().from(convertTemplates)
      .where(eq(convertTemplates.slug, templateSlug))
      .limit(1);
    if (!template) return res.status(404).json({ error: "Template not found" });

    const formName = req.body.name || template.name;
    const formSlug = generateSlug(formName);
    const design = (template.design as any) || {};

    const [form] = await db.insert(convertForms).values({
      clientId,
      name: formName,
      slug: formSlug,
      formType: template.formType,
      deployTarget: template.deployTarget,
      templateId: template.slug,
      brandColor: design.brandColor || "#8000FF",
      thankYouMessage: design.thankYouMessage || "Thank you for your submission!",
      thankYouType: "message",
      consentTextEmail: design.consentTextEmail || "I agree to receive email communications. You can unsubscribe at any time.",
      consentTextSms: design.consentTextSms || "I agree to receive SMS notifications. Message and data rates may apply. Reply STOP to unsubscribe.",
      popupTrigger: design.popupTrigger || null,
      popupDelaySeconds: design.popupDelaySeconds || null,
      popupScrollPercent: design.popupScrollPercent || null,
      popupPosition: design.popupPosition || null,
      popupShowFrequency: design.popupShowFrequency || null,
      optinType: design.optinType || null,
    }).returning();

    const templateFields = (template.fields as any[]) || [];
    for (let i = 0; i < templateFields.length; i++) {
      const f = templateFields[i];
      await db.insert(convertFormFields).values({
        formId: form.id,
        fieldType: f.fieldType,
        label: f.label,
        placeholder: f.placeholder || null,
        helpText: f.helpText || null,
        isRequired: f.isRequired || false,
        options: f.options || null,
        sortOrder: i,
        columnSpan: f.columnSpan || 2,
        mapsTo: f.mapsTo || null,
        defaultValue: f.defaultValue || null,
      });
    }

    res.json({ success: true, form });
  } catch (error: any) {
    console.error("[Convert] Template form creation error:", error);
    res.status(500).json({ error: "Failed to create form from template" });
  }
});

// ─── SUBMISSIONS ───

router.get("/:clientId/submissions", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formIdParam = req.query.formId ? parseInt(req.query.formId as string) : null;

    const whereClause = formIdParam
      ? and(eq(convertSubmissions.clientId, clientId), eq(convertSubmissions.formId, formIdParam))
      : eq(convertSubmissions.clientId, clientId);

    const submissions = await db.select().from(convertSubmissions)
      .where(whereClause)
      .orderBy(desc(convertSubmissions.createdAt))
      .limit(200);

    res.json({ success: true, submissions });
  } catch (error: any) {
    console.error("[Convert] List submissions error:", error);
    res.status(500).json({ error: "Failed to list submissions" });
  }
});

router.patch("/:clientId/submissions/:id", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status required" });

    const [updated] = await db.update(convertSubmissions)
      .set({ status })
      .where(and(eq(convertSubmissions.id, id), eq(convertSubmissions.clientId, clientId)))
      .returning();
    if (!updated) return res.status(404).json({ error: "Submission not found" });
    res.json({ success: true, submission: updated });
  } catch (error: any) {
    console.error("[Convert] Update submission error:", error);
    res.status(500).json({ error: "Failed to update submission" });
  }
});

// ─── ANALYTICS ───

router.get("/:clientId/analytics", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const forms = await db.select().from(convertForms).where(eq(convertForms.clientId, clientId));

    const totalForms = forms.length;
    const publishedForms = forms.filter((f) => f.status === "published").length;
    const totalViews = forms.reduce((sum, f) => sum + (f.viewCount || 0), 0);
    const totalSubmissions = forms.reduce((sum, f) => sum + (f.submissionCount || 0), 0);
    const conversionRate = totalViews > 0 ? Number(((totalSubmissions / totalViews) * 100).toFixed(1)) : 0;

    res.json({
      success: true,
      analytics: { totalForms, publishedForms, totalViews, totalSubmissions, conversionRate },
    });
  } catch (error: any) {
    console.error("[Convert] Analytics error:", error);
    res.status(500).json({ error: "Failed to get analytics" });
  }
});

// ─── PUBLIC ENDPOINTS (no auth) ───

// Preflight for both public endpoints
router.options("/public/:clientId/:formSlug", convertPublicCors, (_req, res) => res.sendStatus(200));
router.options("/submit/:clientId/:formSlug", convertPublicCors, (_req, res) => res.sendStatus(200));

router.get("/public/:clientId/:formSlug", convertPublicCors, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formSlug = req.params.formSlug;
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const [form] = await db.select().from(convertForms)
      .where(and(
        eq(convertForms.clientId, clientId),
        eq(convertForms.slug, formSlug),
        eq(convertForms.status, "published"),
      ))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found or not published" });

    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, form.id))
      .orderBy(convertFormFields.sortOrder);

    await db.update(convertForms)
      .set({ viewCount: (form.viewCount || 0) + 1 })
      .where(eq(convertForms.id, form.id));

    const [client] = await db.select({
      companyName: clients.companyName,
      website: clients.website,
    }).from(clients).where(eq(clients.id, clientId)).limit(1);

    res.json({
      success: true,
      form: {
        id: form.id,
        name: form.name,
        slug: form.slug,
        formType: form.formType,
        brandColor: form.brandColor,
        showBranding: form.showBranding,
        logoUrl: form.logoUrl,
        thankYouType: form.thankYouType,
        thankYouMessage: form.thankYouMessage,
        thankYouRedirectUrl: form.thankYouRedirectUrl,
        consentTextEmail: form.consentTextEmail,
        consentTextSms: form.consentTextSms,
        optinType: form.optinType,
        popupTrigger: form.popupTrigger,
        popupDelaySeconds: form.popupDelaySeconds,
        popupScrollPercent: form.popupScrollPercent,
        popupPosition: form.popupPosition,
        popupShowFrequency: form.popupShowFrequency,
        // Phase C: expose the full builder design + settings JSON so the embed
        // script can apply theme colors, fonts, spacing, autoresponder config, etc.
        design: form.design,
        settings: form.settings,
      },
      fields: fields.map((f) => ({
        id: f.id,
        fieldType: f.fieldType,
        label: f.label,
        placeholder: f.placeholder,
        helpText: f.helpText,
        isRequired: f.isRequired,
        validationPattern: f.validationPattern,
        validationMessage: f.validationMessage,
        minLength: f.minLength,
        maxLength: f.maxLength,
        options: f.options,
        conditionalRules: f.conditionalRules,
        sortOrder: f.sortOrder,
        columnSpan: f.columnSpan,
        pageNumber: f.pageNumber,
        defaultValue: f.defaultValue,
        mapsTo: f.mapsTo,
        config: f.config,
      })),
      client: {
        companyName: client?.companyName || "",
        website: client?.website || "",
      },
    });
  } catch (error: any) {
    console.error("[Convert] Public form fetch error:", error);
    res.status(500).json({ error: "Failed to load form" });
  }
});

router.post("/submit/:clientId/:formSlug", convertPublicCors, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formSlug = req.params.formSlug;
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const [form] = await db.select().from(convertForms)
      .where(and(
        eq(convertForms.clientId, clientId),
        eq(convertForms.slug, formSlug),
        eq(convertForms.status, "published"),
      ))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const { data, sourceUrl, referrerUrl, utmSource, utmMedium, utmCampaign, userAgent } = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Form data is required" });
    }

    const consentIp = getConsentIp(req);

    // Peek at form fields to populate consent flags on the row itself (so the
    // helper can trust them) — the helper still re-derives the full mapped
    // values from submission.data + fields.
    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, form.id));
    let emailConsent = false;
    let smsConsent = false;
    for (const field of fields) {
      const value = (data as any)[field.id.toString()] ?? (data as any)[field.label];
      if (value === undefined || value === null || value === "") continue;
      if (field.mapsTo === "email_consent") emailConsent = Boolean(value);
      if (field.mapsTo === "sms_consent") smsConsent = Boolean(value);
    }

    // Insert submission as "completed" — non-payment flow
    const [submission] = await db.insert(convertSubmissions).values({
      formId: form.id,
      clientId,
      data,
      emailConsent,
      smsConsent,
      consentIp,
      consentTimestamp: (emailConsent || smsConsent) ? new Date() : null,
      sourceUrl: sourceUrl || null,
      referrerUrl: referrerUrl || null,
      utmSource: utmSource || form.utmSource || null,
      utmMedium: utmMedium || form.utmMedium || null,
      utmCampaign: utmCampaign || form.utmCampaign || null,
      userAgent: userAgent || null,
      paymentStatus: "none",
    }).returning();

    await db.update(convertForms)
      .set({ submissionCount: (form.submissionCount || 0) + 1 })
      .where(eq(convertForms.id, form.id));

    await runPostSubmissionPipeline(submission.id);

    res.json({
      success: true,
      submissionId: submission.id,
      thankYouType: form.thankYouType,
      thankYouMessage: form.thankYouMessage,
      thankYouRedirectUrl: form.thankYouRedirectUrl,
    });
  } catch (error: any) {
    console.error("[Convert] Submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

// ─── PAYMENT: SwipesBlue checkout + webhook ───

/**
 * POST /api/convert/public/:clientId/:formSlug/checkout
 *
 * Creates a pending convert_submissions row + a SwipesBlue checkout session.
 * The embed script calls this when a form contains a "payment" field. The
 * returned checkoutUrl redirects the end user to SwipesBlue's hosted checkout.
 *
 * Runs the CRM / send / timeline / autoresponder / notification pipeline ONLY
 * after SwipesBlue's checkout.session.completed webhook fires — otherwise we'd
 * be creating CRM contacts for abandoned payment attempts.
 *
 * Credentials come from platform-wide env vars (SWIPESBLUE_API_URL,
 * SWIPESBLUE_API_KEY, SWIPESBLUE_WEBHOOK_SECRET) per CLAUDE.md. Per-client
 * SwipesBlue credentials are not yet supported.
 */
router.post("/public/:clientId/:formSlug/checkout", convertPublicCors, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formSlug = req.params.formSlug;
    if (isNaN(clientId)) return res.status(400).json({ error: "Invalid client ID" });

    const [form] = await db.select().from(convertForms)
      .where(and(
        eq(convertForms.clientId, clientId),
        eq(convertForms.slug, formSlug),
        eq(convertForms.status, "published"),
      ))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const {
      amount,
      currency = "usd",
      description,
      customerEmail,
      formData,
      sourceUrl,
      referrerUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      userAgent,
    } = req.body || {};

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    if (!formData || typeof formData !== "object") {
      return res.status(400).json({ error: "formData is required" });
    }

    const apiKey = process.env.SWIPESBLUE_API_KEY;
    const apiUrl = process.env.SWIPESBLUE_API_URL || "https://swipesblue.com/api/v1";
    if (!apiKey) {
      console.error("[Convert] SWIPESBLUE_API_KEY not configured — payment field cannot process checkout");
      return res.status(503).json({ error: "Payment processing not configured" });
    }

    const consentIp = getConsentIp(req);

    // Peek for consent flags so the row reflects them from the start
    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, form.id));
    let emailConsent = false;
    let smsConsent = false;
    for (const field of fields) {
      const value = (formData as any)[field.id.toString()] ?? (formData as any)[field.label];
      if (value === undefined || value === null || value === "") continue;
      if (field.mapsTo === "email_consent") emailConsent = Boolean(value);
      if (field.mapsTo === "sms_consent") smsConsent = Boolean(value);
    }

    // Create the submission first, in pending state. The pipeline won't run
    // until the webhook confirms payment.
    const [submission] = await db.insert(convertSubmissions).values({
      formId: form.id,
      clientId,
      data: formData,
      emailConsent,
      smsConsent,
      consentIp,
      consentTimestamp: (emailConsent || smsConsent) ? new Date() : null,
      sourceUrl: sourceUrl || null,
      referrerUrl: referrerUrl || null,
      utmSource: utmSource || form.utmSource || null,
      utmMedium: utmMedium || form.utmMedium || null,
      utmCampaign: utmCampaign || form.utmCampaign || null,
      userAgent: userAgent || null,
      paymentStatus: "pending",
      paymentAmount: Math.round(amount),
      paymentCurrency: String(currency).toLowerCase().substring(0, 10),
    }).returning();

    const baseUrl = "https://businessblueprint.io";
    const successUrl = `${baseUrl}/convert/f/${form.slug}?client=${clientId}&payment=success&submission=${submission.id}`;
    const cancelUrl = `${baseUrl}/convert/f/${form.slug}?client=${clientId}&payment=cancelled`;

    try {
      const swipesRes = await fetch(`${apiUrl}/checkout/sessions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount),
          currency: String(currency).toLowerCase(),
          description: description || form.name,
          customer_email: customerEmail || null,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode: "redirect",
          metadata: {
            submissionId: String(submission.id),
            formId: String(form.id),
            clientId: String(clientId),
            source: "convert",
          },
        }),
      });

      if (!swipesRes.ok) {
        const errText = await swipesRes.text().catch(() => "");
        console.error(`[Convert] SwipesBlue session creation failed (${swipesRes.status}):`, errText);
        await db.update(convertSubmissions)
          .set({ paymentStatus: "failed" })
          .where(eq(convertSubmissions.id, submission.id));
        return res.status(502).json({ error: "Payment processor error" });
      }

      const session = await swipesRes.json();
      const sessionId = session?.id;
      const checkoutUrl = session?.url || session?.checkout_url;

      if (!sessionId || !checkoutUrl) {
        console.error("[Convert] SwipesBlue response missing id/url:", session);
        await db.update(convertSubmissions)
          .set({ paymentStatus: "failed" })
          .where(eq(convertSubmissions.id, submission.id));
        return res.status(502).json({ error: "Payment processor returned unexpected response" });
      }

      await db.update(convertSubmissions)
        .set({ paymentSessionId: String(sessionId) })
        .where(eq(convertSubmissions.id, submission.id));

      res.json({
        success: true,
        checkoutUrl,
        submissionId: submission.id,
        sessionId,
      });
    } catch (fetchErr: any) {
      console.error("[Convert] SwipesBlue checkout fetch error:", fetchErr);
      await db.update(convertSubmissions)
        .set({ paymentStatus: "failed" })
        .where(eq(convertSubmissions.id, submission.id));
      res.status(502).json({ error: "Could not reach payment processor" });
    }
  } catch (error: any) {
    console.error("[Convert] Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

/**
 * POST /api/convert/webhook/swipesblue
 *
 * SwipesBlue webhook endpoint. Verifies signature via HMAC-SHA256 of the raw
 * request body using SWIPESBLUE_WEBHOOK_SECRET. Handles:
 *
 *   checkout.session.completed  → mark submission completed, run pipeline,
 *                                 bump form.submissionCount
 *   checkout.session.failed     → mark submission failed
 *
 * Signature header: X-Swipesblue-Signature (hex-encoded HMAC-SHA256). If the
 * real SwipesBlue webhook uses a different scheme, this will need adjustment —
 * but without public webhook docs the hex-HMAC pattern is the safest default.
 *
 * Uses express.raw() specifically on this route so we can HMAC the exact bytes
 * the sender signed, not a re-serialised JSON body.
 */
router.post(
  "/webhook/swipesblue",
  express.raw({ type: "application/json", limit: "1mb" }),
  async (req: Request, res: Response) => {
    try {
      const rawBody = req.body as Buffer;
      if (!Buffer.isBuffer(rawBody)) {
        return res.status(400).json({ error: "Expected raw body" });
      }

      const signature = (req.headers["x-swipesblue-signature"] as string) || "";
      const secret = process.env.SWIPESBLUE_WEBHOOK_SECRET;

      if (!secret) {
        console.error("[Convert] SWIPESBLUE_WEBHOOK_SECRET not set — rejecting webhook");
        return res.status(500).json({ error: "Webhook not configured" });
      }
      if (!signature) {
        return res.status(400).json({ error: "Missing signature" });
      }

      const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
      let valid = false;
      try {
        const a = Buffer.from(signature, "hex");
        const b = Buffer.from(expected, "hex");
        valid = a.length === b.length && timingSafeEqual(a, b);
      } catch {
        valid = false;
      }
      if (!valid) {
        console.warn("[Convert] SwipesBlue webhook signature mismatch");
        return res.status(401).json({ error: "Invalid signature" });
      }

      let event: any;
      try {
        event = JSON.parse(rawBody.toString("utf8"));
      } catch {
        return res.status(400).json({ error: "Invalid JSON" });
      }

      const eventType: string = event?.type || "";
      const sessionObj = event?.data?.object || event?.data || {};
      const sessionId: string | undefined = sessionObj?.id || sessionObj?.session_id;

      console.log(`[Convert] SwipesBlue webhook received: ${eventType}${sessionId ? ` session=${sessionId}` : ""}`);

      if (!sessionId) {
        return res.json({ received: true, ignored: "no session id" });
      }

      if (eventType === "checkout.session.completed" || eventType === "payment_intent.succeeded") {
        const [submission] = await db.select().from(convertSubmissions)
          .where(eq(convertSubmissions.paymentSessionId, sessionId))
          .limit(1);
        if (!submission) {
          console.warn(`[Convert] Webhook for unknown session ${sessionId}`);
          return res.json({ received: true, ignored: "unknown session" });
        }
        if (submission.paymentStatus === "completed") {
          return res.json({ received: true, idempotent: true });
        }

        await db.update(convertSubmissions)
          .set({ paymentStatus: "completed" })
          .where(eq(convertSubmissions.id, submission.id));

        // Bump form.submissionCount only now — successful payment = real submission
        await db.update(convertForms)
          .set({ submissionCount: sql`${convertForms.submissionCount} + 1` })
          .where(eq(convertForms.id, submission.formId));

        await runPostSubmissionPipeline(submission.id);

        return res.json({ received: true, submissionId: submission.id });
      }

      if (eventType === "checkout.session.failed" || eventType === "checkout.session.expired" || eventType === "payment_intent.payment_failed") {
        await db.update(convertSubmissions)
          .set({ paymentStatus: "failed" })
          .where(eq(convertSubmissions.paymentSessionId, sessionId));
        return res.json({ received: true, marked: "failed" });
      }

      // Unknown event type — ack and ignore
      res.json({ received: true, ignored: eventType });
    } catch (error: any) {
      console.error("[Convert] Webhook handler error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  }
);

export { router as convertRouter };
