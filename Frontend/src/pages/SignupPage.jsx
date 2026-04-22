import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell.jsx";
import { Button, TextInput, FormField } from "../components/ui/FormField.jsx";
import { useAuth } from "../state/useAuth.js";

export default function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!accept) return setError("Please accept Terms and Conditions.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    try {
      await auth.signup({ name, email, password });
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to sign up.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Join WorkerZone to book services faster and track your jobs.">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sign up</h2>
          <p className="mt-1 text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-600 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Full name">
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Malik Shahzaib" autoComplete="name" />
          </FormField>
          <FormField label="Email">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" autoComplete="email" />
          </FormField>
          <FormField label="Password" hint="At least 6 characters.">
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormField>
          <FormField label="Confirm password">
            <TextInput value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="••••••••" autoComplete="new-password" />
          </FormField>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input checked={accept} onChange={(e) => setAccept(e.target.checked)} type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            I accept the{" "}
            <span className="font-semibold text-slate-900">
              <Link to="/terms" className="hover:underline">
                Terms and Conditions
              </Link>
            </span>
          </label>

          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Creating..." : "Create account"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}

