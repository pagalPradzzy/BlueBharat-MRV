import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          text: 'Verified',
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅'
        };
      case 'pending':
        return {
          text: 'Pending',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '⏳'
        };
      case 'in-progress':
        return {
          text: 'In Progress',
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '🔄'
        };
      case 'rejected':
        return {
          text: 'Rejected',
          className: 'bg-red-100 text-red-800 border-red-200',
          icon: '❌'
        };
      default:
        return {
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '❓'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full border font-medium ${config.className} ${sizeClasses[size]}`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;
