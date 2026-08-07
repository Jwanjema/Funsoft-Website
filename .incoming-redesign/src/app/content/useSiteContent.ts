// ── CMS-BACKED CONTENT LOADER ────────────────────────────────────────────
// Reads editable site content from Firestore (collection "site_content",
// one document per section, keyed by SiteContentKey) and falls back to the
// hardcoded defaults if a document doesn't exist yet or Firestore can't be
// reached. This is what lets the admin panel's edits show up on the public
// site without a redeploy: the admin panel writes to the same documents.
import { useEffect, useState } from "react";
import {
  DEFAULT_CONTACT, DEFAULT_PRICING, DEFAULT_STATS, DEFAULT_TRUSTED_BY,
  DEFAULT_MILESTONES, DEFAULT_TESTIMONIALS, DEFAULT_SERVICE_CONTENT,
  type ContactInfo, type PricingPlan, type StatItem, type TrustedByEntry,
  type Milestone, type Testimonial, type ServiceTabContent,
} from "./defaults";

export type SiteContentMap = {
  contact: ContactInfo;
  pricing: { plans: PricingPlan[]; disclaimer: string };
  stats: { items: StatItem[] };
  trustedBy: { items: TrustedByEntry[] };
  milestones: { items: Milestone[] };
  testimonials: { items: Testimonial[] };
  "services-dev": ServiceTabContent;
  "services-system": ServiceTabContent;
  "services-training": ServiceTabContent;
  "services-rd": ServiceTabContent;
};

export type SiteContentKey = keyof SiteContentMap;

export const SITE_CONTENT_DEFAULTS: SiteContentMap = {
  contact: DEFAULT_CONTACT,
  pricing: DEFAULT_PRICING,
  stats: { items: DEFAULT_STATS },
  trustedBy: { items: DEFAULT_TRUSTED_BY },
  milestones: { items: DEFAULT_MILESTONES },
  testimonials: { items: DEFAULT_TESTIMONIALS },
  "services-dev": DEFAULT_SERVICE_CONTENT["services-dev"],
  "services-system": DEFAULT_SERVICE_CONTENT["services-system"],
  "services-training": DEFAULT_SERVICE_CONTENT["services-training"],
  "services-rd": DEFAULT_SERVICE_CONTENT["services-rd"],
};

export const SITE_CONTENT_COLLECTION = "site_content";

/** Reads one CMS-managed content document, falling back to the built-in default. */
export function useSiteContent<K extends SiteContentKey>(key: K): SiteContentMap[K] {
  const [value, setValue] = useState<SiteContentMap[K]>(SITE_CONTENT_DEFAULTS[key]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ doc, getDoc }, { db }] = await Promise.all([
          import("firebase/firestore/lite"),
          import("../../firebase/firebase_config.js"),
        ]);
        const snap = await getDoc(doc(db, SITE_CONTENT_COLLECTION, key));
        if (!cancelled && snap.exists()) {
          setValue(snap.data() as SiteContentMap[K]);
        }
      } catch (fetchError) {
        console.error(`Failed to load CMS content for "${key}", using default.`, fetchError);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}
