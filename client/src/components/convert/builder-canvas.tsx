/**
 * Center panel of the form builder. Acts as:
 *  - The live preview of the form (renders each field via FieldRenderer)
 *  - The drop target for new fields dragged from the palette
 *  - The drop target for reordering existing fields
 *  - The click surface for selecting a field to edit
 *
 * Drag-and-drop model (HTML5 native, no library):
 *   palette → canvas: dataTransfer[PALETTE_DRAG_MIME] = field type
 *   canvas → canvas: dataTransfer[REORDER_DRAG_MIME] = tempId of source field
 *
 * Preview mode constrains the canvas width for mobile/embed views. The canvas
 * always renders the fields for the currently-active step in multi-step forms.
 */
import { useState, useRef } from "react";
import { Trash2, GripVertical } from "lucide-react";
import type { BuilderField, DesignSettings } from "./builder-types";
import { LAYOUT_FIELD_TYPES } from "./builder-types";
import { FieldRenderer } from "./field-renderer";
import { PALETTE_DRAG_MIME } from "./field-palette";

export const REORDER_DRAG_MIME = "application/x-convert-reorder";

export type PreviewMode = "desktop" | "mobile" | "embed";

interface BuilderCanvasProps {
  fields: BuilderField[];
  design: DesignSettings;
  previewMode: PreviewMode;
  selectedFieldTempId: string | null;
  activeStep: number;
  onSelectField: (tempId: string | null) => void;
  onAddField: (type: string, insertIndex: number) => void;
  onReorderField: (sourceTempId: string, targetIndex: number) => void;
  onDeleteField: (tempId: string) => void;
}

