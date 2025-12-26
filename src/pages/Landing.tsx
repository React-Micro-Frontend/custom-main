import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/shared';
import { ROUTES } from '../constants';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '👥',
      title: 'User Management',
      description: 'Manage system users, roles, and permissions with comprehensive access control.',
      route: ROUTES.USER_MANAGEMENT,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '🔨',
      title: 'E-Auction Management',
      description: 'Conduct electronic auctions for customs-related items with real-time bidding.',
      route: ROUTES.E_AUCTION_MANAGEMENT,
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: '📜',
      title: 'License Management',
      description: 'Issue, renew, and track customs licenses with automated compliance monitoring.',
      route: ROUTES.LICENSE_MANAGEMENT,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '📋',
      title: 'Post-Clearance Audit',
      description: 'Perform comprehensive post-clearance audits with risk-based assessment.',
      route: ROUTES.POST_CLEARANCE_AUDIT,
      color: 'from-green-500 to-green-600',
    },
  ];

  const statistics = [
    { label: 'Active Users', value: '2,847', icon: '👨‍💼' },
    { label: 'Licensed Entities', value: '1,234', icon: '🏢' },
    { label: 'Completed Audits', value: '567', icon: '✅' },
    { label: 'Active Auctions', value: '23', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              WeBoc Transformation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              Comprehensive Customs Management Platform
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
              Streamline customs operations with our integrated micro-frontend platform. 
              Manage users, licenses, auctions, and post-clearance audits all in one place.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="primary" 
                onClick={() => navigate(ROUTES.HOME)}
                className="px-8 py-3 text-lg"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate(ROUTES.LOGIN)}
                className="px-8 py-3 text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {statistics.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(feature.route)}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                <div className="p-6">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-[60px]">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Explore Module
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Built with Modern Technology
          </h2>
          <Card className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              <div className="text-center">
                <div className="text-4xl mb-2">⚛️</div>
                <div className="text-sm font-semibold text-gray-700">React 19</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📘</div>
                <div className="text-sm font-semibold text-gray-700">TypeScript</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔷</div>
                <div className="text-sm font-semibold text-gray-700">Redux Toolkit</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-sm font-semibold text-gray-700">Tailwind CSS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📦</div>
                <div className="text-sm font-semibold text-gray-700">Module Federation</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Micro Frontend Architecture</h3>
              <p className="text-gray-600">
                Independently deployable modules for better scalability and team autonomy.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Compliant</h3>
              <p className="text-gray-600">
                Built with security best practices and customs compliance requirements in mind.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Operations</h3>
              <p className="text-gray-600">
                Live updates and real-time data synchronization across all modules.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Access the dashboard to manage your customs operations efficiently.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="secondary" 
              onClick={() => navigate(ROUTES.HOME)}
              className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100"
            >
              Access Dashboard
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 WeBoc Transformation. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Powered by Modern Micro Frontend Architecture
          </p>
        </div>
      </footer>
    </div>
  );
};
