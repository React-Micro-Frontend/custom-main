import React from "react";
import { PageHeader, StatCard, Card, QuickLinkCard } from "../components/shared";

export const Home: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Welcome to WeBoc Transformation" 
        description="Management Portal Dashboard" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="2,847" icon="👥" color="emerald" />
        <StatCard title="Audits" value="1,234" icon="📋" color="blue" />
        <StatCard title="Licenses" value="847" icon="📜" color="purple" />
        <StatCard title="Auctions" value="15" icon="🔨" color="orange" />
      </div>
      
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickLinkCard 
            title="Getting Started" 
            description="Learn how to use the portal" 
          />
          <QuickLinkCard 
            title="Documentation" 
            description="Access system documentation" 
          />
          <QuickLinkCard 
            title="Support" 
            description="Get help from our team" 
          />
          <QuickLinkCard 
            title="Settings" 
            description="Configure your preferences" 
          />
        </div>
      </Card>
    </div>
  );
};
