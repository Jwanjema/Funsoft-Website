// ── ADMIN AUTH HOOK ──────────────────────────────────────────────────────
// Wraps Firebase Auth's onAuthStateChanged so the admin panel can tell
// "not signed in" apart from "signed in but not on the Firestore admin
// allow-list" (see firestore.rules' isAdmin()). The client-side check here
// is only for UX (hiding/showing the panel) — the Firestore rules are the
// real enforcement, so being logged in with a non-admin email will still
// have every write rejected server-side.
import { useEffect, useState } from "react";

export type AdminAuthState = {
  status: "loading" | "signed-out" | "signed-in";
  email: string | null;
};

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({ status: "loading", email: null });

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      const [{ onAuthStateChanged }, { authentication }] = await Promise.all([
        import("firebase/auth"),
        import("../../../../firebase/firebase_config.js"),
      ]);
      unsubscribe = onAuthStateChanged(authentication, (user) => {
        setState(user ? { status: "signed-in", email: user.email } : { status: "signed-out", email: null });
      });
    })();
    return () => unsubscribe?.();
  }, []);

  return state;
}

export async function signInWithEmail(email: string, password: string) {
  const [{ signInWithEmailAndPassword }, { authentication }] = await Promise.all([
    import("firebase/auth"),
    import("../../../../firebase/firebase_config.js"),
  ]);
  await signInWithEmailAndPassword(authentication, email, password);
}

export async function signInWithGoogle() {
  const [{ signInWithPopup }, { authentication, googleProvider }] = await Promise.all([
    import("firebase/auth"),
    import("../../../../firebase/firebase_config.js"),
  ]);
  await signInWithPopup(authentication, googleProvider);
}

export async function signOutAdmin() {
  const [{ signOut }, { authentication }] = await Promise.all([
    import("firebase/auth"),
    import("../../../../firebase/firebase_config.js"),
  ]);
  await signOut(authentication);
}
