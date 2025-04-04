
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getConfig, updateConfig } from "@/services/configService";
import { AppConfig, AuthProvider, AIProvider, CommerceProvider } from "@/types/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiSettings() {
  const [config, setConfig] = useState<AppConfig>(getConfig());
  const [configUrl, setConfigUrl] = useState<string>('/api/config');
  
  // Use existing localStorage values for compatibility
  useEffect(() => {
    setConfig(getConfig());
  }, []);

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
    
    const updatedConfig = updateConfig({
      useApi: false,
      apiBaseUrl: 'http://localhost:3000/api'
    });
    
    setConfig(updatedConfig);
    
    toast({
      title: "Settings Reset",
      description: "API settings have been reset to defaults",
    });
  };

  const handleFetchConfig = async () => {
    try {
      const response = await fetch(configUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }
      const fetchedConfig = await response.json();
      
      // Update state with fetched configuration
      const updatedConfig = updateConfig(fetchedConfig);
      setConfig(updatedConfig);
      
      toast({
        title: "Configuration Loaded",
        description: "Successfully loaded configuration from endpoint"
      });
    } catch (error) {
      console.error("Error fetching configuration:", error);
      toast({
        title: "Failed to Load Configuration",
        description: "Could not fetch configuration from the specified endpoint",
        variant: "destructive"
      });
    }
  };

  const handleProviderChange = (field: keyof AppConfig, value: any) => {
    const updatedConfig = updateConfig({ [field]: value });
    setConfig(updatedConfig);
    
    toast({
      title: "Configuration Updated",
      description: `${field} updated to ${value}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration Settings</CardTitle>
        <CardDescription>
          Configure application settings including API, authentication, and providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="api">API Settings</TabsTrigger>
            <TabsTrigger value="auth">Auth Provider</TabsTrigger>
            <TabsTrigger value="ai">AI Provider</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
          </TabsList>
          
          {/* API Settings Tab */}
          <TabsContent value="api" className="space-y-4">
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

            <div className="space-y-2 pt-4">
              <Label htmlFor="config-url">Configuration Endpoint</Label>
              <div className="flex gap-2">
                <Input 
                  id="config-url"
                  value={configUrl}
                  onChange={(e) => setConfigUrl(e.target.value)}
                  placeholder="/api/config"
                  className="flex-1"
                />
                <Button onClick={handleFetchConfig}>Fetch</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                URL to fetch application configuration from
              </p>
            </div>
          </TabsContent>

          {/* Auth Provider Tab */}
          <TabsContent value="auth" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auth-provider">Authentication Provider</Label>
              <Select 
                value={config.authProvider} 
                onValueChange={(value) => handleProviderChange('authProvider', value as AuthProvider)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select auth provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MS Entra">MS Entra</SelectItem>
                  <SelectItem value="Okta">Okta</SelectItem>
                  <SelectItem value="Auth0">Auth0</SelectItem>
                  <SelectItem value="Keycloak">Keycloak</SelectItem>
                  <SelectItem value="Other OpenID">Other OpenID</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Selected authentication provider: {config.authProvider}
              </p>
            </div>
          </TabsContent>

          {/* AI Provider Tab */}
          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-provider">AI Provider</Label>
              <Select 
                value={config.aiProvider} 
                onValueChange={(value) => handleProviderChange('aiProvider', value as AIProvider)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select AI provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OpenAI">OpenAI</SelectItem>
                  <SelectItem value="AWS">AWS</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Selected AI provider: {config.aiProvider}
              </p>
            </div>
          </TabsContent>

          {/* Commerce Provider Tab */}
          <TabsContent value="commerce" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commerce-provider">Commerce Provider</Label>
              <Select 
                value={config.commerceProvider} 
                onValueChange={(value) => handleProviderChange('commerceProvider', value as CommerceProvider)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select commerce provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cake">Cake</SelectItem>
                  <SelectItem value="Aloha">Aloha</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Selected commerce provider: {config.commerceProvider}
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-4">
          <p className="text-sm font-medium mb-2">Current Status:</p>
          <div className="text-sm rounded-md bg-muted p-4">
            <p><strong>Status:</strong> {config.status}</p>
            <p><strong>Label:</strong> {config.label}</p>
            <p><strong>API Mode:</strong> {config.useApi ? 'Enabled' : 'Disabled'}</p>
            <p><strong>API URL:</strong> {config.apiBaseUrl}</p>
            <p><strong>Auth Provider:</strong> {config.authProvider}</p>
            <p><strong>AI Provider:</strong> {config.aiProvider}</p>
            <p><strong>Commerce Provider:</strong> {config.commerceProvider}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Note: Changes to these settings require a page refresh to take full effect
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
