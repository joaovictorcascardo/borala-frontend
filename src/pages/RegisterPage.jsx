import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { swal } from "../lib/swal";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("@Borala:token")) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          birth_date: birthDate,
          phone: Number(cleanPhone),
        }),
      });
      await swal.success("Sua conta foi criada! Faça login para continuar.", "Bem-vindo ao Borala!");
      navigate("/login");
    } catch (err) {
      swal.error(err.message || "Erro ao criar conta. Tente novamente.");
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
          <p className="text-slate-500 text-sm mt-1">Crie sua conta e comece a explorar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Criar conta</h1>
          <p className="text-slate-500 text-sm mb-6">Preencha seus dados para se cadastrar</p>

          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="email"
              label="Seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="phone"
                label="Telefone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                id="birthDate"
                label="Nascimento"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <Input
              id="password"
              label="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" text="Criar conta" />
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
