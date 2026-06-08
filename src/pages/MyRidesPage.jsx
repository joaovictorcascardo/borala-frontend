import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

const STATUS_LABEL = {
  SCHEDULED: "Agendada",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluída",
  CANCELLED: "Cancelada",
  pending: "Agendada",
  active: "Em andamento",
  completed: "Concluída",
  cancelled: "Cancelada",
};

const STATUS_STYLE = {
  SCHEDULED: "text-amber-600 bg-amber-50 border-amber-200",
  IN_PROGRESS: "text-blue-600 bg-blue-50 border-blue-200",
  COMPLETED: "text-emerald-600 bg-emerald-50 border-emerald-200",
  CANCELLED: "text-red-500 bg-red-50 border-red-200",
  pending: "text-amber-600 bg-amber-50 border-amber-200",
  active: "text-blue-600 bg-blue-50 border-blue-200",
  completed: "text-emerald-600 bg-emerald-50 border-emerald-200",
  cancelled: "text-red-500 bg-red-50 border-red-200",
};

export default function MyRidesPage() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function loadRides() {
    try {
      const data = await api("/users/me/rides");
      setRides(Array.isArray(data) ? data : []);
    } catch {
      setRides([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRides();
  }, []);

  async function changeStatus(rideId, status) {
    const labels = { active: "iniciar", completed: "concluir", cancelled: "cancelar" };
    const { isConfirmed } = await swal.confirm(
      `Deseja ${labels[status]} esta carona?`,
      "",
      { confirmText: "Confirmar", danger: status === "cancelled" }
    );
    if (!isConfirmed) return;

    const statusMap = {
      active: "IN_PROGRESS",
      completed: "COMPLETED",
      cancelled: "CANCELLED",
    };
    const apiStatus = statusMap[status] || status;

    setUpdatingId(rideId);
    try {
      await api(`/rides/${rideId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: apiStatus }),
      });
      await loadRides();
      swal.successToast("Status atualizado!");
    } catch (error) {
      swal.error(error.message || "Não foi possível atualizar o status.");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Motorista</p>
        <h1 className="relative mt-2 text-3xl font-bold text-slate-900">Minhas Caronas</h1>
        <p className="relative mt-2 text-slate-500">Caronas que você criou como motorista.</p>
      </div>

      <div className="flex justify-end">
        <button onClick={() => navigate("/rides/new")} className="button-primary">
          + Nova carona
        </button>
      </div>

      {rides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
          <p className="text-slate-500 mb-5">Você ainda não criou nenhuma carona.</p>
          <button onClick={() => navigate("/rides/new")} className="button-primary">
            Criar minha primeira carona
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {rides.map((ride, i) => {
            const busy = updatingId === ride.id;
            return (
              <li key={ride.id ?? i} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div onClick={() => navigate(`/rides/${ride.id}`)} className="cursor-pointer flex-1">
                    <p className="font-bold text-slate-900">{ride.origin_address}</p>
                    <p className="text-sm text-slate-500 mt-0.5">→ {ride.destination_address}</p>
                  </div>
                  {ride.status && (
                    <span className={`shrink-0 text-xs font-semibold border rounded-full px-2.5 py-0.5 ${STATUS_STYLE[ride.status] ?? "text-slate-600 bg-slate-50 border-slate-200"}`}>
                      {STATUS_LABEL[ride.status] ?? ride.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
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

                {(() => {
                  const statusLower = String(ride.status || "").toLowerCase();
                  const isPending = statusLower === "pending" || statusLower === "scheduled";
                  const isActive = statusLower === "active" || statusLower === "in_progress";

                  if (!isPending && !isActive) return null;

                  return (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                      {isPending && (
                        <button
                          onClick={() => changeStatus(ride.id, "active")}
                          disabled={busy}
                          className="button-primary text-xs px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Iniciar
                        </button>
                      )}
                      {isActive && (
                        <button
                          onClick={() => changeStatus(ride.id, "completed")}
                          disabled={busy}
                          className="inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Concluir
                        </button>
                      )}
                      <button
                        onClick={() => changeStatus(ride.id, "cancelled")}
                        disabled={busy}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancelar
                      </button>
                    </div>
                  );
                })()}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
