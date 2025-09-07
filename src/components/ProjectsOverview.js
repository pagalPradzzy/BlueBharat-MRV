import React, { useState } from 'react';
import Layout from './Layout';
import { mockProjects } from '../data/mockData';

const ProjectsOverview = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProjects = selectedStatus === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.status === selectedStatus);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'verified': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout 
      title="Projects Overview" 
      description="Review and manage blue carbon restoration projects"
    >
      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['all', 'pending', 'in-progress', 'verified'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedStatus === status
                  ? 'bg-government-blue text-white'
                  : 'bg-white text-government-dark border border-secondary-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="gov-card p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-government-dark">
                {project.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-secondary-600 text-sm mb-3">{project.location}</p>
            <p className="text-secondary-700 text-sm mb-4">{project.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600">Area:</span>
                <span className="text-government-dark">{project.hectares} hectares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Credits:</span>
                <span className="text-government-dark">{project.creditsMinted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Organization:</span>
                <span className="text-government-dark text-xs">{project.organization}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="gov-button gov-button-secondary text-sm px-3 py-1">
                View Details
              </button>
              {project.status === 'pending' && (
                <button className="gov-button gov-button-primary text-sm px-3 py-1">
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectsOverview;