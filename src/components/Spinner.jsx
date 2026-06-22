export function Spinner({ className = "py-24" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
