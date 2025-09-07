import React from 'react';
import StatsCard from './StatsCard';

const StatsGrid = ({ stats, loading = false }) => {
  const defaultStats = [
    {
      title: 'Total Projects',
      value: '127',
      icon: '🌱',
      color: 'green',
      trend: { direction: 'up', value: '+12%' }
    },
    {
      title: 'Hectares Restored',
      value: '2,847',
      icon: '🏞️',
      color: 'blue',
      trend: { direction: 'up', value: '+8%' }
    },
    {
      title: 'Credits Minted',
      value: '15,420',
      icon: '💰',
      color: 'purple',
      trend: { direction: 'up', value: '+23%' }
    },
    {
      title: 'Pending Verification',
      value: '23',
      icon: '⏳',
      color: 'orange',
      trend: { direction: 'down', value: '-5%' }
    }
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayStats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          loading={loading}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
