import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Globe, CheckCircle2, Clock, AlertCircle, Minus } from "lucide-react";
import { DirectoryStatusBadge } from "./DirectoryStatusBadge";
import { DistributeButton } from "./DistributeButton";

interface Target {
  id: number;
  slug: string;
  displayName: string;
  type: string;
  adapterKey: string;
  feedsDirectories: string[];
  isEnabled: boolean;
  isConfigured: boolean;
  description: string;
  estimatedProcessingTime: string;
}

interface Submission {
  id: number;
  targetSlug: string;
  status: string;
  lastSubmittedAt: string | null;
}

interface CoverageGridProps {
  clientId: string;
}

export function CoverageGrid({ clientId }: CoverageGridProps) {
  const { data: targetsData } = useQuery<{ targets: Target[] }>({
    queryKey: ["/api/distribution/targets"],
  });

  const { data: submissionsData } = useQuery<{ submissions: Submission[] }>({
    queryKey: [`/api/clients/${clientId}/distribution/submissions`],
    enabled: !!clientId,
  });

  const targets = targetsData?.targets || [];
  const submissions = submissionsData?.submissions || [];

  // Build submission status map
  const submissionMap = new Map<string, Submission>();
  submissions.forEach((s) => submissionMap.set(s.targetSlug, s));

  // Calculate metrics
  let totalDirectories = 0;
  let activeDirectories = 0;
  let pendingDirectories = 0;
  let errorDirectories = 0;

  targets.forEach((target) => {
    const count = target.feedsDirectories?.length || 0;
    totalDirectories += count;
    const sub = submissionMap.get(target.slug);
    if (sub) {
      if (sub.status === "active" || sub.status === "verified") {
        activeDirectories += count;
      } else if (sub.status === "pending" || sub.status === "submitted") {
        pendingDirectories += count;
      } else if (sub.status === "error" || sub.status === "failed") {
        errorDirectories += count;
      }
    }
  });

  const notListedDirectories = totalDirectories - activeDirectories - pendingDirectories - errorDirectories;
  const coveragePercent = totalDirectories > 0 ? Math.round((activeDirectories / totalDirectories) * 100) : 0;

  const getDirectoryStatus = (targetSlug: string): "active" | "pending" | "error" | "not_listed" => {
    const sub = submissionMap.get(targetSlug);
    if (!sub) return "not_listed";
    if (sub.status === "active" || sub.status === "verified") return "active";
    if (sub.status === "pending" || sub.status === "submitted") return "pending";
    if (sub.status === "error" || sub.status === "failed") return "error";
    return "not_listed";
  };

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalDirectories}</p>
                <p className="text-xs text-gray-500">Total Directories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeDirectories}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{pendingDirectories}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-2xl font-bold">{notListedDirectories}</p>
                <p className="text-xs text-gray-500">Not Listed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage progress */}
      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Coverage</span>
            <span className="text-sm font-bold">{coveragePercent}%</span>
          </div>
          <Progress value={coveragePercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Adapter sections */}
      {targets.map((target) => (
        <AdapterSection
          key={target.slug}
          target={target}
          status={getDirectoryStatus(target.slug)}
          submission={submissionMap.get(target.slug)}
          clientId={clientId}
        />
      ))}

      {/* Distribute All */}
      <div className="flex justify-center pt-4">
        <DistributeButton clientId={clientId} label="Distribute to All Directories" size="lg" />
      </div>
    </div>
  );
}

function AdapterSection({ target, status, submission, clientId }: {
  target: Target;
  status: "active" | "pending" | "error" | "not_listed";
  submission?: Submission;
  clientId: string;
}) {
  const [open, setOpen] = useState(false);
  const directories = target.feedsDirectories || [];

  return (
    <Card>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                <CardTitle className="text-base">{target.displayName}</CardTitle>
                <Badge variant={target.type === "aggregator" ? "default" : "secondary"} className="text-xs">
                  {target.type === "aggregator" ? "Aggregator" : "Direct"}
                </Badge>
                <span className="text-xs text-gray-500">{directories.length} directories</span>
              </div>
              <div className="flex items-center gap-2">
                {submission && (
                  <Badge
                    variant="outline"
                    className={
                      status === "active" ? "border-green-300 text-green-700" :
                      status === "pending" ? "border-yellow-300 text-yellow-700" :
                      status === "error" ? "border-red-300 text-red-700" :
                      "border-gray-300 text-gray-500"
                    }
                  >
                    {submission.status}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-500 mb-3">{target.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {directories.map((dir) => (
                <DirectoryStatusBadge key={dir} name={dir} status={status} />
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-xs text-gray-500">Processing: {target.estimatedProcessingTime}</span>
              <DistributeButton
                clientId={clientId}
                targetSlugs={[target.slug]}
                label={`Distribute to ${target.displayName}`}
                variant="outline"
                size="sm"
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
