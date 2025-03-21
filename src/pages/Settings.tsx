
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Settings" 
        description="Manage your store preferences"
      />

      <Tabs defaultValue="store" className="animate-in">
        <TabsList className="mb-6">
          <TabsTrigger value="store">Store Profile</TabsTrigger>
          <TabsTrigger value="tax">Tax & Payments</TabsTrigger>
          <TabsTrigger value="receipt">Receipt Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and public information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Urban Cafe & Bistro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="contact@urbancafe.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://urbancafe.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Market Street" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" defaultValue="94103" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax & Payment Settings</CardTitle>
              <CardDescription>
                Configure taxation and payment methods for your point of sale.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="8.5" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Tax Calculation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically calculate taxes for each transaction
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accepted Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cash-payments">Cash</Label>
                    <Switch id="cash-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="credit-payments">Credit Cards</Label>
                    <Switch id="credit-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debit-payments">Debit Cards</Label>
                    <Switch id="debit-payments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile-payments">Mobile Payments</Label>
                    <Switch id="mobile-payments" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="receipt">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Configuration</CardTitle>
              <CardDescription>
                Customize your receipt layout and information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-header">Receipt Header</Label>
                  <Input
                    id="receipt-header"
                    defaultValue="Urban Cafe & Bistro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-footer">Receipt Footer</Label>
                  <Input
                    id="receipt-footer"
                    defaultValue="Thank you for your business!"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-font">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="receipt-font">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Receipt Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tax">Show Tax Breakdown</Label>
                    <Switch id="show-tax" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-discounts">Show Applied Discounts</Label>
                    <Switch id="show-discounts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-barcode">Include Barcode/QR Code</Label>
                    <Switch id="show-barcode" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="digital-receipt">Enable Digital Receipts</Label>
                    <Switch id="digital-receipt" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive alerts and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-sales">Daily Sales Summary</Label>
                    <Switch id="notify-sales" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-inventory">Low Inventory Alerts</Label>
                    <Switch id="notify-inventory" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-returns">Return/Refund Notifications</Label>
                    <Switch id="notify-returns" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-login">Staff Login Notifications</Label>
                    <Switch id="alert-login" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-discount">Large Discount Alerts</Label>
                    <Switch id="alert-discount" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-void">Void Transaction Alerts</Label>
                    <Switch id="alert-void" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SettingsPage;
