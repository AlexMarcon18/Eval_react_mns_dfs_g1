import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { ConferenceProvider } from './context/ConferenceContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/LoginPage';
import ConferenceDetailPage from './pages/conference/ConferenceDetailPage';
import AdminPage from './pages/admin/AdminPage';
import AdminConferencesPage from './pages/admin/AdminConferencesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

// Components
import Navigation from './components/shared/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ConferenceProvider>
        <Router>
          <div className="App">
            <Navigation />
            
            <main className="app-main">
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/conference/:id" element={<ConferenceDetailPage />} />
                
                {/* Routes protégées (admin seulement) */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
                            <Route 
              path="/admin/conferences" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminConferencesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminUsersPage />
                </ProtectedRoute>
              } 
            />
              </Routes>
            </main>
          </div>
        </Router>
      </ConferenceProvider>
    </AuthProvider>
  );
}

export default App;
