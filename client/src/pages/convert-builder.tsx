/**
 * / convert — Visual Form Builder
 *
 * Route: /convert/builder/new            — creates a blank form and redirects
 *        /convert/builder/:formId        — loads and edits an existing form
 *
 * Phase B slice 2: scaffolding + drag-and-drop. The right-side properties
 * panel, design panel, settings panel, template modal, preview mode toggles,
 * and conditional logic runtime are added in slice 3.
 *
 * Builder state lives entirely in React state until saved. Clicking Save Draft
 * or Publish sends the whole state to PUT /api/convert/:clientId/forms/:formId/builder.
 * An auto-save timer pushes changes every 30 seconds when the dirty flag is set.
 */
import { useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye } from "lucide-react";
import type {
  BuilderField, DesignSettings, FormSettings,
} from "@/components/convert/builder-types";
import {
  DEFAULT_DESIGN, DEFAULT_SETTINGS, makeField, LAYOUT_FIELD_TYPES,
} from "@/components/convert/builder-types";
import { FieldPalette } from "@/components/convert/field-palette";
import { BuilderCanvas } from "@/components/convert/builder-canvas";

const ACCENT = "#8000FF";

interface BuilderLoadResponse {
  success: boolean;
  form: {
    id: number;
    name: string;
    slug: string;
    formType: "form" | "popup" | "optin";
    status: "draft" | "published" | "archived";
    submissionCount: number;
    viewCount: number;
  };
  fields: Array<Omit<BuilderField, "tempId">>;
  design: DesignSettings | null;
  settings: FormSettings | null;
}

