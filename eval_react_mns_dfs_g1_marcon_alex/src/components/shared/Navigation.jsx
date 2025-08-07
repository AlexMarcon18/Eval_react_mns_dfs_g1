import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

/**
 * Composant de navigation principale
 */
const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    setIsAuthenticated(!!token);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-brand">
          🎯 ConferenceApp
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Accueil
          </Link>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                >
                  Administration
                </Link>
              )}
              
              <button onClick={handleLogout} className="nav-button logout">
                Déconnexion
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`nav-button login ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;