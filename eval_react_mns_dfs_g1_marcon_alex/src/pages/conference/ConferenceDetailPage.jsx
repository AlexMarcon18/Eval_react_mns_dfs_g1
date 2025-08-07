import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ApiService from '../../services/api';
import './ConferenceDetailPage.css';

/**
 * Page de détail d'une conférence
 */
const ConferenceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConference();
  }, [id]);

  const fetchConference = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getConferenceById(id);
      // L'API retourne directement la conférence, pas dans un wrapper
      setConference(data);
    } catch (error) {
      setError('Erreur lors du chargement de la conférence.');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatDateShort = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Lien copié dans le presse-papiers !');
    }).catch(() => {
      alert('Impossible de copier le lien');
    });
  };



  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de la conférence...</p>
        </div>
      </div>
    );
  }

  if (error || !conference) {
    return (
      <div className="page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Conférence introuvable</h3>
          <p>{error || 'Cette conférence n\'existe pas.'}</p>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="back-button">
              Retour à l'accueil
            </button>
            <button onClick={fetchConference} className="retry-button">
              Réessayer
            </button>
          </div>
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
          <span className="breadcrumb-current">
            {conference.title.length > 50 
              ? conference.title.substring(0, 50) + '...' 
              : conference.title
            }
          </span>
        </nav>
      </div>

      <div 
        className="conference-detail-container"
        style={{
          '--main-color': conference.design?.mainColor || '#007bff',
          '--second-color': conference.design?.secondColor || '#e9ecef'
        }}
      >
        {/* Header avec image et titre */}
        <div className="conference-hero">
          {conference.img && (
            <div className="conference-hero-image">
              <img src={conference.img} alt={conference.title} />
            </div>
          )}
          <div className="conference-hero-content">
            <div className="hero-header">
              <button onClick={() => navigate('/')} className="back-link">
                ← Retour à la liste
              </button>
              <button onClick={copyToClipboard} className="copy-link-btn" title="Copier le lien">
                🔗 Copier le lien
              </button>
            </div>
            <h1 className="conference-title">{conference.title}</h1>
            <div className="conference-meta">
              <span className="conference-date">
                📅 {formatDate(conference.date)}
              </span>
              {conference.duration && (
                <span className="conference-duration">
                  ⏱️ {conference.duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="conference-content">
          <div className="conference-description">
            <h2>Description</h2>
            <p>{conference.description}</p>
          </div>

          {conference.content && (
            <div className="conference-full-content">
              <h2>Contenu détaillé</h2>
              <p>{conference.content}</p>
            </div>
          )}

          {/* Informations pratiques */}
          <div className="conference-info-grid">
            {/* Intervenants */}
            {conference.speakers && conference.speakers.length > 0 && (
              <div className="info-section">
                <h3>👥 Intervenants</h3>
                <div className="speakers-list">
                  {conference.speakers.map((speaker, index) => (
                    <div key={index} className="speaker-item">
                      <strong>{speaker.firstname} {speaker.lastname}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parties prenantes */}
            {conference.stakeholders && conference.stakeholders.length > 0 && (
              <div className="info-section">
                <h3>🤝 Parties prenantes</h3>
                <div className="stakeholders-list">
                  {conference.stakeholders.map((stakeholder, index) => (
                    <div key={index} className="stakeholder-item">
                      <div className="stakeholder-info">
                        <strong>{stakeholder.firstname} {stakeholder.lastname}</strong>
                        {stakeholder.job && <p>{stakeholder.job}</p>}
                      </div>
                      {stakeholder.img && (
                        <img src={stakeholder.img} alt={`${stakeholder.firstname} ${stakeholder.lastname}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Localisation */}
            {conference.osMap && (
              <div className="info-section">
                <h3>📍 Localisation</h3>
                <div className="location-info">
                  {conference.osMap.addressl1 && <p>{conference.osMap.addressl1}</p>}
                  {conference.osMap.addressl2 && <p>{conference.osMap.addressl2}</p>}
                  <p>
                    {conference.osMap.postalCode} {conference.osMap.city}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetailPage;