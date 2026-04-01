import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertAssessmentSchema, type InsertAssessment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowRight, ArrowLeft, Lock, Mail, CheckCircle, Check, Circle,
  Loader2, Globe, Star, Users, Share2, Megaphone, Search,
  MessageCircle, Inbox, BookOpen, Target, Lightbulb, ScanLine,
} from "lucide-react";
import { useLocation } from "wouter";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

// ─── Step Definitions ─────────────────────────────────────────────────────────

const steps = [
  { title: "Your Business", description: "Tell us about your business" },
  { title: "Scanning", description: "Analyzing your digital presence" },
  { title: "Your Results", description: "Review what we found" },
  { title: "Submit", description: "Confirm and get your prescription" },
];

// ─── Answer Option Arrays ─────────────────────────────────────────────────────

const recencyOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "past_6_months", label: "Within the past 6 months" },
  { value: "6_months_plus", label: "More than 6 months ago" },
  { value: "never", label: "Never" },
];

const recencyShortOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "3_months_plus", label: "More than 3 months ago" },
  { value: "never", label: "Never" },
];

const emailCollectionOptions = [
  { value: "yes_active", label: "Yes, actively building a list" },
  { value: "yes_not_organized", label: "Yes, but not organized" },
  { value: "no", label: "No, not currently" },
  { value: "dont_know", label: "I don't know" },
];

const listSizeOptions = [
  { value: "0_50", label: "0-50 contacts" },
  { value: "51_200", label: "51-200 contacts" },
  { value: "201_500", label: "201-500 contacts" },
  { value: "501_1000", label: "501-1,000 contacts" },
  { value: "1000_plus", label: "More than 1,000 contacts" },
  { value: "no_list", label: "No email list" },
];

const smsOptions = [
  { value: "yes_regularly", label: "Yes, regularly" },
  { value: "yes_occasionally", label: "Yes, occasionally" },
  { value: "no_interested", label: "No, but interested" },
  { value: "no_not_interested", label: "No, not interested" },
];

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "3_5_week", label: "3-5 times per week" },
  { value: "1_2_week", label: "1-2 times per week" },
  { value: "few_month", label: "A few times per month" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "Never" },
];

const creatorOptions = [
  { value: "owner", label: "Business owner" },
  { value: "staff", label: "Staff member" },
  { value: "agency", label: "Marketing agency" },
  { value: "no_one", label: "No one currently" },
  { value: "inconsistent", label: "Inconsistent/varies" },
];

const responseRateOptions = [
  { value: "90_100", label: "90-100%" },
  { value: "50_89", label: "50-89%" },
  { value: "10_49", label: "10-49%" },
  { value: "under_10", label: "Under 10%" },
  { value: "0", label: "0% - Don't respond" },
];

const responseTimeOptions = [
  { value: "15_min", label: "Within 15 minutes" },
  { value: "1_hour", label: "Within 1 hour" },
  { value: "4_hours", label: "Within 4 hours" },
  { value: "24_hours", label: "Within 24 hours" },
  { value: "24_hours_plus", label: "More than 24 hours" },
  { value: "inconsistent", label: "Inconsistent" },
];

const inboxOptions = [
  { value: "yes_unified", label: "Yes, fully unified" },
  { value: "partial", label: "Partially unified" },
  { value: "no_scattered", label: "No, messages are scattered" },
  { value: "dont_know", label: "I don't know" },
];

const missedOptions = [
  { value: "never", label: "Never - we catch everything" },
  { value: "past_week", label: "Missed some this week" },
  { value: "past_month", label: "Missed some this month" },
  { value: "regularly", label: "Happens regularly" },
  { value: "dont_track", label: "Don't track this" },
];

const liveChatOptions = [
  { value: "yes_monitored", label: "Yes, actively monitored" },
  { value: "yes_not_monitored", label: "Yes, but not monitored" },
  { value: "yes_unsure", label: "Yes, but unsure if it works" },
  { value: "no", label: "No live chat" },
  { value: "no_website", label: "No website" },
];

const chatConversationOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "3_months_plus", label: "More than 3 months ago" },
  { value: "never_none", label: "Never / No chat" },
];

const chatResponseTimeOptions = [
  { value: "1_min", label: "Within 1 minute" },
  { value: "5_min", label: "Within 5 minutes" },
  { value: "15_min", label: "Within 15 minutes" },
  { value: "15_plus", label: "More than 15 minutes" },
  { value: "no_chat", label: "No chat" },
];

const listingUpdateOptions = [
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "past_6_months", label: "Within the past 6 months" },
  { value: "past_year", label: "Within the past year" },
  { value: "year_plus", label: "More than a year ago" },
  { value: "never", label: "Never updated" },
];

