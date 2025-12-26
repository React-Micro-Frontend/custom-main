import React, { Suspense, lazy } from "react";
import { LoadingSpinner } from "../components/shared";

const RemoteEAuctionManagement = lazy(() => import("eAuctionManagement/App"));

export const EAuctionManagement: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading E-Auction Management module..." />}>
      <RemoteEAuctionManagement />
    </Suspense>
  );
};
