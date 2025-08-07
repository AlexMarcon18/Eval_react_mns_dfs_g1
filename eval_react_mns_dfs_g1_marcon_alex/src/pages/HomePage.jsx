import React from 'react';
import ConferenceList from '../components/list-conf/ConferenceList';
import { useNavigate } from 'react-router-dom';

/**
 * Page d'accueil - Liste des conférences
 */
const HomePage = () => {
  const navigate = useNavigate();

  const handleConferenceClick = (conferenceId) => {
    navigate(`/conference/${conferenceId}`);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>🎯 Gestion des Conférences</h1>
        <p>Découvrez toutes nos conférences disponibles</p>
      </header>
      
      <main className="page-content">
        <ConferenceList onConferenceClick={handleConferenceClick} />
      </main>
    </div>
  );
};

export default HomePage;