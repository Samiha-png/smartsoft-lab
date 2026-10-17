// src/hooks/useApi.js
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Fetches data from the SmartSoft Labs PHP API.
 * @param {string} endpoint - "testimonials" | "staff"
 * @param {object} options - { fallback: [] }
 * @returns {object} { data, loading, error }
 */
export function useApi(endpoint, { fallback = [] } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) {
      setLoading(false);
      setError("API URL not configured");
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/public.php?action=${endpoint}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (cancelled) return;

        if (json.success && Array.isArray(json.data)) {
          setData(json.data);
        } else {
          setData(fallback);
        }
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        console.error(`API error [${endpoint}]:`, err);
        setError(err.message);
        setData(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [endpoint]);

  return { data, loading, error };
}