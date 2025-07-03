import React from 'react';

const BookCard = ({ book, onFavorite, onEdit, onDelete, isFavorite, showActions }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'star' : 'star star-empty'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">por {book.author}</p>
          <div className="book-rating">
            {renderStars(book.rating)}
            <span className="rating-text">({book.rating}/5)</span>
          </div>
        </div>
        {showActions && onFavorite && (
          <button
            onClick={() => onFavorite(book.id)}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            ❤️
          </button>
        )}
      </div>

      {showActions && (onEdit || onDelete) && (
        <div className="book-actions">
          {onEdit && (
            <button
              onClick={() => onEdit(book)}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="btn btn-danger"
              style={{ flex: 1 }}
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard; 