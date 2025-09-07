import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerificationPanel from './pages/VerificationPanel';
import Analytics from './pages/Analytics';
import BlockchainPage from './pages/Blockchain';
import SubmitData from './components/SubmitData';
import MyProjects from './components/MyProjects';
import Status from './components/Status';
import ProjectsOverview from './components/ProjectsOverview';
import VerificationRequests from './components/VerificationRequests';
import Reports from './components/Reports';
import AllProjects from './components/AllProjects';
import ProjectList from './components/ProjectList';
import AdminDashboard from './components/AdminDashboard';

// Placeholder components for other routes
const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-government-light">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-government-dark mb-4">403</h1>
      <p className="text-secondary-600 mb-4">Unauthorized Access</p>
      <p className="text-sm text-secondary-500">You don't have permission to access this page.</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/verification-panel" 
        element={
          <PrivateRoute requiredRole="nccr-admin">
            <VerificationPanel />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/blockchain" 
        element={
          <PrivateRoute requiredRole="nccr-admin">
            <BlockchainPage />
          </PrivateRoute>
        } 
      />
      {/* Field Worker Routes */}
      <Route 
        path="/submit-data" 
        element={
          <PrivateRoute requiredRole="field-worker">
            <SubmitData />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/my-projects" 
        element={
          <PrivateRoute requiredRole="field-worker">
            <MyProjects />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/status" 
        element={
          <PrivateRoute requiredRole="field-worker">
            <Status />
          </PrivateRoute>
        } 
      />

      {/* NGO Routes */}
      <Route 
        path="/projects" 
        element={
          <PrivateRoute requiredRole="ngo">
            <ProjectsOverview />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/verification" 
        element={
          <PrivateRoute requiredRole="ngo">
            <VerificationRequests />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <PrivateRoute requiredRole="ngo">
            <Reports />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/project-list" 
        element={
          <PrivateRoute requiredRole="ngo">
            <ProjectList />
          </PrivateRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <PrivateRoute requiredRole="nccr-admin">
            <AdminDashboard />
          </PrivateRoute>
        } 
      />

      {/* NCCR Admin Routes */}
      <Route 
        path="/all-projects" 
        element={
          <PrivateRoute requiredRole="nccr-admin">
            <AllProjects />
          </PrivateRoute>
        } 
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
