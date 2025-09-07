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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    try {
      const storedUser = localStorage.getItem('bluecarbon_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('bluecarbon_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('bluecarbon_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('bluecarbon_user');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
