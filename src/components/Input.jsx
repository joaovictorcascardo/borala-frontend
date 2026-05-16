export function Input({ label, type, id, value, onChange }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
