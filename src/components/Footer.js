import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-secondary-200 px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-government-blue rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">BC</span>
            </div>
            <span className="text-sm text-secondary-600">
              Blue Bharat MRV
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm text-secondary-500">
          <span>© 2025 Government of India</span>
          <span>•</span>
          <span>Ministry of Environment, Forest & Climate Change</span>
          <span>•</span>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
