import React from "react";
import AppShell from "../components/layout/AppShell.jsx";

export default function StaticPage({ title, children }) {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
          <div className="prose prose-slate mt-4 max-w-none">{children}</div>
        </div>
      </div>
    </AppShell>
  );
}

