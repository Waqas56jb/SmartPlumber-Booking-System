import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is logged in from localStorage
    try {
      const authStatus = localStorage.getItem('isAuthenticated');
      return authStatus === 'true';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    // Get user data from localStorage
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  });

  const login = (userData, token = null) => {
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem('isAuthenticated', 'true');
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (e) {
      console.warn('Failed to save auth state:', e);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (e) {
      console.warn('Failed to clear auth state:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
