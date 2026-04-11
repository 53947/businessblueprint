import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CONVERT_FORM } from "@/config/app-registry";
import {
  FileText, Bell, UserCheck, Plus, Trash2, Copy, Eye, EyeOff,
  ArrowLeft, Layers, Check, ChevronUp, ChevronDown, Wand2,
} from "lucide-react";
import { TemplateModal } from "@/components/convert/template-modal";

const ACCENT = CONVERT_FORM.color; // #8000FF

// ─── Types ───

interface ConvertForm {
  id: number;
  clientId: number;
  name: string;
  slug: string;
  formType: "form" | "popup" | "optin";
  status: "draft" | "published" | "archived";
  brandColor?: string | null;
  showBranding?: boolean | null;
  thankYouMessage?: string | null;
  notifyEmail?: string | null;
  notifyEnabled?: boolean | null;
  viewCount?: number | null;
  submissionCount?: number | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

interface ConvertField {
  id: number;
  formId: number;
  fieldType: string;
  label: string;
  placeholder?: string | null;
  isRequired?: boolean | null;
  sortOrder: number;
  mapsTo?: string | null;
  options?: any;
}

interface ConvertSubmission {
  id: number;
  formId: number;
  data: Record<string, any>;
  status?: string | null;
  emailConsent?: boolean | null;
  smsConsent?: boolean | null;
  crmContactId?: number | null;
  sourceUrl?: string | null;
  createdAt?: string | null;
}

interface ConvertTemplate {
  id: number;
  name: string;
  slug: string;
  category: string;
  formType: "form" | "popup" | "optin";
  description?: string | null;
}

interface Analytics {
  totalForms: number;
  publishedForms: number;
  totalViews: number;
  totalSubmissions: number;
  conversionRate: number;
}

// ─── Helpers ───

function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "—";
  }
}

function typeIcon(formType: string) {
  if (formType === "popup") return <Bell className="w-4 h-4" />;
  if (formType === "optin") return <UserCheck className="w-4 h-4" />;
  return <FileText className="w-4 h-4" />;
}

// ─── Component ───

