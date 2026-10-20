// src/hooks/useApi.js
import { useEffect, useState } from "react";

// ⚠️ Yahan apna local PHP link dalein
const API_BASE_URL = "http://localhost/admin-panal/api/public.php";

export function useApi(action) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}?action=${action}`);
        const json = await res.json();
        
        if (isMounted) {
          if (json.success) {
            setData(json.data);
          } else {
            setError(json.error || "Failed to load");
          }
        }
      } catch (err) {
        if (isMounted) setError("Network error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [action]);

  return { data, loading, error };
}