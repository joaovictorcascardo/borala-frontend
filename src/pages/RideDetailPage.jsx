import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";
import { RideRouteMap } from "../components/RideRouteMap";
import { swal } from "../lib/swal";

const C = {
  ink: "#0E1B3D",
  navy: "#15327A",
  blue: "#1E50E0",
  sky: "#3B9AE1",
  bg: "#F4F7FC",
  bgCool: "#EAF1FB",
  surface: "#FFFFFF",
  border: "#E3E9F4",
  muted: "#5B6B86",
  faint: "#9AA8C0",
  green: "#1E7A4F",
  greenBg: "#E6F4EC",
  star: "#F2A93B",
  gradient: "linear-gradient(135deg, #46A6EE, #1E50E0)",
};

const outfit = "'Outfit', sans-serif";
const jakarta = "'Plus Jakarta Sans', sans-serif";

function Icon({ d, size = 18, color = C.blue, strokeWidth = 1.9 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
  );
}

const ICONS = {
  calendar: "M8 2v3M16 2v3M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  seat: "M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 14h12",
  leaf: "M2 22 12 2l5 10M7.5 13.5l9 4.5M12 2c0 0 3 5 3 10s-3 10-3 10",
  route: ["M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64","M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64","M8 12h8M12 8l4 4-4 4"],
  car: "M3 17h18M5 17V9l2-4h10l2 4v8M9 17v-4h6v4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  mapPin: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z","M12 10m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0"],
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  wind: ["M9.59 4.59A2 2 0 1 1 11 8H2","M12.59 19.41A2 2 0 1 0 14 16H2","M17.59 11.41A2 2 0 1 1 19 8H2"],
  noSmoking: "M2 22L22 2M17 12h1a4 4 0 0 1 4 4v0M3 12h13",
  check: "M20 6L9 17l-5-5",
};


function MetricCard({ icon, value, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.bgCool,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon d={ICONS[icon]} size={20} color={C.blue} />
      </div>
      <div>
        <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 18, color: C.ink, lineHeight: 1.2 }}>
          {value}
        </div>
        <div style={{ fontFamily: jakarta, fontSize: 12.5, color: C.faint, marginTop: 1 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function TimelineStop({ type, time, name, sub }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 14 }}>
        {type === "start" && (
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: C.blue,
            boxShadow: `0 0 0 4px ${C.bgCool}`, flexShrink: 0 }} />
        )}
        {type === "mid" && (
          <div style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.faint}`,
            background: C.surface, flexShrink: 0, marginLeft: 2 }} />
        )}
        {type === "end" && (
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2.5px solid ${C.navy}`,
            background: C.surface, flexShrink: 0 }} />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: type === "end" ? 0 : 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: jakarta, fontWeight: 700, fontSize: 15, color: C.ink }}>{name}</span>
          <span style={{ fontFamily: outfit, fontWeight: 700, fontSize: 14, color: C.navy, flexShrink: 0 }}>{time}</span>
        </div>
        <div style={{ fontFamily: jakarta, fontSize: 12.5, color: C.faint, marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

function AmenityChip({ icon, label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
      border: `1px solid ${C.border}`, borderRadius: 20, padding: "5px 12px",
      fontFamily: jakarta, fontSize: 12.5, fontWeight: 500, color: C.muted }}>
      <Icon d={ICONS[icon]} size={14} color={C.muted} />
      {label}
    </div>
  );
}

