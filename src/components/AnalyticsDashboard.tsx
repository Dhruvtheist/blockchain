import React from 'react';
import { useApp } from '../context/AppContext';
import { PieChart as PieIcon, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const { projects } = useApp();

  const ecosystemData = [
    { name: 'Mangrove Forests', value: projects.filter(p => p.ecosystem === 'Mangrove').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#3fb978' },
    { name: 'Seagrass Meadows', value: projects.filter(p => p.ecosystem === 'Seagrass').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#60a5fa' },
    { name: 'Salt Marshes', value: projects.filter(p => p.ecosystem === 'Salt Marsh').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#a78bfa' },
  ];

  const stateData = [
    { state: 'West Bengal', carbon: 2925, hectares: 450 },
    { state: 'Tamil Nadu', carbon: 3164, hectares: 600 },
    { state: 'Odisha', carbon: 2601, hectares: 510 },
    { state: 'Gujarat', carbon: 3060, hectares: 600 },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Ecosystem Analytics</span>
            <span className="text-white/20">/</span>
            <span>Biomass & Jurisdictional Distribution</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Carbon Storage Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Multi-spectral remote sensing metrics quantifying Above-Ground Biomass (AGB), soil organic carbon (SOC) depth, and cross-state jurisdictional sinks.
          </p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Carbon Sequestered by Ecosystem (Pie Chart) */}
        <div className="editorial-panel p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-semibold text-[#f5f6f2] flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-[#3fb978]" />
              <span>CO₂ Storage by Ecosystem Type</span>
            </h3>
            <p className="text-xs text-[#8d998b] mt-0.5">Distribution of verified metric tons sequestered</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ecosystemData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ecosystemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0c120e', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '0px', 
                    fontSize: '11px', 
                    color: '#f5f6f2',
                    fontFamily: 'JetBrains Mono'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#8d998b', fontFamily: 'JetBrains Mono' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: State-wise Carbon Storage (Bar Chart) */}
        <div className="editorial-panel p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-semibold text-[#f5f6f2] flex items-center space-x-2">
              <Globe className="w-4 h-4 text-[#3fb978]" />
              <span>Jurisdictional Sequestration (tCO₂e)</span>
            </h3>
            <p className="text-xs text-[#8d998b] mt-0.5">Total verified carbon stored across Indian maritime states</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="state" stroke="#8d998b" fontSize={11} fontFamily="JetBrains Mono" tickLine={false} />
                <YAxis stroke="#8d998b" fontSize={11} fontFamily="JetBrains Mono" tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0c120e', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '0px', 
                    fontSize: '11px', 
                    color: '#f5f6f2',
                    fontFamily: 'JetBrains Mono'
                  }} 
                />
                <Bar dataKey="carbon" fill="#3fb978" name="CO₂ Sink (tCO₂e)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
