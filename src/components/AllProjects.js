import React, { useState } from 'react';
import Layout from './Layout';
import { mockProjects } from '../data/mockData';

const AllProjects = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.organization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'verified': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800'
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusActions = (project) => {
    switch (project.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button className="gov-button gov-button-primary text-sm px-3 py-1">
              Approve
            </button>
            <button className="gov-button gov-button-secondary text-sm px-3 py-1">
              Reject
            </button>
          </div>
        );
      case 'verified':
        return (
          <button className="gov-button gov-button-primary text-sm px-3 py-1">
            Mint Credits
          </button>
        );
      default:
        return (
          <button className="gov-button gov-button-secondary text-sm px-3 py-1">
            View Details
          </button>
        );
    }
  };

  const projectStats = {
    total: mockProjects.length,
    verified: mockProjects.filter(p => p.status === 'verified').length,
    pending: mockProjects.filter(p => p.status === 'pending').length,
    inProgress: mockProjects.filter(p => p.status === 'in-progress').length
  };

  return (
    <Layout 
      title="All Projects" 
      description="Comprehensive overview and management of all blue carbon projects"
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-government-dark">{projectStats.total}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Verified</h3>
          <p className="text-3xl font-bold text-green-600">{projectStats.verified}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{projectStats.pending}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">{projectStats.inProgress}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="gov-card p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            {['all', 'pending', 'in-progress', 'verified'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterStatus === status
                    ? 'bg-government-blue text-white'
                    : 'bg-white text-government-dark border border-secondary-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search projects, locations, or organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-secondary-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="gov-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Area (ha)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-government-dark">{project.name}</div>
                      <div className="text-sm text-secondary-600">{project.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-700">
                    {project.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-700">
                    {project.hectares}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-700">
                    {project.creditsMinted.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-700">
                    {project.submittedDate}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusActions(project)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AllProjects;