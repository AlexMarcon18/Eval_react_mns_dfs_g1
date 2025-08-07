import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Composant pour protéger les routes selon les permissions
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Si pas connecté, rediriger vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si admin requis mais pas admin, rediriger vers accueil
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;