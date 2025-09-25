const API_URL = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : 'http://localhost:3001';

// Helper function to make authenticated requests with automatic token refresh
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // If unauthorized, check the specific error type
  if (response.status === 401) {
    let errorData;
    try {
      errorData = await response.clone().json();
    } catch (e) {
      errorData = { error: 'UNKNOWN_ERROR' };
    }

    // Handle token expiration specifically
    if (errorData.error === 'TOKEN_EXPIRED') {
      console.log('Token expired, attempting refresh...');
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (refreshTokenValue) {
        try {
          const refreshData = await apiClient.refreshToken(refreshTokenValue);
          // Retry the original request with new token
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${refreshData.token}`,
            },
          });
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          console.log('Token refresh failed, redirecting to login...');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          
          // Redirect to login page if we're in a browser environment
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login?reason=session_expired';
          }
          
          throw new Error('Session expired. Please login again.');
        }
      } else {
        // No refresh token, clear storage and redirect
        console.log('No refresh token available, redirecting to login...');
        localStorage.removeItem('auth_token');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login?reason=session_expired';
        }
        
        throw new Error('Session expired. Please login again.');
      }
    }

    // Handle other authentication errors
    if (errorData.error === 'INVALID_TOKEN' || errorData.error === 'AUTHENTICATION_FAILED') {
      console.log('Invalid token, clearing storage and redirecting...');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login?reason=invalid_token';
      }
      
      throw new Error('Invalid authentication. Please login again.');
    }

    // Generic 401 handling
    throw new Error('Authentication failed. Please login again.');
  }

  return response;
}

export const apiClient = {
  async login(credentials: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await res.json();
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  },

  async register(credentials: { email: string; password: string; name?: string; confirmPassword?: string }) {
    // Transform frontend data to backend format
    const [firstName = '', lastName = ''] = (credentials.name || '').split(' ', 2);
    const backendData = {
      firstName: firstName || credentials.name || 'User',
      lastName: lastName || '',
      email: credentials.email,
      password: credentials.password,
    };
    
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(errorData.message || 'Registration failed');
    }
    const data = await res.json();
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  },

  async verifyToken() {
    const response = await authenticatedFetch(`${API_URL}/auth/verify`);
    if (!response.ok) throw new Error('Token verification failed');
    return response.json();
  },

  async getOrders() {
    // Returns all orders (backend currently exposes GET /orders). The frontend
    // will filter to the current user's orders by user id/email.
    const response = await authenticatedFetch(`${API_URL}/orders`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Failed to fetch orders' }));
      throw new Error(err.message || 'Failed to fetch orders');
    }
    return response.json();
  },

  async getUsers() {
    const response = await authenticatedFetch(`${API_URL}/users`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
      throw new Error(err.message || 'Failed to fetch users');
    }
    return response.json();
  },

  async updateUser(userId: string, data: any) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to update user' }));
      throw new Error(err.message || 'Failed to update user');
    }
    return res.json();
  },

  async deleteUser(userId: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to delete user' }));
      throw new Error(err.message || 'Failed to delete user');
    }
    return { success: true };
  },

  async updateOrderStatus(orderId: number | string, status: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to update order status' }));
      throw new Error(err.message || 'Failed to update order status');
    }
    return res.json();
  },

  async updateOrder(orderId: number | string, data: any) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to update order' }));
      throw new Error(err.message || 'Failed to update order');
    }
    return res.json();
  },

  async contactCustomer(orderId: number | string, subject: string, message: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    const res = await fetch(`${API_URL}/orders/${orderId}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ subject, message }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to contact customer' }));
      throw new Error(err.message || 'Failed to contact customer');
    }
    return res.json();
  },

  async refreshToken(token: string) {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) throw new Error('Token refresh failed');
    const data = await res.json();
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
  },
};
