import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockProjects } from '../data/mockData';

const ProjectsChart = ({ loading = false }) => {
  if (loading) {
    return (
      <div className="gov-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Process data for charts
  const regionData = mockProjects.reduce((acc, project) => {
    const region = project.location.split(',')[1]?.trim() || 'Unknown';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  const regionChartData = Object.entries(regionData).map(([region, count]) => ({
    region,
    projects: count
  }));

  const statusData = mockProjects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusData).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count
  }));

  const COLORS = {
    verified: '#10b981',
    pending: '#f59e0b',
    'in-progress': '#3b82f6'
  };

  return (
    <div className="space-y-6">
      {/* Projects by Region */}
      <div className="gov-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-government-dark mb-2">
            Projects by Region
          </h3>
          <p className="text-sm text-secondary-600">
            Distribution of restoration projects across Indian states
          </p>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="region" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Number of Projects', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#1f2937', fontWeight: '600' }}
              />
              <Bar 
                dataKey="projects" 
                fill="#1e40af"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects by Status */}
      <div className="gov-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-government-dark mb-2">
            Projects by Status
          </h3>
          <p className="text-sm text-secondary-600">
            Current status distribution of all projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.name.toLowerCase()] || '#6b7280'} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[item.name.toLowerCase()] || '#6b7280' }}
                  ></div>
                  <span className="text-sm text-secondary-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-government-dark">
                    {item.value} projects
                  </span>
                  <span className="text-xs text-secondary-500 ml-2">
                    ({((item.value / mockProjects.length) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsChart;
