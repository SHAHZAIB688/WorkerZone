import React from "react";
import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-full bg-gradient-to-b from-blue-50 to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">WZ</span>
          WorkerZone
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="hidden lg:block">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            {subtitle ? <p className="mt-3 text-lg text-slate-600">{subtitle}</p> : null}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Tip</p>
              <p className="mt-1 text-sm text-slate-600">
                This demo stores auth in your browser (localStorage). When you connect the backend later, we’ll swap these calls to real APIs.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

