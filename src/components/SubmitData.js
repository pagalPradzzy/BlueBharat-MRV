import React, { useState } from 'react';
import Layout from '../components/Layout';
import MapPicker from './MapPicker';
import { addProject } from '../utils/storage';

const SubmitData = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    hectares: '',
    ecosystemType: 'mangrove',
    latitude: '',
    longitude: '',
    description: '',
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create project object with coordinates
    const projectData = {
      ...formData,
      coordinates: formData.latitude && formData.longitude ? 
        `${formData.latitude}, ${formData.longitude}` : '',
      status: 'submitted',
      submittedBy: 'field-worker',
      organization: 'Field Organization'
    };

    // Save to localStorage using utility
    try {
      const savedProject = addProject(projectData);
      
      if (savedProject) {
        // Simulate API call
        setTimeout(() => {
          alert('Project data submitted successfully! You will receive verification updates via email.');
          setFormData({
            projectName: '',
            location: '',
            hectares: '',
            ecosystemType: 'mangrove',
            latitude: '',
            longitude: '',
            description: '',
            images: []
          });
          setIsSubmitting(false);
        }, 2000);
      } else {
        throw new Error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project data. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-secondary-200 pb-4">
          <h1 className="text-2xl font-bold text-government-dark">Submit Project Data</h1>
          <p className="text-secondary-600 mt-1">Submit new blue carbon project for verification and carbon credit generation</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                  placeholder="State, India"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Area (Hectares) *
                </label>
                <input
                  type="number"
                  name="hectares"
                  value={formData.hectares}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Ecosystem Type *
                </label>
                <select
                  name="ecosystemType"
                  value={formData.ecosystemType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                >
                  <option value="mangrove">Mangrove</option>
                  <option value="seagrass">Seagrass</option>
                  <option value="salt-marsh">Salt Marsh</option>
                  <option value="wetland">Coastal Wetland</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Project Coordinates *
                </label>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                        placeholder="Latitude"
                        readOnly
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                        placeholder="Longitude"
                        readOnly
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Add Location</span>
                  </button>
                  {formData.latitude && formData.longitude && (
                    <div className="text-sm text-green-600 font-medium text-center">
                      ✓ Location selected: {formData.latitude}, {formData.longitude}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-government-dark mb-2">
                  Project Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-government-dark mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-transparent"
                placeholder="Detailed description of the blue carbon project..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-secondary-300 text-secondary-700 rounded-md hover:bg-secondary-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-government-blue text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>
          </form>
        </div>

        {/* Map Picker Modal */}
        <MapPicker
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          onLocationSelect={handleLocationSelect}
          initialPosition={formData.latitude && formData.longitude ? [parseFloat(formData.latitude), parseFloat(formData.longitude)] : null}
        />
      </div>
    </Layout>
  );
};

export default SubmitData;