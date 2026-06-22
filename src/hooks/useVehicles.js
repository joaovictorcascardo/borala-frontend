import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await api.get("/vehicles");
      setVehicles(Array.isArray(data) ? data : []);
    } catch {
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { vehicles, loading, reload: load };
}
