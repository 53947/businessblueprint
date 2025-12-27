import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Database, Building2, Mail, MessageCircle, Star, FileText, BarChart3 } from "lucide-react";

interface CrmEmptyStateProps {
  appName: string;
  appIcon?: React.ReactNode;
  description: string;
  benefits?: string[];
  variant?: "full" | "compact" | "inline";
}

export function CrmEmptyState({ 
  appName, 
  appIcon,
  description, 
  benefits = [],
  variant = "full" 
}: CrmEmptyStateProps) {
  if (variant === "inline") {
    return (
      <div 
        className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg"
        data-testid="crm-empty-inline"
      >
        <div className="p-2 bg-[#22C55E] rounded-full">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Add contacts to unlock {appName}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <Link href="/relationships">
          <Button size="sm" className="bg-[#22C55E] hover:bg-[#16A34A]" data-testid="btn-inline-add-contacts">
            Add Contacts
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" data-testid="crm-empty-compact">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-3 bg-[#22C55E] rounded-xl">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Start with Your Customer Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
          <Link href="/relationships">
            <Button className="bg-[#22C55E] hover:bg-[#16A34A]" data-testid="btn-compact-add-contacts">
              Open CRM Hub
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center p-8" data-testid="crm-empty-full">
      <Card className="max-w-lg w-full border-green-200 dark:border-green-800">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/10 rounded-full">
            <div className="p-3 bg-[#22C55E] rounded-xl">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl">Start with Your Customer Data</CardTitle>
          <CardDescription className="text-base mt-2">
            {appName} works best when connected to your customer database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {description}
          </p>
          
          {benefits.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                What you'll unlock:
              </p>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/relationships">
              <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A]" data-testid="btn-full-add-contacts">
                <Users className="w-4 h-4 mr-2" />
                Open CRM Hub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-500">
              Free to start • Add contacts manually or import from CSV
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const CRM_EMPTY_CONFIGS = {
  send: {
    appName: "Send",
    description: "Add contacts to your CRM to create targeted email and SMS campaigns.",
    benefits: [
      "Target specific customer segments",
      "Personalize messages with contact data",
      "Track campaign performance by audience"
    ]
  },
  inbox: {
    appName: "Inbox",
    description: "Import your contacts to see customer context when conversations arrive.",
    benefits: [
      "View customer history in conversations",
      "Auto-link messages to contact records",
      "Track all interactions in one timeline"
    ]
  },
  content: {
    appName: "Content",
    description: "Connect your audience data to publish content that reaches the right people.",
    benefits: [
      "Target posts to customer segments",
      "Track engagement by audience type",
      "Personalize content for different groups"
    ]
  },
  listings: {
    appName: "Listings",
    description: "Add your business to the CRM to sync your presence across directories.",
    benefits: [
      "Keep business info consistent everywhere",
      "Track which listings drive contacts",
      "Connect reviews to customer records"
    ]
  },
  reputation: {
    appName: "Reputation",
    description: "Link reviews to customer records for personalized response strategies.",
    benefits: [
      "Match reviews to existing customers",
      "Track reviewer sentiment over time",
      "Respond with customer context"
    ]
  }
};
