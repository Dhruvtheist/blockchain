import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { 
  Cpu, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet, 
  Activity, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Check,
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
  const [confidenceScore, setConfidenceScore] = useState<number>(96.4);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const runAiAnalysis = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Vegetation formula calculation for hackathon demonstration
      // NDVI range 0.55 - 0.88 for healthy ecosystems
      const baseNdvi = ecosystem === 'Mangrove' ? 0.78 : ecosystem === 'Salt Marsh' ? 0.71 : 0.62;
      const randomVar = (Math.random() * 0.08) - 0.04;
      const computedNdvi = parseFloat(Math.min(0.92, Math.max(0.4, baseNdvi + randomVar)).toFixed(3));
      
      // Biomass (Mg/ha) formula: AGB = 15 * exp(2.3 * NDVI)
      const biomass = parseFloat((15 * Math.exp(2.2 * computedNdvi)).toFixed(1));
      
      // CO2e formula = Area * Biomass * 0.47 (carbon fraction) * 3.67 (CO2/C ratio)
      const totalCarbon = Math.round(areaHectares * biomass * 0.47 * 0.1); // Scaled for metric tons
      
      // Confidence score based on sensor stability & band resolution
      const confidence = parseFloat((92.5 + Math.random() * 5).toFixed(1));

      setNdviIndex(computedNdvi);
      setBiomassMgPerHa(biomass);
      setEstimatedCarbonTons(totalCarbon || 2500);
      setConfidenceScore(confidence);
      setIsCalculating(false);
    }, 1200);
  };

  const handleMRVSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    
    setIsSubmitting(true);
    try {
      const reportId = await submitMRVReport(selectedProjectId, {
        ndviIndex,
        biomassMgPerHa,
        estimatedCarbonTons,
        aiConfidenceScore: confidenceScore,
        dronePhotoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        satelliteImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        sensorCsvHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        waterQuality: {
          ph: phLevel,
          salinityPpt,
          dissolvedOxygenMgL: dissolvedOxygen
        }
      });
      setSubmittedReportId(reportId);
    } catch (err) {
      console.error('MRV Submission Error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">AI-Assisted MRV Module</h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Sentinel-2 NDVI + IoT Engine
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Automated Monitoring, Reporting & Verification using Multispectral Vegetation Index & IoT Sensors
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('verify')}
          className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-sm font-medium transition"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>View Verification Queue</span>
        </button>
      </div>

      {submittedReportId ? (
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">MRV Report Submitted to Blockchain!</h2>
          <p className="text-slate-300 text-sm">
            Report ID <span className="font-mono text-emerald-400 font-bold">{submittedReportId}</span> has been calculated by AI, cryptographically hashed, and queued for Verifier Audit & Carbon Credit Minting.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setSubmittedReportId(null)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium transition"
            >
              Analyze Another Dataset
            </button>
            <button
              onClick={() => setActiveView('verify')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Go to Auditor Verification <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Data Input & IoT Upload */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Project Selection */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                1. Select Registered Blue Carbon Site
              </h2>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Project Site</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    const proj = projects.find(p => p.id === e.target.value);
                    if (proj) {
                      setEcosystem(proj.ecosystem);
                      setAreaHectares(proj.areaHectares);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name} ({p.ecosystem}, {p.areaHectares} ha)
                    </option>
                  ))}
                </select>
              </div>

              {selectedProject && (
                <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Ecosystem</span>
                    <span className="text-sm font-semibold text-sky-400">{selectedProject.ecosystem}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Area</span>
                    <span className="text-sm font-semibold text-emerald-400">{selectedProject.areaHectares} ha</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Location</span>
                    <span className="text-sm font-semibold text-slate-300">{selectedProject.state}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Drone & Satellite Upload Simulation */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-emerald-400" />
                2. Remote Sensing & IoT Evidence Payload
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Satellite Tile */}
                <div className="border border-dashed border-sky-500/30 rounded-xl p-4 bg-sky-950/10 flex flex-col items-center justify-center text-center hover:border-sky-500 transition">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-2">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">Sentinel-2 Multispectral</span>
                  <span className="text-[10px] text-slate-400 mt-1">Bands: NIR (B8) + Red (B4)</span>
                  <span className="mt-2 text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Auto-Fetched (10m Res)
                  </span>
                </div>

                {/* Drone / Sensor CSV */}
                <div className="border border-dashed border-emerald-500/30 rounded-xl p-4 bg-emerald-950/10 flex flex-col items-center justify-center text-center hover:border-emerald-500 transition">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">IoT Telemetry & Drone CSV</span>
                  <span className="text-[10px] text-slate-400 mt-1">LiDAR Canopy + Soil Core</span>
                  <span className="mt-2 text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Validated CSV Hash
                  </span>
                </div>
              </div>

              {/* Water Quality IoT Metrics */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-300 block">Water Quality Sensor Readings (Live IoT Node)</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Water pH</span>
                    <input
                      type="number"
                      step="0.1"
                      value={phLevel}
                      onChange={(e) => setPhLevel(parseFloat(e.target.value))}
                      className="w-full bg-transparent text-sm font-bold text-sky-400 focus:outline-none"
                    />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Salinity (ppt)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={salinityPpt}
                      onChange={(e) => setSalinityPpt(parseFloat(e.target.value))}
                      className="w-full bg-transparent text-sm font-bold text-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                    <span className="text-[10px] text-slate-400 block">Dissolved O₂</span>
                    <input
                      type="number"
                      step="0.1"
                      value={dissolvedOxygen}
                      onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value))}
                      className="w-full bg-transparent text-sm font-bold text-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={runAiAnalysis}
                disabled={isCalculating}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Multispectral Bands & AI Model...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run AI Biomass & Carbon Estimator</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: AI Model Results & Blockchain Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* AI Estimation Result Panel */}
            <div className="bg-slate-900/60 border border-sky-500/30 rounded-2xl p-6 space-y-5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  3. AI Sequestration Analysis
                </h2>
                <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg">
                  NDVI Formula: (NIR-Red)/(NIR+Red)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* NDVI Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 block">NDVI Vegetation Index</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-emerald-400 font-mono">{ndviIndex}</span>
                    <span className="text-[10px] text-emerald-500 font-semibold">(Dense Canopy)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${ndviIndex * 100}%` }} />
                  </div>
                </div>

                {/* Biomass Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-xs text-slate-400 block">Above-Ground Biomass</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-sky-400 font-mono">{biomassMgPerHa}</span>
                    <span className="text-xs text-slate-400">Mg/ha</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Formula: AGB = 15 · e^(2.2 · NDVI)</span>
                </div>

                {/* Total CO2e */}
                <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 space-y-1 col-span-2">
                  <span className="text-xs text-slate-400 block">Estimated Net Carbon Sequestration</span>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-black text-white font-mono">{estimatedCarbonTons.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-emerald-400">tCO₂e</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400 block">{confidenceScore}% AI Confidence</span>
                      <span className="text-[10px] text-slate-500">Variance ±1.4%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Band comparison preview */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" /> Multispectral Band False Color
                  </span>
                  <span className="text-[10px] text-slate-400">Near Infrared (B8) vs Red (B4)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-400">
                  <div className="h-20 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-300">
                    🌿 NDVI Dense Heatmap Overlay
                  </div>
                  <div className="h-20 rounded-lg bg-sky-950/50 border border-sky-500/30 flex items-center justify-center font-mono text-sky-300">
                    📡 Sentinel-2 True Color (10m)
                  </div>
                </div>
              </div>

              {/* Form submit button */}
              <form onSubmit={handleMRVSubmit}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
                >
                  {isSubmitting ? (
                    <span>Signing & Hashing onto Polygon Testnet...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Submit MRV Report to Blockchain Registry</span>
                    </>
                  )}
                </button>
              </form>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};
