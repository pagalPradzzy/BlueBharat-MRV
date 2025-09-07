import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BlockchainProvider } from '../context/BlockchainContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import WalletConnect from '../components/WalletConnect';
import CreditsMinting from '../components/CreditsMinting';

const BlockchainPage = () => {
  // const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BlockchainProvider>
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
                  Blockchain Integration
                </h1>
                <p className="text-secondary-600">
                  Manage carbon credits on the blockchain and interact with smart contracts
                </p>
              </div>

              {/* Blockchain Components */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <WalletConnect />
                <div className="gov-card p-6">
                  <h3 className="text-lg font-semibold text-government-dark mb-4">
                    Network Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Network:</span>
                      <span className="text-government-dark">Polygon Mumbai (Testnet)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Chain ID:</span>
                      <span className="text-government-dark">80001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Contract:</span>
                      <span className="text-government-dark font-mono text-xs">
                        0x1234...7890
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Gas Price:</span>
                      <span className="text-government-dark">~1 gwei</span>
                    </div>
                  </div>
                </div>
              </div>

              <CreditsMinting />
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </BlockchainProvider>
  );
};

export default BlockchainPage;
