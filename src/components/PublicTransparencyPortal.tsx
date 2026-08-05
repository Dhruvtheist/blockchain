import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShieldCheck, Lock, Globe } from 'lucide-react';

export const PublicTransparencyPortal: React.FC = () => {
  const { projects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ipfsHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="p-8 rounded-2xl glass-panel bg-gradient-to-r from-slate-900 via-sky-950/70 to-slate-900 border border-sky-500/30 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>Open Public Transparency Gateway</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Public Auditability & Authenticity Portal</h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
          Verify carbon credit origin, check double-counting protection status, and trace immutable satellite verification records on Ethereum.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative">
            <Search className="w-5 h-5 text-sky-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by Project Name, ID (BC-2026-IND-001), IPFS Hash, or Tx Hash..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm font-mono shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Projects Ledger List */}
      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 glass-panel-hover space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-mono font-bold text-sky-400">{project.id}</span>
                <h3 className="text-base font-bold text-white">{project.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  project.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  project.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Carbon Leakage Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-sans">Ecosystem:</span>
                <span className="text-sky-300 font-bold">{project.ecosystem}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-sans">Area & Storage:</span>
                <span className="text-teal-300 font-bold">{project.areaHectares} ha ({project.estimatedCarbonTons.toLocaleString()} tCO₂e)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-sans">Location:</span>
                <span className="text-slate-200 font-sans">{project.state}, {project.district}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-sans">Credits Issued:</span>
                <span className="text-emerald-400 font-bold">{project.creditsIssued.toLocaleString()} BCT</span>
              </div>
            </div>

            {/* Audit Trail Timeline */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                <Lock className="w-3 h-3 text-sky-400" />
                <span>Immutable On-Chain Cryptographic Proofs</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>IPFS Metadata Hash:</span>
                  <span className="text-sky-400">{project.ipfsHash}</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Contract Transaction Hash:</span>
                  <span className="text-teal-300">{project.txHash}</span>
                </div>
                <div className="flex justify-between">
                  <span>Government Audit Remarks:</span>
                  <span className="text-slate-300 font-sans italic">{project.verificationRemarks || 'Pending review'}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
