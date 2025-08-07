import React, { useState, useEffect } from 'react';
import ApiService from '../../services/api';
import UserForm from '../../components/admin/UserForm';
import './AdminUsersPage.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await ApiService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = async (userId, newType) => {
    try {
      await ApiService.changeUserType(userId, newType);
      // Recharger la liste des utilisateurs pour refléter les changements
      await loadUsers();
    } catch (error) {
      console.error('Erreur lors du changement de type:', error);
      alert('Erreur lors du changement de type utilisateur');
    }
  };

  const handleDeleteClick = (user) => {
    setDeleteConfirm(user);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    try {
      await ApiService.deleteUser(deleteConfirm.id);
      setDeleteConfirm(null);
      // Recharger la liste des utilisateurs
      await loadUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleCreateUser = async (userData) => {
    try {
      setCreateLoading(true);
      await ApiService.createUser(userData);
      setShowCreateForm(false);
      // Recharger la liste des utilisateurs
      await loadUsers();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création de l\'utilisateur. Vérifiez que l\'ID n\'existe pas déjà.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={loadUsers} className="retry-btn">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="admin-users-page">
        <div className="page-header">
          <div className="header-content">
            <div className="header-text">
              <h1>Gestion des utilisateurs</h1>
              <p className="page-description">
                Gérez les utilisateurs, leurs permissions et leur statut.
              </p>
            </div>
            <div className="header-actions">
              <button 
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary"
              >
                ➕ Créer un utilisateur
              </button>
            </div>
          </div>
        </div>

        <div className="users-stats">
          <div className="stat-card">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Utilisateurs total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {users.filter(user => user.type === 'admin').length}
            </div>
            <div className="stat-label">Administrateurs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {users.filter(user => user.type === 'user').length}
            </div>
            <div className="stat-label">Utilisateurs standard</div>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID Utilisateur</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-id-cell">
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.id.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <strong>{user.id}</strong>
                        <div className="user-meta">
                          Créé le {new Date().toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select 
                      value={user.type} 
                      onChange={(e) => handleTypeChange(user.id, e.target.value)}
                      className={`type-select ${user.type}`}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td>
                    <span className={`status-badge ${user.type}`}>
                      {user.type === 'admin' ? 'Administrateur' : 'Utilisateur'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleDeleteClick(user)}
                        className="action-btn delete-btn"
                        title="Supprimer l'utilisateur"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <h3>Aucun utilisateur trouvé</h3>
              <p>Il n'y a actuellement aucun utilisateur dans le système.</p>
            </div>
          )}
        </div>

        {/* Formulaire de création d'utilisateur */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-form">
              <UserForm 
                onSubmit={handleCreateUser}
                onCancel={handleCreateCancel}
                loading={createLoading}
              />
            </div>
          </div>
        )}

        {/* Modal de confirmation de suppression */}
        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Confirmer la suppression</h3>
              <p>
                Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
                <strong>{deleteConfirm.id}</strong> ?
              </p>
              <p className="warning-text">
                Cette action est irréversible.
              </p>
              <div className="modal-actions">
                <button onClick={handleDeleteCancel} className="btn btn-secondary">
                  Annuler
                </button>
                <button onClick={handleDeleteConfirm} className="btn btn-danger">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;