import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { mockSequestrationData } from '../data/mockData';

const SequestrationChart = ({ data = mockSequestrationData, loading = false }) => {
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

  return (
    <div className="gov-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-government-dark mb-2">
          Carbon Sequestration Over Time
        </h3>
        <p className="text-sm text-secondary-600">
          Monthly carbon sequestration data from restoration projects
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Tons CO₂', angle: -90, position: 'insideLeft' }}
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
            <Legend />
            <Line
              type="monotone"
              dataKey="carbon"
              stroke="#1e40af"
              strokeWidth={3}
              dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2 }}
              name="Carbon Sequestration (tons)"
            />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2 }}
              name="Active Projects"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-secondary-600">Total Carbon Sequestered: {data[data.length - 1]?.carbon || 0} tons</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-secondary-600">Active Projects: {data[data.length - 1]?.projects || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default SequestrationChart;
