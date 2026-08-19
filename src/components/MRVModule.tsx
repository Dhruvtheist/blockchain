import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const MRVModule: React.FC = () => {
  const { projects, submitMRVReport, setActiveView } = useApp();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [ecosystem, setEcosystem] = useState<EcosystemType>('Mangrove');
  const [areaHectares, setAreaHectares] = useState<number>(450);
  
  // Sensors & Environmental input states
  const [phLevel, setPhLevel] = useState<number>(7.8);
  const [salinityPpt, setSalinityPpt] = useState<number>(22.4);
  const [dissolvedOxygen, setDissolvedOxygen] = useState<number>(6.8);
  
  // AI Computation states
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [ndviIndex, setNdviIndex] = useState<number>(0.782);
  const [biomassMgPerHa, setBiomassMgPerHa] = useState<number>(142.5);
  const [estimatedCarbonTons, setEstimatedCarbonTons] = useState<number>(2925);
  const [confidenceScore, setConfidenceScore] = useState<number>(98.4);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const runAiAnalysis = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const baseNdvi = ecosystem === 'Mangrove' ? 0.78 : ecosystem === 'Salt Marsh' ? 0.71 : 0.62;
      const randomVar = (Math.random() * 0.08) - 0.04;
      const computedNdvi = parseFloat(Math.min(0.92, Math.max(0.4, baseNdvi + randomVar)).toFixed(3));
      
      const biomass = parseFloat((15 * Math.exp(2.2 * computedNdvi)).toFixed(1));
      const totalCarbon = Math.round(areaHectares * biomass * 0.47 * 0.1);
      const confidence = parseFloat((96.0 + Math.random() * 3).toFixed(1));

      setNdviIndex(computedNdvi);
      setBiomassMgPerHa(biomass);
      setEstimatedCarbonTons(totalCarbon || 2500);
      setConfidenceScore(confidence);
      setIsCalculating(false);
    }, 1000);
  };

  const handleMRVSubmission = async () => {
    setIsSubmitting(true);
    try {
      const reportId = await submitMRVReport(selectedProjectId, {
        ndviIndex,
        biomassMgPerHa,
        estimatedCarbonTons,
        aiConfidenceScore: confidenceScore,
        sensorCsvHash: '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join(''),
        waterQuality: {
          ph: phLevel,
          salinityPpt: salinityPpt,
          dissolvedOxygenMgL: dissolvedOxygen
        }
      });
      setSubmittedReportId(reportId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Cpu className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">MRV Telemetry Studio</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Sentinel-2 MSI Optical Ingestion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Satellite & Biomass Ingestion Engine
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Ingest 10m-resolution multi-spectral satellite imagery and IoT ground-truth water sensors. The neural network computes NDVI and above-ground biomass to generate cryptographically signed MRV dossiers.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--color-success)] font-bold shadow-xs">
            Tier-2 IPCC Engine
          </span>
        </div>
      </div>

      {submittedReportId ? (
        <div className="editorial-panel p-8 sm:p-12 text-center space-y-6 bg-[var(--surface-card)] border border-[var(--color-success)]/30 rounded-2xl shadow-sm animate-fadeIn">
          <div className="w-14 h-14 rounded-full border border-[var(--color-success)]/20 bg-[var(--color-success-soft)] text-[var(--color-success)] mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono text-[var(--color-success)] uppercase tracking-widest font-bold">MRV Dossier Sealed</span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              Cryptographic Telemetry Package Submitted
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Your telemetry payload has been cryptographically signed, hashed, and dispatched to the Verifier Queue for accredited review.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-left space-y-2 tabular-nums">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Report ID:</span>
              <span className="text-[var(--color-primary)] font-bold">{submittedReportId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Calculated Annual Sink:</span>
              <span className="text-[var(--color-success)] font-bold">{estimatedCarbonTons.toLocaleString()} tCO₂e</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">AI Model Confidence:</span>
              <span className="text-[var(--text-primary)] font-bold">{confidenceScore}%</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => { setSubmittedReportId(null); setActiveView('verify'); }}
              className="h-10 px-5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Go to Verifier Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSubmittedReportId(null)}
              className="h-10 px-5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold cursor-pointer shadow-xs"
            >
              Analyze Another Zone
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 Cols): Inputs & Ingestion Setup */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Site Selector */}
            <div className="editorial-card p-6 space-y-4 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                  1. Target Coastal Perimeter
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">Select Active Project</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {projects.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setEcosystem(p.ecosystem);
                      setAreaHectares(p.areaHectares);
                    }}
                    className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer ${
                      selectedProjectId === p.id 
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-xs' 
                        : 'border-[var(--border-color)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)]'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[var(--color-primary)] font-bold">{p.id}</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] font-display mt-1 truncate">{p.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono tabular-nums">{p.areaHectares} ha • {p.ecosystem}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Multi-Spectral & Ground Sensor Telemetry */}
            <div className="editorial-card p-6 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                  2. Telemetry Ingestion Parameters
                </span>
                <span className="text-[11px] font-mono text-[var(--color-success)] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" /> Live Calibration
                </span>
              </div>

              {/* Data Ingestion Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">Sentinel-2 MSI</span>
                    <span className="text-[10px] font-mono text-[var(--color-primary)] font-semibold">Auto-Sync</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Optical NIR (Band 8) & Red (Band 4) wavelengths at 10m ground resolution.</p>
                </div>

                <div className="p-3.5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">IoT Ground Nodes</span>
                    <span className="text-[10px] font-mono text-[var(--color-success)] font-semibold">Connected</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Automated water pH, salinity (ppt), and sediment organic carbon cores.</p>
                </div>
              </div>

              {/* Sensor Controls */}
              <div className="grid grid-cols-3 gap-3 pt-1 tabular-nums">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-[var(--text-secondary)] uppercase block mb-1">Water pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={phLevel}
                    onChange={(e) => setPhLevel(parseFloat(e.target.value) || 7.0)}
                    className="editorial-input w-full px-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-semibold text-[var(--text-secondary)] uppercase block mb-1">Salinity (ppt)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={salinityPpt}
                    onChange={(e) => setSalinityPpt(parseFloat(e.target.value) || 20.0)}
                    className="editorial-input w-full px-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-semibold text-[var(--text-secondary)] uppercase block mb-1">Dissolved O₂ (mg/L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dissolvedOxygen}
                    onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value) || 6.0)}
                    className="editorial-input w-full px-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
              </div>

              <button
                onClick={runAiAnalysis}
                disabled={isCalculating}
                className="w-full h-11 rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-hover)] hover:text-white text-[var(--color-primary)] font-mono text-xs font-bold border border-[var(--color-primary)]/30 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                <span>{isCalculating ? 'Computing Spectral Band Ratios...' : 'Execute AI Biomass & Carbon Engine'}</span>
              </button>
            </div>

          </div>

          {/* Right Column (5 Cols): Live Optical Feed & IPFS Sealing */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Habitat Remote Sensing Optical Preview */}
            <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface-card)] overflow-hidden group shadow-xs">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={selectedProject?.imageUrl || '/images/sundarbans_mangrove_aerial.png'}
                  alt={`Optical spectral band verification for ${selectedProject?.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--surface-card)]/95 backdrop-blur-md rounded border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--color-primary)] shadow-xs">
                {selectedProject?.ecosystem} Remote Sensing Feed
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between text-[11px] font-mono text-white drop-shadow-sm font-medium tabular-nums">
                <span>{selectedProject?.lat.toFixed(3)}° N, {selectedProject?.lng.toFixed(3)}° E</span>
                <span className="text-[#3fb978] font-bold">10m Resolution</span>
              </div>
            </div>

            <div className="editorial-panel p-6 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                  Biomass Estimation Results
                </span>
                <span className="text-[11px] font-mono text-[var(--color-success)] font-bold tabular-nums">{confidenceScore}% AI Confidence</span>
              </div>

              {/* Big KPI */}
              <div className="p-4 sm:p-5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">Net Carbon Sequestration Rate</span>
                <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                  {estimatedCarbonTons.toLocaleString()} <span className="text-xs font-mono font-bold text-[var(--color-success)]">tCO₂e / year</span>
                </div>
              </div>

              {/* Metric Breakdown */}
              <div className="space-y-2 text-xs font-mono tabular-nums">
                <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Vegetation Index (NDVI):</span>
                  <span className="text-[var(--text-primary)] font-bold">{ndviIndex}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Above-Ground Biomass (AGB):</span>
                  <span className="text-[var(--text-primary)] font-bold">{biomassMgPerHa} Mg/ha</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Soil Sediment Fixation:</span>
                  <span className="text-[var(--color-success)] font-bold">84.2% Total Organic C</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--text-muted)]">Methodology Protocol:</span>
                  <span className="text-[var(--text-secondary)] font-bold">Verra VM0033 / Tier-2</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleMRVSubmission}
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sealing IPFS Payload...' : 'Submit MRV Dossier to Blockchain'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
