/**
 * Design customization panel. Two tiers:
 *  - Free: 10 preset color themes (the ecosystem accent colors). Pick one and
 *    the primary color + focus border update. Everything else stays default.
 *  - Premium: full customization (colors, fonts, radius, button style, spacing,
 *    padding, label position). Phase E gates this for real; Phase B shows the
 *    controls but disables them with an upgrade badge.
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Check, Lock } from "lucide-react";
import type { DesignSettings } from "./builder-types";
import { PRESET_THEMES } from "./builder-types";

const ACCENT = "#8000FF";

interface DesignPanelProps {
  design: DesignSettings;
  onChange: (updates: Partial<DesignSettings>) => void;
}

export function DesignPanel({ design, onChange }: DesignPanelProps) {
  const applyTheme = (themeId: number, color: string) => {
    onChange({ themePreset: themeId, primaryColor: color });
  };

  return (
    <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Design</h3>
        <p className="text-xs text-gray-500">Theme, colors, and layout.</p>
      </div>

      {/* ─── Free tier: preset themes ─── */}
      <div className="p-4 border-b border-gray-200">
        <Label className="text-xs font-semibold text-gray-700 mb-3 block">Color theme</Label>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme.id, theme.color)}
              className="relative w-full aspect-square rounded-lg border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: theme.color,
                borderColor: design.themePreset === theme.id ? "#09080E" : "transparent",
              }}
              title={theme.label}
              data-testid={`theme-${theme.label.toLowerCase()}`}
            >
              {design.themePreset === theme.id && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-2">
          10 preset themes from the ecosystem brand palette.
        </p>
      </div>

      {/* ─── Button text (free) ─── */}
      <div className="p-4 border-b border-gray-200">
        <Label className="text-xs">Button text</Label>
        <Input
          value={design.buttonText}
          onChange={(e) => onChange({ buttonText: e.target.value })}
          className="text-sm h-8 mt-1"
          placeholder="Submit"
        />
      </div>

      {/* ─── Premium: full customization (cosmetic gate) ─── */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-3 h-3" style={{ color: ACCENT }} />
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>
            PREMIUM — $59/year
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Full customization is available on / convert Premium.
        </p>

        <div className="space-y-4 opacity-60 pointer-events-none">
          <ColorField label="Primary color" value={design.primaryColor} onChange={(v) => onChange({ primaryColor: v })} disabled />
          <ColorField label="Background" value={design.backgroundColor} onChange={(v) => onChange({ backgroundColor: v })} disabled />
          <ColorField label="Text color" value={design.textColor} onChange={(v) => onChange({ textColor: v })} disabled />

          <div>
            <Label className="text-xs">Font family</Label>
            <Select value={design.fontFamily} onValueChange={(v) => onChange({ fontFamily: v })} disabled>
              <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Archivo">Archivo</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SliderField
            label="Border radius"
            value={design.borderRadius}
            min={0}
            max={16}
            onChange={(v) => onChange({ borderRadius: v })}
            disabled
          />

          <div>
            <Label className="text-xs">Button style</Label>
            <Select value={design.buttonStyle} onValueChange={(v) => onChange({ buttonStyle: v as "filled" | "outline" })} disabled>
              <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="filled">Filled</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Label position</Label>
            <Select value={design.labelPosition} onValueChange={(v) => onChange({ labelPosition: v as any })} disabled>
              <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Above</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="floating">Floating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SliderField
            label="Field spacing"
            value={design.fieldSpacing}
            min={12}
            max={32}
            onChange={(v) => onChange({ fieldSpacing: v })}
            disabled
          />

          <label className="flex items-center gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={design.showFieldBorders}
              onChange={(e) => onChange({ showFieldBorders: e.target.checked })}
              style={{ accentColor: ACCENT }}
              disabled
            />
            Show field borders
          </label>

          <SliderField
            label="Form padding"
            value={design.formPadding}
            min={16}
            max={48}
            onChange={(v) => onChange({ formPadding: v })}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
          disabled={disabled}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm h-8 flex-1 font-mono"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function SliderField({ label, value, min, max, onChange, disabled }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs text-gray-500">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
        style={{ accentColor: ACCENT }}
        disabled={disabled}
      />
    </div>
  );
}
