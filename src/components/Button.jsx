export function Button({ type = "button", text, onClick, disabled, variant = "primary", ...props }) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={variants[variant] ?? "btn-primary"}
      {...props}
    >
      {text}
    </button>
  );
}
