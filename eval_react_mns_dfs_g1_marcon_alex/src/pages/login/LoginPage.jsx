import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import './LoginPage.css';

/**
 * Page de connexion
 */
const LoginPage = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await ApiService.login(credentials.id, credentials.password);
      
      // Stocker le token dans localStorage
      localStorage.setItem('authToken', response.Token);
      
      // Vérifier si l'utilisateur est admin (avec gestion d'erreur séparée)
      let isUserAdmin = false;
      try {
        const adminResponse = await ApiService.isAdmin(response.Token);
        isUserAdmin = adminResponse;
      } catch (adminError) {
        console.warn('Impossible de vérifier les permissions admin, utilisateur considéré comme non-admin:', adminError);
        // On continue quand même la connexion, mais sans droits admin
      }
      
      localStorage.setItem('isAdmin', isUserAdmin.toString());
      
      // Rediriger vers la page d'accueil
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>🔐 Connexion</h1>
            <p>Accédez à votre espace conférences</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="id">Identifiant</label>
              <input
                type="text"
                id="id"
                name="id"
                value={credentials.id}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="Votre identifiant"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="Votre mot de passe"
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading || !credentials.id || !credentials.password}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              <small>
                Pas de compte ? Contactez l'administrateur pour obtenir vos accès.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;