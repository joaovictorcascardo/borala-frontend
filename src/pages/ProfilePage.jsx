import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Input } from "../components/Input";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
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
        setAvatarUrl(response.profile_picture_url || null);
      } catch (err) {
        setError("Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploadingAvatar(true);
    setError("");

    try {
      const token = localStorage.getItem("@Borala:token");
      const response = await fetch("http://localhost:3333/users/me/avatar", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao enviar avatar.");
      }

      const updated = await response.json();
      setAvatarUrl(updated.profile_picture_url);
      setSuccess("Avatar atualizado com sucesso!");
    } catch (err) {
      setError(err.message || "Erro ao atualizar avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

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

      <div>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Sem foto</span>
          </div>
        )}
        <label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
            disabled={uploadingAvatar}
          />
          <span style={{ cursor: "pointer" }}>
            {uploadingAvatar ? "Enviando" : "Trocar foto"}
          </span>
        </label>
      </div>

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
