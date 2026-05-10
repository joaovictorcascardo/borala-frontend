import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
export default function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem("@Borala:user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    const procurarDados = async () => {
      try {
        const response = await api("/users/me");
        setUserData(response);
        localStorage.setItem("@Borala:user", JSON.stringify(response));
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        localStorage.removeItem("@Borala:token");
        localStorage.removeItem("@Borala:user");
        navigate("/login");
      }
    };

    procurarDados();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("@Borala:user");
    localStorage.removeItem("@Borala:token");
    navigate("/login");
  };
  return (
    <div>
      <div>
        <h1>E aí, {userData?.name || "Viajante"}!</h1>
        <p>Bora pra onde hoje?</p>
      </div>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
