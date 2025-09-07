import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockProjects } from '../data/mockData';

const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Filter projects for current user (in real app, this would be based on user ID)
  const userProjects = mockProjects.filter(project => 
    ['BC001', 'BC002'].includes(project.id)
  );

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
              <p className="text-sm font-medium text-government-dark">Area</p>
              <p className="text-secondary-600">{project.hectares} hectares</p>
            </div>
            <div>
              <p className="text-sm font-medium text-government-dark">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
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
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-secondary-200 pb-4">
          <h1 className="text-2xl font-bold text-government-dark">My Projects</h1>
          <p className="text-secondary-600 mt-1">View and manage your submitted blue carbon projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-secondary-200">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.images && project.images[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  
                  <h3 className="font-semibold text-government-dark mb-2">{project.name}</h3>
                  <p className="text-sm text-secondary-600 mb-2">{project.location}</p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{project.hectares} hectares</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-secondary-600">
                    <p>Credits: {project.creditsMinted.toLocaleString()}</p>
                    <p>Submitted: {new Date(project.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {userProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-lg font-medium text-government-dark mb-2">No Projects Yet</h3>
                <p className="text-secondary-600">Submit your first blue carbon project to get started</p>
              </div>
            )}
          </div>
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default MyProjects;