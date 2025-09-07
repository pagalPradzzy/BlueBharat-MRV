import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';

const PredictiveChart = ({ loading = false }) => {
  // Generate predictive data for next 5 years
  const generatePredictiveData = () => {
    const currentData = [
      { year: '2024', actual: 2350, projected: 2350, credits: 15420 },
      { year: '2025', actual: null, projected: 2800, credits: 18500 },
      { year: '2026', actual: null, projected: 3200, credits: 22000 },
      { year: '2027', actual: null, projected: 3600, credits: 26000 },
      { year: '2028', actual: null, projected: 4000, credits: 30000 },
      { year: '2029', actual: null, projected: 4500, credits: 35000 }
    ];
    return currentData;
  };

  const data = generatePredictiveData();

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
          Carbon Credits Growth Projection
        </h3>
        <p className="text-sm text-secondary-600">
          5-year projection of carbon credit generation and market value
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Carbon Sequestered (tons)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Credits Minted', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#1f2937', fontWeight: '600' }}
              formatter={(value, name) => {
                if (name === 'credits') {
                  return [value.toLocaleString(), 'Credits Minted'];
                }
                return [value, name];
              }}
            />
            <Legend />
            <ReferenceLine 
              x="2024" 
              stroke="#6b7280" 
              strokeDasharray="2 2" 
              label={{ value: "Current Year", position: "topLeft" }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Actual Carbon Sequestered"
              connectNulls={false}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="projected"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
              name="Projected Carbon Sequestered"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="credits"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#8b5cf6', strokeWidth: 2 }}
              name="Projected Credits Minted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-green-50 p-3 rounded-md">
          <div className="font-medium text-green-800">Current Performance</div>
          <div className="text-green-600">{data[0]?.actual || 0} tons CO₂</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="font-medium text-blue-800">5-Year Target</div>
          <div className="text-blue-600">{data[data.length - 1]?.projected || 0} tons CO₂</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <div className="font-medium text-purple-800">Projected Credits</div>
          <div className="text-purple-600">{(data[data.length - 1]?.credits || 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-700">
          <strong>Note:</strong> Projections are based on current project growth rates and may vary based on 
          actual implementation, policy changes, and market conditions.
        </p>
      </div>
    </div>
  );
};

export default PredictiveChart;
