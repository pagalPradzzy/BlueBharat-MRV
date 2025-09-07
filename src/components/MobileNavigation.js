import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileNavigation = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getNavigationItems = (role) => {
    const baseItems = [
      { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    ];

    switch (role) {
      case 'field-worker':
        return [
          ...baseItems,
          { name: 'Submit Data', path: '/submit-data', icon: '📝' },
          { name: 'My Projects', path: '/my-projects', icon: '🌱' },
          { name: 'Status', path: '/status', icon: '📈' },
        ];
      case 'ngo':
        return [
          ...baseItems,
          { name: 'Projects Overview', path: '/projects', icon: '📋' },
          { name: 'Verification Requests', path: '/verification', icon: '✅' },
          { name: 'Reports', path: '/reports', icon: '📊' },
        ];
      case 'nccr-admin':
        return [
          ...baseItems,
          { name: 'All Projects', path: '/all-projects', icon: '🗂️' },
          { name: 'Verification Panel', path: '/verification-panel', icon: '⚖️' },
          { name: 'Analytics', path: '/analytics', icon: '📈' },
          { name: 'Blockchain', path: '/blockchain', icon: '⛓️' },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems(user?.role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Mobile menu */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-secondary-200">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-government-blue rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">BC</span>
              </div>
              <span className="font-semibold text-government-dark">Blue Carbon MRV</span>
            </div>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-secondary-200 bg-secondary-50">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {user?.role === 'field-worker' ? '🌱' : 
                 user?.role === 'ngo' ? '🏛️' : '⚖️'}
              </span>
              <div>
                <p className="text-sm font-medium text-government-dark">
                  {user?.name}
                </p>
                <p className="text-xs text-secondary-600">
                  {user?.role === 'field-worker' ? 'Field Worker' :
                   user?.role === 'ngo' ? 'NGO Representative' : 'NCCR Administrator'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-government-blue text-white'
                      : 'text-secondary-700 hover:bg-secondary-100 hover:text-government-dark'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-secondary-200 bg-secondary-50">
            <div className="text-xs text-secondary-500">
              <p>Blue Bharat MRV v1.0</p>
              <p>Government of India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
