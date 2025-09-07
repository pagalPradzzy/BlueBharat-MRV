import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import VerificationTable from '../components/VerificationTable';

const VerificationPanel = () => {
  // const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

            <VerificationTable />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerificationPanel;
