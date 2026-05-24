export function Button({ type = "button", text, onClick, disabled, variant = "primary", ...props }) {
  const base =
    "w-full font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:shadow-md",
    danger:
      "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary}`}
      {...props}
    >
      {text}
    </button>
  );
}
