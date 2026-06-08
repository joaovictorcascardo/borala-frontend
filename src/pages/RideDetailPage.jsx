import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {Array.isArray(d) ? (
        d.map((p, i) => <path key={i} d={p} />)
      ) : (
        <path d={d} />
      )}
    </svg>
  );
}

const ICONS = {
  calendar:
    "M8 2v3M16 2v3M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  seat: "M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 14h12",
  leaf: "M2 22 12 2l5 10M7.5 13.5l9 4.5M12 2c0 0 3 5 3 10s-3 10-3 10",
  route: [
    "M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64",
    "M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64",
    "M8 12h8M12 8l4 4-4 4",
  ],
  car: "M3 17h18M5 17V9l2-4h10l2 4v8M9 17v-4h6v4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  mapPin: [
    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
    "M12 10m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  ],
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  wind: [
    "M9.59 4.59A2 2 0 1 1 11 8H2",
    "M12.59 19.41A2 2 0 1 0 14 16H2",
    "M17.59 11.41A2 2 0 1 1 19 8H2",
  ],
  usb: "M6 2h12M6 2v4l-2 2 2 2v4h12v-4l2-2-2-2V2M9 12v4M15 12v4",
  noSmoking: "M2 22L22 2M17 12h1a4 4 0 0 1 4 4v0M3 12h13",
};

function RideMap({ origin, destination }) {
  return (
    <svg
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="640" height="320" fill="#E7EEF8" />
      <rect x="0" y="52" width="640" height="13" fill="#D2DEEF" />
      <rect x="0" y="102" width="640" height="8" fill="#D2DEEF" />
      <rect x="0" y="150" width="640" height="13" fill="#D2DEEF" />
      <rect x="0" y="200" width="640" height="8" fill="#D2DEEF" />
      <rect x="0" y="248" width="640" height="13" fill="#D2DEEF" />
      <rect x="78" y="0" width="9" height="320" fill="#D2DEEF" />
      <rect x="158" y="0" width="6" height="320" fill="#D2DEEF" />
      <rect x="248" y="0" width="9" height="320" fill="#D2DEEF" />
      <rect x="338" y="0" width="6" height="320" fill="#D2DEEF" />
      <rect x="438" y="0" width="9" height="320" fill="#D2DEEF" />
      <rect x="538" y="0" width="6" height="320" fill="#D2DEEF" />
      <rect x="88" y="65" width="62" height="80" rx="4" fill="#DCE6F4" />
      <rect x="168" y="65" width="72" height="28" rx="4" fill="#DCE6F4" />
      <rect x="168" y="112" width="72" height="33" rx="4" fill="#DCE6F4" />
      <rect x="258" y="65" width="72" height="80" rx="4" fill="#DCE6F4" />
      <rect x="88" y="163" width="62" height="30" rx="4" fill="#DCE6F4" />
      <rect x="88" y="212" width="62" height="30" rx="4" fill="#DCE6F4" />
      <rect x="168" y="163" width="72" height="80" rx="4" fill="#DCE6F4" />
      <rect x="348" y="18" width="82" height="28" rx="4" fill="#DCE6F4" />
      <rect x="448" y="18" width="82" height="28" rx="4" fill="#DCE6F4" />
      <rect x="348" y="65" width="82" height="80" rx="4" fill="#DCE6F4" />
      <rect x="448" y="65" width="82" height="38" rx="4" fill="#DCE6F4" />
      <rect x="448" y="112" width="82" height="33" rx="4" fill="#DCE6F4" />
      <rect x="258" y="163" width="172" height="30" rx="4" fill="#DCE6F4" />
      <rect x="348" y="212" width="82" height="30" rx="4" fill="#DCE6F4" />
      <rect x="548" y="65" width="84" height="80" rx="4" fill="#DCE6F4" />
      <rect x="548" y="163" width="84" height="80" rx="4" fill="#DCE6F4" />
      <defs>
        <linearGradient id="rg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#46A6EE" />
          <stop offset="100%" stopColor="#1E50E0" />
        </linearGradient>
        <filter id="ps">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="4"
            floodColor="rgba(30,80,224,0.45)"
          />
        </filter>
        <filter id="cs">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="5"
            floodColor="rgba(0,0,0,0.13)"
          />
        </filter>
        <clipPath id="chip1">
          <rect x="18" y="256" width="186" height="54" rx="12" />
        </clipPath>
        <clipPath id="chip2">
          <rect x="18" y="318" width="186" height="54" rx="12" />
        </clipPath>
      </defs>
      <path
        d="M 96 288 C 180 250, 280 190, 400 118 C 460 82, 505 52, 555 26"
        stroke="url(#rg)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="96"
        cy="288"
        r="13"
        fill="white"
        stroke="#1E50E0"
        strokeWidth="3"
      />
      <circle cx="96" cy="288" r="5" fill="#1E50E0" />
      <g filter="url(#ps)">
        <circle cx="555" cy="20" r="14" fill="url(#rg)" />
        <polygon points="543,28 567,28 555,46" fill="url(#rg)" />
        <circle cx="555" cy="20" r="7" fill="white" />
      </g>
      <g filter="url(#cs)">
        <rect
          x="18"
          y="244"
          width="190"
          height="56"
          rx="12"
          fill="rgba(255,255,255,0.94)"
        />
        <text
          x="30"
          y="262"
          fontSize="10"
          fill="#9AA8C0"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="600"
          letterSpacing="1.2"
        >
          ORIGEM
        </text>
        <text
          x="30"
          y="280"
          fontSize="13.5"
          fill="#0E1B3D"
          fontFamily="Plus Jakarta Sans, sans-serif"
          fontWeight="700"
        >
          {origin?.substring(0, 20) || "Ponto de partida"}
        </text>
      </g>
    </svg>
  );
}

