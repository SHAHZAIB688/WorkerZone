import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/layout/AuthShell.jsx";
import { Button, TextInput, FormField } from "../components/ui/FormField.jsx";
import { useAuth } from "../state/useAuth.js";

function getNextPath(location) {
  const next = location.state?.next;
  return typeof next === "string" && next.startsWith("/") ? next : "/profile";
}

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await auth.login({ email, password });
      navigate(getNextPath(location), { replace: true });
    } catch (err) {
      setError(err?.message || "Unable to login.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Login to find trusted workers and manage your requests.">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          <p className="mt-1 text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link className="font-semibold text-blue-600 hover:underline" to="/signup">
              Create one
            </Link>
          </p>
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField label="Email">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" autoComplete="email" />
          </FormField>
          <FormField label="Password">
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" autoComplete="current-password" />
          </FormField>

          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm font-semibold text-slate-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}

