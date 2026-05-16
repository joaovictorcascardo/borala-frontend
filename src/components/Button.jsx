export function Button({ type = "button", text, onClick, disabled, ...props }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  );
}
