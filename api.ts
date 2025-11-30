// API Configuration - Backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Helper function to call backend API
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// API endpoint helpers
export const api = {
  contact: (data: { name: string; email?: string; phone?: string; message: string }) =>
    apiRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  order: (data: { name: string; email?: string; phone?: string; product: string; quantity?: number; address?: string }) =>
    apiRequest('/api/order', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  ecoDrive: (data: { name: string; email: string; phone: string; location?: string; age?: number; plasticAmount?: string; supportFromFamily?: string }) =>
    apiRequest('/api/ecodrive', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  changeMaker: (data: { name: string; email?: string; phone?: string; city?: string; message?: string }) =>
    apiRequest('/api/changemaker', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  subscribe: (data: { email: string }) =>
    apiRequest('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  projects: () =>
    apiRequest('/api/projects'),
};


