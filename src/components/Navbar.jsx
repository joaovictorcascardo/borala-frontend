import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { swal } from "../lib/swal";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initial = user?.name?.[0]?.toUpperCase() || "?";
  const firstName = user?.name?.split(" ")[0] || "";

  const handleLogout = async () => {
    const { isConfirmed } = await swal.confirm("Sair da conta?", "Você será redirecionado para o login.", { confirmText: "Sair" });
    if (!isConfirmed) return;
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-blue-100/80">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2">
        <NavLink to="/" className="flex items-center gap-2 mr-3 shrink-0">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            Borala
          </span>
        </NavLink>

        <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto">
          <NavLink to="/rides" end className={linkClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Caronas</span>
          </NavLink>

          <NavLink to="/events" end className={linkClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Eventos</span>
          </NavLink>

          <NavLink to="/my-rides" end className={linkClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Minhas Caronas</span>
          </NavLink>

          <NavLink to="/my-bookings" end className={linkClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Minhas Reservas</span>
          </NavLink>

          <NavLink to="/vehicles" end className={linkClass}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Veículos</span>
          </NavLink>

          <NavLink
            to="/rides/new"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ml-1 shrink-0 ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-[0_2px_10px_rgba(37,99,235,0.30)]"
              }`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:block whitespace-nowrap">Oferecer</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 cursor-pointer"
          >
            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-blue-700 font-bold text-xs">{initial}</span>
            </div>
            <span className="hidden md:block">{firstName}</span>
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-xl px-2.5 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
