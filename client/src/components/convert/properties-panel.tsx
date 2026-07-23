/**
 * Right panel of the form builder. Shown when a field is selected on the
 * canvas. Four tabs:
 *
 *   Field       — label, placeholder, help text, required, width, default,
 *                 options (select/radio/checkbox), type-specific config
 *   Validation  — length, range, pattern (pattern is premium-gated cosmetic)
 *   CRM Mapping — map to first name / last name / email / phone / consent flags
 *   Logic       — conditional show/hide (premium-gated cosmetic)
 *
 * All updates call `onChange` with a partial BuilderField. Parent builder page
 * owns the fields array and re-renders on every change.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Lock } from "lucide-react";
import type {
  BuilderField, ConditionalLogic, FieldCondition, FieldValidation,
} from "./builder-types";
import { LAYOUT_FIELD_TYPES } from "./builder-types";

const ACCENT = "#8000FF";

const CRM_MAPPING_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "__none__", label: "None" },
  { value: "crm_first_name", label: "CRM — First name" },
  { value: "crm_last_name", label: "CRM — Last name" },
  { value: "crm_email", label: "CRM — Email" },
  { value: "crm_phone", label: "CRM — Phone" },
  { value: "crm_company", label: "CRM — Company" },
  { value: "email_consent", label: "Consent — Email" },
  { value: "sms_consent", label: "Consent — SMS" },
];

type Tab = "field" | "validation" | "crm" | "logic";

interface PropertiesPanelProps {
  field: BuilderField;
  allFields: BuilderField[];
  onChange: (updates: Partial<BuilderField>) => void;
  onDelete: () => void;
}

export function PropertiesPanel({ field, allFields, onChange, onDelete }: PropertiesPanelProps) {
  const [tab, setTab] = useState<Tab>("field");
  const isLayout = LAYOUT_FIELD_TYPES.has(field.type as any);

  return (
    <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{field.label || "Untitled"}</h3>
          <p className="text-xs text-gray-500 capitalize">{field.type.replace("_", " ")}</p>
        </div>
        {field.type !== "page_break" && (
          <Button size="sm" variant="ghost" onClick={onDelete} data-testid="properties-delete">
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 text-xs">
        <TabButton active={tab === "field"} onClick={() => setTab("field")}>Field</TabButton>
        {!isLayout && <TabButton active={tab === "validation"} onClick={() => setTab("validation")}>Valid.</TabButton>}
        {!isLayout && <TabButton active={tab === "crm"} onClick={() => setTab("crm")}>CRM</TabButton>}
        {!isLayout && <TabButton active={tab === "logic"} onClick={() => setTab("logic")}>Logic</TabButton>}
      </div>

      <div className="p-4">
        {tab === "field" && <FieldTab field={field} onChange={onChange} />}
        {tab === "validation" && !isLayout && <ValidationTab field={field} onChange={onChange} />}
        {tab === "crm" && !isLayout && <CrmTab field={field} onChange={onChange} />}
        {tab === "logic" && !isLayout && <LogicTab field={field} allFields={allFields} onChange={onChange} />}
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-2 py-2 font-medium border-b-2 transition-colors ${
        active ? "border-[#8000FF] text-[#8000FF]" : "border-transparent text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Field tab ───

function FieldTab({ field, onChange }: { field: BuilderField; onChange: (u: Partial<BuilderField>) => void }) {
  const hasOptions = field.type === "select" || field.type === "radio" || field.type === "checkbox";
  const isLayout = LAYOUT_FIELD_TYPES.has(field.type as any);

  if (field.type === "page_break") {
    return <p className="text-xs text-gray-500">Page break separates form steps. Drag fields between steps using the step tabs.</p>;
  }
  if (field.type === "divider" || field.type === "spacer") {
    return <p className="text-xs text-gray-500">Visual element — no configuration.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs">Label</Label>
        <Input
          value={field.label}
          onChange={(e) => onChange({ label: e.target.value })}
          className="text-sm h-8 mt-1"
        />
      </div>

      {!isLayout && (
        <div>
          <Label className="text-xs">Placeholder</Label>
          <Input
            value={field.placeholder}
            onChange={(e) => onChange({ placeholder: e.target.value })}
            className="text-sm h-8 mt-1"
          />
        </div>
      )}

      {!isLayout && (
        <div>
          <Label className="text-xs">Help text</Label>
          <Input
            value={field.helpText}
            onChange={(e) => onChange({ helpText: e.target.value })}
            className="text-sm h-8 mt-1"
          />
        </div>
      )}

      {!isLayout && (
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onChange({ required: e.target.checked })}
            style={{ accentColor: ACCENT }}
          />
          Required
        </label>
      )}

      {!isLayout && (
        <div>
          <Label className="text-xs">Width</Label>
          <Select value={field.width} onValueChange={(v) => onChange({ width: v as "full" | "half" })}>
            <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full width</SelectItem>
              <SelectItem value="half">Half width</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {(field.type === "text" || field.type === "number" || field.type === "hidden") && (
        <div>
          <Label className="text-xs">Default value</Label>
          <Input
            value={field.defaultValue}
            onChange={(e) => onChange({ defaultValue: e.target.value })}
            className="text-sm h-8 mt-1"
          />
        </div>
      )}

      {hasOptions && (
        <OptionsEditor options={field.options} onChange={(opts) => onChange({ options: opts })} />
      )}

      {field.type === "rating" && (
        <div>
          <Label className="text-xs">Rating scale</Label>
          <Select
            value={String(field.config?.ratingScale || 5)}
            onValueChange={(v) => onChange({ config: { ...field.config, ratingScale: parseInt(v) } })}
          >
            <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 stars</SelectItem>
              <SelectItem value="10">10 points</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {field.type === "date" && (
        <div>
          <Label className="text-xs">Date format</Label>
          <Select
            value={field.config?.dateFormat || "MM/DD/YYYY"}
            onValueChange={(v) => onChange({ config: { ...field.config, dateFormat: v } })}
          >
            <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {field.type === "file" && (
        <>
          <div>
            <Label className="text-xs">Accept file types</Label>
            <Input
              value={field.config?.fileTypes || ""}
              onChange={(e) => onChange({ config: { ...field.config, fileTypes: e.target.value } })}
              placeholder=".pdf,.jpg,.png"
              className="text-sm h-8 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Max file size (MB)</Label>
            <Input
              type="number"
              value={field.config?.maxFileSize || 10}
              onChange={(e) => onChange({ config: { ...field.config, maxFileSize: parseInt(e.target.value) || 10 } })}
              className="text-sm h-8 mt-1"
            />
          </div>
        </>
      )}

      {field.type === "payment" && (
        <div>
          <Label className="text-xs">Amount</Label>
          <Input
            value={field.config?.paymentAmount || "0.00"}
            onChange={(e) => onChange({ config: { ...field.config, paymentAmount: e.target.value } })}
            placeholder="0.00"
            className="text-sm h-8 mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">Processed via swipesblue.com</p>
        </div>
      )}

      {field.type === "textarea" && (
        <div>
          <Label className="text-xs">Rows</Label>
          <Input
            type="number"
            value={field.config?.rows || 3}
            onChange={(e) => onChange({ config: { ...field.config, rows: parseInt(e.target.value) || 3 } })}
            className="text-sm h-8 mt-1"
          />
        </div>
      )}
    </div>
  );
}

// ─── Validation tab ───

function ValidationTab({ field, onChange }: { field: BuilderField; onChange: (u: Partial<BuilderField>) => void }) {
  const v: FieldValidation = field.validation || {};
  const updateValidation = (patch: Partial<FieldValidation>) =>
    onChange({ validation: { ...v, ...patch } });

  const supportsLength = field.type === "text" || field.type === "textarea";
  const supportsRange = field.type === "number";

  return (
    <div className="space-y-4">
      {supportsLength && (
        <>
          <div>
            <Label className="text-xs">Min length</Label>
            <Input
              type="number"
              value={v.minLength ?? ""}
              onChange={(e) => updateValidation({ minLength: e.target.value ? parseInt(e.target.value) : undefined })}
              className="text-sm h-8 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Max length</Label>
            <Input
              type="number"
              value={v.maxLength ?? ""}
              onChange={(e) => updateValidation({ maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
              className="text-sm h-8 mt-1"
            />
          </div>
        </>
      )}

      {supportsRange && (
        <>
          <div>
            <Label className="text-xs">Minimum value</Label>
            <Input
              type="number"
              value={v.min ?? ""}
              onChange={(e) => updateValidation({ min: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="text-sm h-8 mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Maximum value</Label>
            <Input
              type="number"
              value={v.max ?? ""}
              onChange={(e) => updateValidation({ max: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="text-sm h-8 mt-1"
            />
          </div>
        </>
      )}

      {field.type === "email" && (
        <p className="text-xs text-gray-500">Email format validation is applied automatically.</p>
      )}
      {field.type === "phone" && (
        <p className="text-xs text-gray-500">Phone format validation is applied automatically.</p>
      )}

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Label className="text-xs">Custom regex pattern</Label>
          <Lock className="w-3 h-3" style={{ color: ACCENT }} />
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>PREMIUM</span>
        </div>
        <Input
          value={v.pattern || ""}
          onChange={(e) => updateValidation({ pattern: e.target.value || undefined })}
          placeholder="^[A-Za-z0-9]+$"
          className="text-sm h-8"
          disabled
          title="Upgrade to / convert Premium — $59/year"
        />
        <p className="text-[10px] text-gray-400 mt-1">Upgrade to use custom validation patterns.</p>
      </div>
    </div>
  );
}

// ─── CRM mapping tab ───

function CrmTab({ field, onChange }: { field: BuilderField; onChange: (u: Partial<BuilderField>) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-600">
        Mapping a field to a CRM property links submissions to / connect contacts automatically.
      </p>

      <div>
        <Label className="text-xs">Map to</Label>
        <Select
          value={field.crmMapping || "__none__"}
          onValueChange={(v) => onChange({ crmMapping: v === "__none__" ? null : v })}
        >
          <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CRM_MAPPING_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {field.crmMapping === "email_consent" && (
        <p className="text-xs text-gray-500 bg-gray-100 rounded p-2">
          When this checkbox is checked, / promote will add the submitter to their email subscriber list with consent metadata (timestamp + IP).
        </p>
      )}
      {field.crmMapping === "sms_consent" && (
        <p className="text-xs text-gray-500 bg-gray-100 rounded p-2">
          SMS consent is TCPA-regulated. Only enable this on fields with clear opt-in language.
        </p>
      )}
    </div>
  );
}

// ─── Logic tab ───

function LogicTab({ field, allFields, onChange }: { field: BuilderField; allFields: BuilderField[]; onChange: (u: Partial<BuilderField>) => void }) {
  const logic: ConditionalLogic = field.conditions || { enabled: false, matchType: "all", conditions: [] };
  const triggerCandidates = allFields.filter((f) => f.tempId !== field.tempId && !LAYOUT_FIELD_TYPES.has(f.type as any));

  const updateLogic = (patch: Partial<ConditionalLogic>) =>
    onChange({ conditions: { ...logic, ...patch } });

  const addCondition = () => {
    const first = triggerCandidates[0];
    const next: FieldCondition = {
      fieldTempId: first?.tempId || "",
      operator: "equals",
      value: "",
    };
    updateLogic({ enabled: true, conditions: [...logic.conditions, next] });
  };

  const updateCondition = (idx: number, patch: Partial<FieldCondition>) => {
    const next = [...logic.conditions];
    next[idx] = { ...next[idx], ...patch };
    updateLogic({ conditions: next });
  };

  const removeCondition = (idx: number) => {
    updateLogic({ conditions: logic.conditions.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="w-3 h-3" style={{ color: ACCENT }} />
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>PREMIUM</span>
      </div>
      <p className="text-xs text-gray-600">
        Show this field only when specific conditions are met.
      </p>

      <label className="flex items-center gap-2 text-xs text-gray-700">
        <input
          type="checkbox"
          checked={logic.enabled}
          onChange={(e) => updateLogic({ enabled: e.target.checked })}
          style={{ accentColor: ACCENT }}
          disabled
        />
        Enable conditional logic
      </label>

      {logic.conditions.length > 0 && (
        <div>
          <Label className="text-xs">Match</Label>
          <Select value={logic.matchType} onValueChange={(v) => updateLogic({ matchType: v as "all" | "any" })}>
            <SelectTrigger className="h-8 text-sm mt-1" disabled><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conditions</SelectItem>
              <SelectItem value="any">Any condition</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {logic.conditions.map((cond, i) => (
        <div key={i} className="border border-gray-200 rounded p-2 space-y-2">
          <Select value={cond.fieldTempId} onValueChange={(v) => updateCondition(i, { fieldTempId: v })}>
            <SelectTrigger className="h-8 text-sm" disabled><SelectValue placeholder="Trigger field" /></SelectTrigger>
            <SelectContent>
              {triggerCandidates.map((f) => (
                <SelectItem key={f.tempId} value={f.tempId}>{f.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cond.operator} onValueChange={(v) => updateCondition(i, { operator: v as any })}>
            <SelectTrigger className="h-8 text-sm" disabled><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">equals</SelectItem>
              <SelectItem value="not_equals">does not equal</SelectItem>
              <SelectItem value="contains">contains</SelectItem>
              <SelectItem value="is_empty">is empty</SelectItem>
              <SelectItem value="is_not_empty">is not empty</SelectItem>
            </SelectContent>
          </Select>
          {cond.operator !== "is_empty" && cond.operator !== "is_not_empty" && (
            <Input
              value={cond.value}
              onChange={(e) => updateCondition(i, { value: e.target.value })}
              placeholder="Value"
              className="text-sm h-8"
              disabled
            />
          )}
          <Button size="sm" variant="ghost" onClick={() => removeCondition(i)} disabled>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}

      <Button size="sm" variant="outline" onClick={addCondition} disabled className="w-full">
        <Plus className="w-3 h-3 mr-1" /> Add condition
      </Button>

      <p className="text-[10px] text-gray-400 mt-2">
        Conditional logic is available on / convert Premium — $59/year. Your conditions will be saved but evaluated only after upgrading.
      </p>
    </div>
  );
}

// ─── Options editor (select/radio/checkbox) ───

function OptionsEditor({
  options,
  onChange,
}: {
  options: Array<{ value: string; label: string }>;
  onChange: (opts: Array<{ value: string; label: string }>) => void;
}) {
  const safeOptions = Array.isArray(options) ? options : [];

  const addOption = () => {
    const n = safeOptions.length + 1;
    onChange([...safeOptions, { value: `option_${n}`, label: `Option ${n}` }]);
  };

  const updateOption = (idx: number, patch: Partial<{ value: string; label: string }>) => {
    const next = safeOptions.map((o, i) => (i === idx ? { ...o, ...patch } : o));
    onChange(next);
  };

  const removeOption = (idx: number) => {
    onChange(safeOptions.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Label className="text-xs">Options</Label>
      <div className="space-y-2 mt-1">
        {safeOptions.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={opt.label}
              onChange={(e) => updateOption(i, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
              placeholder={`Option ${i + 1}`}
              className="text-sm h-8 flex-1"
            />
            <Button size="sm" variant="ghost" onClick={() => removeOption(i)}>
              <Trash2 className="w-3 h-3 text-red-600" />
            </Button>
          </div>
        ))}
        <Button size="sm" variant="outline" onClick={addOption} className="w-full text-xs h-7">
          <Plus className="w-3 h-3 mr-1" /> Add option
        </Button>
      </div>
    </div>
  );
}
