import React from "react";
import { PageHeader, Card, InfoCard } from "../components/shared";

export const PostClearanceAudit: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Post Clearance Audit" 
        description="Review and audit post-clearance activities" 
      />
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Total Audits" value="1,234" color="emerald" />
          <InfoCard title="Pending Review" value="56" color="blue" />
          <InfoCard title="Completed" value="1,178" color="orange" />
        </div>
        
        <div className="mt-6">
          <p className="text-gray-500 text-center py-8">Post Clearance Audit module coming soon...</p>
        </div>
      </Card>
    </div>
  );
};