function MetricCard({ icon, value, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: C.bgCool,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon d={ICONS[icon]} size={20} color={C.blue} />
      </div>
      <div>
        <div
          style={{
            fontFamily: outfit,
            fontWeight: 700,
            fontSize: 18,
            color: C.ink,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: jakarta,
            fontSize: 12.5,
            color: C.faint,
            marginTop: 1,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function TimelineStop({ type, time, name, sub }) {
  const markerSize = type === "start" ? 14 : type === "end" ? 14 : 10;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 14,
        }}
      >
        {type === "start" && (
          <>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: C.blue,
                boxShadow: `0 0 0 4px ${C.bgCool}`,
                flexShrink: 0,
              }}
            />
          </>
        )}
        {type === "mid" && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `2px solid ${C.faint}`,
              background: C.surface,
              flexShrink: 0,
              marginLeft: 2,
            }}
          />
        )}
        {type === "end" && (
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2.5px solid ${C.navy}`,
              background: C.surface,
              flexShrink: 0,
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, paddingBottom: type === "end" ? 0 : 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: jakarta,
              fontWeight: 700,
              fontSize: 15,
              color: C.ink,
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: outfit,
              fontWeight: 700,
              fontSize: 14,
              color: C.navy,
              flexShrink: 0,
            }}
          >
            {time}
          </span>
        </div>
        <div
          style={{
            fontFamily: jakarta,
            fontSize: 12.5,
            color: C.faint,
            marginTop: 3,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

function AmenityChip({ icon, label }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: "5px 12px",
        fontFamily: jakarta,
        fontSize: 12.5,
        fontWeight: 500,
        color: C.muted,
      }}
    >
      <Icon d={ICONS[icon]} size={14} color={C.muted} />
      {label}
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
  const [seatCount, setSeatCount] = useState(1);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("@Borala:user"));
    } catch {
      return null;
    }
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

  useEffect(() => {
    loadAll();
  }, [id]);

  async function handleBook() {
    const confirmBook = window.confirm(
      ride.automatic_approval
        ? "Deseja reservar esta carona? (Confirmação automática)"
        : "Deseja solicitar vaga nesta carona? (O motorista precisará aprovar)",
    );
    if (!confirmBook) return;

    setActionLoading(true);
    try {
      await api(`/rides/${id}/bookings`, {
        method: "POST",
        body: JSON.stringify({ seats_booked: seatCount }),
      });
      await loadAll();
      alert("Solicitação de vaga enviada com sucesso!");
    } catch (err) {
      alert(err.message || "Não foi possível reservar.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancelBooking(bookingId) {
    const { isConfirmed } = await swal.confirm("Cancelar sua reserva?", "", {
      confirmText: "Cancelar reserva",
      danger: true,
    });
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
    const labels = {
      active: "iniciar",
      completed: "concluir",
      cancelled: "cancelar",
    };
    const { isConfirmed } = await swal.confirm(
      `Deseja ${labels[status]} esta carona?`,
      "",
      { confirmText: "Confirmar", danger: status === "cancelled" },
    );
    if (!isConfirmed) return;

    const statusMap = {
      active: "IN_PROGRESS",
      completed: "COMPLETED",
      cancelled: "CANCELLED",
    };
    const apiStatus = statusMap[status] || status;

    setActionLoading(true);
    try {
      await api(`/rides/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: apiStatus }),
      });
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
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
        }}
      >
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ride) {
    return (
      <div style={{ background: C.bg, minHeight: "60vh", fontFamily: jakarta }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: C.muted,
              fontFamily: jakarta,
              fontSize: 14,
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: 24,
            }}
          >
            <Icon d={ICONS.arrowRight} size={16} color={C.muted} /> Voltar
          </button>
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: 14,
              padding: "16px 20px",
              color: "#DC2626",
              fontSize: 14,
            }}
          >
            Carona não encontrada.
          </div>
        </div>
      </div>
    );
  }

  const driverInfo = ride.driver ?? ride.user;
  const isDriver =
    currentUser && driverInfo && currentUser.id === driverInfo.id;
  const activeBookings = bookings.filter((b) => {
    const s = String(b.status || "").toLowerCase();
    return s !== "cancelled" && s !== "rejected";
  });
  const myBooking = activeBookings.find(
    (b) => (b.user_id ?? b.user?.id) === currentUser?.id,
  );
  const totalSeats = ride.available_seats ?? 0;
  const freeSeats = Math.max(0, totalSeats - activeBookings.length);

  const statusLower = String(ride.status || "").toLowerCase();
  const isPending = statusLower === "pending" || statusLower === "scheduled";
  const isActive = statusLower === "active" || statusLower === "in_progress";

  const canBook = !isDriver && !myBooking && freeSeats > 0 && isPending;

  const driverInitials =
    driverInfo?.name
      ?.split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("") ?? "?";

  const depDate = new Date(ride.departure_time);
  const depDateStr = depDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const depTimeStr = depDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const originShort = ride.origin_address?.split(",")[0] ?? "Origem";
  const destShort = ride.destination_address?.split(",")[0] ?? "Destino";

  const confirmedPassengers = activeBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  );

  const STATUS_LABEL = {
    pending: "Aguardando",
    active: "Em andamento",
    completed: "Concluída",
    cancelled: "Cancelada",
  };
  const STATUS_COLOR = {
    pending: "#D97706",
    active: C.blue,
    completed: C.green,
    cancelled: "#DC2626",
  };
  const STATUS_BG = {
    pending: "#FFFBEB",
    active: C.bgCool,
    completed: C.greenBg,
    cancelled: "#FEF2F2",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: jakarta }}>
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 80px" }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13.5,
            color: C.faint,
            fontFamily: jakarta,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/rides")}
          >
            Caronas
          </span>
          <span>/</span>
          <span style={{ cursor: "pointer" }}>
            {originShort} → {destShort}
          </span>
          <span>/</span>
          <span style={{ color: C.ink, fontWeight: 600 }}>Detalhes</span>
        </nav>

        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            <h1
              style={{
                fontFamily: outfit,
                fontWeight: 800,
                fontSize: 34,
                color: C.ink,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {originShort} → {destShort}
            </h1>
            {ride.status && (
              <span
                style={{
                  background: STATUS_BG[ride.status] ?? C.bgCool,
                  color: STATUS_COLOR[ride.status] ?? C.blue,
                  fontFamily: jakarta,
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                {STATUS_LABEL[ride.status] ?? ride.status}
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14.5,
                color: C.muted,
              }}
            >
              <Icon d={ICONS.calendar} size={16} color={C.faint} />
              {depDateStr.charAt(0).toUpperCase() + depDateStr.slice(1)}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14.5,
                color: C.muted,
              }}
            >
              <Icon d={ICONS.clock} size={16} color={C.faint} />
              Saída {depTimeStr}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14.5,
                color: C.green,
                fontWeight: 700,
              }}
            >
              <Icon d={ICONS.seat} size={16} color={C.green} />
              {freeSeats} assento{freeSeats !== 1 ? "s" : ""} livre
              {freeSeats !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr min(360px, 100%)",
            gap: 24,
            alignItems: "start",
          }}
          className="ride-detail-grid"
        >
          <style>{`
            @media (max-width: 960px) {
              .ride-detail-grid { grid-template-columns: 1fr !important; }
              .ride-detail-sidebar { position: static !important; }
            }
          `}</style>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              minWidth: 0,
            }}
          >
            <div
              style={{
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                height: 320,
                background: "#E7EEF8",
                position: "relative",
              }}
            >
              <RideMap
                origin={ride.origin_address}
                destination={ride.destination_address}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    fontSize: 10.5,
                    color: C.faint,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  DESTINO
                </div>
                <div style={{ fontSize: 13.5, color: C.ink, fontWeight: 700 }}>
                  {destShort}
                </div>
              </div>
            </div>

            <div
              style={{
                background: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                padding: "20px 24px",
                display: "flex",
                gap: 0,
              }}
            >
              {[
                { icon: "clock", value: "~1h20", label: "Duração estimada" },
                { icon: "route", value: "~98 km", label: "Distância" },
                { icon: "leaf", value: "−12 kg", label: "CO₂ evitado" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{ display: "flex", flex: 1, alignItems: "stretch" }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        width: 1,
                        background: C.border,
                        margin: "0 20px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <MetricCard icon={m.icon} value={m.value} label={m.label} />
                </div>
              ))}
            </div>

            <div
              style={{
                background: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: outfit,
                    fontWeight: 700,
                    fontSize: 19,
                    color: C.ink,
                  }}
                >
                  Trajeto
                </span>
                <button
                  style={{
                    fontSize: 14,
                    color: C.blue,
                    fontFamily: jakarta,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Abrir mapa completo
                </button>
              </div>
              <div style={{ position: "relative", paddingLeft: 7 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 6,
                    top: 14,
                    bottom: 14,
                    width: 2,
                    background: `linear-gradient(to bottom, ${C.blue}, ${C.bgCool})`,
                    borderRadius: 2,
                  }}
                />
                <TimelineStop
                  type="start"
                  time={depTimeStr}
                  name={originShort}
                  sub={ride.origin_address}
                />
                <TimelineStop
                  type="mid"
                  time={(() => {
                    const d = new Date(depDate);
                    d.setMinutes(d.getMinutes() + 25);
                    return d.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  })()}
                  name="Parada intermediária"
                  sub="Parada rápida de 5 min"
                />
                <TimelineStop
                  type="end"
                  time={(() => {
                    const d = new Date(depDate);
                    d.setMinutes(d.getMinutes() + 80);
                    return d.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  })()}
                  name={destShort}
                  sub={ride.destination_address}
                />
              </div>
            </div>

            {driverInfo && (
              <div
                style={{
                  background: C.surface,
                  borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: outfit,
                      fontWeight: 700,
                      fontSize: 19,
                      color: C.ink,
                    }}
                  >
                    Sobre o motorista
                  </span>
                  <button
                    onClick={() => navigate(`/users/${driverInfo.id}`)}
                    style={{
                      fontSize: 14,
                      color: C.blue,
                      fontFamily: jakarta,
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Ver perfil
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: C.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: outfit,
                      fontWeight: 800,
                      fontSize: 22,
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow: `0 0 0 3px white, 0 0 0 5px ${C.bgCool}`,
                      overflow: "hidden",
                    }}
                  >
                    {driverInfo.profile_picture_url ? (
                      <img
                        src={driverInfo.profile_picture_url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      driverInitials
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: outfit,
                          fontWeight: 700,
                          fontSize: 19,
                          color: C.ink,
                        }}
                      >
                        {driverInfo.name}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: C.greenBg,
                          color: C.green,
                          fontFamily: jakarta,
                          fontWeight: 600,
                          fontSize: 12,
                          borderRadius: 20,
                          padding: "3px 10px",
                        }}
                      >
                        <Icon d={ICONS.shield} size={12} color={C.green} />
                        Verificado
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <Icon
                        d={ICONS.star}
                        size={14}
                        color={C.star}
                        strokeWidth={0}
                        style={{ fill: C.star }}
                      />
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={C.star}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span
                        style={{
                          fontFamily: jakarta,
                          fontSize: 14,
                          color: C.muted,
                        }}
                      >
                        {driverInfo.average_rating
                          ? Number(driverInfo.average_rating).toFixed(1)
                          : "—"}
                        {" · "}membro verificado
                      </span>
                    </div>
                  </div>

                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "9px 16px",
                      background: C.surface,
                      cursor: "pointer",
                      fontFamily: jakarta,
                      fontWeight: 600,
                      fontSize: 14,
                      color: C.blue,
                      flexShrink: 0,
                    }}
                  >
                    <Icon d={ICONS.message} size={15} color={C.blue} />
                    Mensagem
                  </button>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${C.border}`,
                    margin: "20px 0",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: C.bgCool,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon d={ICONS.car} size={24} color={C.blue} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: jakarta,
                        fontWeight: 700,
                        fontSize: 15.5,
                        color: C.ink,
                      }}
                    >
                      {ride.vehicle
                        ? `${ride.vehicle.brand} ${ride.vehicle.model}`
                        : "Veículo cadastrado"}
                    </div>
                    <div
                      style={{
                        fontFamily: jakarta,
                        fontSize: 13,
                        color: C.faint,
                        marginTop: 2,
                      }}
                    >
                      {ride.vehicle
                        ? `${ride.vehicle.color} · ${ride.vehicle.year}`
                        : "Ver perfil do motorista"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <AmenityChip icon="wind" label="Ar-condicionado" />
                    <AmenityChip icon="noSmoking" label="Não fumante" />
                  </div>
                </div>
              </div>
            )}

            {isDriver &&
              ride.status !== "completed" &&
              ride.status !== "cancelled" && (
                <div
                  style={{
                    background: C.surface,
                    borderRadius: 20,
                    border: `1px solid ${C.border}`,
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: outfit,
                      fontWeight: 700,
                      fontSize: 16,
                      color: C.navy,
                      marginBottom: 16,
                    }}
                  >
                    Gerenciar carona
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {ride.status === "pending" && (
                      <button
                        onClick={() => changeStatus("active")}
                        disabled={actionLoading}
                        style={{
                          flex: 1,
                          height: 48,
                          borderRadius: 12,
                          background: C.blue,
                          color: "#fff",
                          fontFamily: jakarta,
                          fontWeight: 700,
                          fontSize: 14,
                          border: "none",
                          cursor: "pointer",
                          opacity: actionLoading ? 0.5 : 1,
                        }}
                      >
                        Iniciar carona
                      </button>
                    )}
                    {ride.status === "active" && (
                      <button
                        onClick={() => changeStatus("completed")}
                        disabled={actionLoading}
                        style={{
                          flex: 1,
                          height: 48,
                          borderRadius: 12,
                          background: C.green,
                          color: "#fff",
                          fontFamily: jakarta,
                          fontWeight: 700,
                          fontSize: 14,
                          border: "none",
                          cursor: "pointer",
                          opacity: actionLoading ? 0.5 : 1,
                        }}
                      >
                        Concluir carona
                      </button>
                    )}
                    <button
                      onClick={() => changeStatus("cancelled")}
                      disabled={actionLoading}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 12,
                        border: "1.5px solid #FECACA",
                        background: "#FEF2F2",
                        color: "#DC2626",
                        fontFamily: jakarta,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                        opacity: actionLoading ? 0.5 : 1,
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
          </div>

          <div
            className="ride-detail-sidebar"
            style={{
              position: "sticky",
              top: 96,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                background: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                padding: "24px",
                boxShadow: "0 4px 24px rgba(14,27,61,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 4 }}
                >
                  <span
                    style={{
                      fontFamily: outfit,
                      fontWeight: 800,
                      fontSize: 32,
                      color: C.ink,
                    }}
                  >
                    {ride.estimated_total_cost
                      ? `R$ ${Number(ride.estimated_total_cost).toFixed(0)}`
                      : "Grátis"}
                  </span>
                </div>
                <span
                  style={{ fontFamily: jakarta, fontSize: 14, color: C.faint }}
                >
                  por pessoa
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    borderRadius: 12,
                    border: `1.5px solid ${C.border}`,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: jakarta,
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.faint,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Assentos
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: jakarta,
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.ink,
                      }}
                    >
                      <Icon d={ICONS.seat} size={15} color={C.blue} />
                      {seatCount} assento{seatCount !== 1 ? "s" : ""}
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <button
                        onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          border: `1.5px solid ${C.border}`,
                          background: C.bg,
                          fontFamily: outfit,
                          fontWeight: 700,
                          fontSize: 18,
                          color: C.ink,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: outfit,
                          fontWeight: 700,
                          fontSize: 16,
                          color: C.ink,
                          minWidth: 20,
                          textAlign: "center",
                        }}
                      >
                        {seatCount}
                      </span>
                      <button
                        onClick={() =>
                          setSeatCount(Math.min(freeSeats, seatCount + 1))
                        }
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          border: `1.5px solid ${C.border}`,
                          background: C.bg,
                          fontFamily: outfit,
                          fontWeight: 700,
                          fontSize: 18,
                          color: C.ink,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 12,
                    border: `1.5px solid ${C.border}`,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: jakarta,
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.faint,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Ponto de embarque
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: jakarta,
                      fontSize: 14,
                      fontWeight: 600,
                      color: C.ink,
                    }}
                  >
                    <Icon d={ICONS.mapPin} size={15} color={C.blue} />
                    {originShort}
                  </div>
                </div>
              </div>

              {canBook && (
                <button
                  onClick={handleBook}
                  disabled={actionLoading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    cursor: actionLoading ? "not-allowed" : "pointer",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {actionLoading ? "Solicitando..." : "Solicitar Vaga"}
                </button>
              )}

              {myBooking && !isDriver && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div
                    style={{
                      borderRadius: 12,
                      padding: "12px 14px",
                      background:
                        myBooking.status === "pending" ? "#FFFBEB" : C.greenBg,
                      border: `1px solid ${myBooking.status === "pending" ? "#FDE68A" : "#A7F3D0"}`,
                      fontFamily: jakarta,
                      fontWeight: 600,
                      fontSize: 13.5,
                      color:
                        myBooking.status === "pending" ? "#92400E" : C.green,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon
                      d={
                        myBooking.status === "pending"
                          ? ICONS.clock
                          : ICONS.shield
                      }
                      size={15}
                      color={
                        myBooking.status === "pending" ? "#D97706" : C.green
                      }
                    />
                    {myBooking.status === "pending"
                      ? "Aguardando aprovação"
                      : "Vaga confirmada!"}
                  </div>
                  {ride.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(myBooking.id)}
                      disabled={actionLoading}
                      style={{
                        width: "100%",
                        height: 44,
                        borderRadius: 12,
                        border: "1.5px solid #FECACA",
                        background: "#FEF2F2",
                        color: "#DC2626",
                        fontFamily: jakarta,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        opacity: actionLoading ? 0.5 : 1,
                      }}
                    >
                      Cancelar reserva
                    </button>
                  )}
                </div>
              )}

              {!canBook &&
                !myBooking &&
                !isDriver &&
                freeSeats === 0 &&
                ride.status === "pending" && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px 0",
                      fontFamily: jakarta,
                      fontSize: 14,
                      color: C.faint,
                    }}
                  >
                    Todas as vagas estão preenchidas.
                  </div>
                )}

              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  marginTop: 16,
                  paddingTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  {
                    icon: ICONS.shield,
                    text: "Pagamento protegido pelo BoraLá",
                    color: C.green,
                  },
                  {
                    icon: ICONS.clock,
                    text: "Cancele grátis até 24h antes",
                    color: C.muted,
                  },
                ].map((g, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Icon d={g.icon} size={14} color={g.color} />
                    <span
                      style={{
                        fontFamily: jakarta,
                        fontSize: 13,
                        color: C.muted,
                      }}
                    >
                      {g.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {confirmedPassengers.length > 0 && (
              <div
                style={{
                  background: C.surface,
                  borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex" }}>
                  {confirmedPassengers.slice(0, 3).map((b, i) => {
                    const u = b.user ?? {};
                    return (
                      <div
                        key={i}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: [
                            C.gradient,
                            "linear-gradient(135deg,#F2A93B,#E05F20)",
                            "linear-gradient(135deg,#6EE7B7,#059669)",
                          ][i % 3],
                          border: "2.5px solid white",
                          marginLeft: i > 0 ? -10 : 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: outfit,
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#fff",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        {u.profile_picture_url ? (
                          <img
                            src={u.profile_picture_url}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          (u.name?.[0]?.toUpperCase() ?? "?")
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: 13.5,
                    color: C.muted,
                  }}
                >
                  {confirmedPassengers.length === 1 ? (
                    <>
                      <strong style={{ color: C.ink }}>
                        {confirmedPassengers[0].user?.name?.split(" ")[0] ??
                          "Alguém"}
                      </strong>{" "}
                      já reservou
                    </>
                  ) : (
                    <>
                      <strong style={{ color: C.ink }}>
                        {confirmedPassengers
                          .slice(0, 2)
                          .map((b) => b.user?.name?.split(" ")[0] ?? "?")
                          .join(" e ")}
                      </strong>{" "}
                      {confirmedPassengers.length > 2
                        ? `e mais ${confirmedPassengers.length - 2} `
                        : ""}
                      já reservaram
                    </>
                  )}
                </div>
              </div>
            )}

            {ride.automatic_approval && (
              <div
                style={{
                  background: C.bgCool,
                  borderRadius: 16,
                  border: `1px solid #BFDBFE`,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Icon d={ICONS.shield} size={16} color={C.blue} />
                <span
                  style={{
                    fontFamily: jakarta,
                    fontSize: 13,
                    color: C.navy,
                    fontWeight: 500,
                  }}
                >
                  Aprovação automática ativada
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
