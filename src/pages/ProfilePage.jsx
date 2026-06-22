import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { swal } from "../lib/swal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/me");
        setUserData(response);
        setName(response.name || "");
        setPhone(response.phone ? String(response.phone) : "");
        setBio(response.bio || "");
        setAvatarUrl(response.profile_picture_url || null);

        const rev = await api.get(`/users/${response.id}/reviews?page=1&limit=20`).catch(() => []);
        setReviews(Array.isArray(rev) ? rev : []);
      } catch {
        await swal.error("Não foi possível carregar os dados do perfil.", "Erro ao carregar");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploadingAvatar(true);

    try {
      const updated = await api.patch("/users/me/avatar", formData);
      setAvatarUrl(updated.profile_picture_url);
      swal.successToast("Avatar atualizado com sucesso!");
    } catch (err) {
      swal.errorToast(err.message || "Erro ao atualizar avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await api.put("/users/me", {
        name,
        phone: Number(phone),
        bio: bio || null,
      });
      setUserData(updated);
      updateUser(updated);
      swal.successToast("Perfil atualizado com sucesso!");
    } catch (err) {
      swal.error(err.message || "Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  const initial = userData?.name?.[0]?.toUpperCase() || "?";

  return (
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
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <p className="section-label mb-1">Nascimento</p>
              <p className="text-slate-700 font-medium text-sm">
                {userData?.birth_date
                  ? new Date(userData.birth_date).toLocaleDateString("pt-BR")
                  : "—"}
              </p>
            </div>
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <p className="section-label mb-1">Avaliação</p>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-slate-700 font-medium text-sm">{userData?.average_rating ?? "—"}</p>
              </div>
            </div>
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <p className="section-label mb-1">Telefone</p>
              <p className="text-slate-700 font-medium text-sm">{phone || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5">Editar informações</h3>
        <form onSubmit={handleSubmit}>
          <Input id="name" label="Nome completo" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input id="phone" label="Telefone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input id="bio" label="Bio" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
          <Button type="submit" text={saving ? "Salvando..." : "Salvar alterações"} disabled={saving} />
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800">Avaliações recebidas</h3>
          {reviews.length > 0 && (
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
              {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
            </span>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="bg-blue-50/60 rounded-xl border border-blue-100 px-4 py-6 text-center">
            <p className="text-sm text-slate-400">Você ainda não recebeu nenhuma avaliação.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((rev, i) => (
              <li key={i} className="bg-blue-50/60 rounded-xl border border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm tracking-tight">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={n <= rev.rating ? "text-amber-400" : "text-slate-200"}>★</span>
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{Number(rev.rating).toFixed(1)}</span>
                </div>
                {rev.comment && (
                  <p className="text-sm text-slate-600 leading-relaxed">"{rev.comment}"</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
