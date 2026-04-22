import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { Button } from "../components/ui/FormField.jsx";
import { getCategoryById, getWorkerById } from "../data/workers.js";

export default function WorkerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const worker = useMemo(() => getWorkerById(id || ""), [id]);
  const cat = worker ? getCategoryById(worker.categoryId) : null;
  const images = worker?.images?.length ? worker.images : cat?.image ? [cat.image] : [];

  const [active, setActive] = useState(0);

  if (!worker) {
    return (
      <AppShell>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Worker not found</p>
            <p className="mt-1 text-sm text-slate-600">This ad may have been removed.</p>
            <div className="mt-6 flex justify-center">
              <Link to="/workers">
                <Button>Back to workers</Button>
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">{cat?.name || worker.categoryId}</p>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{worker.name}</h1>
            <p className="mt-1 text-sm text-slate-600">{worker.location}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
            <a href={`tel:${worker.phone}`} className="inline-flex">
              <Button>Call now</Button>
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/10] w-full bg-slate-100">
                {images[active] ? <img src={images[active]} alt={worker.name} className="h-full w-full object-cover" /> : null}
              </div>
              {images.length > 1 ? (
                <div className="flex gap-2 overflow-auto p-3">
                  {images.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      className={[
                        "h-16 w-24 overflow-hidden rounded-xl border bg-slate-100",
                        idx === active ? "border-blue-500 ring-4 ring-blue-500/10" : "border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      onClick={() => setActive(idx)}
                    >
                      <img src={src} alt={`${worker.name} ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">About</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{worker.about}</p>

              <h3 className="mt-6 text-sm font-extrabold text-slate-900">Services</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {(worker.services || []).map((s) => (
                  <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">Details</h2>

              <div className="mt-4 grid gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">STARTING PRICE</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">Rs {worker.rate}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">EXPERIENCE</p>
                  <p className="mt-1 font-semibold text-slate-900">{worker.experienceYears}+ years</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">PHONE</p>
                  <p className="mt-1 font-semibold text-slate-900">{worker.phone}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">LISTED</p>
                  <p className="mt-1 font-semibold text-slate-900">{worker.listedAt}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a href={`tel:${worker.phone}`} className="inline-flex">
                  <Button className="w-full">Call now</Button>
                </a>
                <Link to={`/workers?category=${encodeURIComponent(worker.categoryId)}`} className="inline-flex">
                  <Button variant="ghost" className="w-full">
                    More {cat?.name || "workers"}
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

