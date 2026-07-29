// ── GENERIC FLAT-FIELDS EDITOR ───────────────────────────────────────────
// For singleton sections that are a single object of scalar/text-array
// fields (e.g. contact info) rather than a list of repeated items.
import { useEffect, useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export type FlatFieldSchema = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "lines";
  placeholder?: string;
};

export function FieldsEditor({
  fields, value, onSave,
}: {
  fields: FlatFieldSchema[];
  value: Record<string, string | string[]>;
  onSave: (value: Record<string, string | string[]>) => Promise<void>;
}) {
  const [data, setData] = useState(value);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!savedAt) return;
    const timer = setTimeout(() => setSavedAt(null), 4000);
    return () => clearTimeout(timer);
  }, [savedAt]);

  const update = (key: string, raw: string, isLines: boolean) => {
    setData(prev => ({ ...prev, [key]: isLines ? raw.split("\n") : raw }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await onSave(data);
      setSavedAt(Date.now());
    } catch (saveError) {
      console.error(saveError);
      setError(
        saveError instanceof Error && saveError.message.includes("permission")
          ? "Permission denied — your account isn't on the admin allow-list for this project."
          : "Save failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 bg-card border border-border rounded-xl p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(field => {
          const isLines = field.type === "lines";
          const raw = data[field.key];
          const display = Array.isArray(raw) ? raw.join("\n") : (raw ?? "");
          return (
            <div key={field.key} className={field.type === "textarea" || isLines ? "sm:col-span-2" : ""}>
              <label className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>{field.label}</label>
              {field.type === "textarea" || isLines ? (
                <textarea rows={isLines ? 3 : 2} value={display} placeholder={field.placeholder}
                  onChange={e => update(field.key, e.target.value, isLines)}
                  className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none" />
              ) : (
                <input value={display} placeholder={field.placeholder}
                  onChange={e => update(field.key, e.target.value, false)}
                  className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
              )}
              {isLines && <p className="text-[11px] text-muted-foreground mt-1">One per line.</p>}
            </div>
          );
        })}
      </div>

      {error && <p role="alert" className="text-[13px] text-destructive bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      {savedAt && !saving && (
        <p role="status" className="text-[13px] font-semibold text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-none" />Changes saved — live on the site now.
        </p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button type="button" onClick={handleSave} disabled={saving}
          className="bg-primary text-white font-bold text-[14px] px-5 py-2.5 rounded-lg hover:bg-accent disabled:opacity-70 transition-colors flex items-center gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
