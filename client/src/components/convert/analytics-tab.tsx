/**
 * Analytics tab content for the / convert dashboard.
 *
 * Three sections:
 *  1. Funnel stat cards — view→start, start→submit, overall conversion
 *  2. Submission timeline chart — Recharts LineChart with views + submissions,
 *     period selector (7d / 30d / 90d)
 *  3. Per-form breakdown table — all forms with counters + expand to step
 *     drop-off
 *
 * Data source: GET /api/convert/:clientId/forms/:formId/analytics for the
 * selected form, GET /api/convert/:clientId/analytics for the aggregate.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { TrendingUp, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

const ACCENT = "#8000FF";

interface AggregateAnalytics {
  totalForms: number;
  publishedForms: number;
  totalViews: number;
  totalSubmissions: number;
  conversionRate: number;
  topForms: Array<{
    id: number;
    name: string;
    submissions: number;
    views: number;
    conversionRate: number;
  }>;
  recentSubmissions: Array<{
    id: number;
    formName: string;
    email: string | null;
    displayName: string | null;
    createdAt: string | null;
  }>;
}

interface FormAnalytics {
  form: { id: number; name: string; slug: string };
  funnel: {
    views: number;
    starts: number;
    submissions: number;
    viewToStartRate: number;
    startToSubmitRate: number;
    overallConversionRate: number;
  };
  timeline: Array<{ date: string; views: number; starts: number; submissions: number }>;
  sources: Array<{ source: string; medium: string; submissions: number }>;
  stepDropOff: Array<{ step: number; label: string; reached: number; completed: number }>;
  period: string;
}

interface AnalyticsTabProps {
  clientId: number;
}

export function AnalyticsTab({ clientId }: AnalyticsTabProps) {
  const [expandedFormId, setExpandedFormId] = useState<number | null>(null);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const aggregateQuery = useQuery<{ success: boolean; analytics: AggregateAnalytics }>({
    queryKey: [`/api/convert/${clientId}/analytics`],
    enabled: !!clientId,
  });

  const formDetailQuery = useQuery<{ success: boolean } & FormAnalytics>({
    queryKey: [`/api/convert/${clientId}/forms/${expandedFormId}/analytics?period=${period}`],
    enabled: !!clientId && expandedFormId !== null,
  });

  const aggregate = aggregateQuery.data?.analytics;

  if (aggregateQuery.isLoading) {
    return <div className="text-sm text-gray-500">Loading analytics...</div>;
  }

  if (!aggregate) {
    return <div className="text-sm text-red-600">Could not load analytics.</div>;
  }

  const overallViewToStartRate = aggregate.totalViews > 0 && aggregate.topForms.length > 0
    ? aggregate.conversionRate
    : 0;

  return (
    <div className="space-y-6">
      {/* ─── Top-line funnel + top forms ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FunnelCard label="Total Views" value={aggregate.totalViews.toLocaleString()} />
        <FunnelCard label="Published Forms" value={aggregate.publishedForms} />
        <FunnelCard label="Submissions" value={aggregate.totalSubmissions.toLocaleString()} />
        <FunnelCard
          label="Conversion Rate"
          value={`${aggregate.conversionRate}%`}
          highlight
        />
      </div>

      {/* ─── Timeline chart (uses the first top-performing form by default, or the expanded form) ─── */}
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Submission Timeline</h3>
              <p className="text-xs text-gray-500">
                {expandedFormId
                  ? `Showing: ${formDetailQuery.data?.form.name || "Loading..."}`
                  : aggregate.topForms[0]
                    ? `Showing: ${aggregate.topForms[0].name} (your top form)`
                    : "Pick a form below"}
              </p>
            </div>
            <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TimelineChart
            clientId={clientId}
            formId={expandedFormId ?? aggregate.topForms[0]?.id ?? null}
            period={period}
          />
        </CardContent>
      </Card>

      {/* ─── Per-form breakdown table with expandable drop-off ─── */}
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Per-Form Performance</h3>
          {aggregate.topForms.length === 0 ? (
            <p className="text-sm text-gray-500">No form activity yet. Publish a form to start collecting data.</p>
          ) : (
            <div className="space-y-2">
              {aggregate.topForms.map((form) => {
                const expanded = expandedFormId === form.id;
                return (
                  <div key={form.id} className="border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => setExpandedFormId(expanded ? null : form.id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 text-left"
                      data-testid={`analytics-form-${form.id}`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                        <span className="font-semibold text-gray-900 truncate">{form.name}</span>
                      </div>
                      <div className="flex items-center gap-6 text-xs">
                        <div className="text-center">
                          <p className="text-gray-500">Views</p>
                          <p className="font-bold text-gray-900">{form.views.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Subs</p>
                          <p className="font-bold text-gray-900">{form.submissions.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Rate</p>
                          <p className="font-bold" style={{ color: ACCENT }}>{form.conversionRate}%</p>
                        </div>
                      </div>
                    </button>

                    {expanded && (
                      <div className="border-t border-gray-200 p-4 bg-[#E9ECF0]">
                        <FormDetailSection formAnalytics={formDetailQuery.data} isLoading={formDetailQuery.isLoading} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── Recent submissions ─── */}
      {aggregate.recentSubmissions.length > 0 && (
        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Submissions</h3>
            <div className="space-y-2">
              {aggregate.recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {sub.displayName || sub.email || `Submission #${sub.id}`}
                    </p>
                    <p className="text-xs text-gray-500">{sub.formName}</p>
                  </div>
                  <span className="text-xs text-gray-400">{formatRelativeTime(sub.createdAt)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function FunnelCard({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <Card className={highlight ? "border-2 bg-white" : "border border-gray-200 bg-white"} style={highlight ? { borderColor: ACCENT } : undefined}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
          {highlight && <TrendingUp className="w-3 h-3" style={{ color: ACCENT }} />}
        </div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
}

function TimelineChart({ clientId, formId, period }: { clientId: number; formId: number | null; period: string }) {
  const query = useQuery<{ success: boolean } & FormAnalytics>({
    queryKey: [`/api/convert/${clientId}/forms/${formId}/analytics?period=${period}`],
    enabled: !!clientId && formId !== null,
  });

  if (formId === null) {
    return <div className="h-64 flex items-center justify-center text-sm text-gray-400">Pick a form below to see its timeline</div>;
  }
  if (query.isLoading) {
    return <div className="h-64 flex items-center justify-center text-sm text-gray-400">Loading chart...</div>;
  }
  const timeline = query.data?.timeline || [];
  if (timeline.length === 0) {
    return <div className="h-64 flex items-center justify-center text-sm text-gray-400">No data for this period yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} />
        <YAxis stroke="#9CA3AF" fontSize={11} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#9CA3AF" strokeWidth={2} dot={false} name="Views" />
        <Line type="monotone" dataKey="starts" stroke="#064A6C" strokeWidth={2} dot={false} name="Starts" />
        <Line type="monotone" dataKey="submissions" stroke={ACCENT} strokeWidth={2} dot={false} name="Submissions" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function FormDetailSection({ formAnalytics, isLoading }: { formAnalytics: (FormAnalytics & { success: boolean }) | undefined; isLoading: boolean }) {
  if (isLoading) return <p className="text-sm text-gray-500">Loading detail...</p>;
  if (!formAnalytics) return <p className="text-sm text-gray-500">No detail data.</p>;

  const { funnel, sources, stepDropOff } = formAnalytics;

  return (
    <div className="space-y-4">
      {/* Funnel bar */}
      <div>
        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Funnel</h4>
        <div className="flex items-center gap-2 text-xs">
          <FunnelStep label="Views" value={funnel.views} total={funnel.views} />
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <FunnelStep label="Starts" value={funnel.starts} total={funnel.views} rate={`${funnel.viewToStartRate}%`} />
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <FunnelStep label="Submissions" value={funnel.submissions} total={funnel.starts} rate={`${funnel.startToSubmitRate}%`} highlight />
        </div>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Top Sources</h4>
          <div className="flex flex-wrap gap-2">
            {sources.slice(0, 6).map((s, i) => (
              <Badge key={i} variant="outline" className="bg-white">
                {s.source}/{s.medium}: {s.submissions}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Step drop-off */}
      {stepDropOff.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Step Drop-Off</h4>
          <div className="space-y-1">
            {stepDropOff.map((step) => (
              <div key={step.step} className="flex items-center gap-2 text-xs">
                <span className="w-20 text-gray-600 truncate">{step.label}</span>
                <div className="flex-1 bg-white rounded h-5 relative overflow-hidden border border-gray-200">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: step.reached > 0 ? `${(step.completed / step.reached) * 100}%` : "0%",
                      backgroundColor: ACCENT,
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-gray-900">
                    {step.completed} / {step.reached}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FunnelStep({ label, value, total, rate, highlight }: { label: string; value: number; total: number; rate?: string; highlight?: boolean }) {
  return (
    <div className={`flex-1 rounded p-2 text-center ${highlight ? "border-2" : "border border-gray-200 bg-white"}`} style={highlight ? { borderColor: ACCENT, backgroundColor: `${ACCENT}10` } : undefined}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value.toLocaleString()}</p>
      {rate && <p className="text-[10px] text-gray-500">{rate}</p>}
    </div>
  );
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}
