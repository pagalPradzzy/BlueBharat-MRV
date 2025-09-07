import React from 'react';
import Layout from './Layout';
import { mockProjects } from '../data/mockData';

const VerificationRequests = () => {
  const pendingProjects = mockProjects.filter(project => project.status === 'pending');

  return (
    <Layout 
      title="Verification Requests" 
      description="Review and verify blue carbon restoration projects"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="gov-card p-6">
          <h3 className="text-lg font-semibold text-government-dark mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingProjects.length}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-lg font-semibold text-government-dark mb-2">Total Area</h3>
          <p className="text-3xl font-bold text-blue-600">
            {pendingProjects.reduce((sum, p) => sum + p.hectares, 0)} ha
          </p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-lg font-semibold text-government-dark mb-2">Avg Review Time</h3>
          <p className="text-3xl font-bold text-green-600">7 days</p>
        </div>
      </div>

      {/* Verification Queue */}
      <div className="gov-card">
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-government-dark">Verification Queue</h2>
        </div>
        
        <div className="divide-y divide-secondary-200">
          {pendingProjects.map((project) => (
            <div key={project.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-government-dark mb-2">
                    {project.name}
                  </h3>
                  <p className="text-secondary-600 mb-2">{project.location}</p>
                  <p className="text-secondary-700 text-sm mb-3">{project.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-secondary-600">Submitted:</span>
                      <p className="text-government-dark">{project.submittedDate}</p>
                    </div>
                    <div>
                      <span className="text-secondary-600">Area:</span>
                      <p className="text-government-dark">{project.hectares} hectares</p>
                    </div>
                    <div>
                      <span className="text-secondary-600">Organization:</span>
                      <p className="text-government-dark">{project.organization}</p>
                    </div>
                    <div>
                      <span className="text-secondary-600">Project ID:</span>
                      <p className="text-government-dark font-mono">{project.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="gov-button gov-button-primary">
                    Start Review
                  </button>
                  <button className="gov-button gov-button-secondary">
                    View Details
                  </button>
                  <button className="text-secondary-600 text-sm hover:text-secondary-800">
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default VerificationRequests;