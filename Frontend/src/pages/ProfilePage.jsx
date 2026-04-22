import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { Button } from "../components/ui/FormField.jsx";
import { useAuth } from "../state/useAuth.js";

export default function ProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await auth.logout();
    navigate("/", { replace: true });
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Profile</h1>
              <p className="mt-1 text-sm text-slate-600">Manage your account and preferences.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/settings">
                <Button variant="ghost">Settings</Button>
              </Link>
              <Button onClick={onLogout} variant="danger">
                Logout
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">NAME</p>
              <p className="mt-1 font-semibold text-slate-900">{auth.user?.name || "User"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">EMAIL</p>
              <p className="mt-1 font-semibold text-slate-900">{auth.user?.email || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

