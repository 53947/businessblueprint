/**
 * Upgrade prompt modal — shown when a free-tier user tries to use a premium
 * feature (drag in a premium field, switch to custom colors, enable multi-
 * step, create an A/B test, etc.).
 *
 * The modal accepts a `feature` prop so the headline can be contextual
 * ("Multi-step forms require / convert Premium") but every feature maps to
 * the same single price: $59/year.
 *
 * Takes the visitor to /convert (the landing page) on "Upgrade Now" for now.
 * Phase E doesn't wire the full billing checkout — that's handled by the
 * existing SwipesBlue integration on the / convert landing page buttons.
 */
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const ACCENT = "#8000FF";

const FEATURE_LABELS: Record<string, string> = {
  premium_fields: "Premium field types",
  conditional_logic: "Conditional logic",
  multi_step: "Multi-step forms",
  custom_design: "Custom design",
  ab_testing: "A/B testing",
  double_optin: "Double opt-in",
  recaptcha: "reCAPTCHA",
  submission_limit: "Submission limits",
  close_date: "Close dates",
  remove_branding: "Remove branding",
};

interface PremiumUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

const PREMIUM_FEATURES = [
  "Remove / convert branding from your forms",
  "Advanced field types — file upload, signature, date, rating, payment, hidden",
  "Conditional logic — show fields based on answers",
  "Multi-step forms with step indicators",
  "A/B testing — split traffic, declare winners",
  "Custom colors, fonts, and layout",
  "Double opt-in for email subscribers",
  "reCAPTCHA spam protection",
  "Submission limits and close dates",
];

export function PremiumUpgradeModal({ open, onOpenChange, feature }: PremiumUpgradeModalProps) {
  const featureLabel = feature ? FEATURE_LABELS[feature] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Upgrade to / convert Premium</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-2xl font-bold" style={{ color: ACCENT }}>$59</span>
                <span className="text-gray-500">/year — billed annually</span>
              </p>
            </div>
          </div>
          {featureLabel && (
            <DialogDescription className="text-sm">
              <strong>{featureLabel}</strong> is a Premium feature. Upgrade to unlock it plus everything else below.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">
          <ul className="space-y-2">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 mb-4">
            Premium is a one-time annual charge of $59. No monthly billing, no per-submission fees, no contact limits.
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="upgrade-later">
            Maybe later
          </Button>
          <Button
            asChild
            className="text-white flex-1"
            style={{ backgroundColor: ACCENT }}
            data-testid="upgrade-now"
          >
            <a href="/convert" target="_blank" rel="noopener noreferrer">
              Upgrade Now — $59/year
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
