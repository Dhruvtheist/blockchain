import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';

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
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Open Public Audit</span>
            <span className="text-white/20">/</span>
            <span>Zero-Permission Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Public Transparency & Verification Index
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Verify coastal project origin, inspect Sentinel-2 remote sensing hashes, and audit smart contract ledger entries without requiring account registration.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-[#8d998b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, or hash..."
            className="editorial-input w-full pl-9 pr-3 py-2 text-xs font-mono"
          />
        </div>
      </div>

      {/* Projects Ledger List */}
      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="editorial-panel p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-[#3fb978] font-bold">{project.id}</span>
                <span className="text-[#f5f6f2] font-sans font-bold text-sm">{project.name}</span>
                <span className="text-[#8d998b]">{project.ecosystem}</span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-mono border self-start md:self-auto ${
                project.status === 'Verified' ? 'border-[#3fb978]/40 bg-[#121c15] text-[#3fb978]' : 'border-yellow-500/40 text-yellow-400'
              }`}>
                {project.status}
              </span>
            </div>

            <p className="text-xs text-[#8d998b] leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#050806] border border-white/[0.06] font-mono text-[11px]">
              <div>
                <span className="text-[#8d998b] block text-[9px] uppercase">IPFS Metadata Hash</span>
                <span className="text-[#c2c9bf] truncate block">{project.ipfsHash}</span>
              </div>
              <div>
                <span className="text-[#8d998b] block text-[9px] uppercase">On-Chain Tx Hash</span>
                <span className="text-[#3fb978] truncate block">{project.txHash}</span>
              </div>
              <div>
                <span className="text-[#8d998b] block text-[9px] uppercase">Sequestration Capacity</span>
                <span className="text-[#f5f6f2] font-bold">{project.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
