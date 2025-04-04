
/**
 * This utility initializes the API configuration from JSON Config API
 * It should be imported and run at application startup
 */

import { fetchAppConfig, getConfig } from "@/services/configService";

export const initializeApiConfig = async (configUrl?: string): Promise<void> => {
  // Fetch configuration from endpoint or use localStorage
  await fetchAppConfig(configUrl);
  
  const config = getConfig();
  
  // Apply to the global scope (not ideal but works for demonstration and backwards compatibility)
  (window as any).USE_API = config.useApi;
  (window as any).API_BASE_URL = config.apiBaseUrl;
  
  console.log('API Config initialized:', {
    useApi: config.useApi,
    apiBaseUrl: config.apiBaseUrl,
    provider: {
      auth: config.authProvider,
      ai: config.aiProvider,
      commerce: config.commerceProvider
    }
  });
};

// Helper functions to get the current config values
export const getUseApi = (): boolean => {
  return typeof (window as any).USE_API !== 'undefined' 
    ? (window as any).USE_API 
    : false;
};

export const getApiBaseUrl = (): string => {
  return (window as any).API_BASE_URL || 'http://localhost:3000/api';
};
