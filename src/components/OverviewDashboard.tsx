import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Waves, 
  CheckCircle, 
  Clock, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink, 
  PlusCircle, 
  ArrowUpRight,
  Sparkles,
  TreePine
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const { projects, transactions, userRole, setActiveView } = useApp();

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
    { month: 'Oct 2025', mangrove: 1200, seagrass: 400, saltmarsh: 600 },
    { month: 'Nov 2025', mangrove: 1800, seagrass: 750, saltmarsh: 900 },
    { month: 'Dec 2025', mangrove: 2400, seagrass: 1100, saltmarsh: 1400 },
    { month: 'Jan 2026', mangrove: 3100, seagrass: 1400, saltmarsh: 1900 },
    { month: 'Feb 2026', mangrove: 4200, seagrass: 1800, saltmarsh: 2200 },
    { month: 'Mar 2026', mangrove: 4745, seagrass: 2194, saltmarsh: 2601 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 border border-sky-500/30 p-6 md:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart India Hackathon Prototype • Web3 Carbon Registry</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Blockchain Blue Carbon Management & Verification System
            </h1>
            <p className="mt-2 text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Transparent satellite-verified registry for coastal ecosystems (Mangroves, Seagrass, Salt Marshes). Powered by immutable Smart Contracts to eliminate double-counting and carbon fraud.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {userRole === 'PROJECT_OWNER' && (
              <button
                onClick={() => setActiveView('register')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Register Blue Carbon Project</span>
              </button>
            )}

            {userRole === 'GOV_ADMIN' && (
              <button
                onClick={() => setActiveView('verify')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Review Pending Projects ({pendingProjects})</span>
              </button>
            )}

            <button
              onClick={() => setActiveView('marketplace')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel bg-slate-900/80 hover:bg-slate-800 text-sky-300 font-semibold text-xs border border-sky-500/30 transition-all"
            >
              <span>Explore Marketplace</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-sky-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Projects</span>
            <Waves className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalProjects}</div>
          <div className="text-[10px] text-slate-400 mt-1">Coastal Blue Carbon Sites</div>
        </div>

        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-emerald-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-emerald-300">Verified</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{verifiedProjects}</div>
          <div className="text-[10px] text-emerald-400/70 mt-1">On-Chain Approved</div>
        </div>

        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-amber-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-amber-300">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingProjects}</div>
          <div className="text-[10px] text-amber-400/70 mt-1">Awaiting Satellite Verification</div>
        </div>

        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-teal-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-teal-300">CO₂ Sequestered</span>
            <TreePine className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300">{totalCO2.toLocaleString()} <span className="text-xs font-normal">tCO₂e</span></div>
          <div className="text-[10px] text-teal-400/70 mt-1">Annual Atmospheric Offset</div>
        </div>

        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-blue-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-blue-300">Credits Minted</span>
            <Coins className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-300">{creditsIssued.toLocaleString()}</div>
          <div className="text-[10px] text-blue-400/70 mt-1">BCT ERC-20 Tokens</div>
        </div>

        <div className="p-4 rounded-xl glass-panel glass-panel-hover border border-purple-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-purple-300">Credits Sold</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300">{creditsSold.toLocaleString()}</div>
          <div className="text-[10px] text-purple-400/70 mt-1">Purchased by Enterprises</div>
        </div>

      </div>

      {/* Analytics & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <span>Cumulative CO₂ Sequestration Trajectory (tCO₂e)</span>
              </h3>
              <p className="text-xs text-slate-400">Monthly breakdown across ecosystem types (Mangrove, Seagrass, Salt Marsh)</p>
            </div>
            <button 
              onClick={() => setActiveView('analytics')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1"
            >
              <span>Full Analytics</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMangrove" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSeagrass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSaltmarsh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="mangrove" stackId="1" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorMangrove)" name="Mangroves" />
                <Area type="monotone" dataKey="seagrass" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorSeagrass)" name="Seagrass" />
                <Area type="monotone" dataKey="saltmarsh" stackId="1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSaltmarsh)" name="Salt Marsh" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart India Hackathon Feature</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Cryptographic Verification Architecture</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Every project registered on BlueChain generates an immutable Merkle tree record on Ethereum. Only verified government officers can trigger credit minting.
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Registry Contract:</span>
                <span className="font-mono text-sky-300 font-bold">0x8A75...630e</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Standard Token:</span>
                <span className="font-mono text-teal-300 font-bold">ERC-20 (BCT)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Double-Counting Risk:</span>
                <span className="text-emerald-400 font-semibold">0% (Zero Leakage)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('ledger')}
            className="mt-6 w-full py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <span>View Blockchain Smart Contract Code</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Live Blockchain Transactions Ticker */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-base font-bold text-white">Live Blockchain Ledger Activity</h3>
          </div>
          <button 
            onClick={() => setActiveView('ledger')}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1"
          >
            <span>View Block Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3 px-3">Tx Hash</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Project</th>
                <th className="pb-3 px-3">Amount (BCT)</th>
                <th className="pb-3 px-3">Block</th>
                <th className="pb-3 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.slice(0, 5).map(tx => (
                <tr key={tx.hash} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-sky-400 font-medium">
                    {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 6)}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.txType === 'VERIFY_MINT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      tx.txType === 'REGISTER' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {tx.txType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-semibold">{tx.projectName}</td>
                  <td className="py-3 px-3 text-slate-300">{tx.amount ? `${tx.amount.toLocaleString()} BCT` : '—'}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">#{tx.blockNumber}</td>
                  <td className="py-3 px-3 text-slate-500">{new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
