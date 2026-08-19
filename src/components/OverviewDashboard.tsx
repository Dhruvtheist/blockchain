import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  PlusCircle,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const { projects, transactions, setActiveView, theme } = useApp();

  const totalProjects = projects.length;
  const verifiedProjects = projects.filter(p => p.status === 'Verified').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending' || p.status === 'MRV_Submitted').length;

  const totalCO2 = projects
    .filter(p => p.status === 'Verified')
    .reduce((acc, curr) => acc + curr.estimatedCarbonTons, 0);

  const creditsIssued = projects
    .filter(p => p.status === 'Verified')
    .reduce((acc, curr) => acc + curr.creditsIssued, 0);

  const creditsSold = projects
    .filter(p => p.status === 'Verified')
    .reduce((acc, curr) => acc + (curr.creditsIssued - curr.creditsAvailable), 0);

  const chartData = [
    { month: 'Oct', mangrove: 1200, seagrass: 400, saltmarsh: 600 },
    { month: 'Nov', mangrove: 1800, seagrass: 750, saltmarsh: 900 },
    { month: 'Dec', mangrove: 2400, seagrass: 1100, saltmarsh: 1400 },
    { month: 'Jan', mangrove: 3100, seagrass: 1400, saltmarsh: 1900 },
    { month: 'Feb', mangrove: 4200, seagrass: 1800, saltmarsh: 2200 },
    { month: 'Mar', mangrove: 4745, seagrass: 2194, saltmarsh: 2601 },
  ];

  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="font-bold uppercase tracking-wider">Portfolio Intelligence</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Real-Time On-Chain Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Ecosystem Portfolio & Sequestration Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Consolidated overview of verified Indian coastal restoration zones, ERC-20 BCT token minting activity, and satellite-verified biomass absorption curves.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveView('register')}
            className="h-10 px-4 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Site</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--surface-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">Total Sequestration</span>
            <Activity className="w-4 h-4 text-[var(--color-success)]" />
          </div>
          <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
            {totalCO2.toLocaleString()} <span className="text-xs font-mono font-bold text-[var(--color-success)]">tCO₂e</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] block pt-0.5 font-medium">Across {verifiedProjects} verified habitats</span>
        </div>

        <div className="bg-[var(--surface-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">Credits Minted</span>
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
            {creditsIssued.toLocaleString()} <span className="text-xs font-mono font-bold text-[var(--color-primary)]">BCT</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] block pt-0.5 font-medium">Issued via Polygon Smart Contract</span>
        </div>

        <div className="bg-[var(--surface-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">Retired & Settled</span>
            <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
          </div>
          <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
            {creditsSold.toLocaleString()} <span className="text-xs font-mono font-bold text-[var(--color-success)]">BCT</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] block pt-0.5 font-medium">100% permanently burned</span>
        </div>

        <div className="bg-[var(--surface-card)] p-5 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">Active Portfolio</span>
            <Layers className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
            {totalProjects} <span className="text-xs font-mono font-bold text-[var(--text-muted)]">Sites</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)] block pt-0.5 font-medium">{pendingProjects} undergoing MRV audit</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="editorial-panel p-5 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3.5">
          <div>
            <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest block font-bold">Carbon Ingestion Telemetry</span>
            <h2 className="text-lg font-bold text-[var(--text-primary)] font-display">Cumulative Carbon Fixed by Ecosystem</h2>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center space-x-1.5 text-[var(--color-primary)] font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
              <span>Mangroves</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[var(--color-success)] font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              <span>Seagrass</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#D97706] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span>Salt Marsh</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMangrove" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isDark ? "#3fb978" : "#087EA4"} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={isDark ? "#3fb978" : "#087EA4"} stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSeagrass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16825D" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#16825D" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSaltmarsh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="month" stroke={isDark ? "#8d998b" : "#829AB1"} fontSize={11} tickLine={false} />
              <YAxis stroke={isDark ? "#8d998b" : "#829AB1"} fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#0c120e' : '#FFFFFF', 
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #D9E2EC',
                  borderRadius: '8px',
                  boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(15, 41, 66, 0.06)',
                  fontSize: '12px',
                  color: isDark ? '#f5f6f2' : '#102A43',
                  fontFamily: 'JetBrains Mono, monospace'
                }} 
              />
              <Area type="monotone" dataKey="mangrove" stroke={isDark ? "#3fb978" : "#087EA4"} strokeWidth={2} fillOpacity={1} fill="url(#colorMangrove)" name="Mangroves" />
              <Area type="monotone" dataKey="seagrass" stroke="#16825D" strokeWidth={2} fillOpacity={1} fill="url(#colorSeagrass)" name="Seagrass" />
              <Area type="monotone" dataKey="saltmarsh" stroke="#D97706" strokeWidth={2} fillOpacity={1} fill="url(#colorSaltmarsh)" name="Salt Marsh" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Ledger Entries */}
      <div className="editorial-card overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
        <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--surface-panel)]">
          <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)]">
            Recent Ledger Transactions
          </span>
          <button 
            onClick={() => setActiveView('ledger')} 
            className="text-xs font-mono text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All On-Chain Activity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--surface-panel)] text-[10px] uppercase text-[var(--text-muted)] font-bold">
                <th className="py-3.5 px-5">Tx Hash</th>
                <th className="py-3.5 px-5">Action</th>
                <th className="py-3.5 px-5">Project</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {transactions.slice(0, 5).map((tx, idx) => (
                <tr key={tx.hash || idx} className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 text-[var(--color-primary)] font-bold">{tx.hash.substring(0, 16)}...</td>
                  <td className="py-3.5 px-5 text-[var(--text-primary)] font-sans font-semibold">{tx.txType}</td>
                  <td className="py-3.5 px-5 text-[var(--text-secondary)] font-sans">{tx.projectName || tx.projectId}</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-bold tabular-nums">{tx.amount.toLocaleString()} BCT</td>
                  <td className="py-3.5 px-5 text-right text-[var(--text-muted)] tabular-nums">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
