import { RIDE_STATUS_LABEL, RIDE_STATUS_STYLE } from "../constants/status";

export function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span
      className={`shrink-0 text-xs font-semibold border rounded-full px-2.5 py-0.5 ${
        RIDE_STATUS_STYLE[status] ?? "text-slate-600 bg-slate-50 border-slate-200"
      }`}
    >
      {RIDE_STATUS_LABEL[status] ?? status}
    </span>
  );
}
