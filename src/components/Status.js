import React from 'react';
import Layout from '../components/Layout';
import { mockProjects, mockBlockchainTransactions } from '../data/mockData';

const Status = () => {
  const userProjects = mockProjects.filter(project => 
    ['BC001', 'BC002'].includes(project.id)
  );

  const userTransactions = mockBlockchainTransactions.filter(tx => 
    userProjects.some(project => project.id === tx.projectId)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'verified': return 100;
      case 'in-progress': return 66;
      case 'pending': return 33;
      default: return 0;
    }
  };

  const StatusCard = ({ project }) => (
    <div className="bg-white border border-secondary-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-government-dark">{project.name}</h3>
          <p className="text-sm text-secondary-600">{project.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-government-dark">Progress</span>
          <span className="text-sm text-secondary-600">{getProgressPercentage(project.status)}%</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div
            className="bg-government-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage(project.status)}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-600">Submitted:</span>
          <span className="text-government-dark">{new Date(project.submittedDate).toLocaleDateString()}</span>
        </div>
        {project.verifiedDate && (
          <div className="flex justify-between">
            <span className="text-secondary-600">Verified:</span>
            <span className="text-government-dark">{new Date(project.verifiedDate).toLocaleDateString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-secondary-600">Credits Minted:</span>
          <span className="text-government-dark font-medium">{project.creditsMinted.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-secondary-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary-600">Next Step:</span>
          <span className="text-sm font-medium text-government-dark">
            {project.status === 'pending' && 'Awaiting verification'}
            {project.status === 'in-progress' && 'Under review'}
            {project.status === 'verified' && 'Complete'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-secondary-200 pb-4">
          <h1 className="text-2xl font-bold text-government-dark">Project Status</h1>
          <p className="text-secondary-600 mt-1">Track the progress of your submitted blue carbon projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-government-dark mb-4">Project Progress</h2>
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <StatusCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-secondary-200 rounded-lg p-6">
              <h3 className="font-semibold text-government-dark mb-4">Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Total Projects</span>
                  <span className="font-medium">{userProjects.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Verified</span>
                  <span className="font-medium text-green-600">
                    {userProjects.filter(p => p.status === 'verified').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Pending</span>
                  <span className="font-medium text-yellow-600">
                    {userProjects.filter(p => p.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Total Credits</span>
                  <span className="font-medium text-government-blue">
                    {userProjects.reduce((sum, p) => sum + p.creditsMinted, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-secondary-200 rounded-lg p-6">
              <h3 className="font-semibold text-government-dark mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {userTransactions.slice(0, 3).map((tx, index) => (
                  <div key={index} className="border-l-2 border-government-blue pl-3">
                    <p className="text-sm font-medium text-government-dark">{tx.type}</p>
                    <p className="text-xs text-secondary-600">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Status;