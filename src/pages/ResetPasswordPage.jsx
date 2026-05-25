import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { swal } from "../lib/swal";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      swal.error("As senhas não coincidem. Verifique e tente novamente.", "Senhas diferentes");
      return;
    }

    try {
      await api("/authenticator/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      await swal.success("Sua senha foi alterada. Faça login com a nova senha.", "Senha redefinida!");
      navigate("/login");
    } catch (err) {
      swal.error(err.message || "Não foi possível redefinir a senha. O link pode ter expirado.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Borala</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-slate-800 mb-1">Criar nova senha</h1>
          <p className="text-slate-500 text-sm mb-6">Digite e confirme sua nova senha</p>

          <form onSubmit={handleSubmit}>
            <Input
              id="password"
              label="Nova senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="passwordConfirmation"
              label="Confirmar nova senha"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button type="submit" text="Salvar nova senha" />
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}
