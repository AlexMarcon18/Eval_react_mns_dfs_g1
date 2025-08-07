import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    type: 'user'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation ID utilisateur
    if (!formData.id.trim()) {
      newErrors.id = 'L\'ID utilisateur est requis';
    } else if (formData.id.length < 3) {
      newErrors.id = 'L\'ID doit contenir au moins 3 caractères';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.id)) {
      newErrors.id = 'L\'ID ne peut contenir que des lettres, chiffres, tirets et underscores';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Envoyer les données sans la confirmation de mot de passe
    const userData = {
      id: formData.id.trim(),
      password: formData.password,
      type: formData.type
    };

    onSubmit(userData);
  };

  const handleReset = () => {
    setFormData({
      id: '',
      password: '',
      confirmPassword: '',
      type: 'user'
    });
    setErrors({});
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <h3>Créer un nouvel utilisateur</h3>
        
        <div className="form-group">
          <label htmlFor="userId">ID Utilisateur *</label>
          <input
            type="text"
            id="userId"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className={errors.id ? 'error' : ''}
            placeholder="Ex: johndoe, marie.martin..."
            disabled={loading}
            autoComplete="username"
          />
          {errors.id && <span className="error-message">{errors.id}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="userType">Type d'utilisateur *</label>
          <select
            id="userType"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            disabled={loading}
            className="type-select"
          >
            <option value="user">Utilisateur standard</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Au moins 6 caractères"
            disabled={loading}
            autoComplete="new-password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Retapez le mot de passe"
            disabled={loading}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="user-type-info">
          <div className="info-card">
            <h4>Types d'utilisateurs</h4>
            <div className="type-explanation">
              <div className="type-item">
                <span className="type-badge user">Utilisateur</span>
                <span>Peut consulter les conférences et se connecter</span>
              </div>
              <div className="type-item">
                <span className="type-badge admin">Admin</span>
                <span>Peut gérer les conférences et les utilisateurs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Annuler
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="btn btn-outline"
            disabled={loading}
          >
            Réinitialiser
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Création...
              </>
            ) : (
              'Créer l\'utilisateur'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;