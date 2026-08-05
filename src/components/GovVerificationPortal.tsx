import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { ShieldCheck, ShieldAlert, Award } from 'lucide-react';
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
    await verifyProject(selectedProject.id, selectedProject.estimatedCarbonTons, remarks || 'Verified by Ministry of Environment & Forest. Passed Satellite LiDAR Audit.');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setActiveModal('NONE');
    setSelectedProject(null);
    setRemarks('');
  };

  const handleReject = async () => {
    if (!selectedProject) return;
    await rejectProject(selectedProject.id, rejectReason || 'Non-compliant: Land title discrepancy or satellite imagery mismatch.');
    setActiveModal('NONE');
    setSelectedProject(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Government Audit Gateway</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Blue Carbon Verification & Credit Issuance Portal</h2>
          <p className="text-xs text-slate-300">Inspect coastal projects, satellite imagery, soil core analyses, and execute smart contract credit minting</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {(['Pending', 'Verified', 'Rejected', 'ALL'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                filterStatus === st 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st} ({projects.filter(p => st === 'ALL' || p.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Projects Audit Table */}
      <div className="rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                <th className="py-3.5 px-4">Project ID</th>
                <th className="py-3.5 px-4">Project Name & Org</th>
                <th className="py-3.5 px-4">Ecosystem</th>
                <th className="py-3.5 px-4">Area & Est. Carbon</th>
                <th className="py-3.5 px-4">State</th>
                <th className="py-3.5 px-4">IPFS Hash</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No projects found for status: <span className="font-bold text-slate-300">{filterStatus}</span>
                  </td>
                </tr>
              ) : (
                filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-400">{project.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-200">{project.name}</div>
                      <div className="text-[10px] text-slate-400">{project.ownerName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-semibold">
                        {project.ecosystem}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-400">{project.areaHectares} ha</div>
                      <div className="text-[10px] text-teal-300">{project.estimatedCarbonTons.toLocaleString()} tCO₂e</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{project.state}</td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                      {project.ipfsHash.substring(0, 10)}...
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        project.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        project.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => { setSelectedProject(project); setActiveModal('APPROVE'); }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => { setSelectedProject(project); setActiveModal('REJECT'); }}
                          className="px-2.5 py-1 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-[11px] font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      {activeModal === 'APPROVE' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl glass-panel bg-slate-900 border border-emerald-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-emerald-400 border-b border-slate-800 pb-3">
              <Award className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-base text-white">Government Approval & Token Minting</h3>
                <p className="text-xs text-slate-400">Mint ERC-20 Carbon Credits for {selectedProject.id}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white">{selectedProject.name}</div>
              <div className="text-slate-400">{selectedProject.ecosystem} • {selectedProject.areaHectares} Hectares</div>
              <div className="text-emerald-400 font-bold">Credits to Mint: {selectedProject.estimatedCarbonTons.toLocaleString()} BCT Tokens</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Verification Remarks</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="Enter satellite verification notes, LiDAR analysis date, soil density certificate reference..."
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25"
              >
                Trigger Smart Contract Minting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {activeModal === 'REJECT' && selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl glass-panel bg-slate-900 border border-rose-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-400 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-base text-white">Reject Project Application</h3>
                <p className="text-xs text-slate-400">Record rejection reason on blockchain audit log</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Rejection Reason *</label>
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Specify non-compliance, land entitlement conflict, or satellite optical mismatch..."
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25"
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
