import React, { useState } from 'react';

export const AdminPanel: React.FC = () => {
  const [contractPaused, setContractPaused] = useState(false);

  const usersList = [
    { name: 'Dr. Rajesh Sharma', role: 'Government Auditor', org: 'Ministry of Environment & Forest', wallet: '0x71C7...976F', status: 'Active (Multisig)' },
    { name: 'Priya Sundaram', role: 'Project Custodian (NGO)', org: 'Sundarbans Eco Trust', wallet: '0x3C44...8E47', status: 'Active (Verified)' },
    { name: 'Global Energy Corp', role: 'Corporate Offsetter', org: 'ESG Compliance Division', wallet: '0x90F7...b906', status: 'Active (Tier-1)' },
    { name: 'Public Auditor Gateway', role: 'Open Verifier', org: 'Public Explorer Gateway', wallet: '0x0000...0000', status: 'Read Only' },
  ];

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Security Governance</span>
            <span className="text-white/20">/</span>
            <span>Multisig Access Control Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            System Administration & Multisig Panel
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Role-based access permissions, circuit breaker emergency pause toggles, and multi-party cryptographic signature matrix.
          </p>
        </div>

        <button
          onClick={() => setContractPaused(!contractPaused)}
          className={`px-4 py-2 text-xs font-mono transition cursor-pointer border ${
            contractPaused 
              ? 'border-red-500 bg-red-950/30 text-red-400' 
              : 'border-[#3fb978]/40 bg-[#121a14] text-[#3fb978]'
          }`}
        >
          {contractPaused ? '● Contract PAUSED (Emergency)' : '● Smart Contract ACTIVE'}
        </button>
      </div>

      {/* Role Permission Matrix */}
      <div className="editorial-card overflow-hidden">
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#070a08]">
          <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2]">
            Role Permission Matrix
          </span>
          <span className="text-[10px] font-mono text-[#3fb978]">
            Multi-Party Computation Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#050806] text-[10px] uppercase text-[#8d998b]">
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Signer Address</th>
                <th className="py-3 px-4 text-right">Multisig Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {usersList.map((user, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-[#f5f6f2] font-sans font-semibold">{user.name}</td>
                  <td className="py-3 px-4 text-[#c2c9bf]">{user.role}</td>
                  <td className="py-3 px-4 text-[#8d998b] font-sans">{user.org}</td>
                  <td className="py-3 px-4 text-[#3fb978]">{user.wallet}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 border border-white/[0.1] text-[10px] text-[#c2c9bf]">
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