export function BuilderCanvas({
  fields,
  design,
  previewMode,
  selectedFieldTempId,
  activeStep,
  onSelectField,
  onAddField,
  onReorderField,
  onDeleteField,
}: BuilderCanvasProps) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fields shown on the current step
  const stepFields = fields.filter((f) => (f.step || 1) === activeStep);

  const containerStyle = {
    maxWidth: previewMode === "mobile" ? "375px" : previewMode === "embed" ? "100%" : "640px",
    backgroundColor: design.backgroundColor || "#FFFFFF",
    padding: `${design.formPadding || 24}px`,
    fontFamily: design.fontFamily || "Inter, sans-serif",
  };

  const getInsertIndexFromEvent = (e: React.DragEvent): number => {
    const list = listRef.current;
    if (!list) return stepFields.length;
    const rect = list.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let cumulative = 0;
    const children = Array.from(list.children) as HTMLElement[];
    for (let i = 0; i < children.length; i++) {
      const childRect = children[i].getBoundingClientRect();
      const midY = childRect.top + childRect.height / 2 - rect.top;
      if (y < midY) return i;
      cumulative = i + 1;
    }
    return cumulative;
  };

  const handleDragOver = (e: React.DragEvent) => {
    const hasPaletteType = e.dataTransfer.types.includes(PALETTE_DRAG_MIME);
    const hasReorderType = e.dataTransfer.types.includes(REORDER_DRAG_MIME);
    if (!hasPaletteType && !hasReorderType) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = hasPaletteType ? "copy" : "move";
    setDropIndex(getInsertIndexFromEvent(e));
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if leaving the canvas itself, not a child
    if (e.currentTarget === e.target) {
      setDropIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const insertIndex = dropIndex ?? stepFields.length;
    setDropIndex(null);

    const newType = e.dataTransfer.getData(PALETTE_DRAG_MIME);
    if (newType) {
      // Translate the step-local insert index to a full-array index.
      // New fields land at the end of the step's slice — good enough for Phase B.
      onAddField(newType, fullArrayIndexForStepInsert(fields, activeStep, insertIndex));
      return;
    }

    const sourceTempId = e.dataTransfer.getData(REORDER_DRAG_MIME);
    if (sourceTempId) {
      onReorderField(sourceTempId, fullArrayIndexForStepInsert(fields, activeStep, insertIndex));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#E9ECF0]">
      <div className="min-h-full flex flex-col items-center py-10 px-4">
        {previewMode === "embed" && (
          <div className="w-full max-w-2xl mb-2 text-center text-xs text-gray-500">
            [ Your website header ]
          </div>
        )}
        <div
          style={containerStyle}
          className={`w-full border border-gray-200 shadow-sm ${previewMode === "mobile" ? "rounded-[28px] border-4 border-gray-900" : "rounded-lg"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={(e) => {
            // Clicking empty canvas deselects
            if (e.target === e.currentTarget) onSelectField(null);
          }}
        >
          {stepFields.length === 0 && dropIndex === null && (
            <div className="text-center py-12 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded">
              Drag a field here to start building
            </div>
          )}

          <div ref={listRef} className="flex flex-wrap" style={{ gap: `${design.fieldSpacing || 20}px` }}>
            {stepFields.map((field, i) => (
              <div
                key={field.tempId}
                style={{ width: field.width === "half" ? `calc(50% - ${(design.fieldSpacing || 20) / 2}px)` : "100%" }}
                className="relative"
              >
                {dropIndex === i && <DropIndicator />}
                <CanvasFieldWrapper
                  field={field}
                  design={design}
                  isSelected={field.tempId === selectedFieldTempId}
                  onSelect={() => onSelectField(field.tempId)}
                  onDelete={() => onDeleteField(field.tempId)}
                />
              </div>
            ))}
            {dropIndex === stepFields.length && stepFields.length > 0 && (
              <div className="w-full"><DropIndicator /></div>
            )}
          </div>

          {/* Submit button — always present, cannot be removed */}
          <div className="mt-6">
            <button
              className="w-full py-3 font-bold text-white"
              style={{
                backgroundColor: design.primaryColor || "#8000FF",
                borderRadius: `${design.borderRadius ?? 8}px`,
              }}
              disabled
            >
              {design.buttonText || "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropIndicator() {
  return <div className="h-1 rounded-full bg-[#8000FF] my-1 w-full" />;
}

function CanvasFieldWrapper({
  field,
  design,
  isSelected,
  onSelect,
  onDelete,
}: {
  field: BuilderField;
  design: DesignSettings;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(REORDER_DRAG_MIME, field.tempId);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={`relative p-2 rounded cursor-pointer border-2 transition-colors ${
        isSelected ? "border-[#8000FF] bg-[#8000FF]/5" : "border-transparent hover:border-gray-300"
      }`}
      data-testid={`canvas-field-${field.type}`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <FieldRenderer field={field} design={design} />
        </div>
      </div>
      {isSelected && !LAYOUT_FIELD_TYPES.has(field.type as any) && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center hover:bg-red-50"
          data-testid="delete-field-btn"
        >
          <Trash2 className="w-3 h-3 text-red-600" />
        </button>
      )}
      {isSelected && LAYOUT_FIELD_TYPES.has(field.type as any) && field.type !== "page_break" && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center hover:bg-red-50"
          data-testid="delete-field-btn"
        >
          <Trash2 className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );
}

/**
 * When the canvas shows only fields belonging to `activeStep`, the drop index
 * is local to that step. This helper maps that back to an index in the full
 * fields array so the parent can splice correctly.
 */
function fullArrayIndexForStepInsert(
  fields: BuilderField[],
  activeStep: number,
  stepInsertIndex: number,
): number {
  let stepSeen = 0;
  for (let i = 0; i < fields.length; i++) {
    if ((fields[i].step || 1) === activeStep) {
      if (stepSeen === stepInsertIndex) return i;
      stepSeen++;
    }
  }
  // Fell off the end — append at the position after the last field of this step
  let lastStepIndex = -1;
  for (let i = 0; i < fields.length; i++) {
    if ((fields[i].step || 1) === activeStep) lastStepIndex = i;
  }
  return lastStepIndex + 1;
}
