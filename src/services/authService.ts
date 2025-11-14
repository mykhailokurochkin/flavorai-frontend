import type { UserData, Credentials, AuthResponse, ApiError, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signupUser = async (userData: UserData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });

  const data: AuthResponse | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to sign up');
  }

  return data as AuthResponse;
};

export const loginUser = async (credentials: Credentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data: AuthResponse | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to log in');
  }

  return data as AuthResponse;
};

export const getAuthStatus = async (): Promise<User | null> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/status`, {
    credentials: 'include',
  });

  if (response.status === 401) {
    return null;
  }

  const data: User | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to get auth status');
  }

  return data as User;
};

export const logoutUser = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data: AuthResponse | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to log out');
  }

  return data as AuthResponse;
};
