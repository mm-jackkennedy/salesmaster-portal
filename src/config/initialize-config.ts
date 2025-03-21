
/**
 * This utility initializes the API configuration from localStorage
 * It should be imported and run at application startup
 */

import { USE_API, API_BASE_URL } from './api-config';

export const initializeApiConfig = () => {
  // Check localStorage for configuration
  const useApi = localStorage.getItem('use_api');
  const apiBaseUrl = localStorage.getItem('api_base_url');
  
  // Apply to the global scope (not ideal but works for demonstration)
  if (useApi !== null) {
    (window as any).USE_API = useApi === 'true';
  }
  
  if (apiBaseUrl) {
    (window as any).API_BASE_URL = apiBaseUrl;
  }
  
  console.log('API Config initialized:', {
    useApi: (window as any).USE_API || USE_API,
    apiBaseUrl: (window as any).API_BASE_URL || API_BASE_URL
  });
};

// Helper functions to get the current config values
export const getUseApi = (): boolean => {
  return typeof (window as any).USE_API !== 'undefined' 
    ? (window as any).USE_API 
    : USE_API;
};

export const getApiBaseUrl = (): string => {
  return (window as any).API_BASE_URL || API_BASE_URL;
};
