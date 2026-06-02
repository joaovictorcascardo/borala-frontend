import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const STATUS_LABEL = {
  pending: "Aguardando",
  active: "Em andamento",
  completed: "Concluída",
  cancelled: "Cancelada",
};

const STATUS_STYLE = {
  pending: "text-amber-600 bg-amber-50 border-amber-200",
  active: "text-blue-600 bg-blue-50 border-blue-200",
  completed: "text-emerald-600 bg-emerald-50 border-emerald-200",
  cancelled: "text-red-500 bg-red-50 border-red-200",
};

export default function RidesPage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [maxCost, setMaxCost] = useState("");

  async function fetchRides(filters = {}) {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (filters.origin) qs.set("origin", filters.origin);
      if (filters.destination) qs.set("destination", filters.destination);
      if (filters.date) qs.set("date", filters.date);
      if (filters.maxCost) qs.set("max_cost", filters.maxCost);
      const query = qs.toString() ? `?${qs.toString()}` : "";
      const data = await api(`/rides${query}`);
      setRides(Array.isArray(data) ? data : []);
    } catch {
      setRides([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRides();
  }, []);

  function handleFilter(e) {
    e.preventDefault();
    fetchRides({ origin, destination, date, maxCost });
  }

  function handleClear() {
    setOrigin("");
    setDestination("");
    setDate("");
    setMaxCost("");
    fetchRides();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-1">Filtros</p>
        <h1 className="relative text-2xl font-bold text-slate-900 mb-4">Buscar Caronas</h1>

        <form onSubmit={handleFilter} className="relative grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Origem</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Campinas"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Destino</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: São Paulo"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Data</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Custo máximo (R$)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              className="form-input"
              placeholder="Ex: 30.00"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-1">
            <button type="submit" className="button-primary">Buscar</button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : rides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
          <p className="text-slate-500">Nenhuma carona encontrada com esses filtros.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {rides.map((ride, i) => (
            <li
              key={ride.id ?? i}
              onClick={() => navigate(`/rides/${ride.id}`)}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)] hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-slate-900 text-sm leading-snug">{ride.origin_address}</p>
                {ride.status && (
                  <span className={`shrink-0 text-xs font-semibold border rounded-full px-2.5 py-0.5 ${STATUS_STYLE[ride.status] ?? "text-slate-600 bg-slate-50 border-slate-200"}`}>
                    {STATUS_LABEL[ride.status] ?? ride.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mb-3">→ {ride.destination_address}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                  {new Date(ride.departure_time).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
                  {ride.available_seats} vaga{ride.available_seats !== 1 ? "s" : ""}
                </span>
                {ride.estimated_total_cost && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                    R$ {Number(ride.estimated_total_cost).toFixed(2)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
