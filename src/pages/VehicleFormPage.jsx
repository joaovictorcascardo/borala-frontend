import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

export default function VehicleFormPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    if (Number(year) < 1950 || Number(year) > currentYear + 1) {
      swal.error("Erro", "Por favor, insira um ano válido.");
      return;
    }

    if (licensePlate.length !== 7) {
      swal.error("Erro", "A placa deve conter exatamente 7 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/vehicles", {
        brand,
        model,
        color,
        license_plate: licensePlate.toUpperCase(),
        year: Number(year),
        seats: Number(seats),
      });
      swal.success("Sucesso!", "Veículo adicionado com sucesso.");
      navigate("/vehicles");
    } catch (error) {
      if (error.message?.toLowerCase().includes("placa")) {
        swal.error("Placa já cadastrada", "Este veículo já está registrado no sistema. Verifique a placa informada.");
      } else {
        swal.error("Erro", error.message || "Não foi possível adicionar o veículo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <button
        onClick={() => navigate("/vehicles")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Veículos
      </button>

      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Motorista</p>
        <h1 className="relative mt-2 text-3xl font-bold text-slate-900">Novo veículo</h1>
        <p className="relative mt-2 text-slate-500">Preencha os dados do veículo que deseja cadastrar.</p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_12px_rgba(37,99,235,0.08)]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-1">Cadastrar</p>
        <h2 className="text-xl font-bold text-slate-900 mb-5">Informações do veículo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Marca</span>
              <input className="form-input mt-1.5" placeholder="Ex: Fiat" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Modelo</span>
              <input className="form-input mt-1.5" placeholder="Ex: Uno" value={model} onChange={(e) => setModel(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Cor</span>
              <input className="form-input mt-1.5" placeholder="Ex: Prata" value={color} onChange={(e) => setColor(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Placa</span>
              <input className="form-input mt-1.5" placeholder="Ex: ABC1D23" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value.toUpperCase())} maxLength={7} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Ano</span>
              <input type="number" className="form-input mt-1.5" placeholder="Ex: 2015" value={year} onChange={(e) => setYear(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Vagas disponíveis</span>
              <input type="number" className="form-input mt-1.5" placeholder="Ex: 4" min={1} value={seats} onChange={(e) => setSeats(e.target.value)} required />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="button-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {loading ? "Salvando..." : "Salvar veículo"}
            </button>
            <button type="button" onClick={() => navigate("/vehicles")} className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-200 cursor-pointer">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
