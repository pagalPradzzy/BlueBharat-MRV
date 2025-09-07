import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockProjects } from '../data/mockData';

const ProjectsOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on NGO access (in real app, this would be based on user permissions)
  const ngoProjects = mockProjects.filter(project => 
    ['BC001', 'BC002', 'BC003', 'BC004'].includes(project.id)
  );

  const filteredProjects = ngoProjects.filter(project => {
    if (selectedFilter === 'all') return true;
    return project.status === selectedFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-government-dark">{project.name}</h3>
          <button
            onClick={onClose}
            className="text-secondary-500 hover:text-secondary-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-government-dark">Location</p>
              <p className="text-secondary-600">{project.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-government-dark">Organization</p>
              <p className="text-secondary-600">{project.organization}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-government-dark">Area</p>
              <p className="text-secondary-600">{project.hectares} hectares</p>
            </div>
            <div>
              <p className="text-sm font-medium text-government-dark">Credits Minted</p>
              <p className="text-secondary-600">{project.creditsMinted.toLocaleString()}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-government-dark mb-2">Description</p>
            <p className="text-secondary-600">{project.description}</p>
          </div>
          
          {project.images && project.images.length > 0 && (
            <div>
              <p className="text-sm font-medium text-government-dark mb-2">Project Images</p>
              <div className="grid grid-cols-2 gap-2">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-secondary-300 text-secondary-700 rounded-md hover:bg-secondary-50 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-government-blue text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const statusCounts = {
    all: ngoProjects.length,
    verified: ngoProjects.filter(p => p.status === 'verified').length,
    pending: ngoProjects.filter(p => p.status === 'pending').length,
    'in-progress': ngoProjects.filter(p => p.status === 'in-progress').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-secondary-200 pb-4">
          <h1 className="text-2xl font-bold text-government-dark">Projects Overview</h1>
          <p className="text-secondary-600 mt-1">Monitor and manage blue carbon projects under your supervision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-secondary-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-secondary-600">Total Projects</h3>
            <p className="text-2xl font-bold text-government-dark">{statusCounts.all}</p>
          </div>
          <div className="bg-white border border-secondary-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-secondary-600">Verified</h3>
            <p className="text-2xl font-bold text-green-600">{statusCounts.verified}</p>
          </div>
          <div className="bg-white border border-secondary-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-secondary-600">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          </div>
          <div className="bg-white border border-secondary-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-secondary-600">In Progress</h3>
            <p className="text-2xl font-bold text-blue-600">{statusCounts['in-progress']}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-secondary-200">
          <div className="p-6 border-b border-secondary-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-government-dark">Project List</h2>
              <div className="flex space-x-2">
                {['all', 'verified', 'pending', 'in-progress'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedFilter === filter
                        ? 'bg-government-blue text-white'
                        : 'text-secondary-600 hover:bg-secondary-100'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-secondary-50">
                    <td className="font-mono text-sm">{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.location}</td>
                    <td>{project.hectares}</td>
                    <td>
                      <StatusBadge status={project.status} />
                    </td>
                    <td>{project.creditsMinted.toLocaleString()}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(project)}
                          className="px-3 py-1 bg-government-blue text-white text-xs rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                        {project.status === 'pending' && (
                            