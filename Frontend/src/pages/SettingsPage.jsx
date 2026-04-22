import React from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { Button } from "../components/ui/FormField.jsx";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
              <p className="mt-1 text-sm text-slate-600">Project-ready page for account & app settings.</p>
            </div>
            <Link to="/profile">
              <Button variant="ghost">Back</Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Notifications</p>
              <p className="mt-1 text-sm text-slate-600">Email/SMS toggles (coming soon).</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Privacy</p>
              <p className="mt-1 text-sm text-slate-600">Visibility + data controls (coming soon).</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

