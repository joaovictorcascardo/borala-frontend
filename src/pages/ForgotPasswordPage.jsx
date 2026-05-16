import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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
        <Input
          id="email"
          label="Seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" text="Enviar codigo" />

        <div>
          <Link to="/login">Lembrou da senha? Voltar ao Login</Link>
        </div>
      </form>
    </main>
  );
}
