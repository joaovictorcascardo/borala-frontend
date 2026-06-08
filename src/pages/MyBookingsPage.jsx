import { useEffect, useState } from "react";
import { api } from "../services/api";
import { swal } from "../lib/swal";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const data = await api("/bookings/me");
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      swal.error(error.message || "Erro ao carregar reservas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleCancel(bookingId) {
    if (window.confirm("Deseja mesmo cancelar essa reserva?")) {
      try {
        await api(`/bookings/${bookingId}`, { method: "DELETE" });
        alert("Reserva cancelada!");
        loadBookings();
      } catch (error) {
        alert("Erro: " + error.message);
      }
    }
  }

  if (loading) {
    return <div style={{ padding: "20px" }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Minhas Reservas</h1>
      <p>Aqui você vê as caronas que você reservou:</p>

      {bookings.length === 0 ? (
        <p>Você não tem nenhuma reserva.</p>
      ) : (
        <div>
          {bookings.map((booking) => {
            const ride = booking.ride || {};
            const driver = ride.driver || ride.user || {};
            return (
              <div
                key={booking.id}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>Origem:</strong> {ride.origin_address}
                </p>
                <p>
                  <strong>Destino:</strong> {ride.destination_address}
                </p>
                <p>
                  <strong>Data:</strong> {ride.departure_time ? new Date(ride.departure_time).toLocaleString() : "Não informada"}
                </p>
                <p>
                  <strong>Vagas:</strong> {booking.seats_booked}
                </p>
                <p>
                  <strong>Motorista:</strong> {driver.name || "Não informado"}
                </p>
                <p>
                  <strong>Preço:</strong> R$ {ride.estimated_total_cost || "0.00"}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                {(booking.status === "PENDING" ||
                  booking.status === "CONFIRMED" ||
                  booking.status === "pending" ||
                  booking.status === "confirmed") && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar Reserva
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
