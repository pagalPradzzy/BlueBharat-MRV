import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
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

            {/* Page Header */}
            {title && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-government-dark mb-2">
                  {title}
                </h1>
                {description && (
                  <p className="text-secondary-600">
                    {description}
                  </p>
                )}
              </div>
            )}

            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;