import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'field-worker',
      name: 'Field Worker',
      description: 'Submit restoration data and track project progress',
      icon: '🌱',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'ngo',
      name: 'NGO',
      description: 'Review projects and manage verification requests',
      icon: '🏛️',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 'nccr-admin',
      name: 'NCCR Admin',
      description: 'Verify projects and manage carbon credit minting',
      icon: '⚖️',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleLogin = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: roles.find(r => r.id === selectedRole).name,
        role: selectedRole,
        email: `${selectedRole}@example.com`,
        loginTime: new Date().toISOString()
      };

      login(userData);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-government-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-government-blue rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">🌊</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-government-dark">
            Blue Bharat MRV
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Government Monitoring, Reporting & Verification System
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-government-dark text-center">
            Select Your Role
          </h3>
          
          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`w-full p-4 border-2 rounded-md text-left transition-colors duration-200 ${
                  selectedRole === role.id
                    ? 'border-government-blue bg-blue-50'
                    : 'border-secondary-200 hover:border-secondary-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <div className="font-medium text-government-dark">
                      {role.name}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {role.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole || isLoading}
            className={`w-full gov-button gov-button-primary ${
              !selectedRole || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-secondary-500">
            This is a demonstration system. No real authentication required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
