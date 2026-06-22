import { useNavigate } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";

export function RideCard({ ride, children }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/rides/${ride.id}`)}
      className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)] hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-bold text-slate-900 text-sm leading-snug">{ride.origin_address}</p>
        <StatusBadge status={ride.status} />
      </div>
      <p className="text-sm text-slate-500 mb-3">→ {ride.destination_address}</p>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
          {new Date(ride.departure_time).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
          {ride.available_seats} vaga{ride.available_seats !== 1 ? "s" : ""}
        </span>
        {ride.estimated_total_cost && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            R$ {Number(ride.estimated_total_cost).toFixed(2)}
          </span>
        )}
      </div>

      {children && (
        <div className="mt-3 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </li>
  );
}
