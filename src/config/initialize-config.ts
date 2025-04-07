
/**
 * This utility initializes the API configuration from localStorage or remote config
 * It should be imported and run at application startup
 */

import { USE_API, API_BASE_URL } from './api-config';
import { fetchAppConfig, getUseApi, getApiBaseUrl } from '@/services/configService';

export const initializeApiConfig = async () => {
  // Fetch configuration and apply it
  await fetchAppConfig('/api/config');
  
  // Apply to the global scope (not ideal but works for demonstration)
  (window as any).USE_API = getUseApi();
  (window as any).API_BASE_URL = getApiBaseUrl();
  
  console.log('API Config initialized:', {
    useApi: getUseApi(),
    apiBaseUrl: getApiBaseUrl()
  });
};

// Helper functions to get the current config values - these maintain backward compatibility
export const getUseApi = (): boolean => {
  return typeof (window as any).USE_API !== 'undefined' 
    ? (window as any).USE_API 
    : USE_API;
};

export const getApiBaseUrl = (): string => {
  return (window as any).API_BASE_URL || API_BASE_URL;
};
