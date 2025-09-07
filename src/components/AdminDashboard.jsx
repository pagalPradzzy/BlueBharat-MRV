import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Layout from './Layout';
import { getProjects, getProjectsByStatus, updateProjectStatus, getProjectStats } from '../utils/storage';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icons for different statuses
const createCustomIcon = (status) => {
  const colors = {
    submitted: '#FFA500', // Orange
    approved: '#0066CC',  // Blue  
    minted: '#28A745'     // Green
  };
  
  const color = colors[status] || '#6B7280';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">
        ${status === 'submitted' ? '●' : status === 'approved' ? '◆' : '★'}
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Component to fit map bounds to show all markers
const MapBounds = ({ projects }) => {
  const map = useMap();
  
  useEffect(() => {
    if (projects.length > 0) {
      const validProjects = projects.filter(p => p.latitude && p.longitude);
      
      if (validProjects.length > 0) {
        const bounds = validProjects.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
        
        if (bounds.length === 1) {
          map.setView(bounds[0], 10);
        } else {
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      }
    }
  }, [projects, map]);
  
  return null;
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, statusFilter]);

  const loadDashboardData = () => {
    setLoading(true);
    try {
      const allProjects = getProjects();
      const projectStats = getProjectStats();
      
      setProjects(allProjects);
      setStats(projectStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = statusFilter === 'all' ? projects : getProjectsByStatus(statusFilter);
    setFilteredProjects(filtered);
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    const success = updateProjectStatus(projectId, newStatus, 'admin');
    if (success) {
      loadDashboardData(); // Reload to reflect real-time changes
      setSelectedProject(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'minted':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatusCard = ({ title, count, color, icon }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Regional Projects Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage blue carbon projects across regions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard 
            title="Total Projects"
            count={stats.total || 0}
            color="bg-gray-500"
            icon="📊"
          />
          <StatusCard 
            title="Submitted"
            count={stats.submitted || 0}
            color="bg-orange-500"
            icon="🟡"
          />
          <StatusCard 
            title="Approved"
            count={stats.approved || 0}
            color="bg-blue-500"
            icon="🔵"
          />
          <StatusCard 
            title="Credits Minted"
            count={stats.minted || 0}
            color="bg-green-500"
            icon="🟢"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Area</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalHectares?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-600">Hectares</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Credits Minted</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalCredits?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-600">Carbon Credits</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Credits</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.estimatedCredits?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-600">Potential Credits</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Map Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">Project Locations</h2>
              
              {/* Status Filter */}
              <div className="flex space-x-2">
                {['all', 'submitted', 'approved', 'minted'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span>Submitted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Minted</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-96">
            <MapContainer
              center={[20.5937, 78.9629]} // Default center for India
              zoom={5}
              className="h-full w-full rounded-b-lg"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapBounds projects={filteredProjects} />
              
              {filteredProjects
                .filter(project => project.latitude && project.longitude)
                .map((project) => (
                <Marker
                  key={project.id}
                  position={[parseFloat(project.latitude), parseFloat(project.longitude)]}
                  icon={createCustomIcon(project.status)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.projectName}</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Location:</span> {project.location}</p>
                        <p><span className="font-medium">Area:</span> {project.hectares} hectares</p>
                        <p><span className="font-medium">Type:</span> {project.ecosystemType}</p>
                        <p>
                          <span className="font-medium">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </p>
                        <p><span className="font-medium">Credits:</span> {project.creditsMinted.toLocaleString()} / {project.estimatedCredits.toLocaleString()}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-3 space-y-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </button>
                        
                        {project.status === 'submitted' && (
                          <button
                            onClick={() => handleStatusUpdate(project.id, 'approved')}
                            className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Approve Project
                          </button>
                        )}
                        
                        {project.status === 'approved' && (
                          <button
                            onClick={() => handleStatusUpdate(project.id, 'minted')}
                            className="w-full px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Mint Credits
                          </button>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Projects Summary Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                      <div className="text-sm text-gray-500">{project.ecosystemType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.hectares} ha
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.creditsMinted.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {project.status === 'submitted' && (
                        <button
                          onClick={() => handleStatusUpdate(project.id, 'approved')}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {project.status === 'approved' && (
                        <button
                          onClick={() => handleStatusUpdate(project.id, 'minted')}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          Mint
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Project Details Modal (reuse from ProjectList if needed) */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProject.projectName}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Location:</span>
                  <p className="text-gray-900">{selectedProject.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Area:</span>
                  <p className="text-gray-900">{selectedProject.hectares} hectares</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Credits:</span>
                  <p className="text-gray-900">{selectedProject.creditsMinted.toLocaleString()} / {selectedProject.estimatedCredits.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
