import React, { useState, useEffect } from 'react';
import ConferenceCard from '../card-conf/ConferenceCard';
import ApiService from '../../services/api';
import './ConferenceList.css';

/**
 * Composant pour afficher la liste des conférences
 */
const ConferenceList = ({ onConferenceClick }) => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getAllConferences();
      setConferences(data);
    } catch (error) {
      setError('Erreur lors du chargement des conférences. Vérifiez que l\'API est démarrée.');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchConferences();
  };

  if (loading) {
    return (
      <div className="conference-list-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des conférences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="conference-list-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Réessayer
          </button>
          <div className="api-help">
            <p><strong>Pour démarrer l'API :</strong></p>
            <ol>
              <li>Assurez-vous que Docker est installé et démarré</li>
              <li>Exécutez <code>docker-compose up</code> dans le répertoire racine</li>
              <li>L'API sera disponible sur http://localhost:4555</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (conferences.length === 0) {
    return (
      <div className="conference-list-container">
        <div className="empty-container">
          <div className="empty-icon">📅</div>
          <h3>Aucune conférence disponible</h3>
          <p>Il n'y a actuellement aucune conférence à afficher.</p>
          <button onClick={handleRetry} className="retry-button">
            Actualiser
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="conference-list-container">
      <div className="conferences-grid">
        {conferences.map((conference) => (
          <ConferenceCard
            key={conference.id}
            conference={conference}
            onClick={onConferenceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ConferenceList;