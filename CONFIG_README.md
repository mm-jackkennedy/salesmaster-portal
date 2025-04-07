
# Application Configuration API

This application can be configured by providing a JSON configuration file or hosting an API endpoint that returns the configuration in the specified format.

## Configuration Schema

The configuration follows this schema:

```json
{
  "theme": {
    "primaryColor": "hsl(240 5.9% 10%)",
    "secondaryColor": "hsl(240 4.8% 95.9%)",
    "accentColor": "hsl(240 4.8% 95.9%)",
    "backgroundColor": "hsl(0 0% 100%)",
    "textColor": "hsl(240 10% 3.9%)"
  },
  "useApi": boolean,
  "apiBaseUrl": "http://your-api-url.com/api"
}
```

## How to Configure the Application

### Option 1: API Endpoint

Host an API endpoint that returns the configuration JSON in the format specified above. The application will fetch this configuration when it starts up if API mode is enabled.

1. Create an API endpoint at `/api/config` that returns the configuration JSON.
2. Enable API mode in the application settings.

### Option 2: Local Storage Configuration

Configure the application using the Settings page, which will save the configuration in localStorage.

### External Application Integration

If you're embedding this application in another application, you can provide the configuration by:

1. Injecting a global variable before loading the application:
```javascript
window.APP_CONFIG = {
  theme: {
    primaryColor: "hsl(262 80% 50%)",
    secondaryColor: "hsl(260 50% 90%)",
    accentColor: "hsl(280 80% 60%)",
    backgroundColor: "hsl(260 10% 98%)",
    textColor: "hsl(262 80% 15%)"
  },
  useApi: true,
  apiBaseUrl: "http://your-api.com/api"
};
```

2. Or by hosting a configuration endpoint and setting the application to use API mode.

## Default Values

If no configuration is provided or if there are missing fields, the application will use these default values:

- Theme:
  - Primary Color: hsl(240 5.9% 10%)
  - Secondary Color: hsl(240 4.8% 95.9%)
  - Accent Color: hsl(240 4.8% 95.9%)
  - Background Color: hsl(0 0% 100%)
  - Text Color: hsl(240 10% 3.9%)
- Use API: false
- API Base URL: "http://localhost:3000/api"

## Mock Mode

When API mode is disabled, the application uses a predefined mock theme:
- Primary Color: hsl(262 80% 50%)
- Secondary Color: hsl(260 50% 90%)
- Accent Color: hsl(280 80% 60%)
- Background Color: hsl(260 10% 98%)
- Text Color: hsl(262 80% 15%)
