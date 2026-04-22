import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Menu, X, LocateFixed, Languages } from "lucide-react";
import { useAuth } from "../state/useAuth.js";
import { Button, TextInput } from "./ui/FormField.jsx";
import { CATEGORIES, searchWorkers } from "../data/workers.js";
import { useLanguage } from "../state/useLanguage.js";
import { useGeoLocation } from "../hooks/useGeoLocation.js";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t, toggle, lang } = useLanguage();
  const geo = useGeoLocation({ lang });
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const suggestions = useMemo(() => {
    const query = q.trim();
    if (query.length < 1) return { categories: [], workers: [] };
    const cats = CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
    const workers = searchWorkers({ q: query }).slice(0, 6);
    return { categories: cats, workers };
  }, [q]);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function onSearch(e) {
    e.preventDefault();
    navigate(`/workers${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">WZ</span>
          <span className="hidden sm:block">WorkerZone</span>
        </Link>

        <form onSubmit={onSearch} className="relative hidden flex-1 items-center gap-2 sm:flex" ref={boxRef}>
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/10">
            <MapPin className="h-4 w-4 text-slate-400" />
            <button
              type="button"
              className="hidden items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 md:inline-flex"
              onClick={() => geo.detect()}
              title={t("locationUnknown")}
            >
              <LocateFixed className="h-4 w-4" />
              <span className="max-w-40 truncate">
                {geo.status === "loading"
                  ? t("locationLoading")
                  : geo.status === "denied"
                    ? t("locationDenied")
                    : geo.label || t("locationUnknown")}
              </span>
            </button>
            <TextInput
              unstyled
              className="px-0 py-0"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={t("searchPlaceholder")}
            />
          </div>
          <Button type="submit" className="px-3">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">{t("search")}</span>
          </Button>

          {open && (suggestions.categories.length || suggestions.workers.length) ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="max-h-[420px] overflow-auto p-2">
                {suggestions.categories.length ? (
                  <div className="p-2">
                    <p className="px-2 pb-2 text-xs font-extrabold text-slate-500">CATEGORIES</p>
                    <div className="space-y-1">
                      {suggestions.categories.map((c) => (
                        <button
                          key={c.id}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                          onClick={() => {
                            navigate(`/workers?category=${encodeURIComponent(c.id)}`);
                            setOpen(false);
                          }}
                        >
                          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-xl bg-slate-100">
                            {c.image ? <img src={c.image} alt={c.name} className="h-full w-full object-cover" /> : null}
                          </span>
                          <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {suggestions.workers.length ? (
                  <div className="p-2">
                    <p className="px-2 pb-2 text-xs font-extrabold text-slate-500">WORKERS</p>
                    <div className="space-y-1">
                      {suggestions.workers.map((w) => (
                        <button
                          key={w.id}
                          className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                          onClick={() => {
                            navigate(`/workers/${encodeURIComponent(w.id)}`);
                            setOpen(false);
                          }}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">{w.name}</p>
                            <p className="truncate text-xs text-slate-600">{w.location}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Rs {w.rate}</span>
                        </button>
                      ))}
                      <button
                        className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          navigate(`/workers?q=${encodeURIComponent(q.trim())}`);
                          setOpen(false);
                        }}
                      >
                        View all results →
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </form>

        <nav className="ml-auto hidden items-center gap-2 sm:flex">
          <button
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={toggle}
            title="Language"
            type="button"
          >
            <Languages className="h-4 w-4" />
            {t("language")}
          </button>

          <Link to="/become-worker" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            {t("becomeWorker")}
          </Link>

          {auth.isAuthed ? (
            <>
              <Link to="/profile" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                {auth.user?.name || "Profile"}
              </Link>
              <Button variant="ghost" onClick={() => auth.logout()}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">{t("login")}</Button>
              </Link>
              <Link to="/signup">
                <Button>{t("signup")}</Button>
              </Link>
            </>
          )}
        </nav>

        <button
          className="ml-auto inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white sm:hidden">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-4">
            <form onSubmit={onSearch} className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <TextInput
                  unstyled
                  className="px-0 py-0"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <Button type="submit" className="px-3">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex flex-col gap-2">
              <button
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  toggle();
                }}
                type="button"
              >
                <Languages className="h-4 w-4" />
                {t("language")}
              </button>

              <button
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => geo.detect()}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <LocateFixed className="h-4 w-4" />
                  {t("locationUnknown")}
                </span>
                <span className="max-w-44 truncate text-xs font-semibold text-slate-500">
                  {geo.status === "loading"
                    ? t("locationLoading")
                    : geo.status === "denied"
                      ? t("locationDenied")
                      : geo.label || ""}
                </span>
              </button>

              <Link to="/become-worker" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {t("becomeWorker")}
              </Link>
              {auth.isAuthed ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Profile
                  </Link>
                  <button
                    className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                    onClick={() => {
                      auth.logout();
                      setMobileOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    {t("login")}
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    {t("signup")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
