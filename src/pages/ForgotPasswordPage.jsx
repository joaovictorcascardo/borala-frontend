import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { swal } from "../lib/swal";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/authenticator/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      await swal.success(
        "Verifique sua caixa de entrada e siga as instruções.",
        "E-mail enviado!"
      );
      navigate("/login");
    } catch (err) {
      swal.error(err.message || "Não foi possível enviar o e-mail. Tente novamente.");
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-slate-800 mb-1">Recuperar senha</h1>
          <p className="text-slate-500 text-sm mb-6">
            Informe seu e-mail e enviaremos as instruções de recuperação
          </p>

          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" text="Enviar instruções" />
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Lembrou a senha?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
}
