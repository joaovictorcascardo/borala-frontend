import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("As senhas não coincidem!");
    }

    try {
      const response = await api("/authenticator/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token: token,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      });

      alert("Senha alterada com sucesso!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Criar Nova Senha</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Nova Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="passwordConfirmation">Confirmar Nova Senha</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button type="submit">Salvar nova senha</button>
      </form>
    </main>
  );
}
