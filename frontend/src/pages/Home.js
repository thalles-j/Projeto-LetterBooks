import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';

const Home = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/book');
      setBooks(response.data);
    } catch (err) {
      setError('Erro ao carregar livros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  const handleFavorite = async (bookId) => {
    try {
      const existingFavorite = favorites.find(fav => fav.bookId === bookId);
      
      if (existingFavorite) {
        // Remover dos favoritos
        await api.delete(`/favorites/${existingFavorite.id}`);
        setFavorites(favorites.filter(fav => fav.id !== existingFavorite.id));
      } else {
        // Adicionar aos favoritos
        const response = await api.post('/favorites', { bookId });
        setFavorites([...favorites, response.data]);
      }
    } catch (err) {
      console.error('Erro ao gerenciar favorito:', err);
    }
  };

  const handleCreateBook = async (data) => {
    setFormLoading(true);
    try {
      await api.post('/book', data);
      await fetchBooks();
      setShowForm(false);
    } catch (err) {
      console.error('Erro ao criar livro:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditBook = async (data) => {
    if (!editingBook) return;
    
    setFormLoading(true);
    try {
      await api.put(`/book/${editingBook.id}`, data);
      await fetchBooks();
      setEditingBook(null);
    } catch (err) {
      console.error('Erro ao editar livro:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Tem certeza que deseja excluir este livro?')) return;
    
    try {
      await api.delete(`/book/${bookId}`);
      await fetchBooks();
    } catch (err) {
      console.error('Erro ao excluir livro:', err);
    }
  };

  const isFavorite = (bookId) => {
    return favorites.some(fav => fav.bookId === bookId);
  };

  if (loading) {
    return (
      <div className="loading">
        Carregando livros...
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Biblioteca de Livros
        </h1>
        {user?.role === 'ADMIN' && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Adicionar Livro
          </button>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3 className="empty-title">
            Nenhum livro encontrado
          </h3>
          <p className="empty-text">
            {user?.role === 'ADMIN' 
              ? 'Adicione o primeiro livro à biblioteca!' 
              : 'Aguarde os administradores adicionarem livros.'
            }
          </p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onFavorite={user ? handleFavorite : undefined}
              onEdit={user?.role === 'ADMIN' ? setEditingBook : undefined}
              onDelete={user?.role === 'ADMIN' ? handleDeleteBook : undefined}
              isFavorite={isFavorite(book.id)}
              showActions={!!user}
            />
          ))}
        </div>
      )}

      {showForm && (
        <BookForm
          onSubmit={handleCreateBook}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      )}

      {editingBook && (
        <BookForm
          book={editingBook}
          onSubmit={handleEditBook}
          onCancel={() => setEditingBook(null)}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default Home; 