import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for saved login state
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState) {
      setIsAuthenticated(JSON.parse(savedAuthState));
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    
    // Set a cookie that expires in 1 day
    setCookie('isAuthenticated', 'true', { maxAge: 60 * 60 * 24 });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
