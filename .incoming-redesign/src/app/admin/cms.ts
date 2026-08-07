// ── CMS WRITE HELPERS ────────────────────────────────────────────────────
// Thin wrapper around Firestore writes for the "site_content" collection,
// used only by the admin panel. Public pages only ever read via
// useSiteContent (see ../content/useSiteContent.ts) — this file is the
// other half, for the admin UI to persist edits.
import { SITE_CONTENT_COLLECTION, type SiteContentKey, type SiteContentMap } from "../content/useSiteContent";

export async function saveSiteContent<K extends SiteContentKey>(key: K, value: SiteContentMap[K]) {
  const [{ doc, setDoc }, { db }] = await Promise.all([
    import("firebase/firestore/lite"),
    import("../../firebase/firebase_config.js"),
  ]);
  await setDoc(doc(db, SITE_CONTENT_COLLECTION, key), value as Record<string, unknown>);
}

export async function loadSiteContent<K extends SiteContentKey>(
  key: K,
  fallback: SiteContentMap[K]
): Promise<SiteContentMap[K]> {
  const [{ doc, getDoc }, { db }] = await Promise.all([
    import("firebase/firestore/lite"),
    import("../../firebase/firebase_config.js"),
  ]);
  const snap = await getDoc(doc(db, SITE_CONTENT_COLLECTION, key));
  return snap.exists() ? (snap.data() as SiteContentMap[K]) : fallback;
}
