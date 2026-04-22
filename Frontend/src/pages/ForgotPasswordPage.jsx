import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell.jsx";
import { Button, TextInput, FormField } from "../components/ui/FormField.jsx";
import { useAuth } from "../state/useAuth.js";

export default function ForgotPasswordPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setToken("");
    try {
      const t = await auth.requestPasswordReset(email);
      setToken(t);
    } catch (err) {
      setError(err?.message || "Unable to request password reset.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Reset your password" subtitle="Enter your email and we’ll generate a reset link.">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Forgot password</h2>
          <p className="mt-1 text-sm text-slate-600">
            Remembered it?{" "}
            <Link className="font-semibold text-blue-600 hover:underline" to="/login">
              Back to login
            </Link>
          </p>
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        {token ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Reset link generated (demo):{" "}
            <Link className="font-semibold underline" to={`/reset-password?token=${encodeURIComponent(token)}`}>
              Reset password
            </Link>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Email">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" autoComplete="email" />
          </FormField>
          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}

