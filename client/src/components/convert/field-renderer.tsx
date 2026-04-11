/**
 * Renders a single builder field in its canvas preview form.
 * Used by the builder canvas to show what the end user will see.
 *
 * This is a preview component only — it does not submit data. Inputs are
 * non-interactive (disabled or visually locked) so clicks go to the canvas
 * selection handler, not to the form.
 */
import type { BuilderField, DesignSettings } from "./builder-types";

interface FieldRendererProps {
  field: BuilderField;
  design: DesignSettings;
  previewValue?: any;
  onPreviewChange?: (val: any) => void;
  interactive?: boolean;
}

export function FieldRenderer({ field, design, previewValue, onPreviewChange, interactive = false }: FieldRendererProps) {
  const brand = design.primaryColor || "#8000FF";
  const radius = design.borderRadius ?? 8;
  const showBorders = design.showFieldBorders !== false;

  const inputClass = `w-full px-3 py-2 text-sm text-gray-900 ${showBorders ? "border border-gray-300" : "border-0 border-b border-gray-300"} focus:outline-none bg-white`;
  const inputStyle = { borderRadius: `${radius}px` };

  // Layout elements
  if (field.type === "heading") {
    return <h2 className="text-xl font-bold" style={{ color: design.textColor || "#09080E" }}>{field.label}</h2>;
  }
  if (field.type === "paragraph") {
    return <p className="text-gray-600 text-sm">{field.label}</p>;
  }
  if (field.type === "divider") {
    return <hr className="border-t border-gray-200" />;
  }
  if (field.type === "spacer") {
    return <div style={{ height: "20px" }} />;
  }
  if (field.type === "image") {
    return (
      <div className="w-full bg-gray-100 rounded flex items-center justify-center h-32 text-xs text-gray-400">
        [ Image placeholder ]
      </div>
    );
  }
  if (field.type === "page_break") {
    return (
      <div className="border-t-2 border-dashed my-2 py-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ borderColor: brand, color: brand }}>
        — Page break —
      </div>
    );
  }

  // Interactive fields
  const labelEl = (
    <label className="block text-xs font-medium mb-1" style={{ color: design.textColor || "#09080E" }}>
      {field.label || "Untitled"} {field.required && <span style={{ color: brand }}>*</span>}
    </label>
  );

  const handleChange = (val: any) => {
    if (interactive && onPreviewChange) onPreviewChange(val);
  };

  // Hidden fields render as a small chip so builders can see them
  if (field.type === "hidden") {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
        <span className="font-semibold">[hidden]</span>
        <span>{field.label || "Untitled"}</span>
        {field.defaultValue && <span className="text-gray-400">= {field.defaultValue}</span>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea
          rows={3}
          className={inputClass}
          style={inputStyle}
          placeholder={field.placeholder || ""}
          value={interactive ? (previewValue || "") : ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={!interactive}
        />
        {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    const options = Array.isArray(field.options) ? field.options : [];
    return (
      <div>
        {labelEl}
        <select
          className={inputClass}
          style={inputStyle}
          value={interactive ? (previewValue || "") : ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={!interactive}
        >
          <option value="">Choose one...</option>
          {options.map((opt: any, i: number) => (
            <option key={i} value={opt.value || opt}>{opt.label || opt.value || opt}</option>
          ))}
        </select>
        {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "checkbox") {
    const options = Array.isArray(field.options) ? field.options : [];
    if (options.length > 0) {
      return (
        <div>
          {labelEl}
          <div className="space-y-1">
            {options.map((opt: any, i: number) => (
              <label key={i} className="flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" disabled={!interactive} style={{ accentColor: brand }} />
                <span>{opt.label || opt.value || opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    return (
      <label className="flex items-start gap-2 text-xs text-gray-700">
        <input
          type="checkbox"
          checked={interactive ? !!previewValue : false}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={!interactive}
          className="mt-0.5"
          style={{ accentColor: brand }}
        />
        <span>
          {field.label || "Untitled"} {field.required && <span style={{ color: brand }}>*</span>}
        </span>
      </label>
    );
  }

  if (field.type === "radio") {
    const options = Array.isArray(field.options) ? field.options : [];
    return (
      <div>
        {labelEl}
        <div className="space-y-1">
          {options.map((opt: any, i: number) => (
            <label key={i} className="flex items-center gap-2 text-xs text-gray-700">
              <input type="radio" name={`radio-${field.tempId}`} disabled={!interactive} style={{ accentColor: brand }} />
              <span>{opt.label || opt.value || opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "rating") {
    const scale = field.config?.ratingScale || 5;
    return (
      <div>
        {labelEl}
        <div className="flex gap-1">
          {Array.from({ length: scale }).map((_, i) => (
            <span key={i} className="text-2xl text-gray-300">★</span>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div>
        {labelEl}
        <input type="date" className={inputClass} style={inputStyle} disabled={!interactive} />
        {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div>
        {labelEl}
        <div className={`${inputClass} text-gray-400`} style={inputStyle}>
          Choose file... {field.config?.fileTypes ? `(${field.config.fileTypes})` : ""}
        </div>
      </div>
    );
  }

  if (field.type === "signature") {
    return (
      <div>
        {labelEl}
        <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400" style={inputStyle}>
          Signature pad
        </div>
      </div>
    );
  }

  if (field.type === "payment") {
    const amount = field.config?.paymentAmount || "0.00";
    return (
      <div>
        {labelEl}
        <div className={inputClass} style={inputStyle}>
          <span className="text-gray-900">${amount}</span>
          <span className="text-gray-400 ml-2">— payment via swipesblue</span>
        </div>
      </div>
    );
  }

  // Default: text/email/phone/number
  const inputType = field.type === "email" ? "email" : field.type === "phone" ? "tel" : field.type === "number" ? "number" : "text";
  return (
    <div>
      {labelEl}
      <input
        type={inputType}
        className={inputClass}
        style={inputStyle}
        placeholder={field.placeholder || ""}
        value={interactive ? (previewValue || "") : ""}
        onChange={(e) => handleChange(e.target.value)}
        disabled={!interactive}
      />
      {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
    </div>
  );
}
