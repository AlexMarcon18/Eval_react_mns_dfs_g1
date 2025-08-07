import React from 'react';
import './ConferenceCard.css';

/**
 * Composant pour afficher une carte de conférence
 */
const ConferenceCard = ({ conference, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(conference.id);
    }
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div 
      className="conference-card" 
      onClick={handleClick}
      style={{
        borderLeft: `4px solid ${conference.design?.mainColor || '#007bff'}`,
      }}
    >
      {conference.img && (
        <div className="conference-image">
          <img src={conference.img} alt={conference.title} />
        </div>
      )}
      
      <div className="conference-content">
        <h3 className="conference-title">{conference.title}</h3>
        
        <div className="conference-date">
          📅 {formatDate(conference.date)}
        </div>
        
        {conference.duration && (
          <div className="conference-duration">
            ⏱️ {conference.duration}
          </div>
        )}
        
        <p className="conference-description">
          {conference.description}
        </p>
        
        {conference.speakers && conference.speakers.length > 0 && (
          <div className="conference-speakers">
            <strong>Intervenants :</strong>
            {conference.speakers.map((speaker, index) => (
              <span key={index} className="speaker">
                {speaker.firstname} {speaker.lastname}
                {index < conference.speakers.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}
        
        {conference.osMap && conference.osMap.city && (
          <div className="conference-location">
            📍 {conference.osMap.city}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConferenceCard;