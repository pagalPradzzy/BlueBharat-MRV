import React, { useState } from 'react';
import { mockProjects } from '../data/mockData';
import StatusBadge from './StatusBadge';
import ProjectDetails from './ProjectDetails';

const VerificationTable = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all');

  // const pendingProjects = mockProjects.filter(project => project.status === 'pending');

  const getFilteredProjects = () => {
    switch (filter) {
      case 'pending':
        return mockProjects.filter(p => p.status === 'pending');
      case 'verified':
        return mockProjects.filter(p => p.status === 'verified');
      case 'in-progress':
        return mockProjects.filter(p => p.status === 'in-progress');
      default:
        return mockProjects;
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProject(null);
  };

  const projects = getFilteredProjects();

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-government-dark">
            Project Verification
          </h2>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-secondary-600">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="gov-input w-40"
            >
              <option value="all">All Projects</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-secondary-600">
          Showing {projects.length} projects
        </div>
      </div>

      {/* Table */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Location</th>
                <th>Hectares</th>
                <th>Organization</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary-50">
                  <td className="font-mono text-sm">{project.id}</td>
                  <td>
                    <div>
                      <div className="font-medium text-government-dark">
                        {project.name}
                      </div>
                      <div className="text-xs text-secondary-500 truncate max-w-xs">
                        {project.description}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{project.location}</td>
                  <td className="text-sm">{project.hectares}</td>
                  <td className="text-sm">{project.organization}</td>
                  <td className="text-sm">
                    {new Date(project.submittedDate).toLocaleDateString()}
                  </td>
                  <td>
                    <StatusBadge status={project.status} />
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(project)}
                        className="px-3 py-1 bg-government-blue text-white text-xs rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                      {project.status === 'pending' && (
                        <>
                          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Details Modal */}
      {showDetails && selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default VerificationTable;
