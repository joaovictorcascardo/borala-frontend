import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanPhone = phone.replace(/\D/g, "");

      const response = await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          birth_date: birthDate,
          phone: Number(cleanPhone),
        }),
      });
      console.log("Sucesso:", response);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Criar Conta</h1>
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

        <Input
          id="phone"
          label="Seu telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          id="birthDate"
          label="Data de nascimento"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <Input
          id="password"
          label="Sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" text="Registrar" />

        <div>
          <Link to="/login">Já tem uma conta? Entrar</Link>
        </div>
      </form>
    </main>
  );
}
