import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  TreePine, 
  Database, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Cpu, 
  Lock, 
  PlayCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { projects, setActiveView, setUserRole, setIsDemoActive, setDemoStep } = useApp();

  const verifiedProjects = projects.filter(p => p.status === 'Verified');
  const totalCarbonTons = projects.reduce((acc, p) => acc + p.estimatedCarbonTons, 0);
  const totalCreditsIssued = projects.reduce((acc, p) => acc + p.creditsIssued, 0);

  const startDemo = () => {
    setIsDemoActive(true);
    setDemoStep(1);
    setUserRole('PROJECT_OWNER');
    setActiveView('register');
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#070d19] border border-sky-500/20 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Smart India Hackathon Prototype • Blue Carbon MRV & Blockchain</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Decentralized <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Blue Carbon</span> Registry & MRV System
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Combining GIS satellite imagery, IoT sensor data, AI biomass estimation, and immutable smart contracts to eliminate double counting and make coastal ecosystem carbon credits 100% verifiable.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={startDemo}
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-2xl text-sm transition shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Launch 5-Min SIH Demo Flow</span>
            </button>

            <button
              onClick={() => {
                setUserRole('PROJECT_OWNER');
                setActiveView('register');
              }}
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold rounded-2xl border border-slate-700 text-sm transition flex items-center gap-2"
            >
              <span>Register Project</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>

            <button
              onClick={() => setActiveView('public-audit')}
              className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 font-semibold rounded-2xl border border-slate-800 text-sm transition flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Public Audit Portal</span>
            </button>
          </div>

        </div>

        {/* Floating Quick Role Switcher Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => { setUserRole('PROJECT_OWNER'); setActiveView('register'); }}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/50 text-left transition group"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Role 1</span>
            <span className="text-sm font-bold text-slate-200 group-hover:text-sky-400 transition flex items-center justify-between">
              Project Owner <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
          </button>

          <button
            onClick={() => { setUserRole('VERIFIER'); setActiveView('verify'); }}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 text-left transition group"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Role 2</span>
            <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition flex items-center justify-between">
              Auditor / Verifier <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
          </button>

          <button
            onClick={() => { setUserRole('GOV_ADMIN'); setActiveView('dashboard'); }}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 text-left transition group"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Role 3</span>
            <span className="text-sm font-bold text-slate-200 group-hover:text-purple-400 transition flex items-center justify-between">
              Gov / Admin <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
          </button>

          <button
            onClick={() => { setUserRole('PUBLIC'); setActiveView('public-audit'); }}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 text-left transition group"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">Role 4</span>
            <span className="text-sm font-bold text-slate-200 group-hover:text-amber-400 transition flex items-center justify-between">
              Public Explorer <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
          </button>
        </div>

      </div>

      {/* Key Real-Time Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <TreePine className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{projects.length} Sites</span>
          <p className="text-xs text-slate-400">Registered Blue Carbon Ecosystems</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{totalCarbonTons.toLocaleString()} tCO₂e</span>
          <p className="text-xs text-slate-400">Estimated Carbon Sequestration</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{totalCreditsIssued.toLocaleString()} BCT</span>
          <p className="text-xs text-slate-400">ERC-20 Tokens Minted On-Chain</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100% Verified</span>
          <p className="text-xs text-slate-400">SHA-256 & IPFS Immutable Records</p>
        </div>

      </div>

      {/* Feature Grid Architecture */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">End-to-End Smart Carbon Protocol</h2>
          <p className="text-slate-400 text-sm">How BlueChain Registry solves verification, scattered data, and record tampering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">1. GIS Polygon Boundary</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Project owners draw project perimeter coordinates directly on Leaflet satellite maps to establish unambiguous geographical ownership.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">2. AI & Multispectral MRV</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sentinel-2 NDVI vegetation index formulas estimate Above-Ground Biomass and calculate total CO₂ absorption with confidence scoring.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Immutable Smart Contract</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Auditor-approved report hashes are stored on Polygon smart contracts and ERC-20 BCT carbon tokens are minted without human tampering.
            </p>
          </div>
        </div>
      </div>

      {/* Latest Verified Projects Feed */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Verified Blue Carbon Projects</h2>
            <p className="text-slate-400 text-xs">Live coastal restoration sites with verified blockchain ledger hashes</p>
          </div>
          <button
            onClick={() => setActiveView('map')}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
          >
            <span>Explore Interactive Map</span> <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedProjects.slice(0, 3).map(p => (
            <div key={p.id} className="bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 rounded-xl p-5 space-y-3 transition">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-sky-400">{p.id}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>

              <h3 className="text-sm font-bold text-white line-clamp-1">{p.name}</h3>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg">
                <div>
                  <span className="block text-[10px] text-slate-500">Ecosystem</span>
                  <span className="font-semibold text-slate-200">{p.ecosystem}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">Sequestration</span>
                  <span className="font-semibold text-emerald-400">{p.estimatedCarbonTons} tCO₂e</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">{p.state}, India</span>
                <button
                  onClick={() => setActiveView('public-audit')}
                  className="text-sky-400 hover:underline font-semibold"
                >
                  Inspect Audit Trail &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
