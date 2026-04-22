import React from "react";
import Categories from './Categories'
import Cards from './Cards'
import AppShell from "./layout/AppShell.jsx";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/workers.js";

const Home = () => {
  const categories = CATEGORIES.map((c) => ({
    name: c.name,
    img: c.image,
    link: `/workers?category=${encodeURIComponent(c.id)}`,
  }));

  return (
    <AppShell>
      <section className="bg-gradient-to-b from-blue-50 to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Find trusted workers near you</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse categories, compare listings, and hire with confidence. Fast, simple, and built for local services.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Categories />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-lg font-extrabold text-slate-900">Popular categories</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((item, index) => (
            <Link key={index} to={item.link} className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="aspect-square w-full rounded-xl bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
              <div className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700">{item.name}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Trending listings</h2>
            <Link to="/explore" className="text-sm font-semibold text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <Cards />
        </div>
      </div>
    </AppShell>
  )
}

export default Home
