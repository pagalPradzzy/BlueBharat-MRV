import React from 'react';

const MapControls = ({ onCenterChange, onZoomChange, currentZoom }) => {
  const handleZoomIn = () => {
    if (currentZoom < 18) {
      onZoomChange(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (currentZoom > 1) {
      onZoomChange(currentZoom - 1);
    }
  };

  const handleResetView = () => {
    onCenterChange([20.5937, 78.9629]); // Center of India
    onZoomChange(5);
  };

  const handleFocusIndia = () => {
    onCenterChange([20.5937, 78.9629]);
    onZoomChange(6);
  };

  return (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      {/* Zoom Controls */}
      <div className="bg-white rounded-md shadow-lg border border-secondary-200">
        <button
          onClick={handleZoomIn}
          disabled={currentZoom >= 18}
          className="w-10 h-10 flex items-center justify-center border-b border-secondary-200 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          disabled={currentZoom <= 1}
          className="w-10 h-10 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-md shadow-lg border border-secondary-200">
        <button
          onClick={handleResetView}
          className="w-10 h-10 flex items-center justify-center border-b border-secondary-200 hover:bg-secondary-50"
          title="Reset View"
        >
          <span className="text-sm">🏠</span>
        </button>
        <button
          onClick={handleFocusIndia}
          className="w-10 h-10 flex items-center justify-center hover:bg-secondary-50"
          title="Focus on India"
        >
          <span className="text-sm">🇮🇳</span>
        </button>
      </div>

      {/* Zoom Level Display */}
      <div className="bg-white rounded-md shadow-lg border border-secondary-200 px-3 py-2">
        <div className="text-xs text-secondary-600">
          Zoom: {currentZoom}
        </div>
      </div>
    </div>
  );
};

export default MapControls;
