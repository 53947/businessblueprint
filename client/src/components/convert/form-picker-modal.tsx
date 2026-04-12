/**
 * Form picker modal — reusable list of a client's published / convert forms.
 * Used by the / promote campaign editor when inserting form CTAs into email
 * or SMS content.
 *
 * Shows only status="published" forms. If the client has no published forms
 * yet, shows a prompt to open the / convert dashboard and create one.
 */
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Bell, UserCheck, Search, ArrowRightLeft, ExternalLink } from "lucide-react";

const CONVERT_ACCENT = "#8000FF";

export interface ConvertFormSummary {
  id: number;
  name: string;
  slug: string;
  formType: "form" | "popup" | "optin";
  brandColor: string | null;
  submissionCount: number;
  hostedUrl: string;
}

interface ConvertFormApiResponse {
  success: boolean;
  forms: Array<{
    id: number;
    name: string;
    slug: string;
    formType: string;
    status: string;
    brandColor: string | null;
    submissionCount: number | null;
  }>;
}

interface FormPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (form: ConvertFormSummary) => void;
  clientId: number;
}

function typeIcon(formType: string) {
  if (formType === "popup") return Bell;
  if (formType === "optin") return UserCheck;
  return FileText;
}

export function FormPickerModal({ open, onClose, onSelect, clientId }: FormPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const query = useQuery<ConvertFormApiResponse>({
    queryKey: [`/api/convert/${clientId}/forms`],
    enabled: open && !!clientId,
  });

  const publishedForms: ConvertFormSummary[] = useMemo(() => {
    if (!query.data?.forms) return [];
    return query.data.forms
      .filter((f) => f.status === "published")
      .map((f) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        formType: (f.formType as ConvertFormSummary["formType"]) || "form",
        brandColor: f.brandColor,
        submissionCount: Number(f.submissionCount || 0),
        hostedUrl: `https://businessblueprint.io/convert/f/${f.slug}?client=${clientId}`,
      }));
  }, [query.data, clientId]);

  const filteredForms = useMemo(() => {
    if (!searchTerm.trim()) return publishedForms;
    const q = searchTerm.toLowerCase();
    return publishedForms.filter((f) => f.name.toLowerCase().includes(q) || f.slug.toLowerCase().includes(q));
  }, [publishedForms, searchTerm]);

  const handleSelect = (form: ConvertFormSummary) => {
    onSelect(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: CONVERT_ACCENT }}>
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            Insert Form
          </DialogTitle>
          <DialogDescription>
            Pick one of your published / convert forms. We'll add a tracked CTA to your message.
          </DialogDescription>
        </DialogHeader>

        {query.isLoading && (
          <div className="py-8 text-center text-sm text-gray-500">Loading forms...</div>
        )}

        {query.isError && (
          <div className="py-8 text-center text-sm text-red-600">Could not load forms.</div>
        )}

        {!query.isLoading && !query.isError && publishedForms.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-600 mb-4">
              You don't have any published forms yet. Build one in / convert, publish it, then come back here to insert it.
            </p>
            <Button
              asChild
              className="text-white"
              style={{ backgroundColor: CONVERT_ACCENT }}
            >
              <a href="/convert/dashboard" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" /> Open / convert dashboard
              </a>
            </Button>
          </div>
        )}

        {publishedForms.length > 5 && (
          <div className="relative mt-2 mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search forms..."
              className="pl-9"
              data-testid="form-picker-search"
            />
          </div>
        )}

        {filteredForms.length > 0 && (
          <div className="space-y-2 mt-2">
            {filteredForms.map((form) => {
              const Icon = typeIcon(form.formType);
              return (
                <button
                  key={form.id}
                  onClick={() => handleSelect(form)}
                  className="w-full flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-lg bg-white hover:border-[#8000FF] hover:shadow-sm transition-all text-left"
                  data-testid={`form-picker-item-${form.id}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: form.brandColor || CONVERT_ACCENT }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{form.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="capitalize text-[10px]">{form.formType}</Badge>
                      <span className="text-xs text-gray-500">{form.submissionCount} submissions</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {publishedForms.length > 0 && filteredForms.length === 0 && (
          <div className="py-6 text-center text-sm text-gray-500">
            No forms match "{searchTerm}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
