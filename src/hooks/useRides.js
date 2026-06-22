import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useRides(filters = {}) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load(activeFilters = filters) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (activeFilters.origin) params.set("origin", activeFilters.origin);
      if (activeFilters.destination) params.set("destination", activeFilters.destination);
      if (activeFilters.date) params.set("date", activeFilters.date);
      if (activeFilters.maxCost) params.set("max_cost", activeFilters.maxCost);

      const data = await api.get(`/rides?${params.toString()}`);
      setRides(Array.isArray(data) ? data : []);
    } catch {
      setRides([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { rides, loading, reload: load };
}
