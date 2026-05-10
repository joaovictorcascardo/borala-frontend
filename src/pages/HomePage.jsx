import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("@Borala:token");
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
