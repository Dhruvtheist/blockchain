import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X } from 'lucide-react';
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
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Verification Gateway</span>
            <span className="text-white/20">/</span>
            <span>Accredited Auditor Authority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Verification & Token Minting Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Audit submitted blue carbon projects, review Sentinel-2 multi-spectral NDVI telemetry, and trigger on-chain ERC-20 BCT token issuance.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 border border-white/[0.08] bg-[#070a08] p-1 text-xs font-mono">
          {(['Pending', 'Verified', 'Rejected', 'ALL'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                filterStatus === st 
                  ? 'bg-[#18241c] text-[#3fb978] font-semibold' 
                  : 'text-[#8d998b] hover:text-white'
              }`}
            >
              {st === 'ALL' ? 'All Records' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="editorial-card overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#070a08] text-[10px] uppercase text-[#8d998b]">
              <th className="py-3 px-4">Project ID</th>
              <th className="py-3 px-4">Name & Ecosystem</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Area & Sink</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#8d998b]">
                  No project records found under {filterStatus} status.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 text-[#3fb978] font-bold">{p.id}</td>
                  <td className="py-4 px-4">
                    <div className="text-[#f5f6f2] font-sans font-semibold">{p.name}</div>
                    <div className="text-[11px] text-[#8d998b] font-mono">{p.ecosystem}</div>
                  </td>
                  <td className="py-4 px-4 text-[#c2c9bf] font-sans">{p.state}, India</td>
                  <td className="py-4 px-4">
                    <div className="text-[#f5f6f2]">{p.areaHectares} ha</div>
                    <div className="text-[11px] text-[#3fb978]">{p.estimatedCarbonTons.toLocaleString()} tCO₂e</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 text-[10px] border ${
                      p.status === 'Verified' 
                        ? 'border-[#3fb978]/40 bg-[#121c15] text-[#3fb978]' 
                        : p.status === 'Pending'
                        ? 'border-yellow-500/40 bg-yellow-950/20 text-yellow-400'
                        : 'border-red-500/40 bg-red-950/20 text-red-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {p.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedProject(p);
                            setActiveModal('APPROVE');
                          }}
                          className="px-3 py-1.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-sans font-semibold text-xs transition cursor-pointer"
                        >
                          Verify & Mint
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(p);
                            setActiveModal('REJECT');
                          }}
                          className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-950/30 font-sans text-xs transition cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#8d998b] text-[11px]">Audit Complete</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* APPROVAL MODAL */}
      {activeModal === 'APPROVE' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#070a08]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0c120e] border border-white/15 max-w-md w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#3fb978]">Official Verification</span>
                <h3 className="text-lg font-bold text-[#f5f6f2] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setActiveModal('NONE')} className="cursor-pointer text-[#8d998b] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#8d998b]">
                Approving this project will execute the Polygon smart contract method <code className="text-[#3fb978]">mintCarbonCredits()</code> and issue <span className="text-[#f5f6f2] font-bold">{selectedProject.estimatedCarbonTons.toLocaleString()} BCT tokens</span>.
              </p>

              <div>
                <label className="text-xs font-mono text-[#8d998b] block mb-1.5">Auditor Remarks & Signature</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter regulatory sign-off notes..."
                  className="editorial-input w-full p-3 font-sans text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModal('NONE')}
                className="px-4 py-2 border border-white/15 text-xs text-[#8d998b] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-5 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold cursor-pointer"
              >
                Sign & Mint BCT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {activeModal === 'REJECT' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#070a08]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0c120e] border border-white/15 max-w-md w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-red-400">Audit Rejection</span>
                <h3 className="text-lg font-bold text-[#f5f6f2] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setActiveModal('NONE')} className="cursor-pointer text-[#8d998b] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8d998b] block mb-1.5">Reason for Non-Compliance</label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Specify discrepancy (e.g. boundary collision, low NDVI)..."
                  className="editorial-input w-full p-3 font-sans text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModal('NONE')}
                className="px-4 py-2 border border-white/15 text-xs text-[#8d998b] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold cursor-pointer"
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
