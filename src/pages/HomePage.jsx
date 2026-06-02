import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("@Borala:user")); } catch { return null; }
  });

  useEffect(() => {
    api("/users/me")
      .then((data) => {
        setUserData(data);
        localStorage.setItem("@Borala:user", JSON.stringify(data));
      })
      .catch(() => {
        localStorage.removeItem("@Borala:token");
        localStorage.removeItem("@Borala:user");
        navigate("/login");
      });
  }, [navigate]);

  const firstName = userData?.name?.split(" ")[0] || "Viajante";

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Encontre caronas",
      description: "Busque por origem, destino, data e custo máximo para encontrar a carona ideal.",
      action: () => navigate("/rides"),
      label: "Buscar agora",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: "Ofereça carona",
      description: "Cadastre uma carona, defina as vagas e o custo estimado da viagem.",
      action: () => navigate("/rides/new"),
      label: "Criar carona",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Eventos",
      description: "Veja os eventos disponíveis e encontre caronas vinculadas a cada um.",
      action: () => navigate("/events"),
      label: "Ver eventos",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <span className="inline-block bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.25em] rounded-full px-4 py-1.5 mb-6">
            Bem-vindo de volta, {firstName}!
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-5">
            Sua carona começa{" "}
            <span className="text-blue-200">aqui</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-10">
            Conecte-se com motoristas e passageiros. Viaje de forma econômica, prática e sustentável.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/rides")}
              className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200"
            >
              Buscar caronas
            </button>
            <button
              onClick={() => navigate("/rides/new")}
              className="bg-white/15 border border-white/30 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/25 transition-all duration-200"
            >
              Oferecer carona
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="section-label mb-2">Como funciona</p>
          <h2 className="text-3xl font-bold text-slate-900">Tudo que você precisa</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-blue-100 bg-white p-7 shadow-subtle hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 text-blue-600 group-hover:bg-blue-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{f.description}</p>
              <button
                onClick={f.action}
                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                {f.label}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center text-white">
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3">Pronto para viajar?</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Gerencie suas caronas, acompanhe seus eventos e mantenha seus veículos atualizados.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate("/my-rides")}
                className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:scale-105 duration-200"
              >
                Minhas caronas
              </button>
              <button
                onClick={() => navigate("/events")}
                className="bg-white/15 border border-white/30 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/25 transition-all duration-200"
              >
                Ver eventos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
