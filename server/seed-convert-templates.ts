import { db } from "./db";
import { convertTemplates } from "@shared/schema";
import { eq } from "drizzle-orm";

const PRESET_COLORS = [
  "#8000FF", "#008060", "#1844A6", "#E9B307", "#FF44CC",
  "#064A6C", "#374151", "#001882", "#660099", "#97ACCA",
];

interface SeedTemplate {
  name: string;
  slug: string;
  category: string;
  formType: "form" | "popup" | "optin";
  deployTarget: "website" | "email" | "sms";
  description: string;
  fields: Array<{
    fieldType: string;
    label: string;
    placeholder?: string;
    helpText?: string;
    isRequired?: boolean;
    options?: Array<{ value: string; label: string }>;
    columnSpan?: number;
    mapsTo?: string;
    defaultValue?: string;
  }>;
  design: Record<string, any>;
}

const TEMPLATES: SeedTemplate[] = [
  // ───── FORMS ─────
  {
    name: "Contact Us",
    slug: "contact-us",
    category: "contact",
    formType: "form",
    deployTarget: "website",
    description: "Simple contact form with name, email, phone, and message",
    fields: [
      { fieldType: "text", label: "First Name", placeholder: "Your first name", isRequired: true, mapsTo: "crm_first_name", columnSpan: 1 },
      { fieldType: "text", label: "Last Name", placeholder: "Your last name", isRequired: false, mapsTo: "crm_last_name", columnSpan: 1 },
      { fieldType: "email", label: "Email", placeholder: "your@email.com", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", placeholder: "(555) 123-4567", isRequired: false, mapsTo: "crm_phone" },
      { fieldType: "textarea", label: "Message", placeholder: "How can we help you?", isRequired: true },
    ],
    design: { brandColor: "#8000FF", thankYouMessage: "Thank you for reaching out! We'll get back to you within 24 hours." },
  },
  {
    name: "Request a Quote",
    slug: "request-quote",
    category: "quote",
    formType: "form",
    deployTarget: "website",
    description: "Capture quote requests with service type and details",
    fields: [
      { fieldType: "text", label: "Full Name", placeholder: "Your name", isRequired: true, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", placeholder: "your@email.com", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", placeholder: "(555) 123-4567", isRequired: true, mapsTo: "crm_phone" },
      { fieldType: "select", label: "Service Type", isRequired: true, options: [
        { value: "service_a", label: "Service A" },
        { value: "service_b", label: "Service B" },
        { value: "service_c", label: "Service C" },
        { value: "other", label: "Other" },
      ]},
      { fieldType: "textarea", label: "Project Details", placeholder: "Tell us about your project", isRequired: true },
    ],
    design: { brandColor: "#008060", thankYouMessage: "Quote request received! We'll send your estimate within 48 hours." },
  },
  {
    name: "Book an Appointment",
    slug: "book-appointment",
    category: "appointment",
    formType: "form",
    deployTarget: "website",
    description: "Let customers book appointments with preferred date and time",
    fields: [
      { fieldType: "text", label: "Full Name", isRequired: true, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", isRequired: true, mapsTo: "crm_phone" },
      { fieldType: "select", label: "Appointment Type", isRequired: true, options: [
        { value: "consultation", label: "Consultation" },
        { value: "service", label: "Service Appointment" },
        { value: "follow_up", label: "Follow Up" },
      ]},
      { fieldType: "text", label: "Preferred Date", placeholder: "MM/DD/YYYY", isRequired: true },
      { fieldType: "text", label: "Preferred Time", placeholder: "e.g. 2:00 PM", isRequired: false },
      { fieldType: "textarea", label: "Notes", placeholder: "Anything we should know?", isRequired: false },
    ],
    design: { brandColor: "#1844A6", thankYouMessage: "Appointment request submitted! We'll confirm your time shortly." },
  },
  {
    name: "Customer Feedback",
    slug: "customer-feedback",
    category: "feedback",
    formType: "form",
    deployTarget: "website",
    description: "Collect feedback with ratings and comments",
    fields: [
      { fieldType: "text", label: "Your Name", isRequired: false, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", isRequired: false, mapsTo: "crm_email" },
      { fieldType: "select", label: "How would you rate us?", isRequired: true, options: [
        { value: "5", label: "Excellent" },
        { value: "4", label: "Good" },
        { value: "3", label: "Average" },
        { value: "2", label: "Below Average" },
        { value: "1", label: "Poor" },
      ]},
      { fieldType: "textarea", label: "Your Feedback", placeholder: "Tell us about your experience", isRequired: true },
    ],
    design: { brandColor: "#E9B307", thankYouMessage: "Thank you for your feedback! It helps us improve." },
  },
  {
    name: "Event Registration",
    slug: "event-registration",
    category: "registration",
    formType: "form",
    deployTarget: "website",
    description: "Register attendees for events with dietary preferences",
    fields: [
      { fieldType: "text", label: "Full Name", isRequired: true, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", isRequired: false, mapsTo: "crm_phone" },
      { fieldType: "select", label: "Number of Guests", isRequired: true, options: [
        { value: "1", label: "Just me" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4+" },
      ]},
      { fieldType: "select", label: "Dietary Restrictions", isRequired: false, options: [
        { value: "none", label: "None" }, { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" }, { value: "gluten_free", label: "Gluten Free" },
      ]},
      { fieldType: "checkbox", label: "I agree to receive event updates via email", mapsTo: "email_consent" },
    ],
    design: { brandColor: "#FF44CC", thankYouMessage: "You're registered! Check your email for event details." },
  },
  {
    name: "Newsletter Signup",
    slug: "newsletter-signup",
    category: "newsletter",
    formType: "form",
    deployTarget: "website",
    description: "Simple email newsletter signup with consent",
    fields: [
      { fieldType: "email", label: "Email Address", placeholder: "your@email.com", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "checkbox", label: "I agree to receive email newsletters and updates. You can unsubscribe at any time.", isRequired: true, mapsTo: "email_consent" },
    ],
    design: { brandColor: "#064A6C", thankYouMessage: "Welcome! You're subscribed to our newsletter." },
  },
  {
    name: "Service Inquiry",
    slug: "service-inquiry",
    category: "lead_capture",
    formType: "form",
    deployTarget: "website",
    description: "Capture service inquiries with budget and timeline",
    fields: [
      { fieldType: "text", label: "Full Name", isRequired: true, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", isRequired: false, mapsTo: "crm_phone" },
      { fieldType: "text", label: "Company", isRequired: false, mapsTo: "crm_company" },
      { fieldType: "select", label: "Service Interested In", isRequired: true, options: [
        { value: "service_1", label: "Service 1" }, { value: "service_2", label: "Service 2" }, { value: "other", label: "Other" },
      ]},
      { fieldType: "select", label: "Budget Range", isRequired: false, options: [
        { value: "under_1k", label: "Under $1,000" }, { value: "1k_5k", label: "$1,000 - $5,000" },
        { value: "5k_10k", label: "$5,000 - $10,000" }, { value: "over_10k", label: "$10,000+" },
      ]},
      { fieldType: "select", label: "Timeline", isRequired: false, options: [
        { value: "asap", label: "ASAP" }, { value: "1_month", label: "Within 1 month" },
        { value: "3_months", label: "1-3 months" }, { value: "flexible", label: "Flexible" },
      ]},
      { fieldType: "textarea", label: "Additional Details", isRequired: false },
    ],
    design: { brandColor: "#374151", thankYouMessage: "Thanks for your inquiry! We'll be in touch within 24 hours." },
  },
  {
    name: "Job Application",
    slug: "job-application",
    category: "registration",
    formType: "form",
    deployTarget: "website",
    description: "Accept job applications with resume details",
    fields: [
      { fieldType: "text", label: "First Name", isRequired: true, mapsTo: "crm_first_name", columnSpan: 1 },
      { fieldType: "text", label: "Last Name", isRequired: true, mapsTo: "crm_last_name", columnSpan: 1 },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", isRequired: true, mapsTo: "crm_phone" },
      { fieldType: "select", label: "Position", isRequired: true, options: [
        { value: "position_1", label: "Position 1" }, { value: "position_2", label: "Position 2" }, { value: "other", label: "Other" },
      ]},
      { fieldType: "textarea", label: "Tell us about yourself", isRequired: true },
      { fieldType: "textarea", label: "Relevant Experience", isRequired: false },
    ],
    design: { brandColor: "#001882", thankYouMessage: "Application received! We'll review it and follow up within 5 business days." },
  },
  // ───── POPUPS ─────
  {
    name: "Exit Intent Lead Capture",
    slug: "exit-intent-lead",
    category: "lead_capture",
    formType: "popup",
    deployTarget: "website",
    description: "Capture leaving visitors with a last-chance offer",
    fields: [
      { fieldType: "heading", label: "Wait! Before you go..." },
      { fieldType: "paragraph", label: "Get 10% off your first order when you sign up." },
      { fieldType: "email", label: "Email Address", placeholder: "your@email.com", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "checkbox", label: "I agree to receive promotional emails. Unsubscribe anytime.", isRequired: true, mapsTo: "email_consent" },
    ],
    design: { brandColor: "#8000FF", thankYouMessage: "Check your email for your 10% discount code!", popupTrigger: "exit_intent", popupPosition: "center", popupShowFrequency: "once" },
  },
  {
    name: "Newsletter Popup",
    slug: "newsletter-popup",
    category: "newsletter",
    formType: "popup",
    deployTarget: "website",
    description: "Timed popup to capture newsletter subscribers",
    fields: [
      { fieldType: "heading", label: "Stay in the know" },
      { fieldType: "paragraph", label: "Get weekly tips and updates delivered to your inbox." },
      { fieldType: "email", label: "Email", placeholder: "your@email.com", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "checkbox", label: "I agree to receive email updates. You can unsubscribe at any time.", isRequired: true, mapsTo: "email_consent" },
    ],
    design: { brandColor: "#008060", thankYouMessage: "You're subscribed! Welcome aboard.", popupTrigger: "time_delay", popupDelaySeconds: 15, popupPosition: "center", popupShowFrequency: "once_per_session" },
  },
  {
    name: "Announcement Bar",
    slug: "announcement-bar",
    category: "lead_capture",
    formType: "popup",
    deployTarget: "website",
    description: "Top bar announcement with CTA",
    fields: [
      { fieldType: "heading", label: "Limited time offer — 20% off all services this month!" },
    ],
    design: { brandColor: "#FF44CC", thankYouMessage: "", popupTrigger: "page_load", popupPosition: "top_bar", popupShowFrequency: "every_visit" },
  },
  {
    name: "Scroll Promotion Popup",
    slug: "scroll-promo",
    category: "lead_capture",
    formType: "popup",
    deployTarget: "website",
    description: "Scroll-triggered popup for engaged visitors",
    fields: [
      { fieldType: "heading", label: "You seem interested!" },
      { fieldType: "paragraph", label: "Let us send you more info about what we offer." },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone (optional)", isRequired: false, mapsTo: "crm_phone" },
      { fieldType: "checkbox", label: "I consent to receive emails and SMS. Reply STOP to opt out of SMS.", isRequired: true, mapsTo: "email_consent" },
    ],
    design: { brandColor: "#E9B307", thankYouMessage: "Thanks! We'll be in touch soon.", popupTrigger: "scroll", popupScrollPercent: 50, popupPosition: "center", popupShowFrequency: "once" },
  },
  // ───── OPT-INS ─────
  {
    name: "SMS Opt-in",
    slug: "sms-optin",
    category: "lead_capture",
    formType: "optin",
    deployTarget: "website",
    description: "Capture SMS subscribers with TCPA-compliant consent",
    fields: [
      { fieldType: "phone", label: "Phone Number", placeholder: "(555) 123-4567", isRequired: true, mapsTo: "crm_phone" },
      { fieldType: "checkbox", label: "I agree to receive SMS notifications. Message and data rates may apply. Reply STOP to unsubscribe.", isRequired: true, mapsTo: "sms_consent" },
    ],
    design: { brandColor: "#8000FF", thankYouMessage: "You're subscribed to SMS updates!", consentTextSms: "I agree to receive SMS notifications from this business. Message and data rates may apply. Reply STOP to unsubscribe. View Privacy Policy and Terms of Service.", optinType: "sms_only" },
  },
  {
    name: "Email + SMS Opt-in",
    slug: "email-sms-optin",
    category: "lead_capture",
    formType: "optin",
    deployTarget: "website",
    description: "Capture both email and SMS consent in one form",
    fields: [
      { fieldType: "email", label: "Email Address", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone Number", isRequired: true, mapsTo: "crm_phone" },
      { fieldType: "checkbox", label: "I agree to receive email communications. You can unsubscribe at any time.", isRequired: true, mapsTo: "email_consent" },
      { fieldType: "checkbox", label: "I agree to receive SMS notifications. Message and data rates may apply. Reply STOP to unsubscribe.", isRequired: true, mapsTo: "sms_consent" },
    ],
    design: { brandColor: "#008060", thankYouMessage: "You're all set! Welcome aboard.", optinType: "email_and_sms" },
  },
  {
    name: "Newsletter Opt-in with Interests",
    slug: "newsletter-interests-optin",
    category: "newsletter",
    formType: "optin",
    deployTarget: "website",
    description: "Newsletter signup with interest categories for segmentation",
    fields: [
      { fieldType: "text", label: "First Name", placeholder: "Your name", isRequired: false, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email Address", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "checkbox", label: "Tips & Advice", isRequired: false },
      { fieldType: "checkbox", label: "Promotions & Offers", isRequired: false },
      { fieldType: "checkbox", label: "Product Updates", isRequired: false },
      { fieldType: "checkbox", label: "I agree to receive email newsletters. You can unsubscribe at any time.", isRequired: true, mapsTo: "email_consent" },
    ],
    design: { brandColor: "#064A6C", thankYouMessage: "Subscribed! You'll hear from us soon.", optinType: "email_only" },
  },
  {
    name: "Contest Entry",
    slug: "contest-entry",
    category: "contest",
    formType: "optin",
    deployTarget: "website",
    description: "Contest and giveaway entry form with consent and rules",
    fields: [
      { fieldType: "text", label: "Full Name", isRequired: true, mapsTo: "crm_first_name" },
      { fieldType: "email", label: "Email", isRequired: true, mapsTo: "crm_email" },
      { fieldType: "phone", label: "Phone", isRequired: false, mapsTo: "crm_phone" },
      { fieldType: "checkbox", label: "I agree to the contest rules and terms", isRequired: true },
      { fieldType: "checkbox", label: "I agree to receive promotional emails about future contests and offers. Unsubscribe anytime.", isRequired: false, mapsTo: "email_consent" },
      { fieldType: "checkbox", label: "I agree to receive SMS updates about this contest. Reply STOP to opt out.", isRequired: false, mapsTo: "sms_consent" },
    ],
    design: { brandColor: "#FF44CC", thankYouMessage: "You're entered! Good luck! Winners will be contacted by email.", optinType: "email_and_sms" },
  },
];

export async function seedConvertTemplates() {
  console.log("[Convert] Seeding templates...");

  for (let i = 0; i < TEMPLATES.length; i++) {
    const template = TEMPLATES[i];
    try {
      const existing = await db.select().from(convertTemplates)
        .where(eq(convertTemplates.slug, template.slug)).limit(1);

      if (existing.length > 0) {
        console.log(`  - Template "${template.name}" already exists, skipping`);
        continue;
      }

      await db.insert(convertTemplates).values({
        name: template.name,
        slug: template.slug,
        category: template.category,
        formType: template.formType,
        deployTarget: template.deployTarget,
        description: template.description,
        fields: template.fields,
        design: template.design,
        presetColors: PRESET_COLORS,
        isFree: true,
        isActive: true,
        sortOrder: i,
      });

      console.log(`  + Seeded: ${template.name}`);
    } catch (error) {
      console.error(`  x Failed to seed ${template.name}:`, error);
    }
  }

  console.log("[Convert] Template seeding complete.");
}

seedConvertTemplates().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
