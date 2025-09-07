import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import SequestrationChart from '../components/SequestrationChart';
import ProjectsChart from '../components/ProjectsChart';
import PredictiveChart from '../components/PredictiveChart';

const Analytics = () => {
  // const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-government-light">
      <Header />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {/* Mobile menu button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="gov-button gov-button-secondary"
              >
                ☰ Menu
              </button>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-government-dark mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-secondary-600">
                Comprehensive analysis of blue carbon restoration projects and carbon sequestration data
              </p>
            </div>

            {/* Charts Grid */}
            <div className="space-y-8">
              <SequestrationChart loading={loading} />
              <ProjectsChart loading={loading} />
              <PredictiveChart loading={loading} />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
