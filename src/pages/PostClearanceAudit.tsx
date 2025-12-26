import React, { Suspense, lazy } from "react";
import { LoadingSpinner } from "../components/shared";

const RemotePostClearanceAudit = lazy(() => import("postClearanceAudit/App"));

export const PostClearanceAudit: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Post Clearance Audit module..." />}>
      <RemotePostClearanceAudit />
    </Suspense>
  );
};
