import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GovVerificationPortal: React.FC = () => {
  const { projects, verifyProject, rejectProject } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [remarks, setRemarks] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [activeModal, setActiveModal] = useState<'NONE' | 'APPROVE' | 'REJECT'>('NONE');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Pending' | 'Verified' | 'Rejected'>('Pending');

  const filteredProjects = projects.filter(p => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'Pending') {
      return p.status === 'Pending' || p.status === 'MRV_Submitted';
    }
    return p.status === filterStatus;
  });

  const handleApprove = async () => {
    if (!selectedProject) return;
    await verifyProject(selectedProject.id, selectedProject.estimatedCarbonTons, remarks || 'Verified by Ministry of Environment & Forest. Passed Sentinel-2 LiDAR & In-situ Telemetry.');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setActiveModal('NONE');
    setSelectedProject(null);
    setRemarks('');
  };

  const handleReject = async () => {
    if (!selectedProject) return;
    await rejectProject(selectedProject.id, rejectReason || 'Non-compliant: Land title discrepancy or satellite imagery optical mismatch.');
    setActiveModal('NONE');
    setSelectedProject(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Verification Gateway</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Accredited Auditor Authority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Verification & Token Minting Desk
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Audit submitted blue carbon projects, review Sentinel-2 multi-spectral NDVI telemetry, and trigger on-chain ERC-20 BCT token issuance.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-lg p-1 text-xs font-mono shadow-xs">
          {(['Pending', 'Verified', 'Rejected', 'ALL'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterStatus === st 
                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-xs' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-panel)]'
              }`}
            >
              {st === 'ALL' ? 'All Records' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="editorial-card overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--surface-panel)] text-[10px] uppercase text-[var(--text-muted)] font-bold">
                <th className="py-3.5 px-5">Project ID</th>
                <th className="py-3.5 px-5">Name & Ecosystem</th>
                <th className="py-3.5 px-5">Location</th>
                <th className="py-3.5 px-5">Area & Sink</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[var(--text-muted)] font-sans">
                    No project records found under {filterStatus === 'ALL' ? 'All Records' : filterStatus} status.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[var(--surface-panel)] transition-colors">
                    <td className="py-4 px-5 text-[var(--color-primary)] font-bold">{p.id}</td>
                    <td className="py-4 px-5">
                      <div className="text-[var(--text-primary)] font-sans font-semibold text-xs">{p.name}</div>
                      <div className="text-[11px] text-[var(--text-secondary)] font-mono">{p.ecosystem}</div>
                    </td>
                    <td className="py-4 px-5 text-[var(--text-secondary)] font-sans">{p.state}, India</td>
                    <td className="py-4 px-5 tabular-nums">
                      <div className="text-[var(--text-primary)] font-semibold">{p.areaHectares} ha</div>
                      <div className="text-[11px] text-[var(--color-success)] font-bold">{p.estimatedCarbonTons.toLocaleString()} tCO₂e</div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold border ${
                        p.status === 'Verified' 
                          ? 'border-[var(--color-success)]/30 bg-[var(--color-success-soft)] text-[var(--color-success)]' 
                          : (p.status === 'Pending' || p.status === 'MRV_Submitted')
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      {(p.status === 'Pending' || p.status === 'MRV_Submitted') ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProject(p);
                              setActiveModal('APPROVE');
                            }}
                            className="h-8 px-3 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-sans font-semibold text-xs transition cursor-pointer shadow-xs"
                          >
                            Verify & Mint
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProject(p);
                              setActiveModal('REJECT');
                            }}
                            className="h-8 px-3 rounded-md border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 font-sans text-xs font-semibold transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[var(--text-muted)] text-[11px] font-semibold font-sans">
                          {p.status === 'Rejected' ? 'Rejected' : 'Audit Complete'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPROVAL MODAL */}
      {activeModal === 'APPROVE' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-[var(--modal-overlay)] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[var(--color-success)]">Official Verification</span>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setActiveModal('NONE')} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Approving this project will execute the Polygon smart contract method <code className="text-[var(--color-primary)] font-bold bg-[var(--color-primary-soft)] px-1 py-0.5 rounded font-mono">mintCarbonCredits()</code> and issue <span className="text-[var(--text-primary)] font-bold tabular-nums">{selectedProject.estimatedCarbonTons.toLocaleString()} BCT tokens</span>.
              </p>

              <div>
                <label className="text-xs font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Auditor Remarks & Signature</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter regulatory sign-off notes..."
                  className="editorial-input w-full px-3 py-2 font-sans text-xs border border-[var(--border-color)] rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="h-9 px-4 rounded-lg border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="h-9 px-4.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold cursor-pointer shadow-xs"
              >
                Sign & Mint BCT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {activeModal === 'REJECT' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-[var(--modal-overlay)] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-red-500">Audit Rejection</span>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setActiveModal('NONE')} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Reason for Non-Compliance</label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Specify discrepancy (e.g. boundary collision, low NDVI)..."
                  className="editorial-input w-full px-3 py-2 font-sans text-xs border border-[var(--border-color)] rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="h-9 px-4 rounded-lg border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="h-9 px-4.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
