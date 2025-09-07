import React, { useState } from 'react';
import Layout from './Layout';
import { mockProjects, mockCredits } from '../data/mockData';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const generateSummaryStats = () => {
    const totalProjects = mockProjects.length;
    const verifiedProjects = mockProjects.filter(p => p.status === 'verified').length;
    const totalCredits = mockCredits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalArea = mockProjects.reduce((sum, project) => sum + project.hectares, 0);
    
    return { totalProjects, verifiedProjects, totalCredits, totalArea };
  };

  const stats = generateSummaryStats();

  const reports = [
    {
      name: 'Monthly Carbon Sequestration Report',
      description: 'Detailed analysis of carbon sequestration by month',
      type: 'monthly',
      lastGenerated: '2024-02-28'
    },
    {
      name: 'Project Verification Summary',
      description: 'Status and details of all verification activities',
      type: 'verification',
      lastGenerated: '2024-02-25'
    },
    {
      name: 'Carbon Credits Trading Report',
      description: 'Analysis of carbon credit minting and trading',
      type: 'credits',
      lastGenerated: '2024-02-20'
    },
    {
      name: 'Regional Impact Assessment',
      description: 'Environmental impact by geographical region',
      type: 'regional',
      lastGenerated: '2024-02-15'
    }
  ];

  return (
    <Layout 
      title="Reports & Analytics" 
      description="Generate and view comprehensive reports on blue carbon projects"
    >
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-government-dark">{stats.totalProjects}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Verified Projects</h3>
          <p className="text-3xl font-bold text-green-600">{stats.verifiedProjects}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Credits Minted</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalCredits.toLocaleString()}</p>
        </div>
        <div className="gov-card p-6">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Total Area (ha)</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalArea}</p>
        </div>
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Reports */}
        <div className="gov-card">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-xl font-semibold text-government-dark">Available Reports</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="border border-secondary-200 rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-government-dark">{report.name}</h3>
                  <span className="text-xs text-secondary-500">
                    Last: {report.lastGenerated}
                  </span>
                </div>
                <p className="text-secondary-600 text-sm mb-3">{report.description}</p>
                <div className="flex space-x-2">
                  <button className="gov-button gov-button-primary text-sm px-3 py-1">
                    Generate
                  </button>
                  <button className="gov-button gov-button-secondary text-sm px-3 py-1">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Analytics */}
        <div className="gov-card">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-xl font-semibold text-government-dark">Quick Analytics</h2>
          </div>
          
          <div className="p-6">
            {/* Period Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-government-dark mb-2">
                Time Period
              </label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-2 border border-secondary-300 rounded-md"
              >
                <option value="weekly">Last 7 Days</option>
                <option value="monthly">Last 30 Days</option>
                <option value="quarterly">Last 3 Months</option>
                <option value="yearly">Last Year</option>
              </select>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-md">
                <span className="text-secondary-700">Projects Submitted</span>
                <span className="font-semibold text-government-dark">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-md">
                <span className="text-secondary-700">Verification Rate</span>
                <span className="font-semibold text-green-600">78%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-md">
                <span className="text-secondary-700">Avg. Review Time</span>
                <span className="font-semibold text-blue-600">7.2 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-md">
                <span className="text-secondary-700">Carbon Sequestered</span>
                <span className="font-semibold text-purple-600">2,350 tCO₂</span>
              </div>
            </div>

            <button className="w-full mt-6 gov-button gov-button-primary">
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;