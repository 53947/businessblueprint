import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Save,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  Users,
  Clock,
  Calendar,
  ArrowRightLeft,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FormPickerModal, type ConvertFormSummary } from "@/components/convert/form-picker-modal";
import { CampaignConversions } from "@/components/promote/campaign-conversions";

interface Campaign {
  id: number;
  name: string;
  description: string | null;
  campaignType: string;
  status: string;
  emailSubject: string | null;
  emailHtml: string | null;
  emailText: string | null;
  smsBody: string | null;
}

export default function PromoteCampaignEditor() {
  const [, setLocation] = useLocation();
  const [, routeParams] = useRoute("/promote/campaigns/:id/edit");
  const campaignId = routeParams?.id ? parseInt(routeParams.id) : null;
  const isEditMode = campaignId !== null;
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [campaignType, setCampaignType] = useState<"email" | "sms" | "both">("email");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailHtml, setEmailHtml] = useState("");
  const [emailText, setEmailText] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  // Form picker state — used by both the email "Insert Form" button and the
  // SMS "Insert Form Link" button. `formPickerTarget` tells the handler which
  // textarea to insert into.
  const [formPickerOpen, setFormPickerOpen] = useState(false);
  const [formPickerTarget, setFormPickerTarget] = useState<"email" | "sms">("email");

  const storedClientId = typeof window !== "undefined" ? sessionStorage.getItem("clientId") : null;
  const clientId = storedClientId ? parseInt(storedClientId) : null;

  const insertIntoField = (setter: (v: string) => void, current: string, snippet: string) => {
    setter((current ? current + "\n\n" : "") + snippet);
  };

  const openFormPickerForEmail = () => { setFormPickerTarget("email"); setFormPickerOpen(true); };
  const openFormPickerForSms = () => { setFormPickerTarget("sms"); setFormPickerOpen(true); };

  const handleFormSelect = (form: ConvertFormSummary) => {
    const brand = form.brandColor || "#8000FF";
    if (formPickerTarget === "email") {
      // Email-safe CTA block: table layout, inline styles, works in every client.
      const cta = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 24px 0;">
  <tr>
    <td align="center">
      <a href="{{formUrl:${form.slug}}}"
         style="display: inline-block; padding: 14px 32px; background-color: ${brand}; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">
        ${form.name}
      </a>
    </td>
  </tr>
</table>`;
      insertIntoField(setEmailHtml, emailHtml, cta);
      toast({
        title: "Form CTA inserted",
        description: "Edit the button text in the HTML if you want something other than the form name.",
      });
    } else {
      insertIntoField(setSmsBody, smsBody, `{{formUrl:${form.slug}}}`);
      toast({
        title: "Form link inserted",
        description: "At send time this resolves to the full hosted URL with campaign tracking.",
      });
    }
  };

  const insertVariable = (target: "email" | "sms", variable: string) => {
    if (target === "email") {
      setEmailHtml(emailHtml + (emailHtml.endsWith(" ") || emailHtml === "" ? "" : " ") + variable);
    } else {
      setSmsBody(smsBody + (smsBody.endsWith(" ") || smsBody === "" ? "" : " ") + variable);
    }
  };

  const TEMPLATE_VARIABLES = [
    { key: "{{firstName}}", label: "First name" },
    { key: "{{lastName}}", label: "Last name" },
    { key: "{{email}}", label: "Email" },
    { key: "{{company}}", label: "Company" },
    { key: "{{unsubscribeUrl}}", label: "Unsubscribe URL" },
  ];

  // Check campaign type from URL params (for new campaigns)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    if (type === "sms") setCampaignType("sms");
    if (type === "both") setCampaignType("both");
  }, []);

  // Load existing campaign for edit mode
  const { data: existingCampaign, isLoading: loadingCampaign } = useQuery<{ success: boolean; campaign: Campaign }>({
    queryKey: [`/api/send/campaigns/${campaignId}`],
    enabled: isEditMode,
  });

  // Fetch available lists for recipient selection
  const { data: listsData } = useQuery<{ lists: { id: number; name: string; totalContacts: number }[] }>({
    queryKey: ["/api/send/lists"],
  });
  const availableLists = listsData?.lists || [];

  // Populate form when campaign loads
  useEffect(() => {
    if (existingCampaign?.campaign) {
      const c = existingCampaign.campaign;
      setName(c.name);
      setDescription(c.description || "");
      setCampaignType(c.campaignType as "email" | "sms" | "both");
      setEmailSubject(c.emailSubject || "");
      setEmailHtml(c.emailHtml || "");
      setEmailText(c.emailText || "");
      setSmsBody(c.smsBody || "");
    }
  }, [existingCampaign]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Campaign name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        campaignType,
        emailSubject: campaignType !== "sms" ? emailSubject.trim() || null : null,
        emailHtml: campaignType !== "sms" ? emailHtml.trim() || null : null,
        emailText: campaignType !== "sms" ? emailText.trim() || null : null,
        smsBody: campaignType !== "email" ? smsBody.trim() || null : null,
      };

      if (isEditMode) {
        await apiRequest("PATCH", `/api/send/campaigns/${campaignId}`, payload);
        toast({ title: "Campaign updated", description: "Your changes have been saved." });
      } else {
        await apiRequest("POST", "/api/send/campaigns", payload);
        toast({ title: "Campaign created", description: "Your draft campaign has been saved." });
      }

      queryClient.invalidateQueries({ queryKey: ["/api/send/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/send/campaigns/recent"] });
      setLocation("/promote/dashboard");
    } catch (err: any) {
      const message = err?.message || "Failed to save campaign";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (isEditMode && loadingCampaign) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#1844A6]" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SectionHeader
        title={isEditMode ? "Edit Campaign" : "New Campaign"}
        tabs={[]}
        actions={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/promote/dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-[#1844A6] hover:bg-[#133a8a] text-white"
              disabled={saving}
              data-testid="button-save-campaign"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Saving..." : "Save Draft"}
            </Button>
          </>
        }
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Campaign Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Set your campaign name, type, and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name *</Label>
              <Input
                id="campaign-name"
                placeholder="e.g., Spring Newsletter, Flash Sale Alert"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-campaign-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea
                id="campaign-description"
                placeholder="Brief internal description of this campaign..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                data-testid="input-campaign-description"
              />
            </div>

            <div className="space-y-2">
              <Label>Campaign Type</Label>
              <div className="flex gap-3">
                <Button
                  variant={campaignType === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCampaignType("email")}
                  className={campaignType === "email" ? "bg-[#1844A6] hover:bg-[#133a8a] text-white" : ""}
                  data-testid="button-type-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant={campaignType === "sms" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCampaignType("sms")}
                  className={campaignType === "sms" ? "bg-[#1844A6] hover:bg-[#133a8a] text-white" : ""}
                  data-testid="button-type-sms"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS
                </Button>
                <Button
                  variant={campaignType === "both" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCampaignType("both")}
                  className={campaignType === "both" ? "bg-[#1844A6] hover:bg-[#133a8a] text-white" : ""}
                  data-testid="button-type-both"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Email + SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        {campaignType !== "sms" && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#1844A6]" />
                    Email Content
                  </CardTitle>
                  <CardDescription>Compose your email campaign</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  data-testid="button-toggle-preview"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Editor" : "Preview"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject Line</Label>
                <Input
                  id="email-subject"
                  placeholder="Your email subject line..."
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  data-testid="input-email-subject"
                />
                {emailSubject && (
                  <p className="text-xs text-gray-500">
                    {emailSubject.length} characters
                    {emailSubject.length > 60 && (
                      <span className="text-amber-600 ml-2">
                        Consider keeping under 60 chars for mobile
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Phase D toolbar — Insert Form (opens / convert form picker) + Insert Variable dropdown */}
              {!showPreview && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openFormPickerForEmail}
                    className="h-8 text-xs"
                    style={{ borderColor: "#8000FF", color: "#8000FF" }}
                    data-testid="email-insert-form"
                  >
                    <ArrowRightLeft className="w-3 h-3 mr-1" /> Insert Form
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline" size="sm" className="h-8 text-xs" data-testid="email-insert-variable">
                        Insert Variable <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {TEMPLATE_VARIABLES.map((v) => (
                        <DropdownMenuItem key={v.key} onClick={() => insertVariable("email", v.key)}>
                          <span className="font-mono text-xs mr-2">{v.key}</span>
                          <span className="text-xs text-gray-500">{v.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {showPreview ? (
                <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 min-h-[300px]">
                  {emailHtml ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: emailHtml }}
                      className="prose dark:prose-invert max-w-none"
                    />
                  ) : emailText ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {emailText}
                    </pre>
                  ) : (
                    <p className="text-gray-400 text-center py-12">No content to preview</p>
                  )}
                </div>
              ) : (
                <Tabs defaultValue="html" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="text">Plain Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="html">
                    <Textarea
                      placeholder="<h1>Hello {{firstName}}</h1>&#10;&#10;<p>Your email content here...</p>"
                      value={emailHtml}
                      onChange={(e) => setEmailHtml(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                      data-testid="input-email-html"
                    />
                  </TabsContent>
                  <TabsContent value="text">
                    <Textarea
                      placeholder="Plain text version of your email..."
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      rows={12}
                      data-testid="input-email-text"
                    />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        )}

        {campaignType !== "email" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#1844A6]" />
                SMS Content
              </CardTitle>
              <CardDescription>Compose your SMS message (160 char limit per segment)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Phase D toolbar — Insert Form Link + Insert Variable */}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openFormPickerForSms}
                  className="h-8 text-xs"
                  style={{ borderColor: "#8000FF", color: "#8000FF" }}
                  data-testid="sms-insert-form"
                >
                  <ArrowRightLeft className="w-3 h-3 mr-1" /> Insert Form Link
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="h-8 text-xs" data-testid="sms-insert-variable">
                      Insert Variable <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {TEMPLATE_VARIABLES.map((v) => (
                      <DropdownMenuItem key={v.key} onClick={() => insertVariable("sms", v.key)}>
                        <span className="font-mono text-xs mr-2">{v.key}</span>
                        <span className="text-xs text-gray-500">{v.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Hi {{firstName}}, your SMS message here..."
                  value={smsBody}
                  onChange={(e) => setSmsBody(e.target.value)}
                  rows={4}
                  data-testid="input-sms-body"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{smsBody.length} characters</span>
                  <span>
                    {Math.ceil(smsBody.length / 160) || 1} segment{Math.ceil(smsBody.length / 160) !== 1 ? "s" : ""}
                    {smsBody.length > 160 && (
                      <span className="text-amber-600 ml-2">Multi-segment SMS costs more</span>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Template Variables Info */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Template Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["{{firstName}}", "{{lastName}}", "{{email}}", "{{company}}", "{{unsubscribeUrl}}", "{{formUrl:slug}}"].map((variable) => (
                <Badge key={variable} variant="secondary" className="font-mono text-xs">
                  {variable}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Contact variables ({`{{firstName}}`} etc.) are replaced with each recipient's data. <code>{`{{formUrl:slug}}`}</code> resolves to a / convert form URL with campaign tracking — use the Insert Form buttons above to pick a form.
            </p>
          </CardContent>
        </Card>

        {/* Recipient Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1844A6]" />
              Recipients
            </CardTitle>
            <CardDescription>Choose who receives this campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Send To</Label>
              <Select value={selectedListId} onValueChange={setSelectedListId}>
                <SelectTrigger data-testid="select-recipient-list">
                  <SelectValue placeholder="All contacts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  {availableLists.map((list) => (
                    <SelectItem key={list.id} value={String(list.id)}>
                      {list.name} ({list.totalContacts} contacts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select a list or send to all contacts with appropriate consent
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1844A6]" />
              Schedule
            </CardTitle>
            <CardDescription>Send now or schedule for later</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  data-testid="input-schedule-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-time">Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  data-testid="input-schedule-time"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Leave blank to send immediately when you click "Send Campaign"
            </p>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => setLocation("/promote/dashboard")}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={saving}
              variant="outline"
              data-testid="button-save-bottom"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Saving..." : isEditMode ? "Update Draft" : "Save as Draft"}
            </Button>
            <Button
              onClick={async () => {
                if (!name.trim()) { setError("Campaign name is required"); return; }
                setSending(true);
                setError("");
                try {
                  // Save first
                  const payload = {
                    name: name.trim(),
                    description: description.trim() || null,
                    campaignType,
                    emailSubject: campaignType !== "sms" ? emailSubject.trim() || null : null,
                    emailHtml: campaignType !== "sms" ? emailHtml.trim() || null : null,
                    emailText: campaignType !== "sms" ? emailText.trim() || null : null,
                    smsBody: campaignType !== "email" ? smsBody.trim() || null : null,
                  };

                  let id = campaignId;
                  if (isEditMode) {
                    await apiRequest("PATCH", `/api/send/campaigns/${campaignId}`, payload);
                  } else {
                    const res = await apiRequest("POST", "/api/send/campaigns", payload);
                    const data = await res.json();
                    id = data.campaign?.id;
                  }

                  if (!id) throw new Error("Failed to get campaign ID");

                  if (scheduledDate && scheduledTime) {
                    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
                    await apiRequest("POST", `/api/send/campaigns/${id}/schedule`, {
                      emailScheduledFor: campaignType !== "sms" ? scheduledFor : null,
                      smsScheduledFor: campaignType !== "email" ? scheduledFor : null,
                      listId: selectedListId && selectedListId !== "all" ? selectedListId : null,
                    });
                    toast({ title: "Campaign Scheduled", description: "Your campaign will be sent at the scheduled time." });
                  } else {
                    await apiRequest("POST", `/api/send/campaigns/${id}/send`, {
                      listId: selectedListId && selectedListId !== "all" ? selectedListId : null,
                    });
                    toast({ title: "Campaign Sending", description: "Your campaign has been queued for delivery." });
                  }

                  queryClient.invalidateQueries({ queryKey: ["/api/send/campaigns"] });
                  queryClient.invalidateQueries({ queryKey: ["/api/send/campaigns/recent"] });
                  setLocation("/promote/dashboard");
                } catch (err: any) {
                  setError(err?.message || "Failed to send campaign");
                } finally {
                  setSending(false);
                }
              }}
              disabled={sending}
              className="bg-[#1844A6] hover:bg-[#133a8a] text-white"
              data-testid="button-send-campaign"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : scheduledDate ? (
                <Clock className="h-4 w-4 mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {sending ? "Processing..." : scheduledDate ? "Schedule Campaign" : "Send Campaign"}
            </Button>
          </div>
        </div>
      </div>

      {/* Phase D: form conversion analytics — only shown once the campaign exists (edit mode) */}
      {isEditMode && campaignId && (
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <CampaignConversions campaignId={campaignId} />
        </div>
      )}

      <Footer />

      {/* Phase D: / convert form picker modal — shared by the email and SMS Insert Form buttons */}
      {clientId && (
        <FormPickerModal
          open={formPickerOpen}
          onClose={() => setFormPickerOpen(false)}
          onSelect={handleFormSelect}
          clientId={clientId}
        />
      )}
    </div>
  );
}
