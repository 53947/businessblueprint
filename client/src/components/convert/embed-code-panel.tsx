/**
 * Dashboard panel that displays embed code variants + a live preview for a
 * published / convert form.
 *
 * Three variants are returned by GET /api/convert/:clientId/forms/:formId/embed-code:
 *   - embedCode   — the primary <script> tag. Popup/slide-in for those form
 *                   types, plain inline for everything else.
 *   - inlineEmbed — <div id=...> + <script data-container="#..."> variant. Lets
 *                   the client drop the form into a specific container.
 *   - hostedUrl   — direct link to the React-based hosted form page.
 *
 * Also embeds a live iframe preview pointed at hostedUrl so the client can see
 * exactly what end users will see.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, Code2, LayoutGrid, Link2 } from "lucide-react";

const ACCENT = "#8000FF";

interface EmbedCodeResponse {
  success: boolean;
  embedCode: string;
  inlineEmbed: string;
  hostedUrl: string;
}

interface EmbedCodePanelProps {
  clientId: number;
  formId: number;
  formStatus: "draft" | "published" | "archived";
}

type Variant = "script" | "inline" | "hosted";

export function EmbedCodePanel({ clientId, formId, formStatus }: EmbedCodePanelProps) {
  const { toast } = useToast();
  const [activeVariant, setActiveVariant] = useState<Variant>("script");
  const [copied, setCopied] = useState<Variant | null>(null);

  const query = useQuery<EmbedCodeResponse>({
    queryKey: [`/api/convert/${clientId}/forms/${formId}/embed-code`],
    enabled: !!clientId && !!formId,
  });

  const copyToClipboard = async (text: string, variant: Variant) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(variant);
      toast({ title: "Copied to clipboard" });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Select the code and copy manually", variant: "destructive" });
    }
  };

  if (formStatus !== "published") {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Embed</h3>
          <p className="text-sm text-gray-600">
            Publish the form to generate embed code. Click <strong>Edit in Builder</strong> above, finish your fields, then click Publish.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (query.isLoading) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500">Loading embed code...</p>
        </CardContent>
      </Card>
    );
  }

  if (query.isError || !query.data?.success) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-sm text-red-600">Could not load embed code. Try reloading the page.</p>
        </CardContent>
      </Card>
    );
  }

  const { embedCode, inlineEmbed, hostedUrl } = query.data;

  const variants: Record<Variant, { label: string; icon: any; code: string; description: string }> = {
    script: {
      label: "Script tag",
      icon: Code2,
      code: embedCode,
      description: "Drop this single line anywhere in your website's HTML. Popup and slide-in forms trigger automatically based on the settings you picked in the builder.",
    },
    inline: {
      label: "Inline container",
      icon: LayoutGrid,
      code: inlineEmbed,
      description: "Use this when you need the form to land in a specific spot (e.g., a grid cell, a sidebar). The <div> is your container; the <script> fills it.",
    },
    hosted: {
      label: "Hosted link",
      icon: Link2,
      code: hostedUrl,
      description: "A ready-to-share URL that renders the form on businessblueprint.io. Paste it into email campaigns, SMS messages, QR codes, or social posts — no embed required.",
    },
  };

  const active = variants[activeVariant];
  const ActiveIcon = active.icon;

  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Embed</h3>
            <p className="text-xs text-gray-500">Paste this code into any website or share the hosted link.</p>
          </div>
          <Badge style={{ backgroundColor: ACCENT }}>{formStatus}</Badge>
        </div>

        {/* Variant tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-4">
          {(Object.entries(variants) as Array<[Variant, typeof variants["script"]]>).map(([key, v]) => {
            const Icon = v.icon;
            const isActive = activeVariant === key;
            return (
              <button
                key={key}
                onClick={() => setActiveVariant(key)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  isActive ? "border-[#8000FF] text-[#8000FF]" : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                data-testid={`embed-tab-${key}`}
              >
                <Icon className="w-4 h-4" />
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 flex items-start gap-2">
          <ActiveIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
          {active.description}
        </p>

        {/* Code block */}
        <div className="relative">
          <pre className="bg-[#09080E] text-[#E9ECF0] text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap break-all">
            {active.code}
          </pre>
          <Button
            size="sm"
            onClick={() => copyToClipboard(active.code, activeVariant)}
            className="absolute top-2 right-2 text-white"
            style={{ backgroundColor: copied === activeVariant ? "#008060" : ACCENT }}
            data-testid={`copy-${activeVariant}`}
          >
            {copied === activeVariant ? (
              <><Check className="w-3 h-3 mr-1" /> Copied</>
            ) : (
              <><Copy className="w-3 h-3 mr-1" /> Copy</>
            )}
          </Button>
        </div>

        {/* Open hosted URL */}
        {activeVariant === "hosted" && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              <a href={hostedUrl} target="_blank" rel="noopener noreferrer" data-testid="open-hosted-url">
                <ExternalLink className="w-3 h-3 mr-1" /> Open in new tab
              </a>
            </Button>
          </div>
        )}

        {/* Live preview iframe (only meaningful for the hosted URL) */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Live preview</h4>
          <p className="text-xs text-gray-500 mb-2">
            This is exactly how end users see the form. For popup / slide-in variants, the real script triggers based on your
            settings (exit intent, scroll, delay) on the host site — this preview shows the form in its hosted inline form.
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-[#E9ECF0]">
            <iframe
              src={hostedUrl}
              title="Form preview"
              className="w-full"
              style={{ height: "600px", border: "none" }}
              data-testid="embed-preview-iframe"
            />
          </div>
        </div>

        {/* Usage hints */}
        <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-500">
          <p>
            <strong className="text-gray-700">WordPress</strong> — paste into a Custom HTML block or your theme's footer before <code>&lt;/body&gt;</code>.
          </p>
          <p>
            <strong className="text-gray-700">Squarespace / Wix</strong> — use the "Embed" or "Custom code" block.
          </p>
          <p>
            <strong className="text-gray-700">Shopify</strong> — paste into a Custom Liquid section or the theme's footer.
          </p>
          <p>
            <strong className="text-gray-700">Static HTML</strong> — paste into any <code>&lt;body&gt;</code> section.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