export default function ConvertBuilder() {
  const [, setLocation] = useLocation();
  const [isNewRoute] = useRoute("/convert/builder/new");
  const [, editParams] = useRoute("/convert/builder/:formId");
  const { toast } = useToast();

  const storedClientId = typeof window !== "undefined" ? sessionStorage.getItem("clientId") : null;
  const clientId = storedClientId ? parseInt(storedClientId) : null;

  const [formId, setFormId] = useState<number | null>(() => {
    const raw = editParams?.formId;
    if (!raw || raw === "new") return null;
    const parsed = parseInt(raw);
    return Number.isFinite(parsed) ? parsed : null;
  });

  const [formName, setFormName] = useState<string>("Untitled Form");
  const [formType, setFormType] = useState<"form" | "popup" | "optin">("form");
  const [formStatus, setFormStatus] = useState<"draft" | "published" | "archived">("draft");
  const [fields, setFields] = useState<BuilderField[]>([]);
  const [design, setDesign] = useState<DesignSettings>(DEFAULT_DESIGN);
  const [settings, setSettings] = useState<FormSettings>(DEFAULT_SETTINGS);

  const [selectedTempId, setSelectedTempId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [previewMode] = useState<"desktop" | "mobile" | "embed">("desktop");
  const [dirty, setDirty] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);

  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // ─── Slice 1: auto-create blank form when /convert/builder/new ───
  useEffect(() => {
    if (!isNewRoute || !clientId || formId !== null) return;
    (async () => {
      try {
        const res = await apiRequest("POST", `/api/convert/${clientId}/forms`, {
          name: "Untitled Form",
          formType: "form",
          deployTarget: "website",
        });
        const result = await res.json();
        if (result.success && result.form) {
          setLocation(`/convert/builder/${result.form.id}`, { replace: true });
        } else {
          toast({ title: "Could not create blank form", variant: "destructive" });
          setLocation("/convert/dashboard");
        }
      } catch (err: any) {
        toast({ title: "Create failed", description: err?.message, variant: "destructive" });
        setLocation("/convert/dashboard");
      }
    })();
  }, [isNewRoute, clientId, formId, setLocation, toast]);

  // ─── Load existing form ───
  const loadQuery = useQuery<BuilderLoadResponse>({
    queryKey: [`/api/convert/${clientId}/forms/${formId}/builder`],
    enabled: !!clientId && formId !== null,
  });

  useEffect(() => {
    if (!loadQuery.data) return;
    const data = loadQuery.data;
    setFormName(data.form.name);
    setFormType(data.form.formType);
    setFormStatus(data.form.status);
    // Rehydrate temp IDs for each loaded field so React keys stay stable
    const rehydrated: BuilderField[] = (data.fields || []).map((f, i) => ({
      ...f,
      tempId: `tmp_loaded_${f.fieldId ?? i}`,
      options: Array.isArray(f.options) ? f.options : [],
      validation: f.validation || {},
      config: f.config || {},
      sortOrder: i,
    }));
    setFields(rehydrated);
    setDesign({ ...DEFAULT_DESIGN, ...(data.design || {}) });
    setSettings({ ...DEFAULT_SETTINGS, ...(data.settings || {}) });
    setDirty(false);
  }, [loadQuery.data]);

  // ─── Helpers ───

  const markDirty = () => setDirty(true);

  const addField = (type: string, insertIndex: number) => {
    const newField = makeField(type as any, insertIndex, activeStep);
    const next = [...fields];
    next.splice(insertIndex, 0, newField);
    // Renormalize sortOrder
    next.forEach((f, i) => { f.sortOrder = i; });
    setFields(next);
    setSelectedTempId(newField.tempId);
    markDirty();
  };

  const reorderField = (sourceTempId: string, targetIndex: number) => {
    const sourceIdx = fields.findIndex((f) => f.tempId === sourceTempId);
    if (sourceIdx === -1) return;
    const next = [...fields];
    const [moved] = next.splice(sourceIdx, 1);
    // Adjust target index if source was before target
    const adjusted = sourceIdx < targetIndex ? targetIndex - 1 : targetIndex;
    next.splice(adjusted, 0, moved);
    next.forEach((f, i) => { f.sortOrder = i; });
    setFields(next);
    markDirty();
  };

  const deleteField = (tempId: string) => {
    setFields(fields.filter((f) => f.tempId !== tempId));
    if (selectedTempId === tempId) setSelectedTempId(null);
    markDirty();
  };

  // ─── Save / publish ───

  const saveDraft = async (options: { silent?: boolean } = {}): Promise<boolean> => {
    if (!clientId || formId === null) return false;
    setSaving(true);
    try {
      const res = await apiRequest("PUT", `/api/convert/${clientId}/forms/${formId}/builder`, {
        name: formName,
        fields,
        design,
        settings,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Save failed");

      // Swap temp IDs for server IDs where returned
      if (Array.isArray(result.savedFields)) {
        const byTemp = new Map<string, number>();
        for (const sf of result.savedFields) {
          if (sf.tempId) byTemp.set(sf.tempId, sf.fieldId);
        }
        setFields((prev) => prev.map((f) => (
          byTemp.has(f.tempId) ? { ...f, fieldId: byTemp.get(f.tempId) } : f
        )));
      }

      setDirty(false);
      queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/forms`] });
      queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/analytics`] });
      if (!options.silent) toast({ title: "Draft saved" });
      return true;
    } catch (err: any) {
      toast({ title: "Save failed", description: err?.message, variant: "destructive" });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    if (!clientId || formId === null) return;
    setPublishing(true);
    try {
      const savedOk = await saveDraft({ silent: true });
      if (!savedOk) return;
      const res = await apiRequest("POST", `/api/convert/${clientId}/forms/${formId}/publish`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Publish failed");
      setFormStatus("published");
      toast({ title: "Form published", description: "Share the hosted link or copy the embed code." });
      queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/forms/${formId}/builder`] });
    } catch (err: any) {
      toast({
        title: "Publish failed",
        description: err?.message || "Unknown error",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  // ─── Auto-save every 30s when dirty ───
  useEffect(() => {
    if (autoSaveTimer.current) clearInterval(autoSaveTimer.current);
    autoSaveTimer.current = setInterval(() => {
      if (dirty && !saving && formId !== null) {
        saveDraft({ silent: true });
      }
    }, 30000);
    return () => {
      if (autoSaveTimer.current) clearInterval(autoSaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty, saving, formId, fields, design, settings, formName]);

  // ─── Derived: available steps (for future multi-step UI) ───
  const availableSteps = Array.from(new Set(fields.map((f) => f.step || 1))).sort((a, b) => a - b);
  const stepsToShow = availableSteps.length > 0 ? availableSteps : [1];

  // ─── Guards ───
  if (!clientId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to access the form builder.</p>
          <Button asChild><a href="/portal/login">Log in</a></Button>
        </div>
      </div>
    );
  }

  if (isNewRoute || (formId !== null && loadQuery.isLoading)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading builder...</p>
      </div>
    );
  }

  const selectedField = fields.find((f) => f.tempId === selectedTempId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ─── Toolbar ─── */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/convert/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <Input
          value={formName}
          onChange={(e) => { setFormName(e.target.value); markDirty(); }}
          className="max-w-xs text-sm font-medium"
          placeholder="Form name"
        />

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="capitalize">{formType}</span>
          <span>•</span>
          <span className={formStatus === "published" ? "font-semibold" : ""} style={formStatus === "published" ? { color: ACCENT } : undefined}>
            {formStatus}
          </span>
          {dirty && <span className="text-amber-600">• unsaved changes</span>}
        </div>

        <div className="flex-1" />

        <Button variant="outline" size="sm" onClick={() => saveDraft()} disabled={saving || !dirty}>
          <Save className="w-4 h-4 mr-1" />
          {saving ? "Saving..." : "Save Draft"}
        </Button>
        <Button
          size="sm"
          className="text-white"
          style={{ backgroundColor: ACCENT }}
          onClick={publish}
          disabled={publishing || fields.length === 0}
        >
          <Eye className="w-4 h-4 mr-1" />
          {publishing ? "Publishing..." : formStatus === "published" ? "Republish" : "Publish"}
        </Button>
      </div>

      {/* ─── Step tabs (multi-step) ─── */}
      {stepsToShow.length > 1 && (
        <div className="border-b border-gray-200 bg-white px-4 py-2 flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-500">Steps:</span>
          {stepsToShow.map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`text-xs px-3 py-1 rounded ${
                activeStep === step ? "text-white" : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
              style={activeStep === step ? { backgroundColor: ACCENT } : undefined}
            >
              Step {step}
            </button>
          ))}
        </div>
      )}

      {/* ─── Three-panel layout ─── */}
      <div className="flex-1 flex overflow-hidden">
        <FieldPalette />

        <BuilderCanvas
          fields={fields}
          design={design}
          previewMode={previewMode}
          selectedFieldTempId={selectedTempId}
          activeStep={activeStep}
          onSelectField={setSelectedTempId}
          onAddField={addField}
          onReorderField={reorderField}
          onDeleteField={deleteField}
        />

        {/* Right panel placeholder — full properties/design/settings panels land in slice 3 */}
        <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto p-4">
          {selectedField ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Selected field</h3>
              <div className="text-xs text-gray-600 space-y-2">
                <div><span className="font-semibold">Type:</span> {selectedField.type}</div>
                <div><span className="font-semibold">Label:</span> {selectedField.label}</div>
                <div><span className="font-semibold">Required:</span> {selectedField.required ? "Yes" : "No"}</div>
                {selectedField.crmMapping && <div><span className="font-semibold">CRM:</span> {selectedField.crmMapping}</div>}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Field editing panel arrives in Phase B slice 3. For now you can add, drag, and delete fields.
                </p>
              </div>
              {!LAYOUT_FIELD_TYPES.has(selectedField.type as any) && (
                <QuickEditor
                  field={selectedField}
                  onChange={(updates) => {
                    setFields(fields.map((f) => (
                      f.tempId === selectedField.tempId ? { ...f, ...updates } : f
                    )));
                    markDirty();
                  }}
                />
              )}
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 py-12">
              Click a field on the canvas to edit it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal inline editor so slice 2 is actually usable without the full
 * properties panel. Full editing (validation, CRM mapping, options, conditional
 * logic) arrives in slice 3.
 */
function QuickEditor({ field, onChange }: { field: BuilderField; onChange: (updates: Partial<BuilderField>) => void }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
        <Input
          value={field.label}
          onChange={(e) => onChange({ label: e.target.value })}
          className="text-sm h-8"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
        <Input
          value={field.placeholder}
          onChange={(e) => onChange({ placeholder: e.target.value })}
          className="text-sm h-8"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-gray-700">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onChange({ required: e.target.checked })}
          style={{ accentColor: ACCENT }}
        />
        Required
      </label>
    </div>
  );
}