export default function ConvertDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [templateDialog, setTemplateDialog] = useState<ConvertTemplate | null>(null);
  const [newFormName, setNewFormName] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState<number | null>(null);
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<number | "all">("all");

  const storedClientId = typeof window !== "undefined" ? sessionStorage.getItem("clientId") : null;
  const clientId = storedClientId ? parseInt(storedClientId) : null;

  // ─── Queries ───

  const formsQuery = useQuery<{ success: boolean; forms: ConvertForm[] }>({
    queryKey: [`/api/convert/${clientId}/forms`],
    enabled: !!clientId,
  });

  const submissionsQuery = useQuery<{ success: boolean; submissions: ConvertSubmission[] }>({
    queryKey: [`/api/convert/${clientId}/submissions`],
    enabled: !!clientId,
  });

  const templatesQuery = useQuery<{ success: boolean; templates: ConvertTemplate[] }>({
    queryKey: [`/api/convert/templates`],
    enabled: !!clientId,
  });

  const analyticsQuery = useQuery<{ success: boolean; analytics: Analytics }>({
    queryKey: [`/api/convert/${clientId}/analytics`],
    enabled: !!clientId,
  });

  const formDetailQuery = useQuery<{ success: boolean; form: ConvertForm; fields: ConvertField[] }>({
    queryKey: [`/api/convert/${clientId}/forms/${selectedFormId}`],
    enabled: !!clientId && selectedFormId !== null,
  });

  const forms = formsQuery.data?.forms || [];
  const submissions = submissionsQuery.data?.submissions || [];
  const templates = templatesQuery.data?.templates || [];
  const analytics = analyticsQuery.data?.analytics;

  // ─── Mutations ───

  const invalidateForms = () => {
    queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/forms`] });
    queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/analytics`] });
  };

  const invalidateFormDetail = () => {
    if (selectedFormId) {
      queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/forms/${selectedFormId}`] });
    }
  };

  const createFromTemplate = async () => {
    if (!templateDialog || !clientId) return;
    try {
      const res = await apiRequest("POST", `/api/convert/${clientId}/forms/from-template/${templateDialog.slug}`, {
        name: newFormName || templateDialog.name,
      });
      const result = await res.json();
      if (result.success) {
        toast({ title: "Form created", description: `"${result.form.name}" is a draft. Edit the fields then publish.` });
        setTemplateDialog(null);
        setNewFormName("");
        invalidateForms();
        setSelectedFormId(result.form.id);
        setActiveTab("forms");
      }
    } catch (err: any) {
      toast({ title: "Create failed", description: err?.message || "Unknown error", variant: "destructive" });
    }
  };

  const publishForm = async (form: ConvertForm) => {
    if (!clientId) return;
    try {
      const endpoint = form.status === "published" ? "unpublish" : "publish";
      await apiRequest("POST", `/api/convert/${clientId}/forms/${form.id}/${endpoint}`);
      toast({ title: form.status === "published" ? "Unpublished" : "Published" });
      invalidateForms();
      invalidateFormDetail();
    } catch (err: any) {
      toast({ title: "Action failed", description: err?.message || "Unknown error", variant: "destructive" });
    }
  };

  const deleteForm = async () => {
    if (!clientId || !deleteFormId) return;
    try {
      await apiRequest("DELETE", `/api/convert/${clientId}/forms/${deleteFormId}`);
      toast({ title: "Form deleted" });
      setDeleteFormId(null);
      if (selectedFormId === deleteFormId) setSelectedFormId(null);
      invalidateForms();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err?.message || "Unknown error", variant: "destructive" });
    }
  };

  const copyEmbedCode = async (form: ConvertForm) => {
    if (!clientId) return;
    try {
      const res = await apiRequest("GET", `/api/convert/${clientId}/forms/${form.id}/embed-code`);
      const result = await res.json();
      if (result.success) {
        await navigator.clipboard.writeText(result.embedCode);
        toast({ title: "Embed code copied", description: "Paste it into your website's HTML." });
      }
    } catch (err: any) {
      toast({ title: "Copy failed", description: err?.message || "Unknown error", variant: "destructive" });
    }
  };

  const copyHostedUrl = async (form: ConvertForm) => {
    if (!clientId) return;
    try {
      const res = await apiRequest("GET", `/api/convert/${clientId}/forms/${form.id}/embed-code`);
      const result = await res.json();
      if (result.success) {
        await navigator.clipboard.writeText(result.hostedUrl);
        toast({ title: "Hosted link copied" });
      }
    } catch (err: any) {
      toast({ title: "Copy failed", description: err?.message || "Unknown error", variant: "destructive" });
    }
  };

  const filteredSubmissions = useMemo(() => {
    if (submissionFilter === "all") return submissions;
    return submissions.filter((s) => s.formId === submissionFilter);
  }, [submissions, submissionFilter]);

  if (!clientId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to access / convert.</p>
          <Button asChild><a href="/portal/login">Log in</a></Button>
        </div>
      </div>
    );
  }

  const selectedForm = formDetailQuery.data?.form;
  const selectedFields = formDetailQuery.data?.fields || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <SectionHeader
        title="/ convert"
        subtitle="Lead Capture and Conversion Tool"
        showHomeButton
        homeRoute="/portal/dashboard"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedFormId !== null && selectedForm ? (
          <FormDetailView
            form={selectedForm}
            fields={selectedFields}
            clientId={clientId}
            onBack={() => setSelectedFormId(null)}
            onPublishToggle={() => publishForm(selectedForm)}
            onDelete={() => setDeleteFormId(selectedForm.id)}
            onCopyEmbed={() => copyEmbedCode(selectedForm)}
            onCopyHosted={() => copyHostedUrl(selectedForm)}
            onFieldsChanged={() => {
              invalidateFormDetail();
              invalidateForms();
            }}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            {/* ─── OVERVIEW ─── */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Forms" value={analytics?.totalForms ?? 0} />
                <StatCard label="Published" value={analytics?.publishedForms ?? 0} />
                <StatCard label="Total Submissions" value={analytics?.totalSubmissions ?? 0} />
                <StatCard label="Conversion Rate" value={`${analytics?.conversionRate ?? 0}%`} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-gray-200 bg-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        className="w-full justify-start text-white"
                        style={{ backgroundColor: ACCENT }}
                        onClick={() => setTemplateModalOpen(true)}
                        data-testid="quick-create-form"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Create new form
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        style={{ borderColor: ACCENT, color: ACCENT }}
                        onClick={() => setActiveTab("forms")}
                      >
                        <FileText className="w-4 h-4 mr-2" /> View all forms
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        style={{ borderColor: ACCENT, color: ACCENT }}
                        onClick={() => setActiveTab("submissions")}
                      >
                        <Layers className="w-4 h-4 mr-2" /> View submissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Submissions</h3>
                    {submissions.length === 0 ? (
                      <p className="text-gray-500 text-sm">No submissions yet. Publish a form to start collecting leads.</p>
                    ) : (
                      <ul className="space-y-2">
                        {submissions.slice(0, 5).map((sub) => {
                          const form = forms.find((f) => f.id === sub.formId);
                          return (
                            <li key={sub.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                              <div>
                                <p className="font-medium text-sm text-gray-900">{form?.name || `Form ${sub.formId}`}</p>
                                <p className="text-xs text-gray-500">{formatDate(sub.createdAt)}</p>
                              </div>
                              <Badge variant="outline">{sub.status || "new"}</Badge>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ─── FORMS ─── */}
            <TabsContent value="forms">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Your Forms</h3>
                <Button
                  className="text-white"
                  style={{ backgroundColor: ACCENT }}
                  onClick={() => setTemplateModalOpen(true)}
                  data-testid="forms-create-new"
                >
                  <Plus className="w-4 h-4 mr-2" /> Create new form
                </Button>
              </div>

              {forms.length === 0 ? (
                <Card className="border border-gray-200 bg-white">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-gray-600 mb-4">No forms yet. Start blank or from a template.</p>
                    <Button
                      className="text-white"
                      style={{ backgroundColor: ACCENT }}
                      onClick={() => setTemplateModalOpen(true)}
                    >
                      Create new form
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Type</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Submissions</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700">Updated</th>
                        <th className="text-right px-4 py-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forms.map((form) => (
                        <tr key={form.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <button className="font-medium text-gray-900 hover:underline" onClick={() => setSelectedFormId(form.id)}>
                              {form.name}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              {typeIcon(form.formType)}
                              <span className="capitalize">{form.formType}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={form.status === "published" ? "default" : "outline"}
                              style={form.status === "published" ? { backgroundColor: ACCENT } : undefined}>
                              {form.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{form.submissionCount || 0}</td>
                          <td className="px-4 py-3 text-gray-500">{formatDate(form.updatedAt)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setLocation(`/convert/builder/${form.id}`)}
                                title="Edit in builder"
                                data-testid={`row-edit-builder-${form.id}`}
                              >
                                <Wand2 className="w-4 h-4" style={{ color: ACCENT }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => publishForm(form)}>
                                {form.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => copyEmbedCode(form)}>
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setDeleteFormId(form.id)}>
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* ─── SUBMISSIONS ─── */}
            <TabsContent value="submissions">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Submissions Inbox</h3>
                <Select
                  value={submissionFilter === "all" ? "all" : String(submissionFilter)}
                  onValueChange={(val) => setSubmissionFilter(val === "all" ? "all" : parseInt(val))}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All forms</SelectItem>
                    {forms.map((f) => (
                      <SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {filteredSubmissions.length === 0 ? (
                <Card className="border border-gray-200 bg-white">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-gray-600">No submissions yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {filteredSubmissions.map((sub) => {
                    const form = forms.find((f) => f.id === sub.formId);
                    const expanded = expandedSubmission === sub.id;
                    return (
                      <div key={sub.id} className="border-b border-gray-100 last:border-0">
                        <button
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left"
                          onClick={() => setExpandedSubmission(expanded ? null : sub.id)}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{form?.name || `Form ${sub.formId}`}</p>
                            <p className="text-xs text-gray-500">{formatDate(sub.createdAt)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {sub.emailConsent && <Badge variant="outline">email consent</Badge>}
                            {sub.smsConsent && <Badge variant="outline">sms consent</Badge>}
                            <Badge variant={sub.status === "new" ? "default" : "outline"} style={sub.status === "new" ? { backgroundColor: ACCENT } : undefined}>
                              {sub.status || "new"}
                            </Badge>
                          </div>
                        </button>
                        {expanded && (
                          <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap mt-3 font-mono">
                              {JSON.stringify(sub.data, null, 2)}
                            </pre>
                            {sub.sourceUrl && (
                              <p className="text-xs text-gray-500 mt-2">Source: {sub.sourceUrl}</p>
                            )}
                            {sub.crmContactId && (
                              <p className="text-xs text-gray-500 mt-1">
                                Linked to CRM contact #{sub.crmContactId}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* ─── TEMPLATES ─── */}
            <TabsContent value="templates">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Start From a Template</h3>

              {templates.length === 0 ? (
                <p className="text-gray-500">No templates available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((t) => (
                    <Card
                      key={t.id}
                      className="border border-gray-200 bg-white hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => { setTemplateDialog(t); setNewFormName(t.name); }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT }}>
                            <span className="text-white">{typeIcon(t.formType)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{t.name}</h4>
                            <Badge variant="outline" className="mt-1 capitalize">{t.formType}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{t.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Footer />

      {/* Template → create dialog */}
      <Dialog open={!!templateDialog} onOpenChange={(open) => { if (!open) { setTemplateDialog(null); setNewFormName(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create form from template</DialogTitle>
            <DialogDescription>
              {templateDialog?.name} — {templateDialog?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="formName">Form name</Label>
            <Input
              id="formName"
              value={newFormName}
              onChange={(e) => setNewFormName(e.target.value)}
              placeholder="Name your new form"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setTemplateDialog(null); setNewFormName(""); }}>Cancel</Button>
            <Button className="text-white" style={{ backgroundColor: ACCENT }} onClick={createFromTemplate}>
              Create Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template picker modal — opens the builder with a pre-populated form */}
      <TemplateModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        clientId={clientId}
      />

      {/* Delete form confirm */}
      <AlertDialog open={deleteFormId !== null} onOpenChange={(open) => { if (!open) setDeleteFormId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this form?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes the form, its fields, and all its submissions. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={deleteForm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─── Small components ───

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </CardContent>
    </Card>
  );
}

// ─── Form detail view with minimal field editor ───

function FormDetailView({
  form,
  fields,
  clientId,
  onBack,
  onPublishToggle,
  onDelete,
  onCopyEmbed,
  onCopyHosted,
  onFieldsChanged,
}: {
  form: ConvertForm;
  fields: ConvertField[];
  clientId: number;
  onBack: () => void;
  onPublishToggle: () => void;
  onDelete: () => void;
  onCopyEmbed: () => void;
  onCopyHosted: () => void;
  onFieldsChanged: () => void;
}) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldRequired, setNewFieldRequired] = useState(false);

  const addField = async () => {
    if (!newFieldLabel.trim()) return;
    try {
      await apiRequest("POST", `/api/convert/${clientId}/forms/${form.id}/fields`, {
        fieldType: newFieldType,
        label: newFieldLabel.trim(),
        isRequired: newFieldRequired,
        sortOrder: fields.length,
      });
      setNewFieldLabel("");
      setNewFieldRequired(false);
      onFieldsChanged();
      toast({ title: "Field added" });
    } catch (err: any) {
      toast({ title: "Add failed", description: err?.message, variant: "destructive" });
    }
  };

  const deleteField = async (fieldId: number) => {
    try {
      await apiRequest("DELETE", `/api/convert/${clientId}/forms/${form.id}/fields/${fieldId}`);
      onFieldsChanged();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err?.message, variant: "destructive" });
    }
  };

  const reorderField = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;
    const newOrder = [...fields];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    try {
      await apiRequest("POST", `/api/convert/${clientId}/forms/${form.id}/fields/reorder`, {
        fieldIds: newOrder.map((f) => f.id),
      });
      onFieldsChanged();
    } catch (err: any) {
      toast({ title: "Reorder failed", description: err?.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to forms
      </Button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant={form.status === "published" ? "default" : "outline"}
              style={form.status === "published" ? { backgroundColor: ACCENT } : undefined}>
              {form.status}
            </Badge>
            <span className="text-sm text-gray-500 capitalize">{form.formType}</span>
            <span className="text-sm text-gray-500">{form.submissionCount || 0} submissions</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setLocation(`/convert/builder/${form.id}`)}
            className="text-white"
            style={{ backgroundColor: ACCENT }}
            data-testid="open-in-builder"
          >
            <Wand2 className="w-4 h-4 mr-2" /> Edit in Builder
          </Button>
          <Button variant="outline" onClick={onCopyHosted}>
            <Copy className="w-4 h-4 mr-2" /> Hosted link
          </Button>
          <Button variant="outline" onClick={onCopyEmbed}>
            <Copy className="w-4 h-4 mr-2" /> Embed code
          </Button>
          <Button variant="outline" onClick={onPublishToggle}>
            {form.status === "published" ? <><EyeOff className="w-4 h-4 mr-2" /> Unpublish</> : <><Eye className="w-4 h-4 mr-2" /> Publish</>}
          </Button>
          <Button variant="outline" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200 bg-white mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Fields</h3>

          {fields.length === 0 ? (
            <p className="text-gray-500 text-sm mb-6">No fields yet. Add one below.</p>
          ) : (
            <ul className="space-y-2 mb-6">
              {fields.map((field, index) => (
                <li key={field.id} className="flex items-center gap-3 border border-gray-200 rounded p-3">
                  <div className="flex flex-col">
                    <button
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      onClick={() => reorderField(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                      onClick={() => reorderField(index, "down")}
                      disabled={index === fields.length - 1}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{field.label}</p>
                    <p className="text-xs text-gray-500">
                      {field.fieldType}
                      {field.isRequired && " • required"}
                      {field.mapsTo && ` • maps to ${field.mapsTo}`}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => deleteField(field.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Add a field</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <Label className="text-xs">Type</Label>
                <Select value={newFieldType} onValueChange={setNewFieldType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="select">Dropdown</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                    <SelectItem value="heading">Heading</SelectItem>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Label</Label>
                <Input
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="e.g. Your Name"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addField}
                  disabled={!newFieldLabel.trim()}
                  className="w-full text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>
            </div>
            <label className="flex items-center gap-2 mt-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={newFieldRequired}
                onChange={(e) => setNewFieldRequired(e.target.checked)}
                style={{ accentColor: ACCENT }}
              />
              Required field
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Thank-you message</h3>
          <p className="text-gray-600 text-sm mb-2">
            {form.thankYouMessage || "Thank you for your submission!"}
          </p>
          <p className="text-xs text-gray-400">
            Editing thank-you copy, brand color, autoresponder, and notification email comes in Phase B.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
