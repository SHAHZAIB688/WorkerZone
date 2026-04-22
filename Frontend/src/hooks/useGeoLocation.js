import { useCallback, useMemo, useState } from "react";

async function reverseGeocode({ lat, lon, lang }) {
  // Free reverse geocode (best-effort). If it fails, we still show lat/lon.
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&zoom=14&addressdetails=1`;
  const res = await fetch(url, {
    headers: {
      "Accept-Language": lang === "ur" ? "ur" : "en",
    },
  });
  if (!res.ok) throw new Error("Reverse geocode failed");
  const json = await res.json();
  const a = json?.address || {};
  const city = a.city || a.town || a.village || a.suburb || a.county || "";
  const area = a.neighbourhood || a.suburb || "";
  const label = [area, city].filter(Boolean).join(", ") || json?.display_name || "";
  return label;
}

export function useGeoLocation({ lang = "en" } = {}) {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | denied | error
  const [coords, setCoords] = useState(null);
  const [label, setLabel] = useState("");

  const canUse = useMemo(() => typeof navigator !== "undefined" && Boolean(navigator.geolocation), []);

  const detect = useCallback(async () => {
    if (!canUse) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setLabel("");
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setCoords({ lat, lon });
          try {
            const place = await reverseGeocode({ lat, lon, lang });
            setLabel(place);
            setStatus("ready");
          } catch {
            setLabel(`${lat.toFixed(3)}, ${lon.toFixed(3)}`);
            setStatus("ready");
          }
          resolve();
        },
        () => {
          setStatus("denied");
          resolve();
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 }
      );
    });
  }, [canUse, lang]);

  return { status, coords, label, detect, canUse };
}

