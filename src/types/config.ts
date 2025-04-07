
/**
 * Application configuration types
 */

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface AppConfig {
  theme: ThemeConfig;
  useApi: boolean;
  apiBaseUrl: string;
}

/**
 * JSON Schema for configuration
 */
export const configSchema = {
  type: "object",
  properties: {
    theme: {
      type: "object",
      title: "Theme Configuration",
      properties: {
        primaryColor: {
          type: "string",
          title: "Primary Color",
          format: "color",
          default: "hsl(240 5.9% 10%)"
        },
        secondaryColor: {
          type: "string",
          title: "Secondary Color",
          format: "color",
          default: "hsl(240 4.8% 95.9%)"
        },
        accentColor: {
          type: "string",
          title: "Accent Color",
          format: "color",
          default: "hsl(240 4.8% 95.9%)"
        },
        backgroundColor: {
          type: "string",
          title: "Background Color",
          format: "color",
          default: "hsl(0 0% 100%)"
        },
        textColor: {
          type: "string",
          title: "Text Color",
          format: "color",
          default: "hsl(240 10% 3.9%)"
        }
      },
      required: ["primaryColor", "secondaryColor", "accentColor", "backgroundColor", "textColor"]
    },
    useApi: {
      type: "boolean",
      title: "Use API for data",
      default: false
    },
    apiBaseUrl: {
      type: "string",
      title: "API Base URL",
      default: "http://localhost:3000/api"
    }
  },
  required: ["theme", "useApi", "apiBaseUrl"]
};
