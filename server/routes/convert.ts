/**
 * / convert — Lead Capture and Conversion Tool
 * Routes for forms, fields, submissions, templates, and public form endpoints.
 *
 * Auth model: authenticated endpoints use `requireAuth` (JWT) + inline clientId
 * check so clients cannot see other clients' forms. Public endpoints
 * (`/public/*` and `/submit/*`) have no auth — they back the embed script and
 * hosted form page.
 */

import { Router, Request, Response, NextFunction } from "express";
import { randomBytes } from "crypto";
import { eq, and, desc } from "drizzle-orm";
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
    const [form] = await db.update(convertForms)
      .set({ status: "published", publishedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .returning();
    if (!form) return res.status(404).json({ error: "Form not found" });
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

router.get("/:clientId/forms/:formId/embed-code", requireAuth, requireClientMatch, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const formId = parseInt(req.params.formId);
    const [form] = await db.select().from(convertForms)
      .where(and(eq(convertForms.id, formId), eq(convertForms.clientId, clientId)))
      .limit(1);
    if (!form) return res.status(404).json({ error: "Form not found" });

    const baseUrl = "https://businessblueprint.io";
    const embedCode = form.formType === "popup"
      ? `<script src="${baseUrl}/convert/embed.js" data-form-id="${form.slug}" data-client-id="${clientId}" data-type="popup" data-trigger="${form.popupTrigger || "time_delay"}" data-delay="${form.popupDelaySeconds || 5}"></script>`
      : `<script src="${baseUrl}/convert/embed.js" data-form-id="${form.slug}" data-client-id="${clientId}"></script>`;
    const hostedUrl = `${baseUrl}/convert/f/${form.slug}?client=${clientId}`;

    res.json({ success: true, embedCode, hostedUrl });
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

router.get("/public/:clientId/:formSlug", async (req: Request, res: Response) => {
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
      },
      fields,
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

router.post("/submit/:clientId/:formSlug", async (req: Request, res: Response) => {
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

    const fields = await db.select().from(convertFormFields)
      .where(eq(convertFormFields.formId, form.id));

    // Extract mapped values
    let crmEmail: string | null = null;
    let crmPhone: string | null = null;
    let crmFirstName: string | null = null;
    let crmLastName: string | null = null;
    let emailConsent = false;
    let smsConsent = false;

    for (const field of fields) {
      const value = (data as any)[field.id.toString()] ?? (data as any)[field.label];
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
      const value = (data as any)[field.id.toString()] ?? (data as any)[field.label];
      if (!value) continue;
      if (field.fieldType === "email" && !crmEmail) crmEmail = String(value).trim().toLowerCase();
      if (field.fieldType === "phone" && !crmPhone) crmPhone = String(value).trim();
    }

    // STEP 1: insert submission
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
    }).returning();

    await db.update(convertForms)
      .set({ submissionCount: (form.submissionCount || 0) + 1 })
      .where(eq(convertForms.id, form.id));

    // STEP 2: CRM contact upsert
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

        // Timeline event
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
      setTimeout(() => {
        emailService.sendRawEmail(crmEmail!, subject, body).catch((autoErr) => {
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
        <p><strong>Source:</strong> ${sourceUrl || "direct"}</p>
        <p><strong>Email consent:</strong> ${emailConsent ? "Yes" : "No"}</p>
        <p><strong>SMS consent:</strong> ${smsConsent ? "Yes" : "No"}</p>
        <p><a href="https://businessblueprint.io/convert/dashboard">View in Dashboard</a></p>`;
      emailService.sendRawEmail(form.notifyEmail, subject, body).catch((notifErr) => {
        console.error("[Convert] Notification send failed:", notifErr);
      });
    }

    console.log(`[Convert] Submission ${submission.id} on form "${form.name}" (client ${clientId})`);

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

export { router as convertRouter };
