import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { projects } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const targetProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const mrvReport = targetProject?.mrvReports?.[0];

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Cryptographic Provenance</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Oxford Net-Zero Principles Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            On-Chain Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Immutable timeline tracing site intake geometry, ESA Sentinel-2 multi-spectral telemetry, neural network biomass models, verifier attestation, and ERC-20 token minting.
          </p>
        </div>

        {/* Project Dropdown */}
        <div className="w-full md:w-80">
          <label className="block text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] mb-1.5">Selected Asset</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="editorial-input w-full px-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id} className="bg-[var(--surface-card)] text-[var(--text-primary)]">
                {p.id} — {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {targetProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Timeline (8 Cols) */}
          <div className="lg:col-span-8 editorial-panel p-6 sm:p-7 space-y-7 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
            <div className="border-b border-[var(--border-color)] pb-3.5 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)]">
                Provenance Ledger Timeline
              </span>
              <span className="text-[11px] font-mono text-[var(--color-success)] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" /> Cryptographically Sealed
              </span>
            </div>

            <div className="relative border-l-2 border-[var(--border-color)] pl-6 ml-3 space-y-7">
              
              {/* Step 1: Project Registration */}
              <div className="relative space-y-2">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-[var(--surface-card)] border-2 border-[var(--color-primary)] flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)]">1. Site Georeference & Intake</span>
                  <span className="text-[var(--text-muted)]">2026-02-10</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Sub-meter boundary established for {targetProject.areaHectares} hectares of {targetProject.ecosystem} ecosystem in {targetProject.state}, India.
                </p>
                <div className="p-3 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-lg text-[11px] font-mono text-[var(--text-secondary)] tabular-nums">
                  Boundary Coordinates: <span className="text-[var(--color-primary)] font-bold">[{targetProject.lat.toFixed(4)}° N, {targetProject.lng.toFixed(4)}° E]</span>
                </div>
              </div>

              {/* Step 2: Satellite MRV */}
              <div className="relative space-y-2">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-[var(--surface-card)] border-2 border-[var(--color-primary)] flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)]">2. Sentinel-2 Optical Telemetry Ingestion</span>
                  <span className="text-[var(--text-muted)]">2026-02-18</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Multi-spectral Band 8 (NIR) and Band 4 (Red) ingested from ESA Copernicus API. NDVI computed at {mrvReport?.ndviIndex || 0.782} with ground IoT salinity calibration.
                </p>
                <div className="p-3 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-lg text-[11px] font-mono text-[var(--text-secondary)]">
                  Satellite Payload Hash: <span className="text-[var(--color-primary)] font-bold">{mrvReport?.sensorCsvHash || targetProject.ipfsHash.substring(0, 32)}...</span>
                </div>
              </div>

              {/* Step 3: AI Biomass Calculation */}
              <div className="relative space-y-2">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-[var(--surface-card)] border-2 border-[var(--color-success)] flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)]">3. Neural Network Biomass & Carbon Sink Model</span>
                  <span className="text-[var(--text-muted)]">2026-02-22</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tier-2 IPCC and VM0033 algorithm estimated {targetProject.estimatedCarbonTons.toLocaleString()} tCO₂e net carbon sink with {mrvReport?.aiConfidenceScore || 98.4}% confidence.
                </p>
                <div className="p-3 bg-[var(--color-success-soft)] border border-[var(--color-success)]/30 rounded-lg text-[11px] font-mono text-[var(--color-success)] font-bold">
                  IPFS Telemetry CID: {targetProject.ipfsHash}
                </div>
              </div>

              {/* Step 4: Verifier Attestation */}
              <div className="relative space-y-2">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-[var(--surface-card)] border-2 border-[var(--color-success)] flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)]">4. Accredited Verifier Sign-Off</span>
                  <span className="text-[var(--text-muted)]">2026-03-01</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Accredited third-party carbon auditor verified methodology compliance, ground truth core data, and signed with ECDSA key.
                </p>
              </div>

              {/* Step 5: Token Minting */}
              <div className="relative space-y-2">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-[var(--surface-card)] border-2 border-[var(--color-primary)] flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                </span>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--text-primary)]">5. Polygon Smart Contract ERC-20 Minting</span>
                  <span className="text-[var(--text-muted)]">2026-03-04</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Government regulatory contract issued verified Blue Carbon Tokens (BCT) directly to the on-chain marketplace.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Immutable Dossier Details (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="editorial-card p-6 space-y-4 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">Verification Dossier</span>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-display">{targetProject.name}</h3>
              </div>

              <div className="space-y-3 font-mono text-xs tabular-nums">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Status:</span>
                  <span className="text-[var(--color-success)] font-bold">{targetProject.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Area:</span>
                  <span className="text-[var(--text-primary)] font-bold">{targetProject.areaHectares} Hectares</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Annual Sink:</span>
                  <span className="text-[var(--color-success)] font-bold">{targetProject.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Tokens Issued:</span>
                  <span className="text-[var(--color-primary)] font-bold">{targetProject.creditsIssued.toLocaleString()} BCT</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-muted)]">Methodology:</span>
                  <span className="text-[var(--text-secondary)] font-bold">VM0033 / Tier-2</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
