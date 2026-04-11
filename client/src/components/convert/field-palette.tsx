/**
 * Left panel of the form builder — draggable field type cards grouped into
 * sections. Drags are initiated via HTML5 native drag-and-drop. The drop
 * handling lives in builder-canvas.tsx.
 *
 * Premium fields show a lock icon. Per product decision (Phase E handles real
 * gating), this is cosmetic only for Phase B — the drop is not blocked on
 * the free tier, and clients see exactly what premium fields exist.
 */
import {
  Type, Mail, Phone, Hash, AlignLeft, List, CheckSquare, Circle,
  Upload, PenTool, Calendar, Star, EyeOff, CreditCard,
  Heading, FileText as Paragraph, Minus, MoveVertical, Image as ImageIcon,
  FileStack, Lock,
} from "lucide-react";
import type { FieldType } from "./builder-types";
import { PREMIUM_FIELD_TYPES } from "./builder-types";

const DRAG_MIME_NEW = "application/x-convert-new-field";

interface PaletteItem {
  type: FieldType;
  label: string;
  icon: React.ElementType;
}

const BASIC_FIELDS: PaletteItem[] = [
  { type: "text", label: "Short text", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "number", label: "Number", icon: Hash },
  { type: "textarea", label: "Long answer", icon: AlignLeft },
  { type: "select", label: "Dropdown", icon: List },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "radio", label: "Multiple choice", icon: Circle },
];

const PREMIUM_FIELDS: PaletteItem[] = [
  { type: "file", label: "File upload", icon: Upload },
  { type: "signature", label: "Signature", icon: PenTool },
  { type: "date", label: "Date", icon: Calendar },
  { type: "rating", label: "Rating", icon: Star },
  { type: "hidden", label: "Hidden field", icon: EyeOff },
  { type: "payment", label: "Payment", icon: CreditCard },
];

const LAYOUT_ELEMENTS: PaletteItem[] = [
  { type: "heading", label: "Heading", icon: Heading },
  { type: "paragraph", label: "Paragraph", icon: Paragraph },
  { type: "divider", label: "Divider", icon: Minus },
  { type: "spacer", label: "Spacer", icon: MoveVertical },
  { type: "image", label: "Image", icon: ImageIcon },
];

const FORM_STRUCTURE: PaletteItem[] = [
  { type: "page_break", label: "Page break", icon: FileStack },
];

export function FieldPalette() {
  return (
    <div className="w-56 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
      <PaletteSection title="Basic Fields" items={BASIC_FIELDS} />
      <PaletteSection title="Premium Fields" items={PREMIUM_FIELDS} />
      <PaletteSection title="Layout Elements" items={LAYOUT_ELEMENTS} />
      <PaletteSection title="Form Structure" items={FORM_STRUCTURE} />
    </div>
  );
}

function PaletteSection({ title, items }: { title: string; items: PaletteItem[] }) {
  return (
    <div className="px-3 py-3 border-b border-gray-100">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <PaletteCard key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
}

function PaletteCard({ item }: { item: PaletteItem }) {
  const isPremium = PREMIUM_FIELD_TYPES.has(item.type);
  const Icon = item.icon;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(DRAG_MIME_NEW, item.type);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center gap-2 px-2 py-2 rounded border border-gray-200 bg-white hover:border-[#8000FF] hover:shadow-sm cursor-grab active:cursor-grabbing select-none"
      data-testid={`palette-${item.type}`}
    >
      <Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
      <span className="text-xs text-gray-900 flex-1 truncate">{item.label}</span>
      {isPremium && <Lock className="w-3 h-3 text-[#8000FF] flex-shrink-0" />}
    </div>
  );
}

// Export the MIME type so the canvas drop handler can read it
export const PALETTE_DRAG_MIME = DRAG_MIME_NEW;
