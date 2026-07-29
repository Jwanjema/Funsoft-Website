import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { signInWithEmail, signInWithGoogle } from "./useAdminAuth";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signInWithEmail(email, password);
    } catch {
      setError("Sign-in failed. Check your email and password and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch {
      setError("Google sign-in failed or was cancelled.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center px-5 py-16 bg-secondary/30">
      <div className="w-full max-w-[380px] bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-[22px] font-extrabold text-foreground mb-1">Admin sign-in</h1>
        <p className="text-[13px] text-muted-foreground mb-6" style={{ fontFamily: "'Inter',sans-serif" }}>
          System Partners Limited — content management
        </p>

        <form onSubmit={handleEmailLogin} className="space-y-3.5">
          <div>
            <label htmlFor="admin-email" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Email</label>
            <input id="admin-email" type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-[13px] font-semibold text-foreground mb-1.5" style={{ fontFamily: "'Inter',sans-serif" }}>Password</label>
            <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
          </div>
          {error && <p role="alert" className="text-[13px] text-destructive bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
          <button type="submit" disabled={submitting}
            className="w-full bg-primary text-white font-bold text-[14px] py-2.5 rounded-lg hover:bg-accent disabled:opacity-70 transition-colors flex items-center justify-center gap-2">
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign in
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-border flex-1" />
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">or</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <button onClick={handleGoogleLogin} disabled={submitting} type="button"
          className="w-full border border-border text-foreground font-semibold text-[14px] py-2.5 rounded-lg hover:bg-secondary transition-colors disabled:opacity-70">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
