import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
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

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-government-dark">
              Navigation
            </h2>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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

          <div className="p-4 border-t border-secondary-200">
            <div className="text-xs text-secondary-500">
              <p>Blue Bharat MRV v1.0</p>
              <p>Government of India</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
