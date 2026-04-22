import React from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { Button } from "../components/ui/FormField.jsx";

export default function NotFoundPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-500">404</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Page not found</h1>
          <p className="mt-2 text-slate-600">The page you’re looking for doesn’t exist or has been moved.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/">
              <Button>Go home</Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

