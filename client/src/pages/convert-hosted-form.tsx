import { useEffect, useState, FormEvent } from "react";
import { useRoute } from "wouter";

interface FormField {
  id: number;
  fieldType: string;
  label: string;
  placeholder?: string | null;
  helpText?: string | null;
  isRequired?: boolean | null;
  options?: Array<{ value: string; label: string }> | null;
  columnSpan?: number | null;
  mapsTo?: string | null;
}

interface HostedForm {
  id: number;
  name: string;
  formType: string;
  brandColor?: string | null;
  showBranding?: boolean | null;
  logoUrl?: string | null;
  thankYouType?: string | null;
  thankYouMessage?: string | null;
  thankYouRedirectUrl?: string | null;
  consentTextEmail?: string | null;
  consentTextSms?: string | null;
}

interface HostedClient {
  companyName: string;
  website: string;
}

export default function ConvertHostedForm() {
  const [, params] = useRoute("/convert/f/:formSlug");
  const formSlug = params?.formSlug;

  const [clientId, setClientId] = useState<number | null>(null);
  const [form, setForm] = useState<HostedForm | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [client, setClient] = useState<HostedClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});

  // Parse ?client= from URL query string
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cid = qs.get("client");
    if (cid) setClientId(parseInt(cid, 10));
  }, []);

  // Load form definition
  useEffect(() => {
    if (!clientId || !formSlug) return;
    setLoading(true);
    fetch(`/api/convert/public/${clientId}/${formSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Form not found (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setForm(data.form);
        setFields(data.fields || []);
        setClient(data.client || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load form");
        setLoading(false);
      });
  }, [clientId, formSlug]);

  const brand = form?.brandColor || "#8000FF";

  const handleChange = (fieldId: number, value: any) => {
    setValues((prev) => ({ ...prev, [fieldId.toString()]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientId || !formSlug || submitting) return;

    // Client-side required-field check
    for (const field of fields) {
      if (!field.isRequired) continue;
      const val = values[field.id.toString()];
      if (val === undefined || val === null || val === "" || val === false) {
        setError(`Please fill in: ${field.label}`);
        return;
      }
    }

    setSubmitting(true);
    setError(null);
    try {
      const qs = new URLSearchParams(window.location.search);
      const res = await fetch(`/api/convert/submit/${clientId}/${formSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: values,
          sourceUrl: window.location.href,
          referrerUrl: document.referrer || null,
          utmSource: qs.get("utm_source"),
          utmMedium: qs.get("utm_medium"),
          utmCampaign: qs.get("utm_campaign"),
          userAgent: navigator.userAgent,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Submission failed");
      }
      if (result.thankYouType === "redirect" && result.thankYouRedirectUrl) {
        window.location.href = result.thankYouRedirectUrl;
        return;
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading form...</p>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form unavailable</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!form) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center bg-white border-2 rounded-lg p-10 shadow-lg" style={{ borderColor: brand }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: brand }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank you!</h1>
          <p className="text-gray-600">{form.thankYouMessage || "Your submission has been received."}</p>
          {form.showBranding && (
            <p className="text-xs text-gray-400 mt-8">
              Powered by{" "}
              <a href="https://businessblueprint.io/convert" className="underline" style={{ color: brand }}>
                businessblueprint.io/convert
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border-2 rounded-lg shadow-lg overflow-hidden" style={{ borderColor: brand }}>
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200" style={{ backgroundColor: `${brand}0A` }}>
          {client?.companyName && (
            <p className="text-sm text-gray-500 uppercase tracking-wide">{client.companyName}</p>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{form.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={values[field.id.toString()]}
              onChange={(val) => handleChange(field.id, val)}
              brand={brand}
            />
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg text-white font-bold text-lg disabled:opacity-50 transition-opacity hover:opacity-90"
            style={{ backgroundColor: brand }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {form.showBranding && (
          <div className="px-8 pb-6 text-center text-xs text-gray-400">
            Powered by{" "}
            <a href="https://businessblueprint.io/convert" className="underline" style={{ color: brand }}>
              businessblueprint.io/convert
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Field renderer ───

function FieldRenderer({
  field,
  value,
  onChange,
  brand,
}: {
  field: FormField;
  value: any;
  onChange: (val: any) => void;
  brand: string;
}) {
  if (field.fieldType === "heading") {
    return <h2 className="text-xl font-bold text-gray-900">{field.label}</h2>;
  }
  if (field.fieldType === "paragraph") {
    return <p className="text-gray-600">{field.label}</p>;
  }

  const labelEl = (
    <label className="block text-sm font-medium text-gray-900 mb-1">
      {field.label} {field.isRequired && <span style={{ color: brand }}>*</span>}
    </label>
  );

  if (field.fieldType === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || ""}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-2"
          style={{ outlineColor: brand }}
          required={!!field.isRequired}
        />
        {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
      </div>
    );
  }

  if (field.fieldType === "select") {
    return (
      <div>
        {labelEl}
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
          required={!!field.isRequired}
        >
          <option value="">Choose one...</option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
      </div>
    );
  }

  if (field.fieldType === "checkbox") {
    return (
      <div>
        <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            required={!!field.isRequired}
            className="mt-1 w-4 h-4"
            style={{ accentColor: brand }}
          />
          <span>
            {field.label} {field.isRequired && <span style={{ color: brand }}>*</span>}
          </span>
        </label>
      </div>
    );
  }

  const inputType = field.fieldType === "email" ? "email" : field.fieldType === "phone" ? "tel" : "text";
  return (
    <div>
      {labelEl}
      <input
        type={inputType}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ""}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
        required={!!field.isRequired}
      />
      {field.helpText && <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>}
    </div>
  );
}
