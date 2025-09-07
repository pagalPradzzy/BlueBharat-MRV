import React, { useState } from 'react';
import { useBlockchain } from '../context/BlockchainContext';
import { mockProjects } from '../data/mockData';

const CreditsMinting = () => {
  const { mintCredits, isConnected } = useBlockchain();
  const [selectedProject, setSelectedProject] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const verifiedProjects = mockProjects.filter(project => project.status === 'verified');

  const handleMintCredits = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!selectedProject || !creditAmount) {
      setError('Please select a project and enter credit amount');
      return;
    }

    setIsMinting(true);
    setError('');

    try {
      const hash = await mintCredits(selectedProject, creditAmount);
      setTxHash(hash);
      
      // Reset form
      setSelectedProject('');
      setCreditAmount('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsMinting(false);
    }
  };

  const selectedProjectData = verifiedProjects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-government-dark mb-2">
          Carbon Credits Minting
        </h2>
        <p className="text-secondary-600">
          Mint carbon credits for verified restoration projects
        </p>
      </div>

      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Wallet Not Connected
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Please connect your wallet to mint carbon credits.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Minting Form */}
        <div className="gov-card p-6">
          <h3 className="text-lg font-semibold text-government-dark mb-4">
            Mint New Credits
          </h3>

          <form onSubmit={handleMintCredits} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-2">
                Select Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="gov-input"
                required
              >
                <option value="">Choose a verified project...</option>
                {verifiedProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-600 mb-2">
                Credit Amount
              </label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="gov-input"
                placeholder="Enter number of credits to mint"
                min="1"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isConnected || isMinting}
              className={`w-full gov-button gov-button-primary ${
                !isConnected || isMinting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isMinting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Minting Credits...
                </div>
              ) : (
                'Mint Credits'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {txHash && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600 mb-2">Credits minted successfully!</p>
              <p className="text-xs text-green-700 font-mono break-all">
                TX: {txHash}
              </p>
            </div>
          )}
        </div>

        {/* Project Details */}
        {selectedProjectData && (
          <div className="gov-card p-6">
            <h3 className="text-lg font-semibold text-government-dark mb-4">
              Project Details
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-secondary-600">Project Name</label>
                <p className="text-government-dark">{selectedProjectData.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-secondary-600">Location</label>
                <p className="text-government-dark">{selectedProjectData.location}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-secondary-600">Hectares</label>
                <p className="text-government-dark">{selectedProjectData.hectares}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-secondary-600">Current Credits</label>
                <p className="text-2xl font-bold text-government-dark">
                  {selectedProjectData.creditsMinted.toLocaleString()}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-secondary-600">Estimated Value</label>
                <p className="text-lg text-government-dark">
                  ₹{(selectedProjectData.creditsMinted * 15.5).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Minting History */}
      <div className="gov-card p-6">
        <h3 className="text-lg font-semibold text-government-dark mb-4">
          Recent Minting Activity
        </h3>
        
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Credits Minted</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {verifiedProjects.slice(0, 5).map((project) => (
                <tr key={project.id}>
                  <td className="font-mono text-sm">{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.creditsMinted.toLocaleString()}</td>
                  <td>{new Date(project.verifiedDate).toLocaleDateString()}</td>
                  <td>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Minted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreditsMinting;
