import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH SERVICES ============

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ============ SKILLS SERVICES ============

export const skillsService = {
  // Get all skills with optional filters
  getAll: (params = {}) => api.get('/skills', { params }),
  
  // Get single skill
  getById: (id) => api.get(`/skills/${id}`),
  
  // Create new skill
  create: (data) => api.post('/skills', data),
  
  // Update skill
  update: (id, data) => api.put(`/skills/${id}`, data),
  
  // Delete skill
  delete: (id) => api.delete(`/skills/${id}`),
  
  // Get stats
  getStats: () => api.get('/skills/stats'),
};

export default api;
