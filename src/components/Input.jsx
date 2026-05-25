export function Input({ label, type, id, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label htmlFor={id} className="text-sm font-medium text-body">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
}
