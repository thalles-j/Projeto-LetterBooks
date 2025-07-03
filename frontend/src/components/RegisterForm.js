import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await register(formData);
      setSuccess('Conta criada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="logo-icon" style={{ margin: '0 auto 1rem' }}>L</div>
          <h2 className="form-title">Crie sua conta</h2>
          <p className="form-subtitle">
            Ou{' '}
            <Link to="/login" className="form-link">
              entre na sua conta existente
            </Link>
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Tipo de conta
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm; 