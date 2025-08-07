import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

/**
 * Page d'administration - Hub principal
 */
const AdminPage = () => {
  return (
    <div className="page">
      <div className="admin-container">
        <header className="admin-header">
          <h1>🛠️ Administration</h1>
          <p>Gérez les conférences et les utilisateurs</p>
        </header>

        <div className="admin-sections">
          <div className="admin-section">
            <div className="section-icon">📋</div>
            <h2>Gestion des Conférences</h2>
            <p>Créer, modifier et supprimer des conférences</p>
            <div className="section-actions">
              <Link to="/admin/conferences" className="admin-button primary">
                Gérer les conférences
              </Link>
            </div>
          </div>

          <div className="admin-section">
            <div className="section-icon">👥</div>
            <h2>Gestion des Utilisateurs</h2>
            <p>Consulter et promouvoir les utilisateurs</p>
            <div className="section-actions">
              <Link to="/admin/users" className="admin-button primary">
                Gérer les utilisateurs
              </Link>
            </div>
          </div>
        </div>

        <div className="admin-stats">
          <h3>Aperçu rapide</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">-</div>
              <div className="stat-label">Conférences</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">-</div>
              <div className="stat-label">Utilisateurs</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">-</div>
              <div className="stat-label">Administrateurs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;