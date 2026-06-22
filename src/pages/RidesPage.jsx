import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useRides } from "../hooks/useRides";
import { RideCard } from "../components/RideCard";
import { Spinner } from "../components/Spinner";
import { swal } from "../lib/swal";

export default function RidesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const { rides, loading, reload } = useRides();

  async function handleBookRide(e, rideId) {
    e.stopPropagation();

    const { isConfirmed } = await swal.confirm(
      "Solicitar vaga?",
      "Sua solicitação será enviada ao motorista.",
      { confirmText: "Solicitar" }
    );
    if (!isConfirmed) return;

    try {
      await api.post(`/rides/${rideId}/bookings`, { seats_booked: 1 });
      swal.successToast("Solicitação enviada com sucesso!");
      reload({ origin, destination, date, maxCost });
    } catch (error) {
      swal.error(error.message || "Erro ao solicitar vaga.");
    }
  }

  function handleFilter(e) {
    e.preventDefault();
    reload({ origin, destination, date, maxCost });
  }

  function handleClear() {
    setOrigin("");
    setDestination("");
    setDate("");
    setMaxCost("");
    reload({});
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
        <Spinner className="py-16" />
      ) : rides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
          <p className="text-slate-500">Nenhuma carona encontrada com esses filtros.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {rides.map((ride) => {
            const isDriver = user && ride.driver_id && String(user.id) === String(ride.driver_id);
            return (
              <RideCard key={ride.id} ride={ride}>
                {!isDriver && ride.available_seats > 0 && (
                  <button
                    onClick={(e) => handleBookRide(e, ride.id)}
                    className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    Solicitar Vaga
                  </button>
                )}
              </RideCard>
            );
          })}
        </ul>
      )}
    </main>
  );
}
