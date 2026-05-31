import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

export default function CreateRidePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [originAddress, setOriginAddress] = useState("");
  const [originLat, setOriginLat] = useState("");
  const [originLng, setOriginLng] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationLat, setDestinationLat] = useState("");
  const [destinationLng, setDestinationLng] = useState("");
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

    setLoading(true);
    try {
      await api("/rides", {
        method: "POST",
        body: JSON.stringify({
          vehicle_id: Number(vehicleId),
          event_id: eventId ? Number(eventId) : null,
          origin_address: originAddress,
          origin_latitude: Number(originLat),
          origin_longitude: Number(originLng),
          destination_address: destinationAddress,
          destination_latitude: Number(destinationLat),
          destination_longitude: Number(destinationLng),
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
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Motorista</p>
          <h1 className="relative mt-2 text-3xl font-bold text-slate-900">Nova carona</h1>
          <p className="relative mt-2 text-slate-500">
            {eventId ? "Carona vinculada ao evento." : "Preencha os dados da sua carona."}
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-10 text-center">
            <p className="text-slate-500 mb-4">Você precisa de um veículo cadastrado para oferecer caronas.</p>
            <button onClick={() => navigate("/vehicles/new")} className="button-primary">
              Cadastrar veículo
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_12px_rgba(37,99,235,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Veículo</label>
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

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-700">Endereço de origem</span>
                  <input className="form-input mt-1.5" placeholder="Ex: Rua das Flores, 100 - SP" value={originAddress} onChange={(e) => setOriginAddress(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Latitude origem</span>
                  <input type="number" step="any" className="form-input mt-1.5" placeholder="-23.5505" value={originLat} onChange={(e) => setOriginLat(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Longitude origem</span>
                  <input type="number" step="any" className="form-input mt-1.5" placeholder="-46.6333" value={originLng} onChange={(e) => setOriginLng(e.target.value)} required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-700">Endereço de destino</span>
                  <input className="form-input mt-1.5" placeholder="Ex: Av. Paulista, 1000 - SP" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Latitude destino</span>
                  <input type="number" step="any" className="form-input mt-1.5" placeholder="-23.5630" value={destinationLat} onChange={(e) => setDestinationLat(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Longitude destino</span>
                  <input type="number" step="any" className="form-input mt-1.5" placeholder="-46.6543" value={destinationLng} onChange={(e) => setDestinationLng(e.target.value)} required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Data e horário de saída</span>
                  <input type="datetime-local" className="form-input mt-1.5" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Vagas disponíveis</span>
                  <input type="number" min={1} className="form-input mt-1.5" placeholder="Ex: 3" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Custo estimado (R$) — opcional</span>
                <input type="number" step="0.01" min={0} className="form-input mt-1.5" placeholder="Ex: 15.00" value={estimatedCost} onChange={(e) => setEstimatedCost(e.target.value)} />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Informações adicionais — opcional</span>
                <textarea className="form-input mt-1.5 resize-none" rows={3} placeholder="Ponto de encontro, observações, etc. (mínimo 20 caracteres se preenchido)" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" checked={automaticApproval} onChange={(e) => setAutomaticApproval(e.target.checked)} />
                <span className="text-sm font-semibold text-slate-700">Aprovar reservas automaticamente</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="button-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Criando..." : "Criar carona"}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200 cursor-pointer">
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
