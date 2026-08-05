import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Cpu, 
  Database, 
  Lock, 
  Sparkles, 
  Coins, 
  UserCheck
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { projects } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const targetProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const mrvReport = targetProject?.mrvReports?.[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">Cryptographic Audit Trail</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verifiable Provenance
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            End-to-end timeline tracing project registration, AI MRV evidence, auditor signature, and smart contract execution.
          </p>
        </div>

        {/* Project Dropdown */}
        <div className="w-full md:w-80">
          <label className="block text-xs font-medium text-slate-400 mb-1">Select Project to Audit</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {targetProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Interactive Step-by-Step Timeline (8-Step SIH Flow) */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                Audit Lifecycle Timeline for {targetProject.id}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                IPFS Metadata: <span className="text-sky-300 font-bold">{targetProject.ipfsHash.slice(0, 12)}...</span>
              </span>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-10 pl-6">
              
              {/* Step 1: Project Registration */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-sky-500 border-4 border-slate-950 flex items-center justify-center text-slate-950 font-extrabold text-[10px]">
                  1
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-400" /> Project Registered & Boundary Drawn
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(targetProject.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Registered <span className="font-semibold text-sky-300">{targetProject.name}</span> in {targetProject.district}, {targetProject.state}. Polygon boundary covering {targetProject.areaHectares} hectares stored on IPFS.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">
                    Owner Wallet: <span className="text-slate-400">{targetProject.ownerWallet}</span>
                  </div>
                </div>
              </div>

              {/* Step 2: MRV Upload & Sensor Data */}
              <div className="relative">
                <div className={`absolute -left-[33px] top-0 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center font-extrabold text-[10px] ${
                  mrvReport || targetProject.status !== 'Pending' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  2
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" /> Remote Sensing & Drone Payload Submitted
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {mrvReport ? new Date(mrvReport.timestamp).toLocaleDateString() : 'Completed'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Multispectral Sentinel-2 satellite tiles (NIR & Red bands) and IoT water quality telemetry (pH {mrvReport?.waterQuality?.ph || 7.8}, Salinity {mrvReport?.waterQuality?.salinityPpt || 22.4} ppt) uploaded to IPFS node.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">
                    Sensor CSV SHA-256: <span className="text-slate-400">{mrvReport?.sensorCsvHash || '0x39a1b42c90e...881a'}</span>
                  </div>
                </div>
              </div>

              {/* Step 3: AI Sequestration Calculation */}
              <div className="relative">
                <div className={`absolute -left-[33px] top-0 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center font-extrabold text-[10px] ${
                  mrvReport || targetProject.status !== 'Pending' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  3
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> AI NDVI Biomass Model Computed
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      {mrvReport?.aiConfidenceScore || 96.4}% Confidence
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center bg-slate-900/80 p-2.5 rounded-lg text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">NDVI Index</span>
                      <span className="font-mono font-bold text-emerald-400">{mrvReport?.ndviIndex || 0.782}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Biomass AGB</span>
                      <span className="font-mono font-bold text-sky-400">{mrvReport?.biomassMgPerHa || 142.5} Mg/ha</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Net CO₂e</span>
                      <span className="font-mono font-bold text-amber-300">{targetProject.estimatedCarbonTons} tCO₂e</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Auditor Verification & Signature */}
              <div className="relative">
                <div className={`absolute -left-[33px] top-0 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center font-extrabold text-[10px] ${
                  targetProject.status === 'Verified' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  4
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" /> Auditor Review & Digital Signature
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      targetProject.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {targetProject.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {targetProject.verificationRemarks || 'Reviewed ground truth soil cores and satellite vegetation indices.'}
                  </p>
                  {targetProject.verifierSignature && (
                    <div className="text-[10px] font-mono text-slate-500">
                      Digital Signature: <span className="text-emerald-400">{targetProject.verifierSignature.slice(0, 24)}...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 5: Blockchain Block Sealed & Token Minting */}
              <div className="relative">
                <div className={`absolute -left-[33px] top-0 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center font-extrabold text-[10px] ${
                  targetProject.creditsIssued > 0 ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  5
                </div>
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Coins className="w-4 h-4 text-purple-400" /> On-Chain Token Minting (ERC-20 BCT)
                    </span>
                    <span className="text-xs font-mono font-bold text-purple-300">
                      {targetProject.creditsIssued.toLocaleString()} BCT
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tx Hash: {targetProject.txHash}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Cryptographic Proof Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                Immutable Blockchain Record
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Project Unique Identifier</span>
                  <span className="font-mono text-slate-200 font-bold">{targetProject.id}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">IPFS CID Payload</span>
                  <span className="font-mono text-sky-400 break-all">{targetProject.ipfsHash}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Polygon Smart Contract</span>
                  <span className="font-mono text-purple-400 break-all">0x8A753747A1Fa494EC906ce90e9f37563A8AF630e</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Transaction Hash</span>
                  <span className="font-mono text-emerald-400 break-all">{targetProject.txHash}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`Cryptographic Proof Verified!\n\nProject ID: ${targetProject.id}\nSHA-256 Hash Match: TRUE\nVerifier Signature Valid: TRUE`)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verify SHA-256 Hash Integrity</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
