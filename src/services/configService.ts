
import { AppConfig, ThemeConfig } from "@/types/config";
import { toast } from "@/components/ui/use-toast";

// Default configuration
const DEFAULT_CONFIG: AppConfig = {
  theme: {
    primaryColor: "hsl(240 5.9% 10%)",
    secondaryColor: "hsl(240 4.8% 95.9%)",
    accentColor: "hsl(240 4.8% 95.9%)",
    backgroundColor: "hsl(0 0% 100%)",
    textColor: "hsl(240 10% 3.9%)"
  },
  useApi: false,
  apiBaseUrl: "http://localhost:3000/api"
};

// Mock configuration data
const MOCK_CONFIG: AppConfig = {
  theme: {
    primaryColor: "hsl(262 80% 50%)",
    secondaryColor: "hsl(260 50% 90%)",
    accentColor: "hsl(280 80% 60%)",
    backgroundColor: "hsl(260 10% 98%)",
    textColor: "hsl(262 80% 15%)"
  },
  useApi: false,
  apiBaseUrl: "http://localhost:3000/api"
};

let currentConfig: AppConfig = { ...DEFAULT_CONFIG };

/**
 * Fetches application configuration from API or uses mock data
 */
export const fetchAppConfig = async (configEndpoint?: string): Promise<AppConfig> => {
  try {
    // Determine if we should use the API based on localStorage setting
    const useApi = localStorage.getItem('use_api') === 'true';
    
    if (useApi && configEndpoint) {
      const response = await fetch(configEndpoint, {
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
        useApi: true,
        apiBaseUrl: fetchedConfig.apiBaseUrl || localStorage.getItem('api_base_url') || DEFAULT_CONFIG.apiBaseUrl
      };
      
      // Update localStorage for backward compatibility
      localStorage.setItem('api_base_url', currentConfig.apiBaseUrl);
      
      return currentConfig;
    } else {
      // Use mock config when not using API
      console.log("Using mock configuration data");
      currentConfig = { ...MOCK_CONFIG };
      currentConfig.useApi = useApi;
      
      // Apply API base URL from localStorage if available
      const storedApiUrl = localStorage.getItem('api_base_url');
      if (storedApiUrl) {
        currentConfig.apiBaseUrl = storedApiUrl;
      }
      
      return currentConfig;
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
    toast({
      title: "Configuration Error",
      description: "Failed to load configuration. Using default theme.",
      variant: "destructive",
    });
    
    // Fallback to defaults with localStorage API settings
    return {
      ...DEFAULT_CONFIG,
      useApi: localStorage.getItem('use_api') === 'true',
      apiBaseUrl: localStorage.getItem('api_base_url') || DEFAULT_CONFIG.apiBaseUrl
    };
  }
};

/**
 * Gets the current configuration
 */
export const getConfig = (): AppConfig => {
  return currentConfig;
};

/**
 * Gets the current theme configuration
 */
export const getTheme = (): ThemeConfig => {
  return currentConfig.theme;
};

/**
 * Updates the configuration settings
 */
export const updateConfig = (config: Partial<AppConfig>): AppConfig => {
  currentConfig = { ...currentConfig, ...config };
  
  // Also update localStorage for API settings (backward compatibility)
  if (config.useApi !== undefined) {
    localStorage.setItem('use_api', config.useApi.toString());
  }
  
  if (config.apiBaseUrl) {
    localStorage.setItem('api_base_url', config.apiBaseUrl);
  }
  
  return currentConfig;
};

/**
 * Helper functions compatible with existing API config
 */
export const getUseApi = (): boolean => {
  return currentConfig.useApi;
};

export const getApiBaseUrl = (): string => {
  return currentConfig.apiBaseUrl;
};
