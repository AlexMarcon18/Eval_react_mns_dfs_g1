import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    loading: true
  });

  useEffect(() => {
    // Initialiser l'auth depuis localStorage au démarrage
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    setAuth({
      token,
      isAuthenticated: !!token,
      isAdmin: isAdmin && !!token,
      loading: false
    });
  };

  const login = (token, isAdmin) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAdmin', isAdmin.toString());
    
    setAuth({
      token,
      isAuthenticated: true,
      isAdmin,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    
    setAuth({
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false
    });
  };

  const value = {
    ...auth,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};