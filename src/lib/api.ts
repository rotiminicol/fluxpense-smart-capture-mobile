
const AUTH_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:y15tPd49';
const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:b2V_Vrgq';

// API Configuration
export const API_CONFIG = {
  AUTH_BASE_URL,
  API_BASE_URL,
  MINDEE_API_KEY: 'ed2d51a32022a48b2b8ef5e9670c7ef4',
  MAILPARSE_EMAIL: 'tzibdfwx@mailparser.io',
};

// Token management
export const tokenManager = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token: string) => localStorage.setItem('auth_token', token),
  removeToken: () => localStorage.removeItem('auth_token'),
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

// Base API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const token = tokenManager.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const authApi = new ApiClient(AUTH_BASE_URL);
export const dataApi = new ApiClient(API_BASE_URL);
