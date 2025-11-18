'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { apiClient } from '@/lib/api';
import { checkAndClearExpiredTokens, isTokenExpired } from '@/utils/clearTokens';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'AUTH_FAILURE':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true, // Start with loading true to prevent premature redirects
  isAuthenticated: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // First, check and clear any expired tokens
      checkAndClearExpiredTokens();
      
      const token = localStorage.getItem('auth_token');
      if (token && !isTokenExpired(token)) {
        // Verify token and get user data only if we have a valid token
        await verifyToken();
      } else {
        // No valid token - this is fine for public pages
        // Just clear any invalid tokens and allow browsing
        if (token) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
        }
        dispatch({ type: 'AUTH_FAILURE' });
      }
    };
    
    initializeAuth();
  }, []);

  const verifyToken = async () => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await apiClient.verifyToken();
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      console.log('Token verification failed - this is normal for expired/invalid tokens');
      // Try refresh token first
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (refreshTokenValue) {
        try {
          await refreshToken();
          return;
        } catch (refreshError) {
          console.log('Token refresh also failed - clearing tokens');
        }
      }
      // Clear expired/invalid tokens and allow unauthenticated browsing
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      dispatch({ type: 'AUTH_FAILURE' });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const data = await apiClient.login(credentials);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
      dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const data = await apiClient.register(credentials);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
      dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: 'LOGOUT' });
  };

  const refreshToken = async () => {
    const token = localStorage.getItem('refresh_token');
    if (!token) {
      logout();
      return;
    }

    try {
      const data = await apiClient.refreshToken(token);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('refresh_token', data.refreshToken);
      dispatch({ type: 'AUTH_SUCCESS', payload: data.user });
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
