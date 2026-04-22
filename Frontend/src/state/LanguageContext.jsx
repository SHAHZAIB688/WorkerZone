import React, { useEffect, useMemo, useState } from "react";
const STORAGE_KEY = "workerzone:lang";

const DICTS = {
  en: {
    language: "EN",
    becomeWorker: "Become a Worker",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    searchPlaceholder: "Search workers, services…",
    search: "Search",
    locationUnknown: "Detect location",
    locationLoading: "Locating…",
    locationDenied: "Location denied",
  },
  ur: {
    language: "اردو",
    becomeWorker: "ورکر بنیں",
    login: "لاگ اِن",
    signup: "سائن اپ",
    logout: "لاگ آؤٹ",
    searchPlaceholder: "کاریگر، خدمات تلاش کریں…",
    search: "تلاش",
    locationUnknown: "لوکیشن معلوم کریں",
    locationLoading: "لوکیشن ہو رہی ہے…",
    locationDenied: "لوکیشن کی اجازت نہیں",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "ur" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICTS[lang] || DICTS.en;
    return {
      lang,
      setLang,
      toggle: () => setLang((l) => (l === "ur" ? "en" : "ur")),
      t: (key) => dict[key] ?? DICTS.en[key] ?? key,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

