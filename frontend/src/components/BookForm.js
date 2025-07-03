import React, { useState, useEffect } from 'react';

const BookForm = ({ book, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        rating: book.rating,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {book ? 'Editar Livro' : 'Adicionar Livro'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título do livro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Autor
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-input"
              value={formData.author}
              onChange={handleChange}
              placeholder="Nome do autor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating" className="form-label">
              Avaliação
            </label>
            <select
              id="rating"
              name="rating"
              className="form-select"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value={0}>Selecione uma avaliação</option>
              <option value={1}>1 - Muito ruim</option>
              <option value={2}>2 - Ruim</option>
              <option value={3}>3 - Regular</option>
              <option value={4}>4 - Bom</option>
              <option value={5}>5 - Excelente</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Salvando...' : book ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm; 