function ReviewSection({ rideId, revieweeId, revieweeName }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    if (!rating) { swal.error("Selecione uma nota de 1 a 5 estrelas."); return; }
    setLoading(true);
    try {
      await api.post(`/rides/${rideId}/reviews`, {
        reviewee_id: Number(revieweeId),
        rating,
        ...(comment.trim() && { comment: comment.trim() }),
      });
      setSubmitted(true);
      swal.successToast("Avaliação enviada com sucesso!");
    } catch (err) {
      swal.error(err.message || "Não foi possível enviar a avaliação.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ background: C.greenBg, borderRadius: 20, border: `1px solid #A7F3D0`,
        padding: "24px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.green,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ICONS.check} size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: C.green }}>
            Avaliação enviada!
          </div>
          <div style={{ fontFamily: jakarta, fontSize: 13, color: C.muted, marginTop: 2 }}>
            Obrigado pelo seu feedback.
          </div>
        </div>
      </div>
    );
  }

  const ratingLabels = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

  return (
    <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`, padding: "24px" }}>
      <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 19, color: C.ink, marginBottom: 4 }}>
        Avaliar {revieweeName || "o motorista"}
      </div>
      <div style={{ fontFamily: jakarta, fontSize: 13, color: C.muted, marginBottom: 20 }}>
        A carona foi concluída. Deixe sua avaliação!
      </div>

      <div role="group" aria-label="Nota de 1 a 5 estrelas" style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n}
            aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
            aria-pressed={n <= rating}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            style={{ fontSize: 36, color: n <= (hover || rating) ? C.star : "#E2E8F0",
              background: "none", border: "none", cursor: "pointer", padding: "0 2px",
              transition: "color 0.15s", lineHeight: 1 }}>
            ★
          </button>
        ))}
      </div>

      {(hover || rating) > 0 && (
        <div style={{ fontFamily: jakarta, fontSize: 13, fontWeight: 600,
          color: C.muted, marginBottom: 16, minHeight: 20 }}>
          {ratingLabels[hover || rating]}
        </div>
      )}

      <label htmlFor="review-comment" style={{ position: "absolute", left: "-9999px" }}>
        Comentário da avaliação (opcional)
      </label>
      <textarea
        id="review-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentário opcional (máx. 300 caracteres)..."
        maxLength={300}
        rows={3}
        style={{ width: "100%", borderRadius: 12, border: `1.5px solid ${C.border}`,
          padding: "10px 14px", fontFamily: jakarta, fontSize: 13.5, color: C.ink,
          resize: "vertical", outline: "none", boxSizing: "border-box",
          background: C.bg, marginBottom: 16 }}
      />

      <button onClick={submit} disabled={loading || !rating}
        style={{ width: "100%", height: 48, borderRadius: 12,
          background: rating ? C.blue : C.border,
          color: rating ? "#fff" : C.faint,
          fontFamily: jakarta, fontWeight: 700, fontSize: 14,
          border: "none", cursor: rating && !loading ? "pointer" : "not-allowed",
          opacity: loading ? 0.6 : 1, transition: "background 0.2s" }}>
        {loading ? "Enviando..." : "Enviar avaliação"}
      </button>
    </div>
  );
}

export default function RideDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [myBooking, setMyBooking] = useState(null);
  const [rideBookings, setRideBookings] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [seatCount, setSeatCount] = useState(1);

  const { user: currentUser } = useAuth();

  async function loadAll() {
    try {
      const rideData = await api.get(`/rides/${id}`);
      setRide(rideData);
      const userIsDriver = currentUser?.id === rideData.driver_id;

      const [driverData, bookingsData, rideBookingsData, metricsData] = await Promise.all([
        rideData.driver_id ? api.get(`/users/${rideData.driver_id}`).catch(() => null) : Promise.resolve(null),
        userIsDriver ? Promise.resolve([]) : api.get("/bookings/me").catch(() => []),
        userIsDriver ? api.get(`/rides/${id}/bookings`).catch(() => []) : Promise.resolve([]),
        api.get(`/rides/${id}/metrics`).catch(() => null),
      ]);
      setMetrics(metricsData);

      setDriverInfo(driverData);
      setRideBookings(Array.isArray(rideBookingsData) ? rideBookingsData : []);

      const found = Array.isArray(bookingsData)
        ? bookingsData.find((b) => Number(b.ride?.id) === Number(id)) ?? null
        : null;
      setMyBooking(found);
    } catch {
      setRide(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleBookingAction(bookingId, newStatus) {
    const label = newStatus === "CONFIRMED" ? "confirmar" : "recusar";
    const { isConfirmed } = await swal.confirm(
      `Deseja ${label} esta solicitação?`, "",
      { confirmText: newStatus === "CONFIRMED" ? "Confirmar" : "Recusar",
        danger: newStatus === "REJECTED" }
    );
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api.patch(`/bookings/${bookingId}`, { status: newStatus });
      await loadAll();
      swal.successToast(newStatus === "CONFIRMED" ? "Passageiro confirmado!" : "Solicitação recusada.");
    } catch (err) {
      swal.error(err.message || "Não foi possível atualizar a solicitação.");
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, [id]);

  async function handleBook() {
    const { isConfirmed } = await swal.confirm(
      "Solicitar vaga?",
      ride.automatic_approval
        ? "Sua vaga será confirmada automaticamente."
        : "O motorista precisará aprovar sua solicitação.",
      { confirmText: ride.automatic_approval ? "Reservar agora" : "Enviar solicitação" }
    );
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api.post(`/rides/${id}/bookings`, { seats_booked: seatCount });
      await loadAll();
      swal.successToast(ride.automatic_approval ? "Vaga reservada com sucesso!" : "Solicitação enviada!");
    } catch (err) {
      swal.error(err.message || "Não foi possível reservar.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancelBooking(bookingId) {
    const { isConfirmed } = await swal.confirm("Cancelar sua reserva?", "", {
      confirmText: "Cancelar reserva", danger: true,
    });
    if (!isConfirmed) return;
    setActionLoading(true);
    try {
      await api.patch(`/bookings/${bookingId}`, { status: "CANCELLED" });
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
    const { isConfirmed } = await swal.confirm(
      `Deseja ${labels[status]} esta carona?`, "",
      { confirmText: "Confirmar", danger: status === "cancelled" }
    );
    if (!isConfirmed) return;
    const statusMap = { active: "IN_PROGRESS", completed: "COMPLETED", cancelled: "CANCELLED" };
    setActionLoading(true);
    try {
      await api.patch(`/rides/${id}/status`, { status: statusMap[status] });
      await loadAll();
      swal.successToast("Status atualizado!");
    } catch (err) {
      swal.error(err.message || "Não foi possível atualizar o status.");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) return <Spinner className="py-24" />;

  if (!ride) {
    return (
      <div style={{ background: C.bg, minHeight: "60vh", fontFamily: jakarta }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px" }}>
          <button onClick={() => navigate(-1)}
            style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted,
              fontFamily: jakarta, fontSize: 14, fontWeight: 500, background: "none",
              border: "none", cursor: "pointer", marginBottom: 24 }}>
            <Icon d={ICONS.arrowRight} size={16} color={C.muted} /> Voltar
          </button>
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 14, padding: "16px 20px", color: "#DC2626", fontSize: 14 }}>
            Carona não encontrada.
          </div>
        </div>
      </div>
    );
  }

  const isDriver = currentUser?.id === ride.driver_id;
  const freeSeats = ride.available_seats ?? 0;
  const statusLower = String(ride.status || "").toLowerCase();
  const isPending = statusLower === "pending" || statusLower === "scheduled";
  const isActive = statusLower === "active" || statusLower === "in_progress";
  const isCompleted = statusLower === "completed";
  const isCancelled = statusLower === "cancelled";

  const bStatus = String(myBooking?.status || "").toUpperCase();
  const activeMyBooking = myBooking && bStatus !== "CANCELLED" && bStatus !== "REJECTED" ? myBooking : null;
  const canBook = !isDriver && !activeMyBooking && freeSeats > 0 && isPending;

  const driverInitials = driverInfo?.name?.split(" ").slice(0, 2).map((n) => n[0]).join("") ?? "?";

  const depDate = new Date(ride.departure_time);
  const depDateStr = depDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const depTimeStr = depDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const originShort = ride.origin_address?.split(",")[0] ?? "Origem";
  const destShort = ride.destination_address?.split(",")[0] ?? "Destino";

  const STATUS_LABEL = {
    scheduled: "Agendada", pending: "Agendada",
    in_progress: "Em andamento", active: "Em andamento",
    completed: "Concluída", cancelled: "Cancelada",
  };
  const STATUS_COLOR = {
    scheduled: "#D97706", pending: "#D97706",
    in_progress: C.blue, active: C.blue,
    completed: C.green, cancelled: "#DC2626",
  };
  const STATUS_BG = {
    scheduled: "#FFFBEB", pending: "#FFFBEB",
    in_progress: C.bgCool, active: C.bgCool,
    completed: C.greenBg, cancelled: "#FEF2F2",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: jakarta }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 80px" }}>

        <nav aria-label="Navegação" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5,
          color: C.faint, fontFamily: jakarta, marginBottom: 24, flexWrap: "wrap" }}>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/rides")}>Caronas</span>
          <span>/</span>
          <span>{originShort} → {destShort}</span>
          <span>/</span>
          <span style={{ color: C.ink, fontWeight: 600 }}>Detalhes</span>
        </nav>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
            <h1 style={{ fontFamily: outfit, fontWeight: 800, fontSize: 34, color: C.ink,
              letterSpacing: "-0.02em", margin: 0 }}>
              {originShort} → {destShort}
            </h1>
            {ride.status && (
              <span style={{ background: STATUS_BG[statusLower] ?? C.bgCool,
                color: STATUS_COLOR[statusLower] ?? C.blue,
                fontFamily: jakarta, fontWeight: 600, fontSize: 13,
                borderRadius: 20, padding: "4px 12px" }}>
                {STATUS_LABEL[statusLower] ?? ride.status}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, color: C.muted }}>
              <Icon d={ICONS.calendar} size={16} color={C.faint} />
              {depDateStr.charAt(0).toUpperCase() + depDateStr.slice(1)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5, color: C.muted }}>
              <Icon d={ICONS.clock} size={16} color={C.faint} />
              Saída {depTimeStr}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14.5,
              color: C.green, fontWeight: 700 }}>
              <Icon d={ICONS.seat} size={16} color={C.green} />
              {freeSeats} assento{freeSeats !== 1 ? "s" : ""} livre{freeSeats !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr min(360px, 100%)", gap: 24, alignItems: "start" }}
          className="ride-detail-grid">
          <style>{`
            @media (max-width: 960px) {
              .ride-detail-grid { grid-template-columns: 1fr !important; }
              .ride-detail-sidebar { position: static !important; }
            }
          `}</style>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

            <div style={{ borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden",
              height: 320, background: "#E7EEF8", position: "relative" }}>
              <RideRouteMap
                originLat={ride.origin_latitude}
                originLng={ride.origin_longitude}
                destLat={ride.destination_latitude}
                destLng={ride.destination_longitude}
              />
              <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 1000,
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                borderRadius: 12, padding: "10px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: 10.5, color: C.faint, fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
                  DESTINO
                </div>
                <div style={{ fontSize: 13.5, color: C.ink, fontWeight: 700 }}>{destShort}</div>
              </div>
            </div>

            <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`,
              padding: "20px 24px", display: "flex", gap: 0 }}>
              {[
                {
                  icon: "clock",
                  value: metrics?.duration_minutes
                    ? `${Math.floor(metrics.duration_minutes / 60)}h${String(metrics.duration_minutes % 60).padStart(2, "0")}`
                    : "—",
                  label: "Duração estimada",
                },
                {
                  icon: "route",
                  value: metrics?.distance_km ? `${metrics.distance_km} km` : "—",
                  label: "Distância",
                },
                {
                  icon: "leaf",
                  value: metrics?.co2_saved_kg ? `−${metrics.co2_saved_kg} kg` : "—",
                  label: "CO₂ evitado",
                },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
                  {i > 0 && <div style={{ width: 1, background: C.border, margin: "0 20px", flexShrink: 0 }} />}
                  <MetricCard icon={m.icon} value={m.value} label={m.label} />
                </div>
              ))}
            </div>

            <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ fontFamily: outfit, fontWeight: 700, fontSize: 19, color: C.ink }}>Trajeto</span>
              </div>
              <div style={{ position: "relative", paddingLeft: 7 }}>
                <div style={{ position: "absolute", left: 6, top: 14, bottom: 14, width: 2,
                  background: `linear-gradient(to bottom, ${C.blue}, ${C.bgCool})`, borderRadius: 2 }} />
                <TimelineStop type="start" time={depTimeStr} name={originShort} sub={ride.origin_address} />
                <TimelineStop type="end"
                  time={(() => { const d = new Date(depDate); d.setMinutes(d.getMinutes() + (metrics?.duration_minutes || 80));
                    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); })()}
                  name={destShort} sub={ride.destination_address} />
              </div>
            </div>

            {driverInfo && (
              <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`, padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: outfit, fontWeight: 700, fontSize: 19, color: C.ink }}>
                    Sobre o motorista
                  </span>
                  <button onClick={() => navigate(`/users/${driverInfo.id}`)}
                    style={{ fontSize: 14, color: C.blue, fontFamily: jakarta, fontWeight: 600,
                      background: "none", border: "none", cursor: "pointer" }}>
                    Ver perfil
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: outfit, fontWeight: 800, fontSize: 22, color: "#fff",
                    flexShrink: 0, boxShadow: `0 0 0 3px white, 0 0 0 5px ${C.bgCool}`, overflow: "hidden" }}>
                    {driverInfo.profile_picture_url
                      ? <img src={driverInfo.profile_picture_url} alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : driverInitials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ fontFamily: outfit, fontWeight: 700, fontSize: 19, color: C.ink }}>
                        {driverInfo.name}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
                        background: C.greenBg, color: C.green, fontFamily: jakarta,
                        fontWeight: 600, fontSize: 12, borderRadius: 20, padding: "3px 10px" }}>
                        <Icon d={ICONS.shield} size={12} color={C.green} /> Verificado
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={C.star}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span style={{ fontFamily: jakarta, fontSize: 14, color: C.muted }}>
                        {driverInfo.average_rating
                          ? Number(driverInfo.average_rating).toFixed(1)
                          : "—"}{" · "}membro verificado
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, margin: "20px 0" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: C.bgCool,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon d={ICONS.car} size={24} color={C.blue} />
                  </div>
                  <div>
                    <div style={{ fontFamily: jakarta, fontWeight: 700, fontSize: 15, color: C.ink }}>
                      Veículo cadastrado
                    </div>
                    <button onClick={() => navigate(`/users/${driverInfo.id}`)}
                      style={{ fontFamily: jakarta, fontSize: 13, color: C.blue, fontWeight: 600,
                        background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2 }}>
                      Ver perfil do motorista →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isDriver && activeMyBooking && bStatus === "CONFIRMED" && isCompleted && (
              <ReviewSection
                rideId={id}
                revieweeId={ride.driver_id}
                revieweeName={driverInfo?.name}
              />
            )}

          </div>

          <div className="ride-detail-sidebar"
            style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`,
              padding: "24px", boxShadow: "0 4px 24px rgba(14,27,61,0.07)" }}>

              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: outfit, fontWeight: 800, fontSize: 32, color: C.ink }}>
                  {ride.estimated_total_cost
                    ? `R$ ${Number(ride.estimated_total_cost).toFixed(0)}`
                    : "Grátis"}
                </span>
                <span style={{ fontFamily: jakarta, fontSize: 14, color: C.faint }}>por pessoa</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {canBook && (
                  <div style={{ borderRadius: 12, border: `1.5px solid ${C.border}`, padding: "12px 14px" }}>
                    <div style={{ fontFamily: jakarta, fontSize: 12, fontWeight: 600, color: C.faint,
                      marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Assentos
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: jakarta,
                        fontSize: 14, fontWeight: 600, color: C.ink }}>
                        <Icon d={ICONS.seat} size={15} color={C.blue} />
                        {seatCount} assento{seatCount !== 1 ? "s" : ""}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button
                          onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                          aria-label="Diminuir número de assentos"
                          style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${C.border}`,
                            background: C.bg, fontFamily: outfit, fontWeight: 700, fontSize: 18, color: C.ink,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          −
                        </button>
                        <span aria-live="polite" style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: C.ink,
                          minWidth: 20, textAlign: "center" }}>
                          {seatCount}
                        </span>
                        <button
                          onClick={() => setSeatCount(Math.min(freeSeats, seatCount + 1))}
                          aria-label="Aumentar número de assentos"
                          style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${C.border}`,
                            background: C.bg, fontFamily: outfit, fontWeight: 700, fontSize: 18, color: C.ink,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ borderRadius: 12, border: `1.5px solid ${C.border}`, padding: "12px 14px" }}>
                  <div style={{ fontFamily: jakarta, fontSize: 12, fontWeight: 600, color: C.faint,
                    marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Ponto de embarque
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: jakarta,
                    fontSize: 14, fontWeight: 600, color: C.ink }}>
                    <Icon d={ICONS.mapPin} size={15} color={C.blue} />
                    {originShort}
                  </div>
                </div>
              </div>

              {canBook && (
                <button onClick={handleBook} disabled={actionLoading}
                  style={{ width: "100%", height: 48, borderRadius: 12, background: C.blue,
                    color: "#fff", fontFamily: jakarta, fontWeight: 700, fontSize: 15,
                    border: "none", cursor: actionLoading ? "not-allowed" : "pointer",
                    opacity: actionLoading ? 0.6 : 1, marginBottom: 4 }}>
                  {actionLoading ? "Solicitando..." : "Solicitar Vaga"}
                </button>
              )}

              {activeMyBooking && !isDriver && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ borderRadius: 12, padding: "12px 14px",
                    background: bStatus === "PENDING" ? "#FFFBEB" : C.greenBg,
                    border: `1px solid ${bStatus === "PENDING" ? "#FDE68A" : "#A7F3D0"}`,
                    fontFamily: jakarta, fontWeight: 600, fontSize: 13.5,
                    color: bStatus === "PENDING" ? "#92400E" : C.green,
                    display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={bStatus === "PENDING" ? ICONS.clock : ICONS.shield} size={15}
                      color={bStatus === "PENDING" ? "#D97706" : C.green} />
                    {bStatus === "PENDING" ? "Aguardando aprovação" : "Vaga confirmada!"}
                  </div>
                  {isPending && (
                    <button onClick={() => handleCancelBooking(activeMyBooking.id)} disabled={actionLoading}
                      style={{ width: "100%", height: 44, borderRadius: 12,
                        border: "1.5px solid #FECACA", background: "#FEF2F2", color: "#DC2626",
                        fontFamily: jakarta, fontWeight: 600, fontSize: 14,
                        cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                      Cancelar reserva
                    </button>
                  )}
                </div>
              )}

              {!canBook && !activeMyBooking && !isDriver && isPending && freeSeats === 0 && (
                <div style={{ textAlign: "center", padding: "12px 0", fontFamily: jakarta,
                  fontSize: 14, color: C.faint }}>
                  Todas as vagas estão preenchidas.
                </div>
              )}

              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 14,
                display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: ICONS.shield, text: "Pagamento protegido pelo Borala", color: C.green },
                  { icon: ICONS.clock, text: "Cancele grátis antes da viagem", color: C.muted },
                ].map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={g.icon} size={14} color={g.color} />
                    <span style={{ fontFamily: jakarta, fontSize: 13, color: C.muted }}>{g.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {ride.automatic_approval && isPending && (
              <div style={{ background: C.bgCool, borderRadius: 16, border: `1px solid #BFDBFE`,
                padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon d={ICONS.shield} size={16} color={C.blue} />
                <span style={{ fontFamily: jakarta, fontSize: 13, color: C.navy, fontWeight: 500 }}>
                  Aprovação automática — sua vaga é confirmada na hora
                </span>
              </div>
            )}

            {isDriver && !isCompleted && !isCancelled && (
              <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`, padding: "24px" }}>
                <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 16 }}>
                  Gerenciar carona
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {isPending && (
                    <button onClick={() => changeStatus("active")} disabled={actionLoading}
                      style={{ width: "100%", height: 48, borderRadius: 12, background: C.blue,
                        color: "#fff", fontFamily: jakarta, fontWeight: 700, fontSize: 14,
                        border: "none", cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                      Iniciar carona
                    </button>
                  )}
                  {isActive && (
                    <button onClick={() => changeStatus("completed")} disabled={actionLoading}
                      style={{ width: "100%", height: 48, borderRadius: 12, background: C.green,
                        color: "#fff", fontFamily: jakarta, fontWeight: 700, fontSize: 14,
                        border: "none", cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                      Concluir carona
                    </button>
                  )}
                  <button onClick={() => changeStatus("cancelled")} disabled={actionLoading}
                    style={{ width: "100%", height: 48, borderRadius: 12,
                      border: "1.5px solid #FECACA", background: "#FEF2F2", color: "#DC2626",
                      fontFamily: jakarta, fontWeight: 700, fontSize: 14,
                      cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                    Cancelar Carona
                  </button>
                </div>
              </div>
            )}

            {isDriver && rideBookings.length > 0 && (
              <div style={{ background: C.surface, borderRadius: 20, border: `1px solid ${C.border}`, padding: "24px" }}>
                <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 16 }}>
                  Passageiros ({rideBookings.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {rideBookings.map((bk) => {
                    const bkStatus = String(bk.status || "").toUpperCase();
                    const initials = bk.user?.name?.split(" ").slice(0, 2).map((n) => n[0]).join("") ?? "?";
                    return (
                      <div key={bk.id} style={{ borderRadius: 14, border: `1px solid ${C.border}`,
                        padding: "12px 14px", background: C.bg }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.gradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: outfit, fontWeight: 700, fontSize: 14, color: "#fff",
                            flexShrink: 0, overflow: "hidden" }}>
                            {bk.user?.profile_picture_url
                              ? <img src={bk.user.profile_picture_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              : initials}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: jakarta, fontWeight: 700, fontSize: 14, color: C.ink,
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {bk.user?.name ?? "Passageiro"}
                            </div>
                            <div style={{ fontFamily: jakarta, fontSize: 12, color: C.faint }}>
                              {bk.seats_booked} vaga{bk.seats_booked !== 1 ? "s" : ""}
                            </div>
                          </div>
                          <span style={{
                            fontSize: 11, fontWeight: 700, fontFamily: jakarta,
                            borderRadius: 20, padding: "3px 9px",
                            background: bkStatus === "CONFIRMED" ? C.greenBg : bkStatus === "REJECTED" ? "#FEF2F2" : "#FFFBEB",
                            color: bkStatus === "CONFIRMED" ? C.green : bkStatus === "REJECTED" ? "#DC2626" : "#D97706",
                          }}>
                            {bkStatus === "CONFIRMED" ? "Confirmado" : bkStatus === "REJECTED" ? "Recusado" : bkStatus === "CANCELLED" ? "Cancelado" : "Pendente"}
                          </span>
                        </div>
                        {bkStatus === "PENDING" && (
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => handleBookingAction(bk.id, "CONFIRMED")} disabled={actionLoading}
                              style={{ flex: 1, height: 36, borderRadius: 10, background: C.green,
                                color: "#fff", fontFamily: jakarta, fontWeight: 700, fontSize: 13,
                                border: "none", cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                              Aceitar
                            </button>
                            <button onClick={() => handleBookingAction(bk.id, "REJECTED")} disabled={actionLoading}
                              style={{ flex: 1, height: 36, borderRadius: 10, background: "#FEF2F2",
                                color: "#DC2626", fontFamily: jakarta, fontWeight: 700, fontSize: 13,
                                border: "1.5px solid #FECACA", cursor: "pointer", opacity: actionLoading ? 0.5 : 1 }}>
                              Recusar
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
