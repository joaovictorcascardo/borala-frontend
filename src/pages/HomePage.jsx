import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

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

  const handleLogout = () => {
    localStorage.removeItem("@Borala:user");
    localStorage.removeItem("@Borala:token");
    navigate("/login");
  };

  const firstName = userData?.name?.split(" ")[0] || "Viajante";
  const initial = userData?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-lg">Borala</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-blue-700 font-bold text-sm">{initial}</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">{userData?.name}</span>
            </button>

            <div className="w-px h-5 bg-slate-200" />

            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-500 transition-colors font-medium cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 shadow-xl overflow-hidden relative">
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 right-20 w-28 h-28 bg-white/5 rounded-full" />

          <p className="text-blue-200 text-sm font-medium mb-1 relative">Olá,</p>
          <h1 className="text-3xl font-bold text-white mb-2 relative">{firstName}! ✈️</h1>
          <p className="text-blue-100 text-base relative">Bora pra onde hoje?</p>
        </div>

        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Acesso rápido
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-left cursor-pointer group"
          >
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Meu Perfil</h3>
            <p className="text-sm text-slate-500">Gerencie suas informações pessoais</p>
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-2xl z-10">
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Em breve</span>
            </div>
            <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-300 mb-1">Explorar</h3>
            <p className="text-sm text-slate-300">Descubra novos destinos</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-10">
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Em breve</span>
            </div>
            <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-300 mb-1">Minhas Viagens</h3>
            <p className="text-sm text-slate-300">Histórico e próximas viagens</p>
          </div>
        </div>
      </main>
    </div>
  );
}
