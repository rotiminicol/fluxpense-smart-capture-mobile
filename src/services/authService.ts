
import { authApi, tokenManager } from '@/lib/api';
import { AuthResponse, User } from '@/types/api';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('auth/login', {
      email,
      password,
    });
    console.log('LOGIN RESPONSE', response);
    if (response.authToken) {
      tokenManager.setToken(response.authToken);
      console.log('TOKEN SET', response.authToken);
    } else {
      console.log('NO TOKEN IN LOGIN RESPONSE');
    }
    return response;
  },

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('auth/signup', {
      name,
      email,
      password,
    });
    console.log('SIGNUP RESPONSE', response);
    if (response.authToken) {
      tokenManager.setToken(response.authToken);
      console.log('TOKEN SET', response.authToken);
    } else {
      console.log('NO TOKEN IN SIGNUP RESPONSE');
    }
    return response;
  },

  async getCurrentUser(): Promise<User> {
    try {
      const user = await authApi.get<User>('auth/me');
      console.log('GET CURRENT USER RESPONSE', user);
      return user;
    } catch (error) {
      console.error('GET CURRENT USER ERROR', error);
      throw error;
    }
  },

  logout(): void {
    tokenManager.removeToken();
  },

  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  },
};
