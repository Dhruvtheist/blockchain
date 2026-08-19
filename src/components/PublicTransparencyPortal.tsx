import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Globe } from 'lucide-react';

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
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Globe className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Open Public Audit</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Zero-Permission Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Public Transparency & Verification Index
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Verify coastal project origin, inspect Sentinel-2 remote sensing hashes, and audit smart contract ledger entries without requiring account registration.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, or hash..."
            className="editorial-input w-full pl-9 pr-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Projects Ledger List */}
      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="editorial-panel p-5 sm:p-6 space-y-3.5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-[var(--color-primary)] font-bold">{project.id}</span>
                <span className="text-[var(--text-primary)] font-sans font-bold text-sm">{project.name}</span>
                <span className="text-[var(--text-muted)]">{project.ecosystem}</span>
              </div>
              <span className={`inline-flex items-center h-6 px-2.5 text-[11px] font-mono font-semibold rounded-full border self-start md:self-auto ${
                project.status === 'Verified' 
                  ? 'border-[var(--color-success)]/30 bg-[var(--color-success-soft)] text-[var(--color-success)]' 
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}>
                {project.status}
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl font-mono text-[11px] tabular-nums">
              <div>
                <span className="text-[var(--text-muted)] block text-[9px] uppercase font-semibold">IPFS Metadata Hash</span>
                <span className="text-[var(--text-primary)] truncate block font-bold">{project.ipfsHash}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[9px] uppercase font-semibold">On-Chain Tx Hash</span>
                <span className="text-[var(--color-primary)] truncate block font-bold">{project.txHash}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[9px] uppercase font-semibold">Sequestration Capacity</span>
                <span className="text-[var(--color-success)] font-bold">{project.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
