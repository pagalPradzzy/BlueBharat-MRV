import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import VerificationActions from './VerificationActions';

const ProjectDetails = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div>
            <h2 className="text-2xl font-bold text-government-dark">
              {project.name}
            </h2>
            <p className="text-secondary-600">Project ID: {project.id}</p>
          </div>
          <div className="flex items-center space-x-4">
            <StatusBadge status={project.status} size="md" />
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-government-dark mb-4">
                Project Images
              </h3>
              <div className="relative">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.name} view ${currentImageIndex + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-government-dark mb-4">
                Project Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-secondary-600">Location</label>
                  <p className="text-government-dark">{project.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary-600">Hectares</label>
                  <p className="text-government-dark">{project.hectares} hectares</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary-600">Organization</label>
                  <p className="text-government-dark">{project.organization}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary-600">Submitted Date</label>
                  <p className="text-government-dark">
                    {new Date(project.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                {project.verifiedDate && (
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Verified Date</label>
                    <p className="text-government-dark">
                      {new Date(project.verifiedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-government-dark mb-4">
                Carbon Credits
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-secondary-600">Credits Minted</label>
                  <p className="text-2xl font-bold text-government-dark">
                    {project.creditsMinted.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary-600">Estimated Value</label>
                  <p className="text-lg text-government-dark">
                    ₹{(project.creditsMinted * 15.5).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div>
            <h3 className="text-lg font-semibold text-government-dark mb-4">
              GPS Coordinates
            </h3>
            <div className="bg-secondary-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-secondary-600">Latitude</label>
                  <p className="font-mono text-government-dark">{project.coordinates[0]}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary-600">Longitude</label>
                  <p className="font-mono text-government-dark">{project.coordinates[1]}</p>
                </div>
              </div>
              <div className="mt-2">
                <a
                  href={`https://www.google.com/maps?q=${project.coordinates[0]},${project.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-government-blue hover:underline text-sm"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-government-dark mb-4">
              Project Description
            </h3>
            <p className="text-secondary-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Verification Actions */}
          {project.status === 'pending' && (
            <VerificationActions project={project} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
