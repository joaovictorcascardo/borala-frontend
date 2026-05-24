import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
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
      } catch {
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
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3333";
      const response = await fetch(`${baseURL}/users/me/avatar`, {
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
        body: JSON.stringify({ name, phone: Number(phone), bio: bio || null }),
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initial = userData?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span className="font-semibold text-slate-800">Meu Perfil</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full" />
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-14 mb-5">
              <label className="cursor-pointer group relative">
                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-blue-100 flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">{initial}</span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploadingAvatar}
                />
              </label>

              {uploadingAvatar && (
                <span className="text-sm text-blue-600 font-medium animate-pulse">Enviando...</span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-1">{userData?.name}</h2>
            <p className="text-sm text-slate-500 mb-5">{userData?.email}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Nascimento</p>
                <p className="text-slate-700 font-medium text-sm">
                  {userData?.birth_date
                    ? new Date(userData.birth_date).toLocaleDateString("pt-BR")
                    : "—"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Avaliação</p>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-slate-700 font-medium text-sm">
                    {userData?.average_rating ?? "—"}
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Telefone</p>
                <p className="text-slate-700 font-medium text-sm">{phone || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5">Editar informações</h3>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Nome completo"
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

            <Button
              type="submit"
              text={saving ? "Salvando..." : "Salvar alterações"}
              disabled={saving}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
