import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

export default function EditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadVehicle() {
      try {
        const response = await api("/vehicles");
        const vehicle = response.find((v) => String(v.id) === String(id));
        if (!vehicle) {
          navigate("/vehicles");
          return;
        }
        setBrand(vehicle.brand);
        setModel(vehicle.model);
        setColor(vehicle.color);
        setLicensePlate(vehicle.license_plate);
        setYear(vehicle.year.toString());
        setSeats(vehicle.seats.toString());
      } catch {
        navigate("/vehicles");
      } finally {
        setPageLoading(false);
      }
    }
    loadVehicle();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api(`/vehicles/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          brand,
          model,
          color,
          year: Number(year),
          seats: Number(seats),
        }),
      });
      swal.success("Sucesso!", "Veículo atualizado com sucesso.");
      navigate("/vehicles");
    } catch (error) {
      swal.error("Erro", error.message || "Não foi possível atualizar o veículo.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
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
            onClick={() => navigate("/vehicles")}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer text-lg"
          >
            ←
          </button>
          <span className="font-semibold text-slate-800">Editar Veículo</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Motorista</p>
          <h1 className="relative mt-2 text-3xl font-bold text-slate-900">Editar veículo</h1>
          <p className="relative mt-2 text-slate-500">Atualize as informações do veículo cadastrado.</p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_12px_rgba(37,99,235,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-1">Editar</p>
          <h2 className="text-xl font-bold text-slate-900 mb-5">Informações do veículo</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Placa</span>
                <input
                  className="form-input mt-1.5 bg-slate-50 text-slate-400 cursor-not-allowed"
                  value={licensePlate}
                  disabled
                />
                <span className="text-xs text-slate-400 mt-1 block">A placa não pode ser alterada.</span>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Marca</span>
                <input
                  className="form-input mt-1.5"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Modelo</span>
                <input
                  className="form-input mt-1.5"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Cor</span>
                <input
                  className="form-input mt-1.5"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Ano</span>
                <input
                  type="number"
                  className="form-input mt-1.5"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Vagas disponíveis</span>
                <input
                  type="number"
                  className="form-input mt-1.5"
                  min={1}
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="button-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/vehicles")}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
