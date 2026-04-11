/**
 * Template selection modal. Shown when the client clicks "Create New Form"
 * from the / convert dashboard. Shows a "Blank Form" card first, then the 16
 * seeded templates as cards. Selecting a template creates the form (via
 * POST /forms/from-template/:slug or POST /forms for blank) and redirects to
 * the builder with the new form ID.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, FileText, Bell, UserCheck } from "lucide-react";

const ACCENT = "#8000FF";

interface Template {
  id: number;
  name: string;
  slug: string;
  category: string;
  formType: "form" | "popup" | "optin";
  description?: string | null;
}

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
}

export function TemplateModal({ open, onOpenChange, clientId }: TemplateModalProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [creating, setCreating] = useState<string | null>(null);

  const templatesQuery = useQuery<{ success: boolean; templates: Template[] }>({
    queryKey: [`/api/convert/templates`],
    enabled: open,
  });
  const templates = templatesQuery.data?.templates || [];

  const createFromTemplate = async (template: Template) => {
    setCreating(template.slug);
    try {
      const res = await apiRequest("POST", `/api/convert/${clientId}/forms/from-template/${template.slug}`, {
        name: template.name,
      });
      const result = await res.json();
      if (result.success && result.form) {
        onOpenChange(false);
        setLocation(`/convert/builder/${result.form.id}`);
      } else {
        throw new Error(result.error || "Could not create form");
      }
    } catch (err: any) {
      toast({ title: "Create failed", description: err?.message, variant: "destructive" });
    } finally {
      setCreating(null);
    }
  };

  const createBlank = async () => {
    setCreating("__blank__");
    try {
      const res = await apiRequest("POST", `/api/convert/${clientId}/forms`, {
        name: "Untitled Form",
        formType: "form",
        deployTarget: "website",
      });
      const result = await res.json();
      if (result.success && result.form) {
        onOpenChange(false);
        setLocation(`/convert/builder/${result.form.id}`);
      } else {
        throw new Error(result.error || "Could not create form");
      }
    } catch (err: any) {
      toast({ title: "Create failed", description: err?.message, variant: "destructive" });
    } finally {
      setCreating(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
          <DialogDescription>
            Start blank or pick a template to pre-populate fields. You can edit everything in the builder.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {/* Blank Form card — always first */}
          <button
            onClick={createBlank}
            disabled={!!creating}
            className="text-left border-2 border-dashed border-gray-300 rounded-lg p-5 hover:border-[#8000FF] hover:bg-[#8000FF]/5 transition-colors disabled:opacity-60"
            data-testid="template-blank"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: ACCENT }}>
              <FilePlus className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Blank Form</h4>
            <p className="text-xs text-gray-600">Start from scratch with an empty canvas.</p>
            {creating === "__blank__" && <p className="text-xs text-gray-500 mt-2">Creating...</p>}
          </button>

          {templates.map((t) => {
            const Icon = t.formType === "popup" ? Bell : t.formType === "optin" ? UserCheck : FileText;
            return (
              <button
                key={t.id}
                onClick={() => createFromTemplate(t)}
                disabled={!!creating}
                className="text-left border border-gray-200 rounded-lg p-5 bg-white hover:border-[#8000FF] hover:shadow-md transition-all disabled:opacity-60"
                data-testid={`template-${t.slug}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{t.name}</h4>
                    <Badge variant="outline" className="mt-1 capitalize text-[10px]">{t.formType}</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{t.description}</p>
                {creating === t.slug && <p className="text-xs text-gray-500 mt-2">Creating...</p>}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-200">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
