import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {[
        { label: "Home", to: "/" },
        { label: "Explore", to: "/explore" },
        { label: "Workers", to: "/workers" },
        { label: "Plumber", to: "/workers?category=plumber" },
        { label: "Welder", to: "/workers?category=welder" },
        { label: "Electrician", to: "/workers?category=electrician" },
        { label: "Painter", to: "/workers?category=painter" },
        { label: "Cook", to: "/workers?category=cook" },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default Categories
