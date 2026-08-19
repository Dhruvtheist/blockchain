import React, { useState } from 'react';
import { Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [contractPaused, setContractPaused] = useState(false);

  const usersList = [
    { name: 'Dr. Rajesh Sharma', role: 'Government Auditor', org: 'Ministry of Environment & Forest', wallet: '0x71C7...976F', status: 'Active (Multisig)' },
    { name: 'Priya Sundaram', role: 'Project Custodian (NGO)', org: 'Sundarbans Eco Trust', wallet: '0x3C44...8E47', status: 'Active (Verified)' },
    { name: 'Global Energy Corp', role: 'Corporate Offsetter', org: 'ESG Compliance Division', wallet: '0x90F7...b906', status: 'Active (Tier-1)' },
    { name: 'Public Auditor Gateway', role: 'Open Verifier', org: 'Public Explorer Gateway', wallet: '0x0000...0000', status: 'Read Only' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Lock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Security Governance</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Multisig Access Control Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            System Administration & Multisig Panel
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Role-based access permissions, circuit breaker emergency pause toggles, and multi-party cryptographic signature matrix.
          </p>
        </div>

        <button
          onClick={() => setContractPaused(!contractPaused)}
          className={`h-10 px-4 rounded-lg text-xs font-mono font-bold transition cursor-pointer border shadow-xs flex items-center gap-2 ${
            contractPaused 
              ? 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400' 
              : 'border-[var(--color-success)]/30 bg-[var(--color-success-soft)] text-[var(--color-success)]'
          }`}
        >
          {contractPaused ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Contract PAUSED (Emergency)</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Smart Contract ACTIVE</span>
            </>
          )}
        </button>
      </div>

      {/* Role Permission Matrix */}
      <div className="editorial-card overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
        <div className="px-5 py-3.5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--surface-panel)]">
          <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)]">
            Role Permission Matrix
          </span>
          <span className="text-xs font-mono text-[var(--color-success)] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" /> Multi-Party Computation Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--surface-panel)] text-[10px] uppercase text-[var(--text-muted)] font-bold">
                <th className="py-3.5 px-5">Entity</th>
                <th className="py-3.5 px-5">Role Title</th>
                <th className="py-3.5 px-5">Organization</th>
                <th className="py-3.5 px-5">Signer Address</th>
                <th className="py-3.5 px-5 text-right">Multisig Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {usersList.map((user, idx) => (
                <tr key={idx} className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-4 px-5 text-[var(--text-primary)] font-sans font-semibold">{user.name}</td>
                  <td className="py-4 px-5 text-[var(--text-secondary)]">{user.role}</td>
                  <td className="py-4 px-5 text-[var(--text-muted)] font-sans">{user.org}</td>
                  <td className="py-4 px-5 text-[var(--color-primary)] font-bold">{user.wallet}</td>
                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-[var(--border-color)] bg-[var(--surface-panel)] text-[11px] text-[var(--text-secondary)] font-semibold">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
