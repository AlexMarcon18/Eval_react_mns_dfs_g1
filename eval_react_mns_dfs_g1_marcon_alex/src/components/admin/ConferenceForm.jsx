import React, { useState, useEffect } from 'react';
import { useConferences } from '../../context/ConferenceContext';
import './ConferenceForm.css';

/**
 * Formulaire de création/modification de conférence
 */
const ConferenceForm = ({ conference, onSuccess, onCancel }) => {
  const { createConference, updateConference, loading } = useConferences();
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    description: '',
    img: '',
    content: '',
    duration: '',
    osMap: {
      addressl1: '',
      addressl2: '',
      postalCode: '',
      city: '',
      coordinates: ['0', '0']
    },
    speakers: [{ firstname: '', lastname: '' }],
    stakeholders: [{ firstname: '', lastname: '', job: '', img: '' }],
    design: {
      mainColor: '#007bff',
      secondColor: '#e9ecef'
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (conference) {
      // Mode édition : remplir le formulaire avec les données existantes
      setFormData({
        ...conference,
        speakers: conference.speakers?.length > 0 ? conference.speakers : [{ firstname: '', lastname: '' }],
        stakeholders: conference.stakeholders?.length > 0 ? conference.stakeholders : [{ firstname: '', lastname: '', job: '', img: '' }],
        osMap: conference.osMap || {
          addressl1: '',
          addressl2: '',
          postalCode: '',
          city: '',
          coordinates: ['0', '0']
        }
      });
    } else {
      // Mode création : générer un ID unique
      const uniqueId = `conf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setFormData(prev => ({ ...prev, id: uniqueId }));
    }
  }, [conference]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.img.trim()) newErrors.img = 'L\'URL de l\'image est requise';
    if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';

    // Validation des speakers
    const validSpeakers = formData.speakers.filter(s => s.firstname.trim() && s.lastname.trim());
    if (validSpeakers.length === 0) {
      newErrors.speakers = 'Au moins un intervenant est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Nettoyer les données avant envoi
    const cleanData = {
      title: formData.title.trim(),
      date: formData.date,
      description: formData.description.trim(),
      img: formData.img.trim(),
      content: formData.content.trim(),
      duration: formData.duration.trim(),
      speakers: formData.speakers.filter(s => s.firstname.trim() && s.lastname.trim()),
      stakeholders: formData.stakeholders.filter(s => s.firstname.trim() && s.lastname.trim()),
      design: {
        mainColor: formData.design.mainColor,
        secondColor: formData.design.secondColor
      },
      osMap: {
        addressl1: formData.osMap.addressl1.trim(),
        addressl2: formData.osMap.addressl2.trim(),
        postalCode: formData.osMap.postalCode.trim(),
        city: formData.osMap.city.trim(),
        coordinates: formData.osMap.coordinates
      }
    };

    // Nettoyer les champs undefined
    Object.keys(cleanData).forEach(key => {
      if (cleanData[key] === undefined) {
        delete cleanData[key];
      }
    });

    try {
      if (conference) {
        await updateConference(conference.id, cleanData);
      } else {
        await createConference(cleanData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      // Si c'est déjà au format datetime-local, le retourner tel quel
      if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
        return dateString;
      }
      // Sinon, essayer de parser et formater
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="conference-form">
      <div className="form-header">
        <h2>
          {conference ? '✏️ Modifier la conférence' : '➕ Nouvelle conférence'}
        </h2>
      </div>

      <div className="form-sections">
        {/* Informations principales */}
        <section className="form-section">
          <h3>📋 Informations principales</h3>
          
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? 'error' : ''}
              placeholder="Titre de la conférence"
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date et heure *</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Durée</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="ex: 2 heures, 1 journée"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Description courte de la conférence"
              rows={3}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="content">Contenu détaillé *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className={errors.content ? 'error' : ''}
              placeholder="Contenu détaillé de la conférence"
              rows={5}
            />
            {errors.content && <span className="error-text">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="img">URL de l'image *</label>
            <input
              type="url"
              id="img"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              className={errors.img ? 'error' : ''}
              placeholder="https://example.com/image.jpg"
            />
            {errors.img && <span className="error-text">{errors.img}</span>}
            {formData.img && (
              <div className="image-preview">
                <img src={formData.img} alt="Aperçu" />
              </div>
            )}
          </div>
        </section>

        {/* Design */}
        <section className="form-section">
          <h3>🎨 Couleurs du thème</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mainColor">Couleur principale</label>
              <input
                type="color"
                id="mainColor"
                value={formData.design.mainColor}
                onChange={(e) => handleNestedChange('design', 'mainColor', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondColor">Couleur secondaire</label>
              <input
                type="color"
                id="secondColor"
                value={formData.design.secondColor}
                onChange={(e) => handleNestedChange('design', 'secondColor', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Intervenants */}
        <section className="form-section">
          <h3>👥 Intervenants *</h3>
          {errors.speakers && <span className="error-text section-error">{errors.speakers}</span>}
          
          {formData.speakers.map((speaker, index) => (
            <div key={index} className="array-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={speaker.firstname}
                    onChange={(e) => handleArrayChange('speakers', index, 'firstname', e.target.value)}
                    placeholder="Prénom de l'intervenant"
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={speaker.lastname}
                    onChange={(e) => handleArrayChange('speakers', index, 'lastname', e.target.value)}
                    placeholder="Nom de l'intervenant"
                  />
                </div>
                {formData.speakers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('speakers', index)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('speakers', { firstname: '', lastname: '' })}
            className="add-btn"
          >
            ➕ Ajouter un intervenant
          </button>
        </section>

        {/* Parties prenantes */}
        <section className="form-section">
          <h3>🤝 Parties prenantes</h3>
          
          {formData.stakeholders.map((stakeholder, index) => (
            <div key={index} className="array-item">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={stakeholder.firstname}
                    onChange={(e) => handleArrayChange('stakeholders', index, 'firstname', e.target.value)}
                    placeholder="Prénom"
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={stakeholder.lastname}
                    onChange={(e) => handleArrayChange('stakeholders', index, 'lastname', e.target.value)}
                    placeholder="Nom"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Poste</label>
                  <input
                    type="text"
                    value={stakeholder.job || ''}
                    onChange={(e) => handleArrayChange('stakeholders', index, 'job', e.target.value)}
                    placeholder="Poste ou fonction"
                  />
                </div>
                <div className="form-group">
                  <label>Photo (URL)</label>
                  <input
                    type="url"
                    value={stakeholder.img || ''}
                    onChange={(e) => handleArrayChange('stakeholders', index, 'img', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem('stakeholders', index)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('stakeholders', { firstname: '', lastname: '', job: '', img: '' })}
            className="add-btn"
          >
            ➕ Ajouter une partie prenante
          </button>
        </section>

        {/* Localisation */}
        <section className="form-section">
          <h3>📍 Localisation</h3>
          
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              value={formData.osMap.city}
              onChange={(e) => handleNestedChange('osMap', 'city', e.target.value)}
              placeholder="Ville de la conférence"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressl1">Adresse ligne 1</label>
            <input
              type="text"
              id="addressl1"
              value={formData.osMap.addressl1}
              onChange={(e) => handleNestedChange('osMap', 'addressl1', e.target.value)}
              placeholder="Numéro et nom de rue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressl2">Adresse ligne 2</label>
            <input
              type="text"
              id="addressl2"
              value={formData.osMap.addressl2}
              onChange={(e) => handleNestedChange('osMap', 'addressl2', e.target.value)}
              placeholder="Bâtiment, étage..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Code postal</label>
            <input
              type="text"
              id="postalCode"
              value={formData.osMap.postalCode}
              onChange={(e) => handleNestedChange('osMap', 'postalCode', e.target.value)}
              placeholder="Code postal"
            />
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn" disabled={loading}>
          Annuler
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Sauvegarde...' : conference ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default ConferenceForm;