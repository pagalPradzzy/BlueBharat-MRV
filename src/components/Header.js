import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'field-worker': 'Field Worker',
      'ngo': 'NGO Representative',
      'nccr-admin': 'NCCR Administrator'
    };
    return roleMap[role] || role;
  };

  const getRoleIcon = (role) => {
    const iconMap = {
      'field-worker': '🌱',
      'ngo': '🏛️',
      'nccr-admin': '⚖️'
    };
    return iconMap[role] || '👤';
  };

  return (
    <header className="bg-white border-b border-secondary-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-government-blue rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">BC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-government-dark">
                Blue Bharat MRV
              </h1>
              <p className="text-xs text-secondary-600">
                Government Monitoring System
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-government-dark">
                BC MRV
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="text-right hidden sm:block">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getRoleIcon(user?.role)}</span>
              <div>
                <p className="text-sm font-medium text-government-dark">
                  {getRoleDisplayName(user?.role)}
                </p>
                <p className="text-xs text-secondary-600">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="sm:hidden">
            <span className="text-lg">{getRoleIcon(user?.role)}</span>
          </div>

          <button
            onClick={logout}
            className="gov-button gov-button-secondary text-xs lg:text-sm px-3 py-2"
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
