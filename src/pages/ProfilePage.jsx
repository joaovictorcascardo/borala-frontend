import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Input } from "../components/Input";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api("/users/me");
        setUserData(response);
        setName(response.name || "");
        setPhone(response.phone ? String(response.phone) : "");
        setBio(response.bio || "");
      } catch (err) {
        setError("Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated = await api("/users/me", {
        method: "PUT",
        body: JSON.stringify({
          name,
          phone: Number(phone),
          bio: bio || null,
        }),
      });

      setUserData(updated);
      localStorage.setItem("@Borala:user", JSON.stringify(updated));
      setSuccess("Perfil atualizado com sucesso!");
    } catch (err) {
      setError(err.message || "Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando</p>;

  return (
    <div>
      <h1>Bem-vindo, {userData?.name || "Viajante"}</h1>

      <p>
        <strong>E-mail:</strong> {userData?.email}
      </p>
      <p>
        <strong>Data de nascimento:</strong>{" "}
        {userData?.birth_date
          ? new Date(userData.birth_date).toLocaleDateString("pt-BR")
          : "—"}
      </p>
      <p>
        <strong>Avaliação média:</strong> {userData?.average_rating ?? "—"}
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          id="bio"
          label="Bio"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Salvando" : "Salvar alterações"}
        </button>
      </form>
    </div>
  );
}
