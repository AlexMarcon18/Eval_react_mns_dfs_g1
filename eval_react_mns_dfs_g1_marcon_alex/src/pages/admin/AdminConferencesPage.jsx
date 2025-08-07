import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConferences } from '../../context/ConferenceContext';
import ConferenceForm from '../../components/admin/ConferenceForm';
import './AdminConferencesPage.css';

/**
 * Page d'administration des conférences
 */
const AdminConferencesPage = () => {
  const { 
    conferences, 
    loading, 
    error, 
    fetchConferences, 
    deleteConference, 
    clearError 
  } = useConferences();

  const [showForm, setShowForm] = useState(false);
  const [editingConference, setEditingConference] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchConferences();
  }, [fetchConferences]);

  const handleCreate = () => {
    setEditingConference(null);
    setShowForm(true);
  };

  const handleEdit = (conference) => {
    setEditingConference(conference);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingConference(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingConference(null);
  };

  const handleDeleteClick = (conference) => {
    setDeleteConfirm(conference);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm) {
      try {
        await deleteConference(deleteConfirm.id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading && conferences.length === 0) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des conférences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Fil d'Ariane */}
      <div className="breadcrumb-container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Accueil</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/admin" className="breadcrumb-link">Administration</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Gestion des Conférences</span>
        </nav>
      </div>

      <div className="admin-conferences-container">
        <header className="admin-conferences-header">
          <div className="header-content">
            <h1>📋 Gestion des Conférences</h1>
            <p>Créer, modifier et supprimer des conférences</p>
          </div>
          <button onClick={handleCreate} className="create-button">
            ➕ Nouvelle Conférence
          </button>
        </header>

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={clearError} className="error-close">✕</button>
          </div>
        )}

        <div className="conferences-table-container">
          {conferences.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>Aucune conférence</h3>
              <p>Commencez par créer votre première conférence</p>
              <button onClick={handleCreate} className="create-button">
                Créer une conférence
              </button>
            </div>
          ) : (
            <table className="conferences-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Ville</th>
                  <th>Durée</th>
                  <th>Intervenants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {conferences.map((conference, index) => (
                  <tr key={conference.id || `conference-${index}`}>
                    <td className="conference-title-cell">
                      <div 
                        className="color-indicator" 
                        style={{ backgroundColor: conference.design?.mainColor || '#007bff' }}
                      ></div>
                      <div className="title-content">
                        <strong>{conference.title}</strong>
                        <div className="subtitle">{(conference.description || '').substring(0, 80)}...</div>
                      </div>
                    </td>
                    <td>{formatDate(conference.date)}</td>
                    <td>{conference.osMap?.city || '-'}</td>
                    <td>{conference.duration || '-'}</td>
                    <td>{conference.speakers?.length || 0}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/conference/${conference.id}`}
                          className="action-btn view-btn"
                          title="Voir la conférence"
                        >
                          👁️
                        </Link>
                        <button 
                          onClick={() => handleEdit(conference)}
                          className="action-btn edit-btn"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(conference)}
                          className="action-btn delete-btn"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de confirmation de suppression */}
        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmer la suppression</h3>
              <p>
                Êtes-vous sûr de vouloir supprimer la conférence <br />
                <strong>"{deleteConfirm.title}"</strong> ?
              </p>
              <p className="warning-text">
                ⚠️ Cette action est irréversible !
              </p>
              <div className="modal-actions">
                <button onClick={handleDeleteCancel} className="cancel-button">
                  Annuler
                </button>
                <button onClick={handleDeleteConfirm} className="confirm-delete-button">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de formulaire */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content form-modal">
              <ConferenceForm 
                conference={editingConference}
                onSuccess={handleFormSuccess}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConferencesPage;