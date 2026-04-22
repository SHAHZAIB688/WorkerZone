import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaArrowCircleUp } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">WZ</span>
            WorkerZone
          </div>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            A simple platform to discover local workers and hire with confidence. Built with React + Tailwind.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-extrabold text-slate-900">Popular</p>
          <div className="space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-slate-900" to="/electrician">Electrician</Link>
            <Link className="block hover:text-slate-900" to="/plumber">Plumber</Link>
            <Link className="block hover:text-slate-900" to="/welder">Welder</Link>
            <Link className="block hover:text-slate-900" to="/cook">Cook</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-extrabold text-slate-900">Company</p>
          <div className="space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-slate-900" to="/contact">Contact</Link>
            <Link className="block hover:text-slate-900" to="/about">About</Link>
            <Link className="block hover:text-slate-900" to="/careers">Careers</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-extrabold text-slate-900">Follow</p>
          <div className="flex items-center gap-3 text-slate-700">
            <FaFacebook size={26} className="cursor-pointer hover:text-slate-900" />
            <FaXTwitter size={26} className="cursor-pointer hover:text-slate-900" />
            <IoLogoYoutube size={26} className="cursor-pointer hover:text-slate-900" />
            <FaInstagram size={26} className="cursor-pointer hover:text-slate-900" />
          </div>
          <button
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowCircleUp />
            Back to top
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} WorkerZone. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link className="hover:text-slate-900" to="/privacy">Privacy</Link>
            <Link className="hover:text-slate-900" to="/terms">Terms</Link>
            <Link className="hover:text-slate-900" to="/help">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
