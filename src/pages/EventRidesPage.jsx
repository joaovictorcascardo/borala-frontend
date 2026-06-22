import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Spinner } from "../components/Spinner";

export default function EventRidesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const eventData = await api.get(`/events/${id}`);
        setEvent(eventData);
      } catch {
        setError("Não foi possível carregar o evento.");
        setLoading(false);
        return;
      }

      try {
        const ridesData = await api.get(`/events/${id}/rides`);
        setRides(Array.isArray(ridesData) ? ridesData : []);
      } catch {
        setRides([]);
      }

      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <Spinner className="py-24" />;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={() => navigate("/events")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Eventos
      </button>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Evento</p>
            <h1 className="relative mt-2 text-3xl font-bold text-slate-900">{event?.name}</h1>
            <p className="relative mt-2 text-slate-500">{event?.address}</p>
            {event?.description && (
              <p className="relative mt-3 text-slate-600 text-sm leading-relaxed">{event.description}</p>
            )}
            <div className="relative mt-4 flex flex-wrap gap-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                Início: {new Date(event?.starts_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                Fim: {new Date(event?.ends_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Caronas</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Caronas disponíveis</h2>
            </div>
            <button onClick={() => navigate(`/rides/new?eventId=${id}`)} className="button-primary">
              + Oferecer carona
            </button>
          </div>

          {rides.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
              <p className="text-slate-500 mb-5">Nenhuma carona disponível para este evento ainda.</p>
              <button onClick={() => navigate(`/rides/new?eventId=${id}`)} className="button-primary">
                Ser o primeiro a oferecer
              </button>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {rides.map((ride, i) => (
                <li
                  key={ride.id ?? i}
                  onClick={() => navigate(`/rides/${ride.id}`)}
                  className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)] hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-200 cursor-pointer"
                >
                  <p className="font-bold text-slate-900 mb-1">{ride.origin_address}</p>
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
        </>
      )}
    </main>
  );
}
