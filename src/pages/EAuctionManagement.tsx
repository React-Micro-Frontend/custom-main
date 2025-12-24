import React from "react";
import { PageHeader, Card, InfoCard } from "../components/shared";

export const EAuctionManagement: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="E Auction Management" 
        description="Manage electronic auctions and bidding processes" 
      />
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Active Auctions" value="15" color="emerald" />
          <InfoCard title="Total Bids" value="342" color="blue" />
          <InfoCard title="Completed" value="89" color="purple" />
        </div>
        
        <div className="mt-6">
          <p className="text-gray-500 text-center py-8">E Auction Management module coming soon...</p>
        </div>
      </Card>
    </div>
  );
};
