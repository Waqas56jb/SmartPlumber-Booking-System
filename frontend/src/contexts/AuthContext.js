import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);
// i hydrate from localstorage on first paint so refresh keeps people signed in
export const AuthProvider = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const authStatus = localStorage.getItem('isAuthenticated');
      return authStatus === 'true';
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  });
  // i mirror auth into localstorage for persistence across tabs
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
  // i clear everything so the next navigation hits public routes
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
  return <AuthContext.Provider value={{
    isAuthenticated,
    user,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
// i throw if someone forgets the provider so bugs surface early
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
