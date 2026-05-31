import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { swal } from "../lib/swal";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await api("/vehicles");
        setVehicles(response);
      } catch (error) {
        if (error.message?.includes("não possui nenhum veículo")) {
          setVehicles([]);
        } else {
          swal.error("Erro", "Não foi possível carregar os veículos.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  async function handleDelete(id) {
    const result = await swal.confirm(
      "Tem certeza?",
      "Esta ação não pode ser desfeita!",
    );
    if (result.isConfirmed) {
      try {
        await api(`/vehicles/${id}`, { method: "DELETE" });
        swal.success("Sucesso!", "Veículo removido.");
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      } catch {
        swal.error("Erro", "Não foi possível remover o veículo.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-blue-100/80">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer text-lg"
            >
              ←
            </button>
            <span className="font-semibold text-slate-800">Meus Veículos</span>
          </div>
          <button
            onClick={() => navigate("/vehicles/new")}
            className="button-primary"
          >
            + Adicionar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-8 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/10 blur-[60px] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-blue-600">
            Motorista
          </p>
          <h1 className="relative mt-2 text-4xl font-bold text-slate-900">
            Meus veículos
          </h1>
          <p className="relative mt-3 text-slate-500 max-w-xl">
            Cadastre e gerencie os veículos vinculados à sua conta.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-12 text-center">
            <p className="text-slate-500 mb-5">
              Você ainda não possui veículos cadastrados.
            </p>
            <button
              onClick={() => navigate("/vehicles/new")}
              className="button-primary"
            >
              Cadastrar primeiro veículo
            </button>
          </div>
        ) : (
          <section className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">
                Frota
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Veículos cadastrados
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {vehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="rounded-2xl border border-blue-100 bg-white p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-[0_4px_16px_rgba(37,99,235,0.10)] shadow-[0_2px_8px_rgba(37,99,235,0.06)]"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-bold text-slate-900">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {vehicle.license_plate}
                      </p>
                    </div>
                    <span className="rounded-full border border-blue-300/50 bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-600 shrink-0">
                      {vehicle.seats} vagas
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {vehicle.color} · {vehicle.year}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                      className="inline-flex items-center rounded-xl border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
