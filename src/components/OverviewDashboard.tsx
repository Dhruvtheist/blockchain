import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  PlusCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const { projects, transactions, setActiveView } = useApp();

  const totalProjects = projects.length;
  const verifiedProjects = projects.filter(p => p.status === 'Verified').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;

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

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Portfolio Intelligence</span>
            <span className="text-white/20">/</span>
            <span>Real-Time On-Chain Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Ecosystem Portfolio & Sequestration Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Consolidated overview of verified Indian coastal restoration zones, ERC-20 BCT token minting activity, and satellite-verified biomass absorption curves.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveView('register')}
            className="px-4 py-2.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Register Site</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08]">
        <div className="bg-[#070a08] p-6 space-y-1.5">
          <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-wider">Total Sequestration</span>
          <div className="text-3xl font-bold text-[#f5f6f2] font-display">
            {totalCO2.toLocaleString()} <span className="text-xs font-mono font-normal text-[#3fb978]">tCO₂e</span>
          </div>
          <span className="text-[11px] text-[#8d998b] block pt-1">Across {verifiedProjects} verified habitats</span>
        </div>

        <div className="bg-[#070a08] p-6 space-y-1.5">
          <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-wider">Credits Minted</span>
          <div className="text-3xl font-bold text-[#f5f6f2] font-display">
            {creditsIssued.toLocaleString()} <span className="text-xs font-mono font-normal text-[#3fb978]">BCT</span>
          </div>
          <span className="text-[11px] text-[#8d998b] block pt-1">Issued via Polygon Smart Contract</span>
        </div>

        <div className="bg-[#070a08] p-6 space-y-1.5">
          <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-wider">Retired & Settled</span>
          <div className="text-3xl font-bold text-[#f5f6f2] font-display">
            {creditsSold.toLocaleString()} <span className="text-xs font-mono font-normal text-[#3fb978]">BCT</span>
          </div>
          <span className="text-[11px] text-[#8d998b] block pt-1">100% permanently burned</span>
        </div>

        <div className="bg-[#070a08] p-6 space-y-1.5">
          <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-wider">Active Portfolio</span>
          <div className="text-3xl font-bold text-[#f5f6f2] font-display">
            {totalProjects} <span className="text-xs font-mono font-normal text-[#8d998b]">Sites</span>
          </div>
          <span className="text-[11px] text-[#8d998b] block pt-1">{pendingProjects} undergoing MRV audit</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="editorial-panel p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-widest block">Carbon Ingestion Telemetry</span>
            <h2 className="text-lg font-bold text-[#f5f6f2] font-display">Cumulative Carbon Fixed by Ecosystem</h2>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center space-x-1.5 text-[#3fb978]">
              <span className="w-2 h-2 rounded-full bg-[#3fb978]" />
              <span>Mangroves</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#5ea483]">
              <span className="w-2 h-2 rounded-full bg-[#5ea483]" />
              <span>Seagrass</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#8d998b]">
              <span className="w-2 h-2 rounded-full bg-[#8d998b]" />
              <span>Salt Marsh</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMangrove" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3fb978" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3fb978" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSeagrass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5ea483" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5ea483" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSaltmarsh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8d998b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8d998b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#8d998b" fontSize={11} tickLine={false} />
              <YAxis stroke="#8d998b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0c120e', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0px',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace'
                }} 
              />
              <Area type="monotone" dataKey="mangrove" stroke="#3fb978" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMangrove)" name="Mangroves" />
              <Area type="monotone" dataKey="seagrass" stroke="#5ea483" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSeagrass)" name="Seagrass" />
              <Area type="monotone" dataKey="saltmarsh" stroke="#8d998b" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSaltmarsh)" name="Salt Marsh" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Ledger Entries */}
      <div className="editorial-card overflow-hidden">
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#070a08]">
          <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2]">
            Recent Ledger Transactions
          </span>
          <button 
            onClick={() => setActiveView('ledger')} 
            className="text-[10px] font-mono text-[#3fb978] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All On-Chain Activity</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#050806] text-[10px] uppercase text-[#8d998b]">
                <th className="py-3 px-4">Tx Hash</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {transactions.slice(0, 5).map((tx, idx) => (
                <tr key={tx.hash || idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-[#3fb978]">{tx.hash.substring(0, 16)}...</td>
                  <td className="py-3 px-4 text-[#f5f6f2] font-sans font-medium">{tx.txType}</td>
                  <td className="py-3 px-4 text-[#8d998b] font-sans">{tx.projectName || tx.projectId}</td>
                  <td className="py-3 px-4 text-[#3fb978]">{tx.amount.toLocaleString()} BCT</td>
                  <td className="py-3 px-4 text-right text-[#8d998b]">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
