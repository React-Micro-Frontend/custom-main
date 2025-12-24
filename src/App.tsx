import React, { Suspense } from "react";

const RemoteUserApp = React.lazy(() => import("userManagement/UserApp"));

export default function App() {
  return (
    <div>
      <h1 className="text-3xl bg-orange-400">Custom Main Host 🚀</h1>
      <Suspense fallback={<div>Loading Remote...</div>}>
        <RemoteUserApp />
      </Suspense>
    </div>
  );
}
