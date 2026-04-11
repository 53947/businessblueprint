/**
 * Form-level settings panel. Takes over the main canvas area (not the right
 * panel) when the Settings tab is active in the toolbar.
 *
 * Premium-gated fields (double opt-in, submission limit, close date, reCAPTCHA)
 * show the controls but are disabled with an upgrade badge. Phase E enforces
 * the gate for real.
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import type { FormSettings } from "./builder-types";

const ACCENT = "#8000FF";

interface SettingsPanelProps {
  formName: string;
  onNameChange: (name: string) => void;
  settings: FormSettings;
  onChange: (updates: Partial<FormSettings>) => void;
}

export function SettingsPanel({ formName, onNameChange, settings, onChange }: SettingsPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#E9ECF0] p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Basic settings</h3>

            <div>
              <Label className="text-xs">Form name</Label>
              <Input
                value={formName}
                onChange={(e) => onNameChange(e.target.value)}
                className="text-sm mt-1"
                placeholder="Internal name (not shown to end users)"
              />
            </div>

            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={settings.description}
                onChange={(e) => onChange({ description: e.target.value })}
                rows={2}
                className="text-sm mt-1"
                placeholder="Internal description for your reference"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">After submission</h3>

            <div>
              <Label className="text-xs">Success message</Label>
              <Textarea
                value={settings.successMessage}
                onChange={(e) => onChange({ successMessage: e.target.value })}
                rows={3}
                className="text-sm mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Redirect URL (optional)</Label>
              <Input
                value={settings.redirectUrl}
                onChange={(e) => onChange({ redirectUrl: e.target.value })}
                placeholder="https://..."
                className="text-sm mt-1"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                If set, submitters are redirected here instead of seeing the success message.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>

            <div>
              <Label className="text-xs">Notification email</Label>
              <Input
                type="email"
                value={settings.notificationEmail}
                onChange={(e) => onChange({ notificationEmail: e.target.value })}
                placeholder="you@yourbusiness.com"
                className="text-sm mt-1"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                We'll email you when a new submission lands.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <label className="flex items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={settings.autoresponderEnabled}
                  onChange={(e) => onChange({ autoresponderEnabled: e.target.checked })}
                  style={{ accentColor: ACCENT }}
                />
                Send auto-responder email to submitter
              </label>

              {settings.autoresponderEnabled && (
                <div className="space-y-3 mt-3 pl-6">
                  <div>
                    <Label className="text-xs">Subject</Label>
                    <Input
                      value={settings.autoresponderSubject}
                      onChange={(e) => onChange({ autoresponderSubject: e.target.value })}
                      className="text-sm mt-1"
                      placeholder="Thanks for reaching out!"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Body</Label>
                    <Textarea
                      value={settings.autoresponderBody}
                      onChange={(e) => onChange({ autoresponderBody: e.target.value })}
                      rows={4}
                      className="text-sm mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Spam protection</h3>

            <label className="flex items-center gap-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={settings.honeypot}
                onChange={(e) => onChange({ honeypot: e.target.checked })}
                style={{ accentColor: ACCENT }}
              />
              Honeypot anti-spam field (invisible to humans, catches bots)
            </label>

            <div className="flex items-center gap-2 opacity-60">
              <input
                type="checkbox"
                checked={settings.recaptcha}
                disabled
                className="cursor-not-allowed"
                style={{ accentColor: ACCENT }}
              />
              <span className="text-xs text-gray-700">Google reCAPTCHA v3</span>
              <Lock className="w-3 h-3" style={{ color: ACCENT }} />
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>
                PREMIUM
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">Advanced</h3>
              <Lock className="w-3 h-3" style={{ color: ACCENT }} />
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>
                PREMIUM
              </span>
            </div>

            <div className="opacity-60 pointer-events-none space-y-4">
              <label className="flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" checked={settings.doubleOptin} disabled style={{ accentColor: ACCENT }} />
                Double opt-in (confirm email before adding contact)
              </label>

              <div>
                <Label className="text-xs">Submission limit (0 = unlimited)</Label>
                <Input
                  type="number"
                  value={settings.submissionLimit || 0}
                  disabled
                  className="text-sm mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Close date</Label>
                <Input
                  type="date"
                  value={settings.closeDate || ""}
                  disabled
                  className="text-sm mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
