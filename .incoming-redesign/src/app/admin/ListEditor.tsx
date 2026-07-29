// ── GENERIC LIST EDITOR ──────────────────────────────────────────────────
// Renders add/edit/delete/reorder controls for an array of flat objects
// (testimonials, milestones, trusted-by hospitals, services, etc.) driven
// by a small field-schema description, so each admin section only needs to
// declare its fields instead of writing its own form.
import { useEffect, useState } from "react";
import { GripVertical, Plus, Trash2, Save, Loader2, CheckCircle2 } from "lucide-react";

export type FieldSchema = {
  key: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
};

type Row = Record<string, string>;

export function ListEditor({
  fields, items, onSave, emptyItem,
}: {
  fields: FieldSchema[];
  items: Row[];
  emptyItem: Row;
  onSave: (items: Row[]) => Promise<void>;
}) {
  const [rows, setRows] = useState<Row[]>(items);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!savedAt) return;
    const timer = setTimeout(() => setSavedAt(null), 4000);
    return () => clearTimeout(timer);
  }, [savedAt]);

  const updateField = (index: number, key: string, value: string) => {
    setRows(prev => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const addRow = () => setRows(prev => [...prev, { ...emptyItem }]);
  const removeRow = (index: number) => setRows(prev => prev.filter((_, i) => i !== index));
  const moveRow = (index: number, direction: -1 | 1) => {
    setRows(prev => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await onSave(rows);
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
    <div className="space-y-4">
      {rows.map((row, index) => (
        <div key={index} className="bg-card border border-border rounded-xl p-4 sm:p-5 relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Item {index + 1}</span>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveRow(index, -1)} disabled={index === 0}
                className="text-[12px] px-2 py-1 rounded text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground">↑</button>
              <button type="button" onClick={() => moveRow(index, 1)} disabled={index === rows.length - 1}
                className="text-[12px] px-2 py-1 rounded text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground">↓</button>
              <button type="button" onClick={() => removeRow(index)}
                className="text-[12px] px-2 py-1.5 rounded text-destructive hover:bg-red-50 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map(field => (
              <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-[12px] font-semibold text-foreground mb-1" style={{ fontFamily: "'Inter',sans-serif" }}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea rows={3} value={row[field.key] ?? ""} placeholder={field.placeholder}
                    onChange={e => updateField(index, field.key, e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none" />
                ) : (
                  <input value={row[field.key] ?? ""} placeholder={field.placeholder}
                    onChange={e => updateField(index, field.key, e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-[13px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button type="button" onClick={addRow}
        className="w-full border-2 border-dashed border-border rounded-xl py-3 text-[13px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />Add item
      </button>

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
