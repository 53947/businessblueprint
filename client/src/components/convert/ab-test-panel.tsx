/**
 * A/B test panel — shown on the form detail view. Has four possible states:
 *
 *  1. No test: "Create A/B Test" button (premium-gated, opens upgrade modal
 *               on free tier)
 *  2. Draft:    both variants listed, "Edit Variant B" link, traffic split
 *               slider (defaults to 50/50), "Start Test" button
 *  3. Running:  live stats side-by-side, confidence indicator, stop/winner
 *  4. Completed: final results, winner badge, archive losing variant option
 *
 * Wired into the convert-dashboard form detail view.
 */
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FlaskConical, Play, Square, Trophy, Trash2, Edit3, ArrowRight, Lock } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ACCENT = "#8000FF";

interface AbTest {
  id: number;
  clientId: number;
  name: string;
  status: "draft" | "running" | "completed" | "cancelled";
  originalFormId: number;
  trafficSplit: Array<{ formId: number; percentage: number }>;
  winnerMetric: string;
  winnerFormId: number | null;
  winnerDeclaredAt: string | null;
  startedAt: string | null;
  endedAt: string | null;
  minSampleSize: number | null;
  createdAt: string | null;
}

interface Variant {
  formId: number;
  name: string;
  slug: string;
  isOriginal: boolean;
  views: number;
  starts: number;
  submissions: number;
  conversionRate: number;
  percentage: number;
}

interface TestDetailResponse {
  success: boolean;
  test: AbTest;
  variants: Variant[];
  confidence: { leader: number | null; confidencePercent: number; ready: boolean };
}

interface AbTestPanelProps {
  clientId: number;
  formId: number;
  abTestId: number | null;
  formStatus: "draft" | "published" | "archived";
  isPremium: boolean;
  onRequireUpgrade: (feature: string) => void;
  onTestChanged: () => void;
}

