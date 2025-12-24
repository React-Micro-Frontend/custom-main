import React from "react";
import { PageHeader, Card, InfoCard } from "../components/shared";

export const LicenseManagement: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="License Management" 
        description="Manage import/export licenses and permits" 
      />
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Active Licenses" value="847" color="emerald" />
          <InfoCard title="Expiring Soon" value="23" color="yellow" />
          <InfoCard title="Expired" value="12" color="red" />
        </div>
        
        <div className="mt-6">
          <p className="text-gray-500 text-center py-8">License Management module coming soon...</p>
        </div>
      </Card>
    </div>
  );
};
