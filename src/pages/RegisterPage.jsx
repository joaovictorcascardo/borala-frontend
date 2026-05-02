import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

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
      const response = await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          birth_date: birthDate,
          phone: Number(phone),
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
        <label htmlFor="name">Seu nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Seu e-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Seu telefone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="birthDate">Data de nascimento</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label htmlFor="password">Sua senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}
