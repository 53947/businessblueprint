import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SectionHeader } from "@/components/section-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Plus,
  FileText,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: number;
  name: string;
  description: string | null;
  templateType: string;
  emailSubject: string | null;
  emailHtml: string | null;
  emailText: string | null;
  smsBody: string | null;
  category: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PromoteTemplates() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "email" | "sms">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [templateType, setTemplateType] = useState<"email" | "sms">("email");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailHtml, setEmailHtml] = useState("");
  const [emailText, setEmailText] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [category, setCategory] = useState("");

  const { data: templatesData, isLoading } = useQuery<{ success: boolean; templates: Template[] }>({
    queryKey: ["/api/send/templates"],
  });

  const templates = templatesData?.templates || [];
  const filtered = filter === "all" ? templates : templates.filter((t) => t.templateType === filter);

  const resetForm = () => {
    setName("");
    setDescription("");
    setTemplateType("email");
    setEmailSubject("");
    setEmailHtml("");
    setEmailText("");
    setSmsBody("");
    setCategory("");
    setError("");
    setEditingTemplate(null);
  };

  const openEdit = (template: Template) => {
    setEditingTemplate(template);
    setName(template.name);
    setDescription(template.description || "");
    setTemplateType(template.templateType as "email" | "sms");
    setEmailSubject(template.emailSubject || "");
    setEmailHtml(template.emailHtml || "");
    setEmailText(template.emailText || "");
    setSmsBody(template.smsBody || "");
    setCategory(template.category || "");
    setShowCreate(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Template name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        templateType,
        emailSubject: templateType === "email" ? emailSubject.trim() || null : null,
        emailHtml: templateType === "email" ? emailHtml.trim() || null : null,
        emailText: templateType === "email" ? emailText.trim() || null : null,
        smsBody: templateType === "sms" ? smsBody.trim() || null : null,
        category: category.trim() || null,
      };

      if (editingTemplate) {
        await apiRequest("PATCH", `/api/send/templates/${editingTemplate.id}`, payload);
        toast({ title: "Template updated" });
      } else {
        await apiRequest("POST", "/api/send/templates", payload);
        toast({ title: "Template created" });
      }

      queryClient.invalidateQueries({ queryKey: ["/api/send/templates"] });
      setShowCreate(false);
      resetForm();
    } catch (err: any) {
      setError(err?.message || "Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiRequest("DELETE", `/api/send/templates/${id}`);
      toast({ title: "Template deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/send/templates"] });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Failed to delete template", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SectionHeader
        title="Email & SMS Templates"
        tabs={[
          { label: "All", icon: FileText, active: filter === "all", onClick: () => setFilter("all"), testId: "tab-all" },
          { label: "Email", icon: Mail, active: filter === "email", onClick: () => setFilter("email"), testId: "tab-email" },
          { label: "SMS", icon: MessageSquare, active: filter === "sms", onClick: () => setFilter("sms"), testId: "tab-sms" },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/promote/dashboard")} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              size="sm"
              className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
              onClick={() => { resetForm(); setShowCreate(true); }}
              data-testid="button-new-template"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((template) => (
              <Card key={template.id} data-testid={`template-${template.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {template.templateType === "email" ? (
                          <Mail className="w-4 h-4 text-[#E5A100]" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-[#E5A100]" />
                        )}
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <Badge variant="secondary" className="capitalize">{template.templateType}</Badge>
                        {template.category && (
                          <Badge variant="outline">{template.category}</Badge>
                        )}
                        {template.isSystem && (
                          <Badge className="bg-blue-100 text-blue-700">System</Badge>
                        )}
                      </div>
                      {template.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{template.description}</p>
                      )}
                      {template.templateType === "email" && template.emailSubject && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Subject: <span className="font-medium">{template.emailSubject}</span>
                        </p>
                      )}
                      {template.templateType === "sms" && template.smsBody && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-md">
                          {template.smsBody}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(template)}
                        data-testid={`button-edit-${template.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {!template.isSystem && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(template.id)}
                          data-testid={`button-delete-${template.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No templates yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Create reusable email and SMS templates to speed up campaign creation
                </p>
                <Button
                  className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
                  onClick={() => { resetForm(); setShowCreate(true); }}
                  data-testid="button-first-template"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreate} onOpenChange={(open) => { if (!open) { resetForm(); } setShowCreate(open); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Template" : "New Template"}</DialogTitle>
            <DialogDescription>
              {editingTemplate ? "Update your template content" : "Create a reusable email or SMS template"}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Template Name *</Label>
                <Input
                  placeholder="e.g., Welcome Email, Promo SMS"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-template-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  placeholder="e.g., onboarding, promotion"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  data-testid="input-template-category"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Brief description of this template..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="input-template-description"
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <div className="flex gap-3">
                <Button
                  variant={templateType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTemplateType("email")}
                  className={templateType === "email" ? "bg-[#E6B747] hover:bg-[#d1a440] text-white" : ""}
                  disabled={!!editingTemplate}
                  data-testid="button-template-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant={templateType === "sms" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTemplateType("sms")}
                  className={templateType === "sms" ? "bg-[#E6B747] hover:bg-[#d1a440] text-white" : ""}
                  disabled={!!editingTemplate}
                  data-testid="button-template-sms"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS
                </Button>
              </div>
            </div>

            {templateType === "email" && (
              <>
                <div className="space-y-2">
                  <Label>Subject Line</Label>
                  <Input
                    placeholder="Email subject..."
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    data-testid="input-template-subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label>HTML Content</Label>
                  <Textarea
                    placeholder="<h1>Hello {{firstName}}</h1>"
                    value={emailHtml}
                    onChange={(e) => setEmailHtml(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                    data-testid="input-template-html"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plain Text Version</Label>
                  <Textarea
                    placeholder="Plain text fallback..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    rows={4}
                    data-testid="input-template-text"
                  />
                </div>
              </>
            )}

            {templateType === "sms" && (
              <div className="space-y-2">
                <Label>SMS Body</Label>
                <Textarea
                  placeholder="Hi {{firstName}}, your message here..."
                  value={smsBody}
                  onChange={(e) => setSmsBody(e.target.value)}
                  rows={4}
                  data-testid="input-template-sms"
                />
                <p className="text-xs text-gray-500">
                  {smsBody.length} / 160 characters
                  {smsBody.length > 160 && ` (${Math.ceil(smsBody.length / 160)} segments)`}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => { resetForm(); setShowCreate(false); }}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
              data-testid="button-save-template"
            >
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {saving ? "Saving..." : editingTemplate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
