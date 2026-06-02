import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

const STATUS_CONFIG = {
  pending:   { label: "Aguardando", bg: "bg-amber-400/20",  text: "text-amber-300",  dot: "bg-amber-400"  },
  active:    { label: "Em andamento", bg: "bg-blue-400/20", text: "text-blue-300",   dot: "bg-blue-400"   },
  completed: { label: "Concluída",  bg: "bg-emerald-400/20",text: "text-emerald-300",dot: "bg-emerald-400"},
  cancelled: { label: "Cancelada",  bg: "bg-red-400/20",    text: "text-red-300",    dot: "bg-red-400"    },
};

function PassengerSlot({ booking, isMe }) {
  const user = booking?.user ?? {};
  const isPending = booking?.status === "pending";
  const [imgErr, setImgErr] = useState(false);

  if (!booking) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-[72px] h-[72px] rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/60 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-slate-500">Livre</span>
      </div>
    );
  }

  const initial = user.name?.[0]?.toUpperCase() ?? "?";
  const showImg = user.profile_picture_url && !imgErr;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative w-[72px] h-[72px] rounded-2xl overflow-hidden flex items-center justify-center font-bold text-xl
        ${isMe
          ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-blue-500 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          : isPending
          ? "bg-amber-900/40 border border-amber-700/50 text-amber-400"
          : "bg-slate-700 text-slate-200"
        }`}
      >
        {showImg
          ? <img src={user.profile_picture_url} alt={initial} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
          : initial
        }
        {isPending && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      <span className={`text-xs font-semibold max-w-[72px] text-center truncate leading-tight ${isMe ? "text-blue-400" : "text-slate-400"}`}>
        {isMe ? "Você" : user.name?.split(" ")[0] ?? "—"}
      </span>
    </div>
  );
}

export default function RideDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem("@Borala:user")); } catch { return null; }
  })();

  async function loadAll() {
    try {
      const [rideData, bookingsData] = await Promise.all([
        api(`/rides/${id}`),
        api(`/rides/${id}/bookings`).catch(() => []),
      ]);
      setRide(rideData);
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
    } catch {
      setRide(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, [id]);

  async function handleBook() {
    const { isConfirmed } = await swal.confirm(
      "Garantir vaga nesta carona?",
      ride.automatic_approval ? "Confirmação automática." : "O motorista precisará aprovar.",
      { confirmText: "Garantir vaga" }
    );
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api(`/rides/${id}/bookings`, { method: "POST", body: JSON.stringify({ seats_booked: 1 }) });
      await loadAll();
      swal.successToast(ride.automatic_approval ? "Vaga garantida!" : "Solicitação enviada!");
    } catch (err) {
      swal.error(err.message || "Não foi possível reservar.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancelBooking(bookingId) {
    const { isConfirmed } = await swal.confirm("Cancelar sua reserva?", "", { confirmText: "Cancelar reserva", danger: true });
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api(`/bookings/${bookingId}`, { method: "DELETE" });
      await loadAll();
      swal.successToast("Reserva cancelada.");
    } catch (err) {
      swal.error(err.message || "Não foi possível cancelar.");
    } finally {
      setActionLoading(false);
    }
  }

  async function changeStatus(status) {
    const labels = { active: "iniciar", completed: "concluir", cancelled: "cancelar" };
    const { isConfirmed } = await swal.confirm(`Deseja ${labels[status]} esta carona?`, "", {
      confirmText: "Confirmar", danger: status === "cancelled",
    });
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api(`/rides/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      await loadAll();
      swal.successToast("Status atualizado!");
    } catch (err) {
      swal.error(err.message || "Não foi possível atualizar o status.");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ride) {
    return (
      <main className="max-w-xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Voltar
        </button>
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">Carona não encontrada.</p>
      </main>
    );
  }

  const driverInfo = ride.driver ?? ride.user;
  const isDriver = currentUser && driverInfo && currentUser.id === driverInfo.id;
  const activeBookings = bookings.filter((b) => b.status !== "cancelled" && b.status !== "rejected");
  const myBooking = activeBookings.find((b) => (b.user_id ?? b.user?.id) === currentUser?.id);
  const totalSeats = ride.available_seats ?? 0;
  const slots = Array.from({ length: totalSeats }, (_, i) => activeBookings[i] ?? null);
  const hasEmptySlot = activeBookings.length < totalSeats;
  const canBook = !isDriver && !myBooking && hasEmptySlot && ride.status === "pending";
  const statusCfg = STATUS_CONFIG[ride.status] ?? { label: ride.status, bg: "bg-slate-700", text: "text-slate-300", dot: "bg-slate-400" };

  const formattedDate = new Date(ride.departure_time).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  const formattedTime = new Date(ride.departure_time).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <main className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Voltar
      </button>

      {/* Hero card — dark */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-7 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-indigo-600/10 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-start justify-between gap-3 mb-6">
          <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusCfg.bg} ${statusCfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </div>
          {ride.automatic_approval && (
            <span className="text-xs font-semibold text-slate-400 border border-slate-700 rounded-full px-3 py-1">Aprovação automática</span>
          )}
        </div>

        <div className="relative space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1.5 flex flex-col items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full border-2 border-blue-400 bg-slate-900" />
              <div className="w-px h-10 bg-gradient-to-b from-blue-400/60 to-indigo-400/60" style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(99,102,241,0.5) 0, rgba(99,102,241,0.5) 4px, transparent 4px, transparent 8px)" }} />
              <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </div>
            <div className="space-y-4 flex-1 min-w-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Partida</p>
                <p className="font-bold text-white text-lg leading-tight truncate">{ride.origin_address}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Destino</p>
                <p className="font-bold text-white text-lg leading-tight truncate">{ride.destination_address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 pt-5 border-t border-slate-700/60 flex flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Data</p>
            <p className="text-sm font-bold text-slate-200">{formattedDate}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Horário</p>
            <p className="text-sm font-bold text-slate-200">{formattedTime}</p>
          </div>
          {ride.estimated_total_cost && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Custo est.</p>
              <p className="text-sm font-bold text-emerald-400">R$ {Number(ride.estimated_total_cost).toFixed(2)}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Vagas</p>
            <p className="text-sm font-bold text-slate-200">{totalSeats}</p>
          </div>
        </div>

        {ride.additional_info && (
          <div className="relative mt-4 rounded-xl bg-slate-800/60 border border-slate-700/60 px-4 py-3">
            <p className="text-xs text-slate-400 leading-relaxed">{ride.additional_info}</p>
          </div>
        )}
      </div>

      {/* Driver */}
      {driverInfo && (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-[0_4px_14px_rgba(99,102,241,0.35)]">
            {driverInfo.profile_picture_url
              ? <img src={driverInfo.profile_picture_url} alt="" className="w-full h-full object-cover rounded-2xl" />
              : driverInfo.name?.[0]?.toUpperCase() ?? "?"
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Motorista</p>
            <p className="font-bold text-slate-900 text-base">{driverInfo.name}</p>
            {driverInfo.average_rating ? (
              <div className="flex items-center gap-1 mt-0.5">
                {[1,2,3,4,5].map((n) => (
                  <svg key={n} xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ${n <= Math.round(Number(driverInfo.average_rating)) ? "text-amber-400" : "text-slate-200"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-semibold text-slate-500 ml-0.5">{Number(driverInfo.average_rating).toFixed(1)}</span>
              </div>
            ) : (
              <p className="text-xs text-slate-400 mt-0.5">Sem avaliações</p>
            )}
          </div>
          <button
            onClick={() => navigate(`/users/${driverInfo.id}`)}
            className="text-xs font-bold text-blue-600 border border-blue-200 rounded-xl px-3 py-2 hover:bg-blue-50 transition-colors cursor-pointer shrink-0"
          >
            Ver perfil
          </button>
        </div>
      )}

      {/* Lobby */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Passageiros</p>
            <p className="font-bold text-white text-lg">
              {activeBookings.length}
              <span className="text-slate-500 font-normal text-base"> / {totalSeats}</span>
            </p>
          </div>
          <div className="flex gap-1.5">
            {activeBookings.filter(b => b.status === "confirmed").length > 0 && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-700/50 rounded-full px-2.5 py-1">
                {activeBookings.filter(b => b.status === "confirmed").length} confirmado{activeBookings.filter(b => b.status === "confirmed").length !== 1 ? "s" : ""}
              </span>
            )}
            {activeBookings.filter(b => b.status === "pending").length > 0 && (
              <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-700/50 rounded-full px-2.5 py-1">
                {activeBookings.filter(b => b.status === "pending").length} aguardando
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 min-h-[96px]">
          {slots.map((booking, i) => (
            <PassengerSlot
              key={booking?.id ?? `empty-${i}`}
              booking={booking}
              isMe={(booking?.user_id ?? booking?.user?.id) === currentUser?.id}
            />
          ))}
        </div>

        {canBook && (
          <button
            onClick={handleBook}
            disabled={actionLoading}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(99,102,241,0.5)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {actionLoading
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            }
            {actionLoading ? "Reservando..." : "Garantir minha vaga"}
          </button>
        )}

        {!canBook && !myBooking && !isDriver && !hasEmptySlot && ride.status === "pending" && (
          <div className="text-center py-3 text-sm text-slate-500 font-medium">
            Todas as vagas estão preenchidas.
          </div>
        )}

        {myBooking && !isDriver && (
          <div className="space-y-3">
            <div className={`rounded-2xl px-4 py-3 text-sm font-semibold flex items-center gap-2.5 ${
              myBooking.status === "pending"
                ? "bg-amber-400/10 border border-amber-700/40 text-amber-300"
                : "bg-emerald-400/10 border border-emerald-700/40 text-emerald-300"
            }`}>
              {myBooking.status === "pending"
                ? <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Aguardando aprovação do motorista</>
                : <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Vaga confirmada!</>
              }
            </div>
            {ride.status === "pending" && (
              <button
                onClick={() => handleCancelBooking(myBooking.id)}
                disabled={actionLoading}
                className="w-full rounded-2xl border border-red-800/60 bg-red-400/10 py-3 text-sm font-bold text-red-400 hover:bg-red-400/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar reserva
              </button>
            )}
          </div>
        )}
      </div>

      {/* Driver actions */}
      {isDriver && ride.status !== "completed" && ride.status !== "cancelled" && (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Gerenciar carona</p>
          <div className="flex gap-2">
            {ride.status === "pending" && (
              <button
                onClick={() => changeStatus("active")}
                disabled={actionLoading}
                className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Iniciar
              </button>
            )}
            {ride.status === "active" && (
              <button
                onClick={() => changeStatus("completed")}
                disabled={actionLoading}
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Concluir
              </button>
            )}
            <button
              onClick={() => changeStatus("cancelled")}
              disabled={actionLoading}
              className="flex-1 rounded-xl border border-red-200 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
