import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import BookCard from '../components/BookCard';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (err) {
      setError('Erro ao carregar favoritos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Carregando favoritos...
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Meus Favoritos
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Livros que você marcou como favoritos
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3 className="empty-title">
            Nenhum favorito ainda
          </h3>
          <p className="empty-text">
            Explore a biblioteca e adicione livros aos seus favoritos!
          </p>
        </div>
      ) : (
        <div className="book-grid">
          {favorites.map((favorite) => (
            <BookCard
              key={favorite.id}
              book={favorite.book}
              isFavorite={true}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 