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
      localStorage.setItem("@Borala:token", response.token);
      navigate("/");
    } catch (error) {
      alert(error.message);
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
          <p className="text-slate-500 text-sm mt-1">Sua plataforma de viagens</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Bem-vindo de volta!</h1>
          <p className="text-slate-500 text-sm mb-6">Entre com suas credenciais para continuar</p>

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

            <div className="flex justify-end mb-5">
              <Link
                to="/forgot"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button type="submit" text="Entrar" />
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
