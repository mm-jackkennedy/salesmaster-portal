
import { AppConfig } from "@/types/config";
import { toast } from "@/components/ui/use-toast";

// Default configuration
const DEFAULT_CONFIG: AppConfig = {
  label: "Default Application",
  status: "dev",
  authProvider: "MS Entra",
  aiProvider: "OpenAI",
  commerceProvider: "Cake",
  useApi: false,
  apiBaseUrl: "http://localhost:3000/api"
};

let currentConfig: AppConfig = { ...DEFAULT_CONFIG };

/**
 * Fetches configuration from an endpoint or uses localStorage as fallback
 */
export const fetchAppConfig = async (configUrl?: string): Promise<AppConfig> => {
  try {
    // If configUrl is provided, attempt to fetch from endpoint
    if (configUrl) {
      const response = await fetch(configUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }
      
      const fetchedConfig = await response.json();
      currentConfig = {
        ...DEFAULT_CONFIG,
        ...fetchedConfig,
        // Ensure these always exist for backward compatibility
        useApi: fetchedConfig.useApi ?? localStorage.getItem('use_api') === 'true',
        apiBaseUrl: fetchedConfig.apiBaseUrl ?? localStorage.getItem('api_base_url') || DEFAULT_CONFIG.apiBaseUrl
      };
      
      // Update localStorage for backward compatibility
      localStorage.setItem('use_api', currentConfig.useApi.toString());
      localStorage.setItem('api_base_url', currentConfig.apiBaseUrl);
      
      return currentConfig;
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
    toast({
      title: "Configuration Error",
      description: "Failed to load configuration from server. Using defaults.",
      variant: "destructive",
    });
  }
  
  // Fallback to localStorage configuration
  return {
    ...DEFAULT_CONFIG,
    useApi: localStorage.getItem('use_api') === 'true',
    apiBaseUrl: localStorage.getItem('api_base_url') || DEFAULT_CONFIG.apiBaseUrl
  };
};

/**
 * Gets the current configuration
 */
export const getConfig = (): AppConfig => {
  return currentConfig;
};

/**
 * Updates the configuration settings
 */
export const updateConfig = (config: Partial<AppConfig>): AppConfig => {
  currentConfig = { ...currentConfig, ...config };
  
  // Update localStorage for backward compatibility
  localStorage.setItem('use_api', currentConfig.useApi.toString());
  localStorage.setItem('api_base_url', currentConfig.apiBaseUrl);
  
  return currentConfig;
};

/**
 * Helper functions for API configuration (compatible with existing code)
 */
export const getUseApi = (): boolean => {
  return currentConfig.useApi;
};

export const getApiBaseUrl = (): string => {
  return currentConfig.apiBaseUrl;
};
