import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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
        <Input
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" text="Entrar" />

        <div>
          <Link to="/register">Não tem conta? Criar agora</Link>
          <Link to="/forgot">Esqueci minha senha</Link>
        </div>
      </form>
    </main>
  );
}
