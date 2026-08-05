import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, PieChart as PieIcon, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const { projects } = useApp();

  const ecosystemData = [
    { name: 'Mangrove Forests', value: projects.filter(p => p.ecosystem === 'Mangrove').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#0ea5e9' },
    { name: 'Seagrass Meadows', value: projects.filter(p => p.ecosystem === 'Seagrass').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#10b981' },
    { name: 'Salt Marshes', value: projects.filter(p => p.ecosystem === 'Salt Marsh').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#f59e0b' },
  ];

  const stateData = [
    { state: 'West Bengal', carbon: 2925, hectares: 450 },
    { state: 'Tamil Nadu', carbon: 3164, hectares: 600 },
    { state: 'Odisha', carbon: 2601, hectares: 510 },
    { state: 'Gujarat', carbon: 3060, hectares: 600 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-sky-400" />
          <span>Blue Carbon Ecosystem Analytics & Impact Metrics</span>
        </h2>
        <p className="text-xs text-slate-400">Quantitative insights into carbon storage density, regional distribution, and market token velocity</p>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Carbon Sequestered by Ecosystem (Pie Chart) */}
        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-sky-400" />
              <span>CO₂ Storage Share by Ecosystem Type</span>
            </h3>
            <p className="text-xs text-slate-400">Distribution of metric tons sequestered</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ecosystemData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ecosystemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: State-wise Carbon Storage (Bar Chart) */}
        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Globe className="w-4 h-4 text-teal-400" />
              <span>State-wise Sequestration (tCO₂e)</span>
            </h3>
            <p className="text-xs text-slate-400">Total carbon stored across Indian coastal maritime states</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="state" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="carbon" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="CO₂ Sequestered (tCO₂e)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
