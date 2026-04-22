import React from "react";

export function FormField({ label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      {label ? <label className="text-sm font-medium text-slate-900">{label}</label> : null}
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : hint ? <p className="text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function TextInput({ className = "", unstyled = false, ...props }) {
  return (
    <input
      {...props}
      className={[
        unstyled
          ? "w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
          : [
              "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none",
              "placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            ].join(" "),
        className,
      ].join(" ")}
    />
  );
}

export function Button({ variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-900 text-white hover:bg-black",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return <button {...props} className={[base, styles[variant] || styles.primary, className].join(" ")} />;
}

