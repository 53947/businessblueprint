/**
 * Shared types for the / convert visual form builder.
 *
 * The builder speaks in terms like `step`, `width`, `crmMapping`, `conditions`.
 * The server persists these to existing Phase A columns under different names
 * (pageNumber, columnSpan, mapsTo, conditionalRules). Mapping happens in the
 * GET/PUT /builder endpoints — this file is the client-side vocabulary.
 */

export type FieldType =
  // Basic (free)
  | "text" | "email" | "phone" | "number" | "textarea"
  | "select" | "checkbox" | "radio"
  // Premium
  | "file" | "signature" | "date" | "rating" | "hidden" | "payment"
  // Layout
  | "heading" | "paragraph" | "divider" | "spacer" | "image"
  // Structure
  | "page_break";

export const PREMIUM_FIELD_TYPES: ReadonlySet<FieldType> = new Set<FieldType>([
  "file", "signature", "date", "rating", "hidden", "payment", "page_break",
]);

export const LAYOUT_FIELD_TYPES: ReadonlySet<FieldType> = new Set<FieldType>([
  "heading", "paragraph", "divider", "spacer", "image", "page_break",
]);

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface FieldCondition {
  fieldTempId: string;
  operator: "equals" | "not_equals" | "contains" | "is_empty" | "is_not_empty" | "greater_than" | "less_than";
  value: string;
}

export interface ConditionalLogic {
  enabled: boolean;
  matchType: "all" | "any";
  conditions: FieldCondition[];
}

export interface BuilderField {
  tempId: string;         // stable client-side identifier (new fields have no fieldId)
  fieldId?: number;       // server row id from convert_form_fields
  type: FieldType;
  label: string;
  placeholder: string;
  helpText: string;
  required: boolean;
  width: "full" | "half";
  sortOrder: number;
  step: number;            // 1-indexed page number
  options: Array<{ value: string; label: string }>;
  defaultValue: string;
  validation: FieldValidation;
  crmMapping: string | null;
  conditions: ConditionalLogic | null;
  config: Record<string, any>;
}

export interface DesignSettings {
  themePreset: number | null;   // 1-10 for presets, null for custom (premium)
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: number;
  buttonStyle: "filled" | "outline";
  buttonText: string;
  labelPosition: "above" | "left" | "floating";
  fieldSpacing: number;
  showFieldBorders: boolean;
  formPadding: number;
}

export interface FormSettings {
  description: string;
  successMessage: string;
  redirectUrl: string;
  notificationEmail: string;
  doubleOptin: boolean;
  autoresponderEnabled: boolean;
  autoresponderSubject: string;
  autoresponderBody: string;
  submissionLimit: number;
  closeDate: string | null;
  honeypot: boolean;
  recaptcha: boolean;
}

export const DEFAULT_DESIGN: DesignSettings = {
  themePreset: 2, // Violet / #8000FF
  primaryColor: "#8000FF",
  backgroundColor: "#FFFFFF",
  textColor: "#09080E",
  fontFamily: "Inter",
  borderRadius: 8,
  buttonStyle: "filled",
  buttonText: "Submit",
  labelPosition: "above",
  fieldSpacing: 20,
  showFieldBorders: true,
  formPadding: 24,
};

export const DEFAULT_SETTINGS: FormSettings = {
  description: "",
  successMessage: "Thank you for your submission!",
  redirectUrl: "",
  notificationEmail: "",
  doubleOptin: false,
  autoresponderEnabled: false,
  autoresponderSubject: "",
  autoresponderBody: "",
  submissionLimit: 0,
  closeDate: null,
  honeypot: true,
  recaptcha: false,
};

export const PRESET_THEMES: Array<{ id: number; color: string; label: string }> = [
  { id: 1, color: "#008060", label: "Emerald" },
  { id: 2, color: "#8000FF", label: "Violet" },
  { id: 3, color: "#064A6C", label: "Ocean" },
  { id: 4, color: "#E9B307", label: "Gold" },
  { id: 5, color: "#374151", label: "Slate" },
  { id: 6, color: "#97ACCA", label: "Steel" },
  { id: 7, color: "#1844A6", label: "Royal" },
  { id: 8, color: "#001882", label: "Navy" },
  { id: 9, color: "#660099", label: "Purple" },
  { id: 10, color: "#FF44CC", label: "Pink" },
];

/**
 * Generate a short stable temp ID for new fields. Used as React key + for
 * matching fields during reorder and as the trigger reference in conditional
 * logic before the field has been saved to the DB.
 */
export function newTempId(): string {
  return `tmp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Build a fresh BuilderField for a given type. Premium types get sensible
 * defaults so the canvas preview doesn't look broken before configuration.
 */
export function makeField(type: FieldType, sortOrder: number, step: number = 1): BuilderField {
  const base: BuilderField = {
    tempId: newTempId(),
    type,
    label: defaultLabel(type),
    placeholder: "",
    helpText: "",
    required: false,
    width: "full",
    sortOrder,
    step,
    options: [],
    defaultValue: "",
    validation: {},
    crmMapping: null,
    conditions: null,
    config: {},
  };

  // Type-specific defaults
  if (type === "select" || type === "radio" || type === "checkbox") {
    base.options = [
      { value: "option_1", label: "Option 1" },
      { value: "option_2", label: "Option 2" },
    ];
  }
  if (type === "rating") {
    base.config = { ratingScale: 5 };
  }
  if (type === "date") {
    base.config = { dateFormat: "MM/DD/YYYY" };
  }
  if (type === "file") {
    base.config = { fileTypes: ".pdf,.jpg,.png", maxFileSize: 10 };
  }
  if (type === "payment") {
    base.config = { paymentAmount: "0.00" };
  }
  if (type === "email") {
    base.crmMapping = "crm_email";
  }
  if (type === "phone") {
    base.crmMapping = "crm_phone";
  }

  return base;
}

function defaultLabel(type: FieldType): string {
  const labels: Record<FieldType, string> = {
    text: "Text",
    email: "Email",
    phone: "Phone",
    number: "Number",
    textarea: "Long answer",
    select: "Dropdown",
    checkbox: "Checkbox",
    radio: "Multiple choice",
    file: "File upload",
    signature: "Signature",
    date: "Date",
    rating: "Rating",
    hidden: "hidden_field",
    payment: "Payment",
    heading: "Heading",
    paragraph: "Paragraph text goes here.",
    divider: "Divider",
    spacer: "Spacer",
    image: "Image",
    page_break: "Page break",
  };
  return labels[type] || "Untitled";
}
