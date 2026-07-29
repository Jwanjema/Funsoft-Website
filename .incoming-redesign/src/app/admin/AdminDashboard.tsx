import { useState } from "react";
import { LogOut } from "lucide-react";
import { useSiteContent, type SiteContentKey } from "../content/useSiteContent";
import { saveSiteContent } from "./cms";
import { signOutAdmin } from "./useAdminAuth";
import { ListEditor, type FieldSchema } from "./ListEditor";
import { FieldsEditor, type FlatFieldSchema } from "./FieldsEditor";

type SectionId = "contact" | "pricing" | "stats" | "trustedBy" | "milestones" | "testimonials"
  | "services-dev" | "services-system" | "services-training" | "services-rd";

const SECTIONS: { id: SectionId; label: string; group: string }[] = [
  { id: "contact", label: "Contact Info", group: "Site-wide" },
  { id: "pricing", label: "Pricing Plans", group: "Site-wide" },
  { id: "stats", label: "Stats & Counters", group: "Site-wide" },
  { id: "trustedBy", label: "Trusted-by Institutions", group: "About / Achievements" },
  { id: "testimonials", label: "Testimonials", group: "About / Achievements" },
  { id: "milestones", label: "Milestones Timeline", group: "About / Background" },
  { id: "services-dev", label: "Services — Development", group: "Services" },
  { id: "services-system", label: "Services — System Based", group: "Services" },
  { id: "services-training", label: "Services — Training & Capacity", group: "Services" },
  { id: "services-rd", label: "Services — Research & Development", group: "Services" },
];

const TRUSTED_BY_FIELDS: FieldSchema[] = [
  { key: "name", label: "Institution name" },
  { key: "since", label: "Since (e.g. \"Since 2010\")" },
];

const MILESTONE_FIELDS: FieldSchema[] = [
  { key: "year", label: "Year(s)" },
  { key: "title", label: "Title" },
  { key: "body", label: "Description", type: "textarea" },
  { key: "src", label: "Image path (e.g. /assets/history/photo.jpg)" },
];

const TESTIMONIAL_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "org", label: "Organisation" },
  { key: "year", label: "Year" },
  { key: "quote", label: "Quote", type: "textarea" },
];

const SERVICE_ITEM_FIELDS: FieldSchema[] = [
  { key: "title", label: "Service title" },
  { key: "desc", label: "Description", type: "textarea" },
];

const CONTACT_FIELDS: FlatFieldSchema[] = [
  { key: "addressLines", label: "Address", type: "lines" },
  { key: "phones", label: "Phone numbers", type: "lines" },
  { key: "email", label: "Email" },
  { key: "hours", label: "Hours" },
  { key: "facebookUrl", label: "Facebook URL" },
  { key: "facebookHandle", label: "Facebook handle (display text)" },
  { key: "twitterUrl", label: "Twitter URL" },
  { key: "instagramUrl", label: "Instagram URL" },
  { key: "linkedinUrl", label: "LinkedIn URL" },
];

function ContactSection() {
  const contact = useSiteContent("contact");
  return (
    <FieldsEditor
      fields={CONTACT_FIELDS}
      value={contact as unknown as Record<string, string | string[]>}
      onSave={async (data) => saveSiteContent("contact", data as unknown as typeof contact)}
    />
  );
}

function PricingSection() {
  const pricing = useSiteContent("pricing");
  const [disclaimer, setDisclaimer] = useState(pricing.disclaimer);
  return (
    <div className="space-y-5">
      <ListEditor
        fields={[
          { key: "plan", label: "Plan name" },
          { key: "price", label: "Price" },
          { key: "beds", label: "Capacity / description" },
          { key: "featured", label: "Featured? (\"true\" or leave blank)" },
        ]}
        items={pricing.plans.map(p => ({ ...p, featured: p.featured ? "true" : "" })) as unknown as Record<string, string>[]}
        emptyItem={{ plan: "", price: "", beds: "", featured: "" }}
        onSave={async (rows) => {
          const plans = rows.map(r => ({ plan: r.plan, price: r.price, beds: r.beds, featured: r.featured === "true" }));
          await saveSiteContent("pricing", { plans, disclaimer });
        }}
      />
      <div className="bg-card border border-border rounded-xl p-5">
        <label className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Pricing disclaimer</label>
        <textarea rows={2} value={disclaimer} onChange={e => setDisclaimer(e.target.value)}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none" />
        <p className="text-[11px] text-muted-foreground mt-2">Saved together with the plans above when you click "Save changes".</p>
      </div>
    </div>
  );
}

