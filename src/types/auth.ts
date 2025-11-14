export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
