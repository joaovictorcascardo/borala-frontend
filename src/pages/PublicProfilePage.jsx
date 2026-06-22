import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { PublicProfileSkeleton } from '../components/Skeleton';

function Stars({ rating }) {
  return (
    <span className="text-sm tracking-tight">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}>★</span>
      ))}
    </span>
  );
}

export default function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    const fetchAll = async () => {
      try {
        const userData = await api.get(`/users/${id}`);
        setUser(userData);
      } catch {
        setError("Não foi possível carregar o perfil deste usuário.");
        setLoading(false);
        return;
      }

      try {
        const reviewData = await api.get(`/users/${id}/reviews`);
        setReviews(Array.isArray(reviewData) ? reviewData : []);
      } catch {
        setReviews([]);
      }

      setLoading(false);
    };
    fetchAll();
  }, [id]);

  if (loading) return <PublicProfileSkeleton />;

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
  const showImage = user?.profile_picture_url && !imgError;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      ) : (
        <>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_4px_20px_rgba(37,99,235,0.10)]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 overflow-hidden shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
                {showImage ? (
                  <img
                    src={user.profile_picture_url}
                    alt={initial}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  initial
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-1">Viajante</p>
                <h1 className="text-xl font-bold text-slate-900 truncate">{user?.name}</h1>
                {user?.average_rating ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Stars rating={user.average_rating} />
                    <span className="text-sm font-semibold text-slate-700">{Number(user.average_rating).toFixed(1)}</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 mt-1">Sem avaliações ainda</p>
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Avaliação média</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {user?.average_rating ? Number(user.average_rating).toFixed(1) : '—'}
                  <span className="text-base text-amber-400 ml-1">★</span>
                </p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Avaliações</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{reviews.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_8px_rgba(37,99,235,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-3">Sobre</p>
            <p className="text-slate-600 leading-relaxed">
              {user?.bio || 'Este viajante ainda não adicionou uma bio.'}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_2px_8px_rgba(37,99,235,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">Avaliações recebidas</p>
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-400">Este viajante ainda não recebeu avaliações.</p>
            ) : (
              <ul className="space-y-3">
                {reviews.map((review, i) => (
                  <li key={i} className="rounded-xl border border-blue-100 bg-blue-50/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Stars rating={review.rating} />
                      <span className="text-sm font-semibold text-slate-700">{Number(review.rating).toFixed(1)}</span>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-slate-600 leading-relaxed">"{review.comment}"</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </main>
  );
}
