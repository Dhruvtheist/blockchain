import React from 'react';
import { useApp } from '../context/AppContext';
import { PieChart as PieIcon, Globe, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  const { projects, theme } = useApp();
  const isDark = theme === 'dark';

  const ecosystemData = [
    { name: 'Mangrove Forests', value: projects.filter(p => p.ecosystem === 'Mangrove').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: isDark ? '#3fb978' : '#087EA4' },
    { name: 'Seagrass Meadows', value: projects.filter(p => p.ecosystem === 'Seagrass').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#16825D' },
    { name: 'Salt Marshes', value: projects.filter(p => p.ecosystem === 'Salt Marsh').reduce((a, b) => a + b.estimatedCarbonTons, 0), color: '#D97706' },
  ];

  const stateData = [
    { state: 'West Bengal', carbon: 2925, hectares: 450 },
    { state: 'Tamil Nadu', carbon: 3164, hectares: 600 },
    { state: 'Odisha', carbon: 2601, hectares: 510 },
    { state: 'Gujarat', carbon: 3060, hectares: 600 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <BarChart3 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Ecosystem Analytics</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Biomass & Jurisdictional Distribution</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Carbon Storage Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Multi-spectral remote sensing metrics quantifying Above-Ground Biomass (AGB), soil organic carbon (SOC) depth, and cross-state jurisdictional sinks.
          </p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Carbon Sequestered by Ecosystem (Pie Chart) */}
        <div className="editorial-panel p-5 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
          <div className="border-b border-[var(--border-color)] pb-3">
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center space-x-2 font-display">
              <PieIcon className="w-4 h-4 text-[var(--color-primary)]" />
              <span>CO₂ Storage by Ecosystem Type</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Distribution of verified metric tons sequestered</p>
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
                    backgroundColor: isDark ? '#0c120e' : '#FFFFFF', 
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #D9E2EC',
                    borderRadius: '8px', 
                    fontSize: '12px', 
                    color: isDark ? '#f5f6f2' : '#102A43',
                    boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(15, 41, 66, 0.06)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: isDark ? '#8d998b' : '#486581', fontFamily: 'JetBrains Mono, monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: State-wise Carbon Storage (Bar Chart) */}
        <div className="editorial-panel p-5 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
          <div className="border-b border-[var(--border-color)] pb-3">
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center space-x-2 font-display">
              <Globe className="w-4 h-4 text-[var(--color-success)]" />
              <span>Jurisdictional Sequestration (tCO₂e)</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Total verified carbon stored across Indian maritime states</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"} vertical={false} />
                <XAxis dataKey="state" stroke={isDark ? "#8d998b" : "#829AB1"} fontSize={11} fontFamily="JetBrains Mono, monospace" tickLine={false} />
                <YAxis stroke={isDark ? "#8d998b" : "#829AB1"} fontSize={11} fontFamily="JetBrains Mono, monospace" tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0c120e' : '#FFFFFF', 
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #D9E2EC',
                    borderRadius: '8px', 
                    fontSize: '12px', 
                    color: isDark ? '#f5f6f2' : '#102A43',
                    boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(15, 41, 66, 0.06)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }} 
                />
                <Bar dataKey="carbon" fill={isDark ? "#3fb978" : "#087EA4"} radius={[6, 6, 0, 0]} name="CO₂ Sink (tCO₂e)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
