
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// Note: We're not actually modifying the config file directly
// This component simulates toggling the API mode by using localStorage
export function ApiSettings() {
  const [useApi, setUseApi] = useState(() => {
    return localStorage.getItem('use_api') === 'true';
  });
  
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem('api_base_url') || 'http://localhost:3000/api';
  });

  const handleToggleApi = (checked: boolean) => {
    setUseApi(checked);
    localStorage.setItem('use_api', checked.toString());
    
    toast({
      title: checked ? "API Mode Enabled" : "Mock Data Mode Enabled",
      description: checked 
        ? "The app will now fetch data from the API" 
        : "The app will now use mock data",
    });
  };

  const handleSaveBaseUrl = () => {
    localStorage.setItem('api_base_url', apiUrl);
    
    toast({
      title: "API URL Updated",
      description: `Base URL set to: ${apiUrl}`,
    });
  };

  const handleReset = () => {
    localStorage.removeItem('use_api');
    localStorage.removeItem('api_base_url');
    setUseApi(false);
    setApiUrl('http://localhost:3000/api');
    
    toast({
      title: "Settings Reset",
      description: "API settings have been reset to defaults",
    });
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
            checked={useApi} 
            onCheckedChange={handleToggleApi} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-url">API Base URL</Label>
          <div className="flex gap-2">
            <Input 
              id="api-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:3000/api"
              className="flex-1"
            />
            <Button onClick={handleSaveBaseUrl}>Save</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Set the base URL for API requests. You need to restart the page after changing this.
          </p>
        </div>

        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Current Status:</p>
          <div className="text-sm rounded-md bg-muted p-4">
            <p><strong>Mode:</strong> {useApi ? 'API' : 'Mock Data'}</p>
            <p><strong>API URL:</strong> {apiUrl}</p>
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
