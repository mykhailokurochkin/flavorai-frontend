import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthStatus, logoutUser } from '../services/authService';
import type { User } from '../types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoadingAuth: boolean;
  logout: () => void;
  refreshAuthStatus: (userData: User | null) => void; // Changed to accept userData
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // This query is primarily for initial loading and background re-validation
  const { isLoading } = useQuery({
    queryKey: ['authStatus'],
    queryFn: getAuthStatus,
    gcTime: 1000 * 60 * 60 * 24,
    retry: false,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      // Update state based on initial fetch or background refetch
      if (data) {
        setIsAuthenticated(true);
        setUser(data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    },
    onError: () => {
      setIsAuthenticated(false);
      setUser(null);
    }
  });

  const logout = async () => {
    try {
      await logoutUser();
      refreshAuthStatus(null); // Immediately update state
      queryClient.invalidateQueries({ queryKey: ['authStatus'] });
      queryClient.clear();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshAuthStatus = (userData: User | null) => {
    if (userData) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    // Also invalidate the query to ensure next background refetch gets fresh data
    queryClient.invalidateQueries({ queryKey: ['authStatus'] });
  };

  const contextValue = {
    isAuthenticated,
    user,
    isLoadingAuth: isLoading,
    logout,
    refreshAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
