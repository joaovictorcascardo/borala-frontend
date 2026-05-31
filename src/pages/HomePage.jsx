import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { swal } from "../lib/swal";

export default function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("@Borala:user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api("/users/me");
        setUserData(response);
        localStorage.setItem("@Borala:user", JSON.stringify(response));
      } catch {
        localStorage.removeItem("@Borala:token");
        localStorage.removeItem("@Borala:user");
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const { isConfirmed } = await swal.confirm("Sair da conta?", "Você será redirecionado para o login.", { confirmText: "Sair" });
    if (!isConfirmed) return;
    localStorage.removeItem("@Borala:user");
    localStorage.removeItem("@Borala:token");
    navigate("/login");
  };

  const firstName = userData?.name?.split(" ")[0] || "Viajante";
  const initial = userData?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-blue-100/80">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Borala
            </span>
            <span className="highlight-badge hidden sm:inline-block">Beta</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 cursor-pointer"
            >
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-blue-700 font-bold text-xs">{initial}</span>
              </div>
              <span className="hidden sm:block">{firstName}</span>
            </button>

            <div className="w-px h-5 bg-slate-200" />

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer border border-transparent text-red-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="relative rounded-3xl bg-white border border-blue-100 shadow-elevated overflow-hidden p-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-indigo-400/8 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-block uppercase tracking-[0.3em] text-xs font-bold bg-blue-600 text-white rounded-full px-4 py-1.5 mb-5">
              Bem-vindo de volta
            </span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Olá, {firstName}! ✈️
            </h1>
            <p className="text-slate-500 text-lg">Bora pra onde hoje?</p>
          </div>
        </div>

        <div>
          <p className="section-label mb-4">Acesso rápido</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <button
              onClick={() => navigate("/profile")}
              className="group card-base p-6 text-left hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Meu Perfil</h3>
              <p className="text-sm text-slate-500">Gerencie suas informações pessoais</p>
            </button>

            <button
              onClick={() => navigate("/vehicles")}
              className="group card-base p-6 text-left hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-bold text-lg">C</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Meus Veículos</h3>
              <p className="text-sm text-slate-500">Gerencie sua frota de veículos</p>
            </button>

            <button
              onClick={() => navigate("/events")}
              className="group card-base p-6 text-left hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Eventos</h3>
              <p className="text-sm text-slate-500">Veja eventos e caronas disponíveis</p>
            </button>

            <button
              onClick={() => navigate("/rides/new")}
              className="group card-base p-6 text-left hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">Oferecer Carona</h3>
              <p className="text-sm text-slate-500">Crie uma carona sem vínculo com evento</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
