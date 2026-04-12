/**
 * Campaign conversions panel — shows / convert form submissions attributed to
 * a single / promote campaign. Rendered inside the campaign detail view.
 *
 * Attribution source: convert_submissions.sourceCampaignId, populated by the
 * submission endpoint when the recipient clicks a {{formUrl:SLUG}} link with
 * utm_source=promote and utm_campaign=<campaignId>.
 *
 * If the campaign has no form URLs (or no submissions yet), renders nothing —
 * the parent dashboard can check conversions.totalSubmissions to decide whether
 * to display this block.
 */
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Mail, MessageSquare, TrendingUp } from "lucide-react";

const CONVERT_ACCENT = "#8000FF";
const PROMOTE_ACCENT = "#1844A6";

interface ConversionRow {
  formId: number;
  formName: string;
  formSlug: string;
  submissionCount: number;
  emailConsents: number;
  smsConsents: number;
}

interface ConversionsResponse {
  success: boolean;
  conversions: ConversionRow[];
  totalSubmissions: number;
  totalEmailConsents: number;
  totalSmsConsents: number;
}

interface CampaignConversionsProps {
  campaignId: number;
  /** Optional — set to true to always render (even with zero submissions) */
  alwaysShow?: boolean;
}

export function CampaignConversions({ campaignId, alwaysShow = false }: CampaignConversionsProps) {
  const query = useQuery<ConversionsResponse>({
    queryKey: [`/api/send/campaigns/${campaignId}/conversions`],
    enabled: !!campaignId,
  });

  if (query.isLoading) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Loading conversions...</p>
        </CardContent>
      </Card>
    );
  }

  if (query.isError || !query.data?.success) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-red-600">Could not load conversions.</p>
        </CardContent>
      </Card>
    );
  }

  const { conversions, totalSubmissions, totalEmailConsents, totalSmsConsents } = query.data;

  if (totalSubmissions === 0 && !alwaysShow) {
    return null;
  }

  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: CONVERT_ACCENT }}>
                <ArrowRightLeft className="w-4 h-4 text-white" />
              </div>
              Form Conversions
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Submissions attributed to this campaign via tracked / convert form links.
            </p>
          </div>
          <Badge style={{ backgroundColor: PROMOTE_ACCENT }} className="text-white">
            / promote → / convert
          </Badge>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <TotalCard label="Submissions" value={totalSubmissions} icon={TrendingUp} />
          <TotalCard label="Email consents" value={totalEmailConsents} icon={Mail} />
          <TotalCard label="SMS consents" value={totalSmsConsents} icon={MessageSquare} />
        </div>

        {/* Per-form breakdown */}
        {conversions.length > 0 ? (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">By form</h4>
            <div className="space-y-2">
              {conversions.map((row) => (
                <div
                  key={row.formId}
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{row.formName}</p>
                    <a
                      href={`/convert/f/${row.formSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:underline"
                    >
                      /convert/f/{row.formSlug}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: CONVERT_ACCENT }}>{row.submissionCount}</p>
                      <p className="text-gray-500">subs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-700">{row.emailConsents}</p>
                      <p className="text-gray-500">email</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-700">{row.smsConsents}</p>
                      <p className="text-gray-500">sms</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No form submissions yet. Once recipients click a tracked form link and submit, they'll appear here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TotalCard({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <Icon className="w-3 h-3 text-gray-400" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
