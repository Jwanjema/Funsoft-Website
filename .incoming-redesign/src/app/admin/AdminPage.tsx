import { useAdminAuth } from "./useAdminAuth";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

// NOTE: the client-side allow-list check does not exist here on purpose —
// Firestore's isAdmin() rule is the real gate. Any signed-in user sees the
// dashboard UI, but writes from a non-admin email are rejected server-side
// with a permission-denied error surfaced inline by each section's editor.
export function AdminPage() {
  const auth = useAdminAuth();

  if (auth.status === "loading") {
    return (
      <div className="min-h-full flex items-center justify-center py-24">
        <div className="w-6 h-6 rounded-full border-2 border-primary/25 border-t-primary animate-spin" />
      </div>
    );
  }

  if (auth.status === "signed-out") {
    return <AdminLogin />;
  }

  return <AdminDashboard email={auth.email} />;
}
