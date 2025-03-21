import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiDocsPage = () => {
  return (
    <AdminLayout>
      <PageHeader
        title="API Documentation"
        description="Explore and integrate with our POS Admin API"
      />
      
      <div className="space-y-6 animate-in">
        <Card>
          <CardHeader>
            <CardTitle>POS Admin API v1.0.0</CardTitle>
            <CardDescription>
              This documentation provides information about all available endpoints for integrating with the POS Admin system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Base URLs</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge>PRODUCTION</Badge>
                  <code className="bg-muted p-1 rounded">https://api.posadmin.com/v1</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">STAGING</Badge>
                  <code className="bg-muted p-1 rounded">https://staging-api.posadmin.com/v1</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">LOCAL</Badge>
                  <code className="bg-muted p-1 rounded">http://localhost:8080/api/v1</code>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Authentication</h3>
              <p className="text-muted-foreground mb-2">
                API requests are authenticated using JWT Bearer tokens.
              </p>
              <code className="block bg-muted p-2 rounded">
                Authorization: Bearer {"{your_jwt_token}"}
              </code>
            </div>
            
            <Tabs defaultValue="endpoints">
              <TabsList className="mb-4">
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="schemas">Data Schemas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="endpoints">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="authentication">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Auth</Badge>
                        <span>Authentication</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500">POST</Badge>
                              <span className="font-medium">/auth/login</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Authenticate a user with email and password</p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">Request Body</h4>
                            <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "email": "string",
  "password": "string"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="dashboard">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Dashboard</Badge>
                        <span>Dashboard Statistics</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/dashboard/stats</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve statistical data for the dashboard</p>
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">Query Parameters</h4>
                            <ul className="list-disc list-inside text-sm">
                              <li>period: daily, weekly, monthly, yearly</li>
                              <li>fromDate: Start date (YYYY-MM-DD)</li>
                              <li>toDate: End date (YYYY-MM-DD)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="products">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Products</Badge>
                        <span>Product Management</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/products</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve a list of all products with pagination</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500">POST</Badge>
                              <span className="font-medium">/products</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Add a new product to the inventory</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/products/{"{productId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve a product by its ID</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500">PUT</Badge>
                              <span className="font-medium">/products/{"{productId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Modify an existing product</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-500">DELETE</Badge>
                              <span className="font-medium">/products/{"{productId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Remove a product from the inventory</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="orders">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Orders</Badge>
                        <span>Order Management</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/orders</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve a list of all orders with pagination</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500">POST</Badge>
                              <span className="font-medium">/orders</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Create a new customer order</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/orders/{"{orderId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve an order by its ID</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500">PUT</Badge>
                              <span className="font-medium">/orders/{"{orderId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Modify an existing order</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="employees">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Employees</Badge>
                        <span>Employee Management</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/employees</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve a list of all employees with pagination</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500">POST</Badge>
                              <span className="font-medium">/employees</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Add a new employee to the system</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/employees/{"{employeeId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve an employee by their ID</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500">PUT</Badge>
                              <span className="font-medium">/employees/{"{employeeId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Modify an existing employee</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-500">DELETE</Badge>
                              <span className="font-medium">/employees/{"{employeeId}"}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Remove an employee from the system</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="settings">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Settings</Badge>
                        <span>Store Settings</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">GET</Badge>
                              <span className="font-medium">/settings</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Retrieve all store settings</p>
                        </div>
                        
                        <div className="border rounded p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500">PUT</Badge>
                              <span className="font-medium">/settings</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Modify store settings</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="schemas">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="product">
                    <AccordionTrigger>Product Schema</AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "sku": "string",
  "stock": "integer",
  "imageUrl": "string",
  "status": "active | inactive | out_of_stock",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}`}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="order">
                    <AccordionTrigger>Order Schema</AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "id": "string",
  "orderNumber": "string",
  "customerId": "string",
  "customerName": "string",
  "customerEmail": "string",
  "status": "pending | processing | completed | cancelled",
  "total": "number",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": "integer",
      "unitPrice": "number",
      "totalPrice": "number"
    }
  ],
  "paymentStatus": "pending | paid | refunded | failed",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}`}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="employee">
                    <AccordionTrigger>Employee Schema</AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "Store Manager | Cashier | Sales Associate | Inventory Manager",
  "status": "Active | On Leave | Inactive",
  "joinDate": "date",
  "phoneNumber": "string",
  "address": "string"
}`}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="settings">
                    <AccordionTrigger>Settings Schema</AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-2 rounded text-xs overflow-auto">
{`{
  "storeName": "string",
  "storeEmail": "string",
  "storePhone": "string",
  "storeAddress": "string",
  "taxRate": "number",
  "currencyCode": "string",
  "logoUrl": "string",
  "operatingHours": {
    "monday": "string",
    "tuesday": "string",
    // ...other days
  }
}`}
                      </pre>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ApiDocsPage;
