import React, { Suspense } from "react";
import { PageHeader, LoadingSpinner } from "../components/shared";

const RemoteUserApp = React.lazy(() => import("userManagement/UserApp"));

export const UserManagement: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="User Management" 
        description="Manage and configure user accounts and permissions" 
      />
      
      <Suspense fallback={<LoadingSpinner message="Loading User Management..." />}>
        <RemoteUserApp />
      </Suspense>
    </div>
  );
};
