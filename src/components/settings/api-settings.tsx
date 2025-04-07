
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getConfig, updateConfig } from "@/services/configService";
import { AppConfig } from "@/types/config";

// Note: We're not actually modifying the config file directly
// This component simulates toggling the API mode by using localStorage
export function ApiSettings() {
  const [config, setConfig] = useState<AppConfig>(getConfig());

  const handleToggleApi = (checked: boolean) => {
    const updatedConfig = updateConfig({ useApi: checked });
    setConfig(updatedConfig);
    
    toast({
      title: checked ? "API Mode Enabled" : "Mock Data Mode Enabled",
      description: checked 
        ? "The app will now fetch data from the API" 
        : "The app will now use mock data",
    });
  };

  const handleSaveBaseUrl = () => {
    const updatedConfig = updateConfig({ apiBaseUrl: config.apiBaseUrl });
    setConfig(updatedConfig);
    
    toast({
      title: "API URL Updated",
      description: `Base URL set to: ${config.apiBaseUrl}`,
    });
  };

  const handleReset = () => {
    localStorage.removeItem('use_api');
    localStorage.removeItem('api_base_url');
    
    // This will revert to default config values
    window.location.reload();
    
    toast({
      title: "Settings Reset",
      description: "API settings have been reset to defaults",
    });
  };

  const handleThemeChange = (property: keyof typeof config.theme, value: string) => {
    const updatedConfig = updateConfig({
      theme: {
        ...config.theme,
        [property]: value
      }
    });
    
    setConfig(updatedConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Configure how the application retrieves data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="use-api">Use API</Label>
            <p className="text-sm text-muted-foreground">
              Toggle between using the API or mock data
            </p>
          </div>
          <Switch 
            id="use-api" 
            checked={config.useApi} 
            onCheckedChange={handleToggleApi} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-url">API Base URL</Label>
          <div className="flex gap-2">
            <Input 
              id="api-url"
              value={config.apiBaseUrl}
              onChange={(e) => setConfig({...config, apiBaseUrl: e.target.value})}
              placeholder="http://localhost:3000/api"
              className="flex-1"
            />
            <Button onClick={handleSaveBaseUrl}>Save</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Set the base URL for API requests. You need to restart the page after changing this.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
          <div className="space-y-3">
            {Object.entries(config.theme).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={`theme-${key}`} className="col-span-1">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
                <div className="col-span-2 flex items-center gap-2">
                  <Input 
                    id={`theme-${key}`}
                    type="color" 
                    value={value}
                    onChange={(e) => handleThemeChange(key as keyof typeof config.theme, e.target.value)}
                    className="w-10 h-10 p-1"
                  />
                  <Input 
                    value={value}
                    onChange={(e) => handleThemeChange(key as keyof typeof config.theme, e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Current Status:</p>
          <div className="text-sm rounded-md bg-muted p-4">
            <p><strong>Mode:</strong> {config.useApi ? 'API' : 'Mock Data'}</p>
            <p><strong>API URL:</strong> {config.apiBaseUrl}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Note: Changes to these settings require a page refresh to take effect
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">
          Reset to Defaults
        </Button>
      </CardContent>
    </Card>
  );
}