export function AbTestPanel({
  clientId,
  formId,
  abTestId,
  formStatus,
  isPremium,
  onRequireUpgrade,
  onTestChanged,
}: AbTestPanelProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [declaringWinner, setDeclaringWinner] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Only fetch when we have an abTestId
  const testQuery = useQuery<TestDetailResponse>({
    queryKey: [`/api/convert/${clientId}/ab-tests/${abTestId}`],
    enabled: !!clientId && abTestId !== null,
  });

  const invalidate = () => {
    if (abTestId) {
      queryClient.invalidateQueries({ queryKey: [`/api/convert/${clientId}/ab-tests/${abTestId}`] });
    }
    onTestChanged();
  };

  const createTest = async () => {
    if (!isPremium) {
      onRequireUpgrade("ab_testing");
      return;
    }
    if (formStatus !== "published") {
      toast({ title: "Publish first", description: "Form must be published to create an A/B test.", variant: "destructive" });
      return;
    }
    setCreating(true);
    try {
      const res = await apiRequest("POST", `/api/convert/${clientId}/ab-tests`, {
        originalFormId: formId,
      });
      const result = await res.json();
      if (result.success && result.variantFormId) {
        toast({
          title: "A/B test created",
          description: "Variant B is a copy of the original — edit it in the builder before starting the test.",
        });
        onTestChanged();
        // Take the client to the builder for Variant B
        setLocation(`/convert/builder/${result.variantFormId}`);
      } else {
        throw new Error(result.error || "Create failed");
      }
    } catch (err: any) {
      toast({ title: "Create failed", description: err?.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const startTest = async () => {
    if (!abTestId) return;
    setStarting(true);
    try {
      await apiRequest("PATCH", `/api/convert/${clientId}/ab-tests/${abTestId}/start`);
      toast({ title: "Test started", description: "Variants are now published. Traffic will split 50/50." });
      invalidate();
    } catch (err: any) {
      toast({ title: "Start failed", description: err?.message, variant: "destructive" });
    } finally {
      setStarting(false);
    }
  };

  const stopTest = async () => {
    if (!abTestId) return;
    setStopping(true);
    try {
      await apiRequest("PATCH", `/api/convert/${clientId}/ab-tests/${abTestId}/stop`);
      toast({ title: "Test stopped" });
      invalidate();
    } catch (err: any) {
      toast({ title: "Stop failed", description: err?.message, variant: "destructive" });
    } finally {
      setStopping(false);
    }
  };

  const declareWinner = async (winnerFormId: number) => {
    if (!abTestId) return;
    setDeclaringWinner(winnerFormId);
    try {
      await apiRequest("PATCH", `/api/convert/${clientId}/ab-tests/${abTestId}/winner`, { formId: winnerFormId });
      toast({ title: "Winner declared", description: "Losing variants have been archived." });
      invalidate();
    } catch (err: any) {
      toast({ title: "Action failed", description: err?.message, variant: "destructive" });
    } finally {
      setDeclaringWinner(null);
    }
  };

  const deleteTest = async () => {
    if (!abTestId) return;
    try {
      await apiRequest("DELETE", `/api/convert/${clientId}/ab-tests/${abTestId}`);
      toast({ title: "A/B test deleted" });
      setDeleteConfirmOpen(false);
      onTestChanged();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err?.message, variant: "destructive" });
    }
  };

  // ─── State 1: no test yet ───
  if (!abTestId) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT }}>
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  A/B Testing
                  {!isPremium && <Lock className="w-4 h-4" style={{ color: ACCENT }} />}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Duplicate this form as a variant, split traffic, and let the data pick the winner.
                </p>
                {!isPremium && (
                  <Badge className="mt-2 text-white" style={{ backgroundColor: ACCENT }}>
                    Premium — $59/year
                  </Badge>
                )}
              </div>
            </div>
            <Button
              onClick={createTest}
              disabled={creating || formStatus !== "published"}
              className="text-white"
              style={{ backgroundColor: ACCENT }}
              data-testid="create-ab-test"
            >
              {creating ? "Creating..." : "Create A/B Test"}
            </Button>
          </div>
          {formStatus !== "published" && (
            <p className="text-xs text-amber-600 mt-3">Publish the form first before creating an A/B test.</p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (testQuery.isLoading) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Loading A/B test...</p>
        </CardContent>
      </Card>
    );
  }

  if (testQuery.isError || !testQuery.data) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-red-600">Could not load A/B test.</p>
        </CardContent>
      </Card>
    );
  }

  const { test, variants, confidence } = testQuery.data;

  return (
    <>
      <Card className="border-2 bg-white" style={{ borderColor: ACCENT }}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT }}>
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">A/B Test: {test.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={test.status} />
                  {test.winnerFormId && (
                    <Badge className="text-white" style={{ backgroundColor: "#008060" }}>
                      <Trophy className="w-3 h-3 mr-1" /> Winner declared
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {test.status === "draft" && (
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmOpen(true)}>
                <Trash2 className="w-3 h-3 mr-1" /> Delete
              </Button>
            )}
          </div>

          {/* Variant comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {variants.map((v) => {
              const isWinner = test.winnerFormId === v.formId;
              const isLoser = test.status === "completed" && test.winnerFormId && test.winnerFormId !== v.formId;
              return (
                <div
                  key={v.formId}
                  className={`border rounded-lg p-4 ${isWinner ? "border-2 border-[#008060] bg-[#00806010]" : isLoser ? "border-gray-200 bg-gray-100 opacity-60" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 truncate">{v.name}</p>
                    {v.isOriginal && <Badge variant="outline" className="text-[10px]">Original</Badge>}
                    {isWinner && <Trophy className="w-4 h-4" style={{ color: "#008060" }} />}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                    <StatCell label="Views" value={v.views} />
                    <StatCell label="Starts" value={v.starts} />
                    <StatCell label="Subs" value={v.submissions} />
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Conversion</p>
                    <p className="text-2xl font-bold" style={{ color: ACCENT }}>{v.conversionRate}%</p>
                    <p className="text-[10px] text-gray-500 mt-1">Traffic share: {v.percentage}%</p>
                  </div>
                  {test.status === "draft" && !v.isOriginal && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3 text-xs"
                      style={{ borderColor: ACCENT, color: ACCENT }}
                      onClick={() => setLocation(`/convert/builder/${v.formId}`)}
                      data-testid="edit-variant"
                    >
                      <Edit3 className="w-3 h-3 mr-1" /> Edit Variant
                    </Button>
                  )}
                  {test.status === "running" && !isWinner && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3 text-xs"
                      style={{ borderColor: "#008060", color: "#008060" }}
                      onClick={() => declareWinner(v.formId)}
                      disabled={declaringWinner !== null}
                      data-testid={`declare-winner-${v.formId}`}
                    >
                      <Trophy className="w-3 h-3 mr-1" />
                      {declaringWinner === v.formId ? "Declaring..." : "Declare Winner"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confidence indicator (running only) */}
          {test.status === "running" && (
            <div className="border border-gray-200 bg-[#E9ECF0] rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-600">
                {!confidence.ready && confidence.leader == null && (
                  <>Not enough data yet — need {test.minSampleSize || 100} views per variant before we can call a winner.</>
                )}
                {!confidence.ready && confidence.leader != null && (
                  <>
                    <strong>{variants.find((v) => v.formId === confidence.leader)?.name}</strong> is leading
                    with <strong>{confidence.confidencePercent}%</strong> confidence. Needs to reach 95% to auto-declare.
                  </>
                )}
                {confidence.ready && confidence.leader != null && (
                  <>
                    <strong className="text-[#008060]">
                      {variants.find((v) => v.formId === confidence.leader)?.name} wins
                    </strong> with <strong>{confidence.confidencePercent}%</strong> confidence. Safe to declare the winner.
                  </>
                )}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {test.status === "draft" && (
              <Button
                onClick={startTest}
                disabled={starting}
                className="text-white flex-1"
                style={{ backgroundColor: ACCENT }}
                data-testid="start-ab-test"
              >
                <Play className="w-4 h-4 mr-2" />
                {starting ? "Starting..." : "Start Test"}
              </Button>
            )}
            {test.status === "running" && (
              <Button
                onClick={stopTest}
                disabled={stopping}
                variant="outline"
                className="flex-1"
                data-testid="stop-ab-test"
              >
                <Square className="w-4 h-4 mr-2" />
                {stopping ? "Stopping..." : "Stop Test"}
              </Button>
            )}
            {test.status === "completed" && (
              <p className="flex-1 text-xs text-gray-500 italic">
                Test ended {test.endedAt ? new Date(test.endedAt).toLocaleDateString() : ""}.
                Losing variants have been archived.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this A/B test?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the test and unlinks the variant forms. The Variant B form will remain but will no longer be part of an A/B test. Original and variant form data (counters, submissions) are preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={deleteTest}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function StatusBadge({ status }: { status: AbTest["status"] }) {
  const colors: Record<AbTest["status"], string> = {
    draft: "#6B7280",
    running: ACCENT,
    completed: "#008060",
    cancelled: "#E00420",
  };
  return (
    <Badge className="text-white capitalize" style={{ backgroundColor: colors[status] }}>
      {status}
    </Badge>
  );
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[10px] text-gray-500 uppercase">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  );
}
