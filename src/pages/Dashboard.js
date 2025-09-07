import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsGrid from '../components/StatsGrid';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getRoleBasedContent = (role) => {
    switch (role) {
      case 'field-worker':
        return {
          title: 'Field Worker Dashboard',
          description: 'Track your restoration projects and submit new data',
          quickActions: [
            { name: 'Submit New Data', icon: '📝', color: 'bg-green-100 text-green-800' },
            { name: 'View My Projects', icon: '🌱', color: 'bg-blue-100 text-blue-800' },
            { name: 'Check Status', icon: '📊', color: 'bg-purple-100 text-purple-800' }
          ]
        };
      case 'ngo':
        return {
          title: 'NGO Dashboard',
          description: 'Manage verification requests and review project data',
          quickActions: [
            { name: 'Review Projects', icon: '📋', color: 'bg-blue-100 text-blue-800' },
            { name: 'Verification Queue', icon: '✅', color: 'bg-green-100 text-green-800' },
            { name: 'Generate Reports', icon: '📊', color: 'bg-purple-100 text-purple-800' }
          ]
        };
      case 'nccr-admin':
        return {
          title: 'NCCR Admin Dashboard',
          description: 'Oversee all projects and manage carbon credit verification',
          quickActions: [
            { name: 'All Projects', icon: '🗂️', color: 'bg-blue-100 text-blue-800' },
            { name: 'Verification Panel', icon: '⚖️', color: 'bg-orange-100 text-orange-800' },
            { name: 'Analytics', icon: '📈', color: 'bg-purple-100 text-purple-800' },
            { name: 'Blockchain', icon: '⛓️', color: 'bg-gray-100 text-gray-800' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Welcome to Blue Bharat MRV',
          quickActions: []
        };
    }
  };

  const content = getRoleBasedContent(user?.role);

  return (
    <div className="min-h-screen bg-government-light">
      <Header />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MobileNavigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-0">
          <main className="p-4 lg:p-6">
            {/* Mobile menu button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="gov-button gov-button-secondary flex items-center space-x-2"
              >
                <span>☰</span>
                <span>Menu</span>
              </button>
            </div>

            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-government-dark mb-2">
                {content.title}
              </h1>
              <p className="text-secondary-600">
                {content.description}
              </p>
            </div>

            {/* Statistics Grid */}
            <StatsGrid loading={loading} />

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-government-dark mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-md border border-secondary-200 hover:border-secondary-300 transition-colors duration-200 ${action.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="font-medium">{action.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="gov-card p-6">
              <h2 className="text-xl font-semibold text-government-dark mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-md">
                  <span className="text-green-600">✅</span>
                  <div>
                    <p className="text-sm font-medium text-government-dark">
                      Project "Mangrove Restoration - Sundarbans" verified
                    </p>
                    <p className="text-xs text-secondary-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-md">
                  <span className="text-blue-600">📝</span>
                  <div>
                    <p className="text-sm font-medium text-government-dark">
                      New data submitted for "Coastal Wetland - Kerala"
                    </p>
                    <p className="text-xs text-secondary-600">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-md">
                  <span className="text-purple-600">💰</span>
                  <div>
                    <p className="text-sm font-medium text-government-dark">
                      1,250 carbon credits minted for verified project
                    </p>
                    <p className="text-xs text-secondary-600">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
