import React, { useState } from 'react';
import { Lock, Users, AlertTriangle } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [contractPaused, setContractPaused] = useState(false);

  const usersList = [
    { name: 'Dr. Rajesh Sharma', role: 'Government Admin', org: 'Ministry of Environment, Forest & Climate Change', wallet: '0x71C7...976F', status: 'Active' },
    { name: 'Priya Sundaram', role: 'Project Owner (NGO)', org: 'Sundarbans Eco Trust', wallet: '0x3C44...8E47', status: 'Active' },
    { name: 'Global Energy Corp', role: 'Company / Buyer', org: 'ESG Compliance Division', wallet: '0x90F7...b906', status: 'Active' },
    { name: 'Public Auditor Gateway', role: 'Public User', font: 'Read Only', wallet: '0x0000...0000', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Administrator Security Console</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">System Administration & Smart Contract Management</h2>
          <p className="text-xs text-slate-400">User role permissions matrix, audit logs, and smart contract circuit breaker control</p>
        </div>

        <button
          onClick={() => setContractPaused(!contractPaused)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            contractPaused 
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' 
              : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{contractPaused ? 'Smart Contract PAUSED (Emergency)' : 'Smart Contract ACTIVE'}</span>
        </button>
      </div>

      {/* Role Permission Matrix */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-sky-400" />
          <span>User Role Access Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Bound Wallet Address</th>
                <th className="py-3 px-4">Access Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {usersList.map((u, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-slate-200">{u.name}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300">{u.org}</td>
                  <td className="py-3 px-4 text-slate-400">{u.wallet}</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans font-bold">{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
