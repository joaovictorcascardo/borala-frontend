import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api("/authenticator/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      alert("Instruções de recuperação enviadas para o seu e-mail!");
      navigate("/login");
      console.log("Sucesso:", response);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <main>
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Seu email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Enviar codigo</button>
      </form>
    </main>
  );
}
