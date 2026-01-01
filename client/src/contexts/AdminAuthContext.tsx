import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
  });

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
