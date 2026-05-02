import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api("/authenticator/sessions", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log("Sucesso:", response);
      localStorage.setItem("@Borala:token", response.token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Entrar no Borala</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Insira o e-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Insira a senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