const listingConsistencyOptions = [
  { value: "yes_consistent", label: "Yes, all consistent" },
  { value: "pretty_sure", label: "Pretty sure they are" },
  { value: "not_sure", label: "Not sure" },
  { value: "know_inconsistent", label: "Know they're inconsistent" },
  { value: "never_checked", label: "Never checked" },
];

const blogOptions = [
  { value: "yes_weekly", label: "Yes, post weekly" },
  { value: "yes_monthly", label: "Yes, post monthly" },
  { value: "yes_inconsistent", label: "Yes, but inconsistent" },
  { value: "no_planning", label: "No, but planning to" },
  { value: "no_not_interested", label: "No, not interested" },
];

const crmOptions = [
  { value: "yes_daily", label: "Yes, use it daily" },
  { value: "yes_underutilized", label: "Yes, but underutilized" },
  { value: "yes_not_setup", label: "Yes, but not fully set up" },
  { value: "no_planning", label: "No, but planning to" },
  { value: "manual_tracking", label: "No, track manually" },
  { value: "no_dont_track", label: "No, don't track customers" },
];

const crmPlatformOptions = [
  { value: "salesforce", label: "Salesforce" },
  { value: "hubspot", label: "HubSpot" },
  { value: "zoho", label: "Zoho" },
  { value: "monday", label: "Monday.com" },
  { value: "pipedrive", label: "Pipedrive" },
  { value: "sheets_excel", label: "Google Sheets / Excel" },
  { value: "other", label: "Other" },
  { value: "none", label: "None" },
];

const automationOptions = [
  { value: "yes_full", label: "Yes, fully automated" },
  { value: "yes_partial", label: "Yes, partially automated" },
  { value: "no_manual", label: "No, all manual" },
  { value: "dont_know", label: "Don't know" },
];

const runsAdsOptions = [
  { value: "yes_both", label: "Yes — Google and Meta (Facebook/Instagram)" },
  { value: "yes_google", label: "Yes — Google Ads only" },
  { value: "yes_meta", label: "Yes — Meta (Facebook/Instagram) only" },
  { value: "yes_other", label: "Yes — other platforms" },
  { value: "no_interested", label: "No, but interested" },
  { value: "no_not_interested", label: "No, not interested" },
];

const adCampaignOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "1-3 months ago" },
  { value: "past_6_months", label: "3-6 months ago" },
  { value: "6_months_plus", label: "More than 6 months ago" },
  { value: "never", label: "Never run ads" },
];

const adBudgetOptions = [
  { value: "none", label: "No budget allocated" },
  { value: "under_500", label: "Under $500/month" },
  { value: "500_1000", label: "$500-$1,000/month" },
  { value: "1000_2500", label: "$1,000-$2,500/month" },
  { value: "2500_5000", label: "$2,500-$5,000/month" },
  { value: "5000_plus", label: "Over $5,000/month" },
];

const gbpPostOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "3_months_plus", label: "More than 3 months ago" },
  { value: "never", label: "Never posted" },
];

const gbpPhotoOptions = [
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "past_6_months", label: "Within the past 6 months" },
  { value: "6_months_plus", label: "More than 6 months ago" },
  { value: "never", label: "Never added photos" },
];

const websiteUpdateOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "past_6_months", label: "Within the past 6 months" },
  { value: "6_months_plus", label: "More than 6 months ago" },
  { value: "never", label: "Never / No website" },
];

const crmFollowupOptions = [
  { value: "past_week", label: "Within the past week" },
  { value: "past_month", label: "Within the past month" },
  { value: "past_3_months", label: "Within the past 3 months" },
  { value: "3_months_plus", label: "More than 3 months ago" },
  { value: "never_no_crm", label: "Never / No CRM" },
];

// ─── Scan Category Definitions ────────────────────────────────────────────────

interface ScanCategory {
  id: string;
  label: string;
  icon: typeof Globe;
  status: "pending" | "scanning" | "complete";
  summary: string | null;
}

const initialScanCategories: ScanCategory[] = [
  { id: "website", label: "Website & Technical", icon: Globe, status: "pending", summary: null },
  { id: "directories", label: "Directory Listings", icon: BookOpen, status: "pending", summary: null },
  { id: "reviews", label: "Reviews & Reputation", icon: Star, status: "pending", summary: null },
  { id: "social", label: "Social Media Presence", icon: Share2, status: "pending", summary: null },
  { id: "marketing", label: "Marketing Tools", icon: Megaphone, status: "pending", summary: null },
  { id: "technical", label: "Technical Audit", icon: ScanLine, status: "pending", summary: null },
];

// ─── Detection Card Interface ─────────────────────────────────────────────────

