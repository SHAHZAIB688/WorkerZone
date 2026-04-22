import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell.jsx";
import { Button, TextInput, FormField } from "../components/ui/FormField.jsx";
import { useAuth } from "../state/useAuth.js";

export default function ResetPasswordPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") || "", [params]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!token) return setError("Missing reset token.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    try {
      await auth.resetPassword({ token, password });
      setDone(true);
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (err) {
      setError(err?.message || "Unable to reset password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Choose a new password" subtitle="Make sure it’s strong and you don’t reuse old passwords.">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reset password</h2>
          <p className="mt-1 text-sm text-slate-600">
            Don’t have a token?{" "}
            <Link className="font-semibold text-blue-600 hover:underline" to="/forgot-password">
              Request a new link
            </Link>
          </p>
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        {done ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Password updated. Redirecting…</div> : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="New password">
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormField>
          <FormField label="Confirm password">
            <TextInput value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormField>
          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Updating..." : "Update password"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}

