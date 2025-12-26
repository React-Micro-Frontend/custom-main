import React, { Suspense, lazy } from "react";
import { LoadingSpinner } from "../components/shared";

const RemoteLicenseManagement = lazy(() => import("licenseManagement/App"));

export const LicenseManagement: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading License Management module..." />}>
      <RemoteLicenseManagement />
    </Suspense>
  );
};
