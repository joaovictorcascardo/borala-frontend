import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await api("/events");
        setEvents(Array.isArray(response) ? response : []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Comunidade</p>
        <h1 className="relative mt-2 text-4xl font-bold text-slate-900">Eventos</h1>
        <p className="relative mt-3 text-slate-500 max-w-xl">
          Encontre eventos e veja as caronas disponíveis para cada um.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
          <p className="text-slate-500">Nenhum evento disponível no momento.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {events.map((evento) => (
            <li
              key={evento.id}
              onClick={() => navigate(`/events/${evento.id}/rides`)}
              className="rounded-2xl border border-blue-100 bg-white p-5 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.12)]"
            >
              <p className="font-bold text-slate-900 mb-1">{evento.name}</p>
              <p className="text-sm text-slate-500 mb-3">{evento.address}</p>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                {new Date(evento.starts_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
