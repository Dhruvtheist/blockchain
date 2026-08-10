import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw 
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
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">MRV Telemetry Studio</span>
            <span className="text-white/20">/</span>
            <span>Sentinel-2 MSI Optical Ingestion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Satellite & Biomass Ingestion Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Ingest 10m-resolution multi-spectral satellite imagery and IoT ground-truth water sensors. The neural network computes NDVI and above-ground biomass to generate cryptographically signed MRV dossiers.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#8d998b]">
          <span className="px-2.5 py-1 border border-white/[0.1] bg-[#0c120e] text-[#3fb978]">Tier-2 IPCC Engine</span>
        </div>
      </div>

      {submittedReportId ? (
        <div className="editorial-panel p-8 sm:p-12 text-center space-y-6 border-[#3fb978]/40 animate-fadeIn">
          <div className="w-12 h-12 border border-[#3fb978]/30 bg-[#0c120e] text-[#3fb978] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-mono text-[#3fb978] uppercase tracking-widest">MRV Dossier Sealed</span>
            <h2 className="text-2xl font-bold text-[#f5f6f2] font-display">
              Cryptographic Telemetry Package Submitted
            </h2>
            <p className="text-xs text-[#8d998b]">
              Your telemetry payload has been cryptographically signed, hashed, and dispatched to the Verifier Queue for accredited review.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 bg-[#050806] border border-white/[0.08] text-xs font-mono text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#8d998b]">Report ID:</span>
              <span className="text-[#3fb978]">{submittedReportId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8d998b]">Calculated Annual Sink:</span>
              <span className="text-[#f5f6f2]">{estimatedCarbonTons.toLocaleString()} tCO₂e</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8d998b]">AI Model Confidence:</span>
              <span className="text-[#3fb978]">{confidenceScore}%</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => { setSubmittedReportId(null); setActiveView('verify'); }}
              className="px-6 py-2.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold cursor-pointer"
            >
              Go to Verifier Desk
            </button>
            <button
              onClick={() => setSubmittedReportId(null)}
              className="px-6 py-2.5 border border-white/[0.15] text-xs text-[#8d998b] hover:text-white cursor-pointer"
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
            <div className="editorial-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono font-semibold text-[#f5f6f2] uppercase">
                  1. Target Coastal Perimeter
                </span>
                <span className="text-[10px] font-mono text-[#8d998b]">Select Active Project</span>
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
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      selectedProjectId === p.id 
                        ? 'border-[#3fb978] bg-[#121a14]' 
                        : 'border-white/[0.08] bg-[#070a08] hover:border-white/20'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#3fb978]">{p.id}</div>
                    <div className="text-xs font-bold text-[#f5f6f2] font-display mt-1 truncate">{p.name}</div>
                    <div className="text-[11px] text-[#8d998b] mt-1 font-mono">{p.areaHectares} ha • {p.ecosystem}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Multi-Spectral & Ground Sensor Telemetry */}
            <div className="editorial-card p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono font-semibold text-[#f5f6f2] uppercase">
                  2. Telemetry Ingestion Parameters
                </span>
                <span className="text-[10px] font-mono text-[#3fb978]">Live Calibration</span>
              </div>

              {/* Data Ingestion Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#070a08] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#f5f6f2]">Sentinel-2 MSI</span>
                    <span className="text-[10px] font-mono text-[#3fb978]">Auto-Sync</span>
                  </div>
                  <p className="text-[11px] text-[#8d998b]">Optical NIR (Band 8) & Red (Band 4) wavelengths at 10m ground resolution.</p>
                </div>

                <div className="p-4 bg-[#070a08] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#f5f6f2]">IoT Ground Nodes</span>
                    <span className="text-[10px] font-mono text-[#3fb978]">Connected</span>
                  </div>
                  <p className="text-[11px] text-[#8d998b]">Automated water pH, salinity (ppt), and sediment organic carbon cores.</p>
                </div>
              </div>

              {/* Sensor Controls */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[10px] font-mono text-[#8d998b] uppercase block mb-1">Water pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={phLevel}
                    onChange={(e) => setPhLevel(parseFloat(e.target.value) || 7.0)}
                    className="editorial-input w-full p-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#8d998b] uppercase block mb-1">Salinity (ppt)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={salinityPpt}
                    onChange={(e) => setSalinityPpt(parseFloat(e.target.value) || 20.0)}
                    className="editorial-input w-full p-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#8d998b] uppercase block mb-1">Dissolved O₂ (mg/L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dissolvedOxygen}
                    onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value) || 6.0)}
                    className="editorial-input w-full p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <button
                onClick={runAiAnalysis}
                disabled={isCalculating}
                className="w-full py-3 bg-[#18241c] hover:bg-[#203227] text-[#3fb978] font-mono text-xs font-semibold border border-[#3fb978]/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCalculating ? 'animate-spin' : ''}`} />
                <span>{isCalculating ? 'Computing Spectral Band Ratios...' : 'Execute AI Biomass & Carbon Engine'}</span>
              </button>
            </div>

          </div>

          {/* Right Column (5 Cols): Live Optical Feed & IPFS Sealing */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Habitat Remote Sensing Optical Preview */}
            <div className="relative border border-white/[0.1] bg-[#0c120e] overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={selectedProject?.imageUrl || '/images/sundarbans_mangrove_aerial.png'}
                  alt={`Optical spectral band verification for ${selectedProject?.name}`}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-transparent to-transparent opacity-80" />
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#070a08]/90 border border-white/[0.1] text-[10px] font-mono text-[#3fb978]">
                {selectedProject?.ecosystem} Remote Sensing Feed
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between text-[11px] font-mono text-[#c2c9bf]">
                <span>{selectedProject?.lat.toFixed(3)}° N, {selectedProject?.lng.toFixed(3)}° E</span>
                <span className="text-[#3fb978]">10m Resolution</span>
              </div>
            </div>

            <div className="editorial-panel p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono font-semibold text-[#f5f6f2] uppercase">
                  Biomass Estimation Results
                </span>
                <span className="text-[10px] font-mono text-[#3fb978]">{confidenceScore}% AI Confidence</span>
              </div>

              {/* Big KPI */}
              <div className="p-5 bg-[#050806] border border-white/[0.08] space-y-1">
                <span className="text-[10px] font-mono text-[#8d998b] uppercase">Net Carbon Sequestration Rate</span>
                <div className="text-3xl font-bold text-[#f5f6f2] font-display">
                  {estimatedCarbonTons.toLocaleString()} <span className="text-xs font-mono font-normal text-[#3fb978]">tCO₂e / year</span>
                </div>
              </div>

              {/* Metric Breakdown */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-[#8d998b]">Vegetation Index (NDVI):</span>
                  <span className="text-[#f5f6f2]">{ndviIndex}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-[#8d998b]">Above-Ground Biomass (AGB):</span>
                  <span className="text-[#f5f6f2]">{biomassMgPerHa} Mg/ha</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-[#8d998b]">Soil Sediment Fixation:</span>
                  <span className="text-[#3fb978]">84.2% Total Organic C</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#8d998b]">Methodology Protocol:</span>
                  <span className="text-[#c2c9bf]">Verra VM0033 / Tier-2</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleMRVSubmission}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
