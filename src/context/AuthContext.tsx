import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthStatus, logoutUser } from '../services/authService';
import type { User } from '../types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoadingAuth: boolean;
  logout: () => void;
  refreshAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, refetch } = useQuery({
    queryKey: ['authStatus'],
    queryFn: getAuthStatus,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // Renamed from cacheTime to gcTime
    retry: false,
  });

  useEffect(() => {
    const authData = queryClient.getQueryData<User | null>(['authStatus']);
    const authState = queryClient.getQueryState(['authStatus']);

    if (authData) {
      setIsAuthenticated(true);
      setUser(authData);
    } else if (authState?.status === 'error') {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      // If no data and not an error, it means it's still loading or initial state
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [queryClient, isLoading]); // Depend on queryClient and isLoading to re-evaluate when query state changes

  const logout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['authStatus'] });
      queryClient.clear();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshAuthStatus = () => {
    refetch();
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
