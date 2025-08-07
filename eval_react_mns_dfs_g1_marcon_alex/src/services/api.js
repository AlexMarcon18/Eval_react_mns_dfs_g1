
const API_BASE_URL = 'http://localhost:4555';

/**
 * Service pour gérer les appels API
 */
class ApiService {
  /**
   * Récupère toutes les conférences
   * @returns {Promise<Array>} Liste des conférences
   */
  async getAllConferences() {
    try {
      const response = await fetch(`${API_BASE_URL}/conferences`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des conférences:', error);
      throw error;
    }
  }

  /**
   * Récupère une conférence par son ID
   * @param {string} id - ID de la conférence
   * @returns {Promise<Object>} Détails de la conférence
   */
  async getConferenceById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/conference/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la conférence:', error);
      throw error;
    }
  }

  /**
   * Connexion utilisateur
   * @param {string} id - Identifiant
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Token d'authentification
   */
  async login(id, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur d'authentification: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Réponse login complète:', data);
      
      // L'API renvoie juste une string token, pas un objet avec propriété Token
      return { Token: data };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Vérifie si l'utilisateur actuel est administrateur
   * @param {string} token - Token d'authentification
   * @returns {Promise<boolean>} True si admin, false sinon
   */
  async isAdmin(token) {
    try {
      console.log('Vérification des droits admin avec token:', token.substring(0, 20) + '...');
      
      const response = await fetch(`${API_BASE_URL}/isadmin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Réponse API isAdmin:', data);
      return data.isAdmin;
    } catch (error) {
      console.error('Erreur lors de la vérification admin:', error);
      // En cas d'erreur, on considère l'utilisateur comme non-admin
      return false;
    }
  }

  /**
   * Crée une nouvelle conférence
   * @param {Object} conferenceData - Données de la conférence
   * @returns {Promise<Object>} Conférence créée
   */
  async createConference(conferenceData) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/conference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(conferenceData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Retourner la conférence avec l'ID généré
      return {
        ...conferenceData,
        id: data.id || data
      };
    } catch (error) {
      console.error('Erreur lors de la création de la conférence:', error);
      throw error;
    }
  }

  /**
   * Met à jour une conférence
   * @param {string} id - ID de la conférence
   * @param {Object} conferenceData - Nouvelles données de la conférence
   * @returns {Promise<Object>} Conférence mise à jour
   */
  async updateConference(id, conferenceData) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/conference/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(conferenceData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API mise à jour:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Retourner les données complètes avec l'ID
      return { ...conferenceData, id };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la conférence:', error);
      throw error;
    }
  }

  /**
   * Supprime une conférence
   * @param {string} id - ID de la conférence
   * @returns {Promise<void>}
   */
  async deleteConference(id) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/conference/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API suppression:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la conférence:', error);
      throw error;
    }
  }

  // === MÉTHODES UTILISATEURS ===

  /**
   * Récupère tous les utilisateurs
   * @returns {Promise<Array>} Liste des utilisateurs
   */
  async getAllUsers() {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  /**
   * Change le type d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @param {string} newType - Nouveau type (user/admin)
   * @returns {Promise<Object>} Utilisateur modifié
   */
  async changeUserType(userId, newType) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/usertype/${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newType }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors du changement de type utilisateur:', error);
      throw error;
    }
  }

  /**
   * Supprime un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(userId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API suppression utilisateur:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }

  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur {id, password, type}
   * @returns {Promise<Object>} Utilisateur créé
   */
  async createUser(userData) {
    try {
      const { id, password, type } = userData;
      
      // Sélectionner l'endpoint selon le type
      const endpoint = type === 'admin' ? '/signupadmin' : '/signup';
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API création utilisateur:', response.status, errorText);
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }


}

export default new ApiService();