function StatsSection() {
  const stats = useSiteContent("stats");
  return (
    <ListEditor
      fields={[{ key: "value", label: "Value (e.g. \"500+\")" }, { key: "label", label: "Label" }]}
      items={stats.items as unknown as Record<string, string>[]}
      emptyItem={{ value: "", label: "" }}
      onSave={async (rows) => saveSiteContent("stats", { items: rows as unknown as typeof stats.items })}
    />
  );
}

function TrustedBySection() {
  const trustedBy = useSiteContent("trustedBy");
  return (
    <ListEditor
      fields={TRUSTED_BY_FIELDS}
      items={trustedBy.items as unknown as Record<string, string>[]}
      emptyItem={{ name: "", since: "" }}
      onSave={async (rows) => saveSiteContent("trustedBy", { items: rows as unknown as typeof trustedBy.items })}
    />
  );
}

function MilestonesSection() {
  const milestones = useSiteContent("milestones");
  return (
    <ListEditor
      fields={MILESTONE_FIELDS}
      items={milestones.items as unknown as Record<string, string>[]}
      emptyItem={{ year: "", title: "", body: "", src: "" }}
      onSave={async (rows) => saveSiteContent("milestones", { items: rows as unknown as typeof milestones.items })}
    />
  );
}

function TestimonialsSection() {
  const testimonials = useSiteContent("testimonials");
  return (
    <ListEditor
      fields={TESTIMONIAL_FIELDS}
      items={testimonials.items as unknown as Record<string, string>[]}
      emptyItem={{ name: "", role: "", org: "", year: "", quote: "" }}
      onSave={async (rows) => saveSiteContent("testimonials", { items: rows as unknown as typeof testimonials.items })}
    />
  );
}

function ServicesSection({ tabId }: { tabId: "services-dev" | "services-system" | "services-training" | "services-rd" }) {
  const tab = useSiteContent(tabId);
  const [tagline, setTagline] = useState(tab.tagline);
  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <label className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Tab tagline</label>
        <textarea rows={2} value={tagline} onChange={e => setTagline(e.target.value)}
          className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none" />
        <p className="text-[11px] text-muted-foreground mt-2">Saved together with the services list below when you click "Save changes".</p>
      </div>
      <ListEditor
        fields={SERVICE_ITEM_FIELDS}
        items={tab.services as unknown as Record<string, string>[]}
        emptyItem={{ title: "", desc: "" }}
        onSave={async (rows) => saveSiteContent(tabId, { tagline, services: rows as unknown as typeof tab.services })}
      />
    </div>
  );
}

function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case "contact": return <ContactSection />;
    case "pricing": return <PricingSection />;
    case "stats": return <StatsSection />;
    case "trustedBy": return <TrustedBySection />;
    case "milestones": return <MilestonesSection />;
    case "testimonials": return <TestimonialsSection />;
    case "services-dev": case "services-system": case "services-training": case "services-rd":
      return <ServicesSection tabId={id} />;
  }
}

export function AdminDashboard({ email }: { email: string | null }) {
  const [active, setActive] = useState<SectionId>("contact");
  const groups = [...new Set(SECTIONS.map(s => s.group))];

  return (
    <div className="min-h-full flex flex-col lg:flex-row">
      <aside className="lg:w-[260px] flex-none border-b lg:border-b-0 lg:border-r border-border bg-card px-4 py-5 lg:py-6">
        <div className="flex items-center justify-between mb-6 px-1">
          <div>
            <div className="text-[15px] font-extrabold text-foreground">Content Admin</div>
            <div className="text-[11px] text-muted-foreground truncate max-w-[160px]">{email}</div>
          </div>
          <button onClick={() => signOutAdmin()} aria-label="Sign out" className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors flex-none">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {groups.map(group => (
            <div key={group}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5">{group}</div>
              <div className="flex flex-col gap-0.5">
                {SECTIONS.filter(s => s.group === group).map(section => (
                  <button key={section.id} onClick={() => setActive(section.id)}
                    className={`text-left px-2.5 py-2 rounded-lg text-[13px] font-semibold transition-colors ${active === section.id ? "bg-primary text-white" : "text-foreground hover:bg-secondary"}`}>
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 min-w-0 px-5 sm:px-8 py-7 lg:py-9 max-w-[900px]">
        <h1 className="text-[24px] font-extrabold text-foreground mb-1">{SECTIONS.find(s => s.id === active)?.label}</h1>
        <p className="text-[13px] text-muted-foreground mb-6" style={{ fontFamily: "'Inter',sans-serif" }}>
          Changes save directly to the live site — they appear for visitors as soon as you save.
        </p>
        <SectionBody id={active} />
      </main>
    </div>
  );
}
