"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);  // Set initial state to null for proper hydration handling
  const [loading, setLoading] = useState(true);  // Loading state to manage the client-side rendering
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after checking the cookie
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { path: '/' });
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  // Prevent rendering the context until hydration has finished
  if (loading) {
    return null;  // Or return a loading spinner or any other fallback UI
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated ?? false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
