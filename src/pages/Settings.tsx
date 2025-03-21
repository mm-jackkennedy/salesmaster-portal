
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import { ApiSettings } from "@/components/settings/api-settings";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Settings" 
        description="Manage your application settings"
      />
      
      <div className="grid gap-6">
        <ApiSettings />
        {/* Additional settings components can be added here */}
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
