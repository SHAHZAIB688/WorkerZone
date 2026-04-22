import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { Button } from "../components/ui/FormField.jsx";
import { CATEGORIES, getCategoryById, searchWorkers } from "../data/workers.js";

function WorkerCard({ worker }) {
  const cat = getCategoryById(worker.categoryId);
  const cover = worker.images?.[0] || cat?.image;
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {cover ? <img src={cover} alt={worker.name} className="h-full w-full object-cover transition group-hover:scale-[1.03]" /> : null}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900">{worker.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{worker.location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-500">STARTING</p>
            <p className="font-extrabold text-slate-900">Rs {worker.rate}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{cat?.name || worker.categoryId}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{worker.experienceYears}+ years</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{worker.listedAt}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{worker.about}</p>

        <div className="mt-4">
          <Link to={`/workers/${encodeURIComponent(worker.id)}`}>
            <Button className="w-full">View details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WorkersPage() {
  const [params, setParams] = useSearchParams();
  const qParam = params.get("q") || "";
  const categoryParam = params.get("category") || "";

  const results = useMemo(() => searchWorkers({ q: qParam, category: categoryParam }), [qParam, categoryParam]);

  function setCategory(categoryId) {
    const next = new URLSearchParams(params);
    if (categoryId) next.set("category", categoryId);
    else next.delete("category");
    setParams(next, { replace: false });
  }

  const activeCategory = getCategoryById(categoryParam);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Workers</h1>
            <p className="mt-1 text-sm text-slate-600">
              {activeCategory ? (
                <>
                  Category: <span className="font-semibold text-slate-900">{activeCategory.name}</span>
                </>
              ) : (
                "Search and filter workers by category."
              )}
            </p>
            {qParam ? (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                Search: <span className="text-slate-900">{qParam}</span>
                <button
                  className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-extrabold text-slate-700 hover:bg-slate-200"
                  onClick={() => {
                    const next = new URLSearchParams(params);
                    next.delete("q");
                    setParams(next, { replace: false });
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            className={[
              "rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm",
              categoryParam ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-blue-200 bg-blue-50 text-blue-700",
            ].join(" ")}
            onClick={() => setCategory("")}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm",
                c.id === categoryParam ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((w) => (
                <WorkerCard key={w.id} worker={w} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-900">No results</p>
              <p className="mt-1 text-sm text-slate-600">Try a different keyword or clear filters.</p>
              <div className="mt-4 flex justify-center gap-2">
                {qParam ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.delete("q");
                      setParams(next, { replace: false });
                    }}
                  >
                    Clear search
                  </Button>
                ) : null}
                <Button variant="ghost" onClick={() => setCategory("")}>
                  Clear category
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

