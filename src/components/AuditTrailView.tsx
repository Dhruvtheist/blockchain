import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AuditTrailView: React.FC = () => {
  const { projects } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const targetProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const mrvReport = targetProject?.mrvReports?.[0];

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Cryptographic Provenance</span>
            <span className="text-white/20">/</span>
            <span>Oxford Net-Zero Principles Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            On-Chain Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Immutable timeline tracing site intake geometry, ESA Sentinel-2 multi-spectral telemetry, neural network biomass models, verifier attestation, and ERC-20 token minting.
          </p>
        </div>

        {/* Project Dropdown */}
        <div className="w-full md:w-80">
          <label className="block text-[10px] font-mono uppercase text-[#8d998b] mb-1.5">Selected Asset</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="editorial-input w-full p-2.5 text-xs font-mono"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id} className="bg-[#070a08]">
                {p.id} — {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {targetProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Timeline (8 Cols) */}
          <div className="lg:col-span-8 editorial-panel p-6 sm:p-8 space-y-8">
            <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2]">
                Provenance Ledger Timeline
              </span>
              <span className="text-[10px] font-mono text-[#3fb978] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" /> Cryptographically Sealed
              </span>
            </div>

            <div className="relative border-l border-white/[0.1] pl-6 ml-3 space-y-8">
              
              {/* Step 1: Project Registration */}
              <div className="relative space-y-2">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-[#070a08] border border-[#3fb978] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#3fb978]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f6f2]">1. Site Georeference & Intake</span>
                  <span className="text-[#8d998b]">2026-02-10</span>
                </div>
                <p className="text-xs text-[#8d998b]">
                  Sub-meter boundary established for {targetProject.areaHectares} hectares of {targetProject.ecosystem} ecosystem in {targetProject.state}, India.
                </p>
                <div className="p-3 bg-[#050806] border border-white/[0.06] text-[11px] font-mono text-[#8d998b]">
                  Boundary Coordinates: [{targetProject.lat.toFixed(4)}° N, {targetProject.lng.toFixed(4)}° E]
                </div>
              </div>

              {/* Step 2: Satellite MRV */}
              <div className="relative space-y-2">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-[#070a08] border border-[#3fb978] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#3fb978]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f6f2]">2. Sentinel-2 Optical Telemetry Ingestion</span>
                  <span className="text-[#8d998b]">2026-02-18</span>
                </div>
                <p className="text-xs text-[#8d998b]">
                  Multi-spectral Band 8 (NIR) and Band 4 (Red) ingested from ESA Copernicus API. NDVI computed at {mrvReport?.ndviIndex || 0.782} with ground IoT salinity calibration.
                </p>
                <div className="p-3 bg-[#050806] border border-white/[0.06] text-[11px] font-mono text-[#8d998b]">
                  Satellite Payload Hash: {mrvReport?.sensorCsvHash || targetProject.ipfsHash.substring(0, 32)}...
                </div>
              </div>

              {/* Step 3: AI Biomass Calculation */}
              <div className="relative space-y-2">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-[#070a08] border border-[#3fb978] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#3fb978]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f6f2]">3. Neural Network Biomass & Carbon Sink Model</span>
                  <span className="text-[#8d998b]">2026-02-22</span>
                </div>
                <p className="text-xs text-[#8d998b]">
                  Tier-2 IPCC and VM0033 algorithm estimated {targetProject.estimatedCarbonTons.toLocaleString()} tCO₂e net carbon sink with {mrvReport?.aiConfidenceScore || 98.4}% confidence.
                </p>
                <div className="p-3 bg-[#050806] border border-white/[0.06] text-[11px] font-mono text-[#3fb978]">
                  IPFS Telemetry CID: {targetProject.ipfsHash}
                </div>
              </div>

              {/* Step 4: Verifier Attestation */}
              <div className="relative space-y-2">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-[#070a08] border border-[#3fb978] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#3fb978]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f6f2]">4. Accredited Verifier Sign-Off</span>
                  <span className="text-[#8d998b]">2026-03-01</span>
                </div>
                <p className="text-xs text-[#8d998b]">
                  Accredited third-party carbon auditor verified methodology compliance, ground truth core data, and signed with ECDSA key.
                </p>
              </div>

              {/* Step 5: Token Minting */}
              <div className="relative space-y-2">
                <span className="absolute -left-[31px] top-0.5 w-4 h-4 bg-[#070a08] border border-[#3fb978] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#3fb978]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f6f2]">5. Polygon Smart Contract ERC-20 Minting</span>
                  <span className="text-[#8d998b]">2026-03-04</span>
                </div>
                <p className="text-xs text-[#8d998b]">
                  Government regulatory contract issued verified Blue Carbon Tokens (BCT) directly to the on-chain marketplace.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Immutable Dossier Details (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="editorial-card p-6 space-y-4">
              <div className="border-b border-white/[0.08] pb-3">
                <span className="text-[10px] font-mono text-[#8d998b] uppercase">Verification Dossier</span>
                <h3 className="text-base font-bold text-[#f5f6f2] font-display">{targetProject.name}</h3>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Status:</span>
                  <span className="text-[#3fb978] font-bold">{targetProject.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Area:</span>
                  <span className="text-[#f5f6f2]">{targetProject.areaHectares} Hectares</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Annual Sink:</span>
                  <span className="text-[#3fb978]">{targetProject.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Tokens Issued:</span>
                  <span className="text-[#f5f6f2]">{targetProject.creditsIssued.toLocaleString()} BCT</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8d998b]">Methodology:</span>
                  <span className="text-[#c2c9bf]">VM0033 / Tier-2</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
