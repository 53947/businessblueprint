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
  ArrowLeft,
  Mail,
  MessageSquare,
  Save,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

export default function SendCampaignEditor() {
  const [, setLocation] = useLocation();
  const [, routeParams] = useRoute("/send/campaigns/:id/edit");
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
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

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
      setLocation("/send-app");
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
          <Loader2 className="h-8 w-8 animate-spin text-[#E6B747]" />
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
              onClick={() => setLocation("/send-app")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
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
                  className={campaignType === "email" ? "bg-[#E6B747] hover:bg-[#d1a440] text-white" : ""}
                  data-testid="button-type-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant={campaignType === "sms" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCampaignType("sms")}
                  className={campaignType === "sms" ? "bg-[#E6B747] hover:bg-[#d1a440] text-white" : ""}
                  data-testid="button-type-sms"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS
                </Button>
                <Button
                  variant={campaignType === "both" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCampaignType("both")}
                  className={campaignType === "both" ? "bg-[#E6B747] hover:bg-[#d1a440] text-white" : ""}
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
                    <Mail className="w-5 h-5 text-[#E5A100]" />
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
                <MessageSquare className="w-5 h-5 text-[#E5A100]" />
                SMS Content
              </CardTitle>
              <CardDescription>Compose your SMS message (160 char limit per segment)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {["{{firstName}}", "{{lastName}}", "{{email}}", "{{company}}", "{{unsubscribeUrl}}"].map((variable) => (
                <Badge key={variable} variant="secondary" className="font-mono text-xs">
                  {variable}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Use these variables in your content and they'll be replaced with contact data
            </p>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => setLocation("/send-app")}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#E6B747] hover:bg-[#d1a440] text-white"
              data-testid="button-save-bottom"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Saving..." : isEditMode ? "Update Campaign" : "Save as Draft"}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
