import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component to handle map clicks
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

const MapPicker = ({ isOpen, onClose, onLocationSelect, initialPosition }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default center for India
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (isOpen && !initialPosition) {
      // Get user's current location when modal opens
      setIsLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapCenter([latitude, longitude]);
            setIsLoadingLocation(false);
          },
          (error) => {
            console.warn('Geolocation error:', error);
            setIsLoadingLocation(false);
            // Keep default center if geolocation fails
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000
          }
        );
      } else {
        setIsLoadingLocation(false);
      }
    }
  }, [isOpen, initialPosition]);

  useEffect(() => {
    if (initialPosition) {
      setSelectedPosition(initialPosition);
      setMapCenter(initialPosition);
    }
  }, [initialPosition]);

  const handleMapClick = (lat, lng) => {
    setSelectedPosition([lat, lng]);
  };

  const handleConfirmLocation = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition[0], selectedPosition[1]);
      onClose();
    }
  };

  const handleReset = () => {
    setSelectedPosition(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Project Location
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Click on the map to drop a pin at your project location
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          {isLoadingLocation && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-10">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span className="text-sm">Getting your location...</span>
              </div>
            </div>
          )}
          
          <div className="h-96">
            <MapContainer
              center={mapCenter}
              zoom={8}
              className="h-full w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapClickHandler onLocationSelect={handleMapClick} />
              
              {selectedPosition && (
                <Marker position={selectedPosition}>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

        {/* Coordinates Display */}
        {selectedPosition && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Selected Coordinates:</span>
                <span className="ml-2 font-mono">
                  {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLocation}
            disabled={!selectedPosition}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