interface DetectionCard {
  id: string;
  category: string;
  icon: typeof Globe;
  title: string;
  description: string;
  detected: boolean;
  fieldName: string;
  autoValue: string;
  correctionOptions: { value: string; label: string }[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete">("idle");
  const [scanResults, setScanResults] = useState<any>(null);
  const [detections, setDetections] = useState<any>(null);
  const [corrections, setCorrections] = useState<Record<string, { editing: boolean; value: string }>>({});
  const [operationalAnswers, setOperationalAnswers] = useState<Record<string, string>>({});
  const [scanCategories, setScanCategories] = useState<ScanCategory[]>(initialScanCategories);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const scanAnimationRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<InsertAssessment>({
    resolver: zodResolver(insertAssessmentSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      address: "",
      address2: "",
      unit: "",
      attention: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      email: "",
      website: "",
      collectsEmails: "",
      lastEmailCampaign: "",
      emailListSize: "",
      sendsSMS: "",
      lastSMSCampaign: "",
      lastSocialPost: "",
      socialPostFrequency: "",
      socialContentCreator: "",
      lastReviewResponse: "",
      reviewResponseRate: "",
      lastNewReview: "",
      inquiryResponseTime: "",
      hasUnifiedInbox: "",
      missedInquiries: "",
      hasLiveChat: "",
      lastChatConversation: "",
      chatResponseTime: "",
      lastListingUpdate: "",
      listingConsistency: "",
      lastGBPPost: "",
      lastGBPPhoto: "",
      lastWebsiteUpdate: "",
      hasBlog: "",
      usesCRM: "",
      crmPlatform: "",
      lastCRMFollowup: "",
      hasAutomation: "",
      runsAds: "",
      lastAdCampaign: "",
      monthlyAdBudget: "",
    },
  });

  // ─── Step 1: Submit business info ─────────────────────────────────────────

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: InsertAssessment) => {
      const response = await apiRequest("POST", "/api/assessments", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAssessmentId(data.assessmentId);
      setScanStatus("scanning");
      setCurrentStep(1);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  // ─── Step 2: Poll for scan results ──────────────────────────────────────

  useEffect(() => {
    if (scanStatus !== "scanning" || !assessmentId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/assessments/${assessmentId}/scan-results`);
        const data = await res.json();

        if (data.status === "complete") {
          setScanResults(data);
          setDetections(data.detections);
          setScanStatus("complete");
          // Complete all remaining scan categories
          setScanCategories(prev => prev.map(c => ({ ...c, status: "complete" as const })));
          clearInterval(interval);
          // Auto-advance after a brief pause to show all-complete state
          setTimeout(() => setCurrentStep(2), 800);
        } else if (data.status === "failed") {
          setScanStatus("complete");
          clearInterval(interval);
          setTimeout(() => setCurrentStep(2), 500);
        }
      } catch {
        // Network error — keep polling
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scanStatus, assessmentId]);

  // ─── Step 2: Progressive scan animation ─────────────────────────────────

  useEffect(() => {
    if (scanStatus !== "scanning") return;

    let catIndex = 0;
    // Start first category scanning immediately
    setScanCategories(prev => prev.map((c, i) => i === 0 ? { ...c, status: "scanning" as const } : c));

    const timer = setInterval(() => {
      catIndex++;
      setScanCategories(prev => {
        const updated = [...prev];
        // Complete the previous one
        if (catIndex - 1 < updated.length) {
          updated[catIndex - 1] = { ...updated[catIndex - 1], status: "complete" };
        }
        // Start the next one
        if (catIndex < updated.length) {
          updated[catIndex] = { ...updated[catIndex], status: "scanning" };
        }
        return updated;
      });

      if (catIndex >= initialScanCategories.length) {
        clearInterval(timer);
      }
    }, 4000);

    scanAnimationRef.current = timer;
    return () => clearInterval(timer);
  }, [scanStatus]);

  // ─── Build detection cards from scan results ────────────────────────────

  const buildDetectionCards = useCallback((): DetectionCard[] => {
    if (!scanResults) return [];
    const cards: DetectionCard[] = [];
    const d = detections;

    // Email capture
    if (d?.emailCapture) {
      const platformLabel = d.emailCapture.platform
        ? d.emailCapture.platform.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
        : null;
      cards.push({
        id: "email-capture",
        category: "Email Marketing",
        icon: Mail,
        title: d.emailCapture.detected
          ? `Email signup detected${platformLabel ? ` (${platformLabel})` : ""}`
          : "No email signup form found on your website",
        description: d.emailCapture.detected
          ? "We found an email collection mechanism on your website."
          : "We didn't find a newsletter signup form or email marketing integration on your site.",
        detected: d.emailCapture.detected,
        fieldName: "collectsEmails",
        autoValue: d.emailCapture.detected ? "yes_active" : "no",
        correctionOptions: emailCollectionOptions,
      });
    }

    // Chat widget
    if (d?.chatWidget) {
      const platformLabel = d.chatWidget.platform
        ? d.chatWidget.platform.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
        : null;
      cards.push({
        id: "chat-widget",
        category: "Live Chat",
        icon: MessageCircle,
        title: d.chatWidget.detected
          ? `Live chat detected${platformLabel ? ` (${platformLabel})` : ""}`
          : "No live chat widget found",
        description: d.chatWidget.detected
          ? "We found a chat widget installed on your website."
          : "We didn't find a live chat widget on your website.",
        detected: d.chatWidget.detected,
        fieldName: "hasLiveChat",
        autoValue: d.chatWidget.detected ? "yes_monitored" : "no",
        correctionOptions: liveChatOptions,
      });
    }

    // CRM
    if (d?.crm) {
      const platformLabel = d.crm.platform
        ? d.crm.platform.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
        : null;
      cards.push({
        id: "crm",
        category: "CRM",
        icon: Users,
        title: d.crm.detected
          ? `CRM tracking detected${platformLabel ? ` (${platformLabel})` : ""}`
          : "No CRM tracking found",
        description: d.crm.detected
          ? "We found CRM tracking code on your website."
          : "We didn't detect any CRM platform tracking code on your site.",
        detected: d.crm.detected,
        fieldName: "usesCRM",
        autoValue: d.crm.detected ? "yes_daily" : "no_dont_track",
        correctionOptions: crmOptions,
      });
    }

    // Automation
    if (d?.automation) {
      cards.push({
        id: "automation",
        category: "Marketing Automation",
        icon: Target,
        title: d.automation.detected
          ? `Marketing automation detected${d.automation.platform ? ` (${d.automation.platform.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())})` : ""}`
          : "No marketing automation detected",
        description: d.automation.detected
          ? "We found marketing automation platform code on your website."
          : "We didn't detect any marketing automation tools on your site.",
        detected: d.automation.detected,
        fieldName: "hasAutomation",
        autoValue: d.automation.detected ? "yes_partial" : "no_manual",
        correctionOptions: automationOptions,
      });
    }

    // Blog
    if (d?.blog) {
      cards.push({
        id: "blog",
        category: "Content & SEO",
        icon: BookOpen,
        title: d.blog.detected
          ? `Blog/content section found${d.blog.lastPostDate ? ` (last post: ${d.blog.lastPostDate})` : ""}`
          : "No blog or content section detected",
        description: d.blog.detected
          ? "Your website has a blog or content section — consistent posting helps SEO."
          : "We didn't find a blog section on your website.",
        detected: d.blog.detected,
        fieldName: "hasBlog",
        autoValue: d.blog.detected ? (d.blog.estimatedFrequency || "yes_inconsistent") : "no_planning",
        correctionOptions: blogOptions,
      });
    }

    // SMS marketing
    if (d?.smsMarketing) {
      cards.push({
        id: "sms-marketing",
        category: "SMS Marketing",
        icon: Megaphone,
        title: d.smsMarketing.detected
          ? `SMS marketing detected${d.smsMarketing.platform ? ` (${d.smsMarketing.platform.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())})` : ""}`
          : "No SMS marketing detected",
        description: d.smsMarketing.detected
          ? "We found SMS marketing tools on your website."
          : "We didn't detect any SMS marketing integration on your site.",
        detected: d.smsMarketing.detected,
        fieldName: "sendsSMS",
        autoValue: d.smsMarketing.detected ? "yes_regularly" : "no_interested",
        correctionOptions: smsOptions,
      });
    }

    // Website last update
    if (d?.lastUpdate && d.lastUpdate.estimatedDate) {
      cards.push({
        id: "last-update",
        category: "Website",
        icon: Globe,
        title: `Website last updated around ${d.lastUpdate.estimatedDate}`,
        description: d.lastUpdate.method === "copyright_year"
          ? "Based on the copyright year in your footer."
          : "Based on dates found in your website content.",
        detected: true,
        fieldName: "lastWebsiteUpdate",
        autoValue: getRecencyFromDate(d.lastUpdate.estimatedDate),
        correctionOptions: websiteUpdateOptions,
      });
    }

    // Reviews (from scan data, not detections)
    if (scanResults?.reviews) {
      const r = scanResults.reviews;
      if (r.totalReviews > 0) {
        cards.push({
          id: "reviews",
          category: "Reviews",
          icon: Star,
          title: `${r.totalReviews} reviews found (${r.averageRating?.toFixed(1) || "N/A"} avg rating)`,
          description: r.responseRate > 50
            ? "You're responding to most of your reviews — great work."
            : "Responding to reviews helps build trust with potential customers.",
          detected: true,
          fieldName: "reviewResponseRate",
          autoValue: r.responseRate >= 90 ? "90_100" : r.responseRate >= 50 ? "50_89" : r.responseRate >= 10 ? "10_49" : "under_10",
          correctionOptions: responseRateOptions,
        });
      }
    }

    // Directories (from scan data)
    if (scanResults?.directories) {
      const dir = scanResults.directories;
      cards.push({
        id: "directories",
        category: "Business Listings",
        icon: Search,
        title: dir.totalListings > 0
          ? `Found on ${dir.totalListings} director${dir.totalListings === 1 ? "y" : "ies"} (${dir.claimedListings} claimed)`
          : "Not found on major directories",
        description: dir.consistency >= 80
          ? "Your business information looks consistent across directories."
          : "Your business details may be inconsistent across directories — this hurts local SEO.",
        detected: dir.totalListings > 0,
        fieldName: "listingConsistency",
        autoValue: dir.consistency >= 90 ? "yes_consistent" : dir.consistency >= 70 ? "pretty_sure" : "not_sure",
        correctionOptions: listingConsistencyOptions,
      });
    }

    // Social media (from scan data)
    if (scanResults?.socialMedia) {
      const sm = scanResults.socialMedia;
      cards.push({
        id: "social-media",
        category: "Social Media",
        icon: Share2,
        title: sm.totalPresence > 0
          ? `Found on ${sm.totalPresence} social platform${sm.totalPresence === 1 ? "" : "s"} (${sm.activeProfiles} active)`
          : "No social media profiles found",
        description: sm.activeProfiles >= 3
          ? "Solid social media presence across multiple platforms."
          : "Building a consistent social media presence helps customers find and trust you.",
        detected: sm.totalPresence > 0,
        fieldName: "socialPostFrequency",
        autoValue: sm.activeProfiles >= 3 ? "few_month" : sm.activeProfiles > 0 ? "rarely" : "never",
        correctionOptions: frequencyOptions,
      });
    }

    return cards;
  }, [scanResults, detections]);

  // ─── Helper: Convert ISO date to recency value ──────────────────────────

  function getRecencyFromDate(dateStr: string): string {
    const d = new Date(dateStr);
    const daysSince = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 7) return "past_week";
    if (daysSince <= 30) return "past_month";
    if (daysSince <= 90) return "past_3_months";
    if (daysSince <= 180) return "past_6_months";
    return "6_months_plus";
  }

  // ─── Build conditional questions ────────────────────────────────────────

  const buildQuestionsToShow = useCallback(() => {
    const d = detections;

    // Questions that always appear (scan can't answer these)
    const alwaysAsk = [
      { field: "lastEmailCampaign" as const, label: "When was your last email campaign?", options: recencyOptions },
      { field: "emailListSize" as const, label: "How large is your email list?", options: listSizeOptions },
      { field: "inquiryResponseTime" as const, label: "How quickly do you respond to customer inquiries?", options: responseTimeOptions },
      { field: "missedInquiries" as const, label: "How often do customer inquiries get missed?", options: missedOptions },
      { field: "lastSocialPost" as const, label: "When was your last social media post?", options: recencyShortOptions },
      { field: "socialContentCreator" as const, label: "Who creates your social media content?", options: creatorOptions },
      { field: "lastReviewResponse" as const, label: "When did you last respond to a customer review?", options: recencyShortOptions },
      { field: "lastNewReview" as const, label: "When did you last receive a new review?", options: recencyShortOptions },
      { field: "lastListingUpdate" as const, label: "When did you last update your business listings?", options: listingUpdateOptions },
      { field: "lastGBPPost" as const, label: "When did you last post on Google Business Profile?", options: gbpPostOptions },
      { field: "lastGBPPhoto" as const, label: "When did you last add a photo to Google Business Profile?", options: gbpPhotoOptions },
      { field: "runsAds" as const, label: "Do you currently run paid advertising?", options: runsAdsOptions },
      { field: "lastAdCampaign" as const, label: "When was your last advertising campaign?", options: adCampaignOptions },
      { field: "monthlyAdBudget" as const, label: "What is your monthly advertising budget?", options: adBudgetOptions },
    ];

    // Questions that only appear if scan couldn't detect
    const conditional = [
      { field: "sendsSMS" as const, label: "Do you send SMS/text messages to customers?", options: smsOptions, showIf: !d?.smsMarketing?.detected },
      { field: "lastSMSCampaign" as const, label: "When was your last SMS campaign?", options: recencyShortOptions, showIf: !d?.smsMarketing?.detected },
      { field: "hasUnifiedInbox" as const, label: "Do you have a unified inbox for all customer messages?", options: inboxOptions, showIf: !d?.crm?.detected },
      { field: "lastChatConversation" as const, label: "When was your last chat conversation?", options: chatConversationOptions, showIf: d?.chatWidget?.detected },
      { field: "chatResponseTime" as const, label: "How quickly do you respond to chat messages?", options: chatResponseTimeOptions, showIf: d?.chatWidget?.detected },
      { field: "usesCRM" as const, label: "Do you use a CRM system?", options: crmOptions, showIf: !d?.crm?.detected },
      { field: "crmPlatform" as const, label: "What CRM platform do you use?", options: crmPlatformOptions, showIf: !d?.crm?.detected },
      { field: "lastCRMFollowup" as const, label: "When was your last CRM-driven follow-up?", options: crmFollowupOptions, showIf: d?.crm?.detected || operationalAnswers.usesCRM?.startsWith("yes") },
      { field: "hasAutomation" as const, label: "Do you use marketing automation?", options: automationOptions, showIf: !d?.automation?.detected },
    ];

    return [
      ...alwaysAsk,
      ...conditional.filter(q => q.showIf),
    ];
  }, [detections, operationalAnswers]);

  // ─── Correction handlers ────────────────────────────────────────────────

  const confirmDetection = (card: DetectionCard) => {
    setCorrections(prev => {
      const updated = { ...prev };
      delete updated[card.id];
      return updated;
    });
  };

  const openCorrection = (card: DetectionCard) => {
    setCorrections(prev => ({
      ...prev,
      [card.id]: { editing: true, value: "" },
    }));
  };

  const setCorrectionValue = (cardId: string, value: string) => {
    setCorrections(prev => ({
      ...prev,
      [cardId]: { editing: true, value },
    }));
  };

  // ─── Step 1: Validation and submit ──────────────────────────────────────

  const handleStep1Next = async () => {
    const fieldsToValidate: (keyof InsertAssessment)[] = [
      "businessName", "industry", "address", "city", "state", "zipCode", "phone", "email",
    ];
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    const data = form.getValues();
    createAssessmentMutation.mutate(data);
  };

  // ─── Step 3→4: Move to review ──────────────────────────────────────────

  const handleStep3Next = () => {
    setCurrentStep(3);
  };

  // ─── Step 4: Final submit ───────────────────────────────────────────────

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!assessmentId) throw new Error("No assessment ID");

      // Build complete operational data from: auto-detected values + corrections + manual answers
      const detectionCards = buildDetectionCards();
      const payload: Record<string, any> = { ...operationalAnswers };

      // Apply auto-detected values (confirmed or default)
      for (const card of detectionCards) {
        if (corrections[card.id]?.value) {
          // User corrected this detection
          payload[card.fieldName] = corrections[card.id].value;
        } else {
          // Use auto-detected value
          payload[card.fieldName] = card.autoValue;
        }
      }

      // Track what was auto-detected vs corrected
      const scanDetectionsRecord: Record<string, string> = {};
      const scanCorrectionsRecord: Record<string, { from: string; to: string }> = {};

      for (const card of detectionCards) {
        scanDetectionsRecord[card.fieldName] = card.autoValue;
        if (corrections[card.id]?.value) {
          scanCorrectionsRecord[card.fieldName] = {
            from: card.autoValue,
            to: corrections[card.id].value,
          };
        }
      }

      payload._scanDetections = scanDetectionsRecord;
      payload._scanCorrections = scanCorrectionsRecord;

      const response = await apiRequest("PATCH", `/api/assessments/${assessmentId}/operational`, payload);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Assessment Complete!",
        description: "Your Digital IQ prescription is ready.",
      });

      const accessToken = nanoid();
      const expiryTime = Date.now() + (15 * 60 * 1000);

      sessionStorage.setItem("lastAssessmentId", String(assessmentId));
      sessionStorage.setItem("assessmentAccessToken", accessToken);
      sessionStorage.setItem("assessmentAccessExpiry", String(expiryTime));
      sessionStorage.setItem("assessmentId", String(assessmentId));

      setLocation("/portal/assessment/confirmation");
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  // ─── Render helpers ─────────────────────────────────────────────────────

  const renderSelectQuestion = (
    field: string,
    label: string,
    options: { value: string; label: string }[],
  ) => (
    <div key={field} className="mb-4">
      <Label className="block text-[#09080E] font-semibold mb-2">{label}</Label>
      <Select
        value={operationalAnswers[field] || ""}
        onValueChange={(value) => setOperationalAnswers(prev => ({ ...prev, [field]: value }))}
      >
        <SelectTrigger className="border-gray-200 focus:border-[#09080E]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#09080E] mb-4" style={{ fontFamily: "Archivo Semi Expanded, sans-serif" }}>
            Get Your Digital IQ Score
          </h1>
          <p className="text-xl text-[#09080E]/70">
            {currentStep === 0
              ? "Tell us about your business and we'll scan your digital presence"
              : currentStep === 1
              ? "Scanning your online presence now..."
              : currentStep === 2
              ? "Review what we found and answer a few quick questions"
              : "Review everything and get your prescription"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[#09080E]/60 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{currentStep < 2 ? "Takes about 3 minutes" : ""}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-[#09080E]">{steps[currentStep].title}</span>
            <span className="text-sm text-[#09080E]/60 ml-2">— {steps[currentStep].description}</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl border border-gray-200">
          <CardContent className="p-8">

            {/* ═══ STEP 1: Business Information ═══ */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      {...form.register("businessName")}
                    />
                    {form.formState.errors.businessName && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Select
                      value={form.watch("industry")}
                      onValueChange={(value) => form.setValue("industry", value, { shouldValidate: true })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="home-services">Home Services</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="beauty">Beauty/Wellness</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.industry && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.industry.message}</p>
                    )}
                  </div>
                </div>

                {/* Website — prominent placement with helper text */}
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    {...form.register("website")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Without your website URL, we can't scan your site for marketing tools, chat widgets, or technical issues.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[#09080E]/70 border-b border-gray-200 pb-2">Business Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Address Line 1 *</Label>
                      <Input id="address" placeholder="Street address" {...form.register("address")} />
                      {form.formState.errors.address && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.address.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input id="address2" placeholder="Building, floor, etc. (optional)" {...form.register("address2")} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="City" {...form.register("city")} />
                      {form.formState.errors.city && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select
                        value={form.watch("state")}
                        onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                          <SelectItem value="DC">Washington DC</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.state && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.state.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input id="zipCode" placeholder="12345" {...form.register("zipCode")} />
                      {form.formState.errors.zipCode && (
                        <p className="text-sm text-red-600 mt-1">{form.formState.errors.zipCode.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" {...form.register("country")} disabled className="bg-gray-50" />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-[#09080E]/60">
                    <Lock className="w-4 h-4 mr-2" />
                    Your information is secure and never shared
                  </div>
                  <Button
                    type="button"
                    onClick={handleStep1Next}
                    disabled={createAssessmentMutation.isPending}
                    className="bg-[#09080E] hover:bg-[#09080E]/90 text-white"
                  >
                    {createAssessmentMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Starting Scan...
                      </>
                    ) : (
                      <>
                        Scan My Business
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 2: Scanning Progress ═══ */}
            {currentStep === 1 && (
              <div className="max-w-2xl mx-auto text-center py-16">
                <h2 className="text-2xl font-bold text-[#09080E] mb-2" style={{ fontFamily: "Archivo Semi Expanded, sans-serif" }}>
                  Analyzing {form.watch("businessName")}'s Digital Presence
                </h2>
                <p className="text-gray-500 mb-12">
                  This takes about 60 seconds. We're checking your website, directories, reviews, and more.
                </p>

                <div className="space-y-4 text-left">
                  {scanCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        cat.status === "complete" ? "bg-green-100 text-green-600" :
                        cat.status === "scanning" ? "bg-blue-100 text-blue-600 animate-pulse" :
                        "bg-gray-100 text-gray-400"
                      )}>
                        {cat.status === "complete" ? <Check className="w-4 h-4" /> :
                         cat.status === "scanning" ? <Loader2 className="w-4 h-4 animate-spin" /> :
                         <Circle className="w-4 h-4" />}
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        cat.status === "complete" ? "text-[#09080E]" :
                        cat.status === "scanning" ? "text-[#09080E]" :
                        "text-gray-400"
                      )}>
                        {cat.label}
                      </span>
                      {cat.status === "complete" && cat.summary && (
                        <span className="text-xs text-gray-500 ml-auto">{cat.summary}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <Loader2 className="w-8 h-8 mx-auto text-[#09080E]/30 animate-spin" />
                </div>
              </div>
            )}

            {/* ═══ STEP 3: Scan Results + Confirmation + Remaining Questions ═══ */}
            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Section A: What We Found */}
                <div>
                  <h3 className="text-xl font-bold text-[#09080E] mb-1" style={{ fontFamily: "Archivo Semi Expanded, sans-serif" }}>
                    What We Found
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Confirm each finding or correct anything that doesn't look right.
                  </p>

                  <div className="space-y-3">
                    {buildDetectionCards().map(card => (
                      <Card key={card.id} className="border border-gray-200 bg-white">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                card.detected ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                              )}>
                                <card.icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-[#09080E] text-sm">{card.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{card.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button
                                variant={corrections[card.id] ? "outline" : "default"}
                                size="sm"
                                onClick={() => confirmDetection(card)}
                                className={cn(
                                  "text-xs",
                                  !corrections[card.id] && "bg-[#09080E] hover:bg-[#09080E]/90"
                                )}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Correct
                              </Button>
                              <Button
                                variant={corrections[card.id] ? "default" : "outline"}
                                size="sm"
                                onClick={() => openCorrection(card)}
                                className={cn(
                                  "text-xs",
                                  corrections[card.id] && "bg-[#09080E] hover:bg-[#09080E]/90"
                                )}
                              >
                                Not quite
                              </Button>
                            </div>
                          </div>

                          {/* Correction dropdown */}
                          {corrections[card.id]?.editing && (
                            <div className="mt-3 pl-11 border-t pt-3">
                              <Label className="text-sm text-gray-600 mb-1 block">
                                What's the correct answer?
                              </Label>
                              <Select
                                value={corrections[card.id]?.value || ""}
                                onValueChange={(v) => setCorrectionValue(card.id, v)}
                              >
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Select the correct answer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {card.correctionOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    {buildDetectionCards().length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Lightbulb className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No website was provided, so we couldn't auto-detect marketing tools.</p>
                        <p className="text-xs mt-1">Answer the questions below to complete your assessment.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section B: Remaining Questions */}
                {(() => {
                  const questionsToShow = buildQuestionsToShow();
                  return questionsToShow.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-semibold text-[#09080E] mb-1">
                        A few things we couldn't determine from your online presence
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {questionsToShow.length} question{questionsToShow.length !== 1 ? "s" : ""} remaining
                      </p>
                      <div className="space-y-4">
                        {questionsToShow.map(q => renderSelectQuestion(q.field, q.label, q.options))}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-[#09080E]/60">
                    <Lock className="w-4 h-4 mr-2" />
                    Your information is secure and never shared
                  </div>
                  <Button
                    type="button"
                    onClick={handleStep3Next}
                    className="bg-[#09080E] hover:bg-[#09080E]/90 text-white"
                  >
                    Review & Submit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* ═══ STEP 4: Review & Submit ═══ */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#09080E] mb-2" style={{ fontFamily: "Archivo Semi Expanded, sans-serif" }}>
                    Ready to Get Your Digital IQ Score
                  </h3>
                  <p className="text-[#09080E]/70">
                    Review your information below, then submit to get your personalized prescription.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Business Name</Label>
                      <p className="text-sm font-medium text-[#09080E]">{form.watch("businessName")}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Industry</Label>
                      <p className="text-sm font-medium text-[#09080E]">{form.watch("industry")}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-[#09080E]/60">Business Address</Label>
                    <div className="text-sm font-medium text-[#09080E] space-y-0.5">
                      <p>{form.watch("address")}{form.watch("unit") && `, ${form.watch("unit")}`}</p>
                      {form.watch("address2") && <p>{form.watch("address2")}</p>}
                      <p>{form.watch("city")}, {form.watch("state")} {form.watch("zipCode")}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Phone</Label>
                      <p className="text-sm font-medium text-[#09080E]">{form.watch("phone")}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Email</Label>
                      <p className="text-sm font-medium text-[#09080E]">{form.watch("email")}</p>
                    </div>
                  </div>
                  {form.watch("website") && (
                    <div>
                      <Label className="text-sm font-medium text-[#09080E]/60">Website</Label>
                      <p className="text-sm font-medium text-[#09080E]">{form.watch("website")}</p>
                    </div>
                  )}
                </div>

                {/* Key Findings Summary */}
                {buildDetectionCards().length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-medium text-[#09080E] mb-3">Key Findings</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {buildDetectionCards().map(card => (
                        <div key={card.id} className="flex items-center gap-2 text-sm">
                          <div className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center",
                            card.detected ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                          )}>
                            {card.detected ? <Check className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                          </div>
                          <span className="text-[#09080E]/80">{card.category}: {card.detected ? "Detected" : "Not found"}</span>
                          {corrections[card.id]?.value && (
                            <span className="text-xs text-blue-600">(corrected)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">What happens next:</h4>
                      <ul className="text-sm text-green-800 mt-2 space-y-1">
                        <li>- Your Digital IQ Score (0-140) is finalized</li>
                        <li>- Personalized prescription with prioritized recommendations</li>
                        <li>- Results delivered via email within 2-3 minutes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    type="button"
                    disabled={submitMutation.isPending}
                    onClick={() => submitMutation.mutate()}
                    className="bg-[#F97316] hover:bg-[#F97316]/90 text-white"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Prescription...
                      </>
                    ) : (
                      <>
                        Get My Digital IQ Score
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
