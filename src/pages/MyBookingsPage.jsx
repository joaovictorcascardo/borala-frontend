import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Spinner } from "../components/Spinner";
import { BOOKING_STATUS_LABEL, BOOKING_STATUS_STYLE } from "../constants/status";
import { swal } from "../lib/swal";

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  async function loadBookings() {
    try {
      const data = await api.get("/bookings/me");
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      swal.error(err.message || "Erro ao carregar reservas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleCancel(bookingId) {
    const { isConfirmed } = await swal.confirm(
      "Cancelar reserva?",
      "Esta ação não pode ser desfeita.",
      { confirmText: "Cancelar reserva", danger: true }
    );
    if (!isConfirmed) return;

    setCancellingId(bookingId);
    try {
      await api.patch(`/bookings/${bookingId}`, { status: "CANCELLED" });
      swal.successToast("Reserva cancelada.");
      loadBookings();
    } catch (err) {
      swal.error(err.message || "Não foi possível cancelar a reserva.");
    } finally {
      setCancellingId(null);
    }
  }

  if (loading) return <Spinner className="py-24" />;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Passageiro</p>
        <h1 className="relative mt-2 text-3xl font-bold text-slate-900">Minhas Reservas</h1>
        <p className="relative mt-2 text-slate-500">Caronas que você reservou como passageiro.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
          <p className="text-slate-500 mb-5">Você ainda não tem nenhuma reserva.</p>
          <button onClick={() => navigate("/rides")} className="button-primary">
            Buscar caronas
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => {
            const ride = booking.ride || {};
            const statusUpper = String(booking.status || "").toUpperCase();
            const busy = cancellingId === booking.id;
            const canCancel = statusUpper === "PENDING" || statusUpper === "CONFIRMED";

            return (
              <li key={booking.id}
                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)]">

                <div
                  className="cursor-pointer mb-3"
                  onClick={() => navigate(`/rides/${ride.id}`)}
                >
                  <p className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {ride.origin_address || "Endereço de origem"}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    → {ride.destination_address || "Endereço de destino"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {ride.departure_time && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                      {new Date(ride.departure_time).toLocaleString("pt-BR", {
                        day: "2-digit", month: "short",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
                    {booking.seats_booked} vaga{booking.seats_booked !== 1 ? "s" : ""}
                  </span>
                  <span className={`text-xs font-semibold border rounded-full px-3 py-1 ${BOOKING_STATUS_STYLE[statusUpper] ?? "text-slate-600 bg-slate-50 border-slate-200"}`}>
                    {BOOKING_STATUS_LABEL[statusUpper] ?? booking.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/rides/${ride.id}`)}
                    className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    Ver carona
                  </button>

                  {statusUpper === "CONFIRMED" && (
                    <button
                      onClick={() => navigate(`/rides/${ride.id}`)}
                      className="inline-flex items-center justify-center rounded-xl border border-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-all duration-200 cursor-pointer"
                    >
                      ★ Avaliar motorista
                    </button>
                  )}

                  {canCancel && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={busy}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {busy ? "Cancelando..." : "Cancelar reserva"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
