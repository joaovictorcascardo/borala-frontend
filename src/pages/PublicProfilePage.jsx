import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api(`/users/${id}`);
        setUser(response);
      } catch (err) {
        console.error(err);
        setError("Não carregou o perfil deste usuário.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);


  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Buscando viajante</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button onClick={() => navigate(-1)} className="btn-secondary">
          Retornar
        </button>
      </div>
    );
  }


  return (
    <div className="profile-page-container">
      <div className="profile-card">


        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>

          <div className="profile-info">
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>

            <div className="profile-rating">
              Nota: {user?.rating ? user.rating : 'Não tem avaliações'}
            </div>
          </div>
        </div>


        <div className="profile-body">
          <h2>Sobre o Viajante</h2>
          <p className="profile-bio">
            {user?.bio || 'Este usuário não adicionou biografia.'}
          </p>
        </div>


        <div className="profile-actions">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Voltar para caronas
          </button>
        </div>

      </div>
    </div>
  );
}