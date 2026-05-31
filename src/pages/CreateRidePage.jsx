import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";
import { AddressInput } from "../components/AddressInput";

export default function CreateRidePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [automaticApproval, setAutomaticApproval] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await api("/vehicles");
        setVehicles(Array.isArray(response) ? response : []);
      } catch {
        setVehicles([]);
      } finally {
        setLoadingVehicles(false);
      }
    }
    loadVehicles();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!vehicleId) {
      swal.error("Selecione um veículo para continuar.");
      return;
    }
    if (!origin) {
      swal.error("Confirme o endereço de origem — preencha o CEP e o número.");
      return;
    }
    if (!destination) {
      swal.error("Confirme o endereço de destino — preencha o CEP e o número.");
      return;
    }

    setLoading(true);
    try {
      await api("/rides", {
        method: "POST",
        body: JSON.stringify({
          vehicle_id: Number(vehicleId),
          event_id: eventId ? Number(eventId) : null,
          origin_address: origin.address,
          origin_latitude: origin.lat,
          origin_longitude: origin.lng,
          destination_address: destination.address,
          destination_latitude: destination.lat,
          destination_longitude: destination.lng,
          departure_time: departureTime,
          available_seats: Number(availableSeats),
          estimated_total_cost: estimatedCost ? Number(estimatedCost) : null,
          additional_info: additionalInfo || null,
          automatic_approval: automaticApproval,
        }),
      });
      await swal.success("Carona criada com sucesso!", "Tudo certo!");
      eventId ? navigate(`/events/${eventId}/rides`) : navigate("/");
    } catch (error) {
      swal.error(error.message || "Não foi possível criar a carona.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingVehicles) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-blue-100/80">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer text-lg"
          >
            ←
          </button>
          <span className="font-semibold text-slate-800">Oferecer Carona</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">
            Motorista
          </p>
          <h1 className="relative mt-2 text-3xl font-bold text-slate-900">
            Nova carona
          </h1>
          <p className="relative mt-2 text-slate-500">
            {eventId
              ? "Carona vinculada ao evento."
              : "Preencha os dados da sua carona."}
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-10 text-center">
            <p className="text-slate-500 mb-4">
              Você precisa de um veículo cadastrado para oferecer caronas.
            </p>
            <button
              onClick={() => navigate("/vehicles/new")}
              className="button-primary"
            >
              Cadastrar veículo
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_12px_rgba(37,99,235,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Veículo
                </label>
                <select
                  className="form-input"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                >
                  <option value="">Selecione um veículo</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model} — {v.license_plate}
                    </option>
                  ))}
                </select>
              </div>

              <AddressInput
                label="Endereço de origem"
                onSelect={(data) => setOrigin(data)}
                required
              />

              <AddressInput
                label="Endereço de destino"
                onSelect={(data) => setDestination(data)}
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Data e horário de saída
                  </span>
                  <input
                    type="datetime-local"
                    className="form-input mt-1.5"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Vagas disponíveis
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="form-input mt-1.5"
                    placeholder="Ex: 3"
                    value={availableSeats}
                    onChange={(e) => setAvailableSeats(e.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Custo estimado (R$) — opcional
                </span>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  className="form-input mt-1.5"
                  placeholder="Ex: 15.00"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Informações adicionais — opcional
                </span>
                <textarea
                  className="form-input mt-1.5 resize-none"
                  rows={3}
                  placeholder="Ponto de encontro, observações... (mínimo 20 caracteres se preenchido)"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={automaticApproval}
                  onChange={(e) => setAutomaticApproval(e.target.checked)}
                />
                <span className="text-sm font-semibold text-slate-700">
                  Aprovar reservas automaticamente
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Criando..." : "Criar carona"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
