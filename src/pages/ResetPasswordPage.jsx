import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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
        <Input
          id="password"
          label="Nova Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          id="passwordConfirmation"
          label="Confirmar Nova Senha"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <Button type="submit" text="Salvar nova senha" />
      </form>
    </main>
  );
}
