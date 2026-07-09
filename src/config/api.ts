// Centralized API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Centralized dictionary of all API endpoints
export const API_ENDPOINTS = {
  COUNTRIES: '/api/countries',
  COUNTRY_DETAILS: '/api/country',
  FILTER_OPTIONS: '/api/filterOptions',
};

// Helper to construct absolute URLs seamlessly
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
