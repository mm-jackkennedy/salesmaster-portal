
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/services/configService";

export function ConfigSchemaViewer() {
  // Get the current configuration
  const config = getConfig();
  
  // Generate a representational schema based on the current config
  const generateSchemaRepresentation = () => {
    // Basic schema structure
    const schema = {
      type: "object",
      properties: {
        label: {
          type: "string"
        },
        status: {
          type: "string",
          enum: ["dev", "test", "deployed", "archived"]
        },
        authProvider: {
          type: "string",
          enum: ["MS Entra", "Okta", "Auth0", "Keycloak", "Other OpenID"],
          title: "Authentication Provider",
          default: "MS Entra"
        },
        aiProvider: {
          type: "string",
          enum: ["OpenAI", "AWS"],
          title: "AI Provider",
          default: "OpenAI"
        },
        commerceProvider: {
          type: "string",
          enum: ["Cake", "Aloha"],
          title: "Commerce Provider",
          default: "Cake"
        },
        // Add API specific fields
        useApi: {
          type: "boolean",
          title: "Use API",
          default: false
        },
        apiBaseUrl: {
          type: "string",
          title: "API Base URL",
          default: "http://localhost:3000/api"
        }
      },
      required: [
        "label",
        "status",
        "authProvider",
        "aiProvider",
        "commerceProvider"
      ]
    };

    return schema;
  };

  const handleDownloadSchema = () => {
    const schema = generateSchemaRepresentation();
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-config-schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'current-app-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration Schema</CardTitle>
        <CardDescription>
          View and download the application's configuration schema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm">
            This application uses a JSON Schema configuration format that defines provider settings
            and application behavior. You can download the schema or current configuration.
          </p>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadSchema}>
              Download Schema
            </Button>
            <Button onClick={handleDownloadConfig}>
              Download Current Config
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Schema Structure Preview</h4>
          <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-96">
            {JSON.stringify(generateSchemaRepresentation(), null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
