
import { authApi, tokenManager } from '@/lib/api';
import { AuthResponse, User } from '@/types/api';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('auth/login', {
      email,
      password,
    });
    
    if (response.authToken) {
      tokenManager.setToken(response.authToken);
    }
    
    return response;
  },

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('auth/signup', {
      name,
      email,
      password,
    });
    
    if (response.authToken) {
      tokenManager.setToken(response.authToken);
    }
    
    return response;
  },

  async getCurrentUser(): Promise<User> {
    return authApi.get<User>('auth/me');
  },

  logout(): void {
    tokenManager.removeToken();
  },

  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  },
};
