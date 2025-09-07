import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ProjectMarker from './ProjectMarker';
import MapControls from './MapControls';
import { mockProjects } from '../data/mockData';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapContainerComponent = ({ selectedProject, onProjectSelect }) => {
  const [projects, setProjects] = useState(mockProjects);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Center of India
  const [zoom, setZoom] = useState(5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return '#10b981'; // green
      case 'pending':
        return '#f59e0b'; // yellow
      case 'in-progress':
        return '#3b82f6'; // blue
      default:
        return '#6b7280'; // gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return '✅';
      case 'pending':
        return '⏳';
      case 'in-progress':
        return '🔄';
      default:
        return '❓';
    }
  };

  return (
    <div className="gov-card h-96 w-full">
      <div className="p-4 border-b border-secondary-200">
        <h3 className="text-lg font-semibold text-government-dark">
          Blue Carbon Restoration Sites
        </h3>
        <p className="text-sm text-secondary-600">
          Interactive map showing all restoration projects across India
        </p>
      </div>
      
      <div className="relative h-80">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          className="rounded-b-md"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {projects.map((project) => (
            <Marker
              key={project.id}
              position={project.coordinates}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                  background-color: ${getStatusColor(project.status)};
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  border: 3px solid white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">${getStatusIcon(project.status)}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              })}
            >
              <Popup>
                <div className="p-2 min-w-64">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-government-dark">
                      {project.name}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'verified' ? 'bg-green-100 text-green-800' :
                      project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Hectares:</strong> {project.hectares}</p>
                    <p><strong>Credits Minted:</strong> {project.creditsMinted.toLocaleString()}</p>
                    <p><strong>Organization:</strong> {project.organization}</p>
                    <p><strong>Submitted:</strong> {new Date(project.submittedDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => onProjectSelect(project)}
                      className="px-3 py-1 bg-government-blue text-white text-xs rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        <MapControls
          onCenterChange={setMapCenter}
          onZoomChange={setZoom}
          currentZoom={zoom}
        />
      </div>
      
      <div className="p-4 border-t border-secondary-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Verified ({projects.filter(p => p.status === 'verified').length})</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Pending ({projects.filter(p => p.status === 'pending').length})</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>In Progress ({projects.filter(p => p.status === 'in-progress').length})</span>
            </div>
          </div>
          <div className="text-secondary-600">
            Total Projects: {projects.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainerComponent;
