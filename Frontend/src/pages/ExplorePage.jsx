import React from "react";
import AppShell from "../components/layout/AppShell.jsx";
import Cards from "../components/Cards.jsx";
import Categories from "../components/Categories.jsx";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/FormField.jsx";

export default function ExplorePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Explore</h1>
            <p className="mt-1 text-sm text-slate-600">Browse categories and trending worker listings.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/workers">
              <Button>All workers</Button>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Categories />
        </div>

        <div className="mt-8">
          <Cards />
        </div>
      </div>
    </AppShell>
  );
}

