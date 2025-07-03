import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">L</div>
          <span>LetterBooks</span>
        </Link>

        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">
                Livros
              </Link>
              <Link to="/favorites" className="nav-link">
                Favoritos
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Olá, {user?.name}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Entrar
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 