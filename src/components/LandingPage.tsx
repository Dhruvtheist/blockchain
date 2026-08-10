import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { projects, setActiveView, setUserRole, setIsDemoActive, setDemoStep } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const totalCarbon = projects.reduce((acc, p) => acc + p.estimatedCarbonTons, 0);
  const totalHectares = projects.reduce((acc, p) => acc + p.areaHectares, 0);
  const verifiedProjectsCount = projects.filter(p => p.status === 'Verified').length;

  const faqs = [
    {
      q: 'How does BlueChain solve the double-counting and additionality crisis in carbon markets?',
      a: 'Every project boundary is georeferenced down to sub-meter precision using polygon geometries pinned to IPFS. Smart contracts enforce that no overlapping coordinate sets can be minted twice. Removals are cryptographically anchored to multi-spectral Sentinel-2 satellite data and ERC-20 tokens are immutably retired on-chain.'
    },
    {
      q: 'What makes Blue Carbon (Mangroves, Seagrass, Salt Marshes) superior to terrestrial forestry?',
      a: 'Coastal wetlands sequester carbon at rates up to 10× greater per hectare than terrestrial forests and store carbon in anaerobic, submerged sediments for millennia without saturation or forest fire risks. Furthermore, they provide critical coastal surge protection and marine biodiversity.'
    },
    {
      q: 'How does the AI MRV calculation pipeline verify biomass without manual fraud?',
      a: 'The platform ingests European Space Agency Sentinel-2 Multi-Spectral (MSI) optical bands (specifically NIR Band 8 and Red Band 4 for NDVI) paired with ground IoT sensors for water pH, salinity, and sediment density. Our IPCC Tier-2 aligned neural network computes above-ground biomass (AGB) and soil carbon sequestration sinks with audited confidence scores.'
    },
    {
      q: 'Can institutional buyers audit project telemetry before purchasing credits?',
      a: 'Yes. Every project in the Carbon Store includes a comprehensive Champion\'s Kit & Due Diligence Dossier with open telemetry logs, raw sensor hashes, satellite spectral ratios, and verifier digital signatures before capital is committed.'
    }
  ];

  return (
    <div className="space-y-32 animate-fadeIn pb-24 text-[#e3e7e0]">
      
      {/* SECTION 1: ASYMMETRICAL EDITORIAL HERO (Visual Moment 1) */}
      <section className="pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: 65% Typography & Framing */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[11px] font-mono text-[#8d998b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
                <span className="uppercase tracking-widest text-[#c2c9bf]">Coastal Carbon Infrastructure</span>
                <span className="text-white/20">/</span>
                <span>Sub-Meter Satellite MRV</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] leading-[1.04] font-bold text-[#f5f6f2] tracking-tight font-display">
                High-integrity blue carbon, verified from orbit.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#8d998b] font-normal leading-relaxed max-w-xl">
              BlueChain is a decentralized registry and telemetry engine for coastal carbon removals. We combine Sentinel-2 multi-spectral remote sensing, automated biomass models, and cryptographic smart contracts to eliminate greenwashing in voluntary carbon markets.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView('marketplace')}
                className="px-6 py-3.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore Verified Carbon Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setIsDemoActive(true);
                  setDemoStep(1);
                  setUserRole('PROJECT_OWNER');
                  setActiveView('register');
                }}
                className="px-6 py-3.5 border border-white/[0.15] hover:border-white/40 bg-[#0c120e] text-[#f5f6f2] font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5 text-[#3fb978]" />
                <span>Launch Interactive Demo</span>
              </button>
            </div>

            {/* Telemetry Index Strip */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 font-mono text-xs">
              <div>
                <span className="text-[#8d998b] text-[10px] block uppercase">Polygon Contracts</span>
                <span className="text-[#f5f6f2] font-semibold">0x8A75...630e</span>
              </div>
              <div>
                <span className="text-[#8d998b] text-[10px] block uppercase">Spectral Source</span>
                <span className="text-[#f5f6f2] font-semibold">ESA Sentinel-2</span>
              </div>
              <div>
                <span className="text-[#8d998b] text-[10px] block uppercase">Double Count Risk</span>
                <span className="text-[#3fb978] font-semibold">0.0% Audited</span>
              </div>
            </div>
          </div>

          {/* Right Column: 35% Asymmetric Environmental Visual Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative border border-white/[0.1] bg-[#0c120e] overflow-hidden group">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="/images/sundarbans_mangrove_aerial.png"
                  alt="Aerial view of Sundarbans coastal mangrove delta estuary and dense carbon-rich wetlands"
                  loading="eager"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-transparent to-transparent opacity-80" />
              </div>

              {/* Overlaid Data Annotation */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 border-t border-white/[0.08] bg-[#070a08]/90 backdrop-blur-sm">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#f5f6f2] font-semibold">Sundarbans Mangrove Delta</span>
                  <span className="text-[#3fb978]">21.9497° N, 88.8834° E</span>
                </div>
                <div className="text-xs text-[#8d998b] leading-tight">
                  High-density sediment soil carbon. Measured at 2,925 tCO₂e annual sequestration rate with 98.4% AI confidence.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FULL-BLEED MANIFESTO & LIVE REGISTRY IMPACT (Visual Moment 2) */}
      <section className="border-t border-b border-white/[0.08] py-16 lg:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[#050806] relative overflow-hidden">
        
        {/* Subtle Atmospheric Background Image Layer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-luminosity">
          <img
            src="/images/chilika_salt_marsh.png"
            alt="Pristine coastal wetland and marine carbon buffer zone"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
            <div className="lg:col-span-4 text-[11px] font-mono text-[#8d998b] uppercase tracking-widest">
              The Ecological Thesis
            </div>
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-normal text-[#f5f6f2] leading-snug font-serif">
                Oceans absorb 30% of anthropogenic carbon emissions. Mangrove and seagrass sediments trap carbon for centuries—yet traditional registries take 18 months to issue unverified paper credits.
              </h2>
              <p className="text-sm text-[#8d998b] leading-relaxed max-w-2xl">
                We replace bureaucratic opacity with automated remote sensing, smart contract governance, and direct community revenue distribution.
              </p>
            </div>
          </div>

          {/* Integrated Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] pt-px">
            <div className="bg-[#050806]/90 p-6 lg:p-8 space-y-2 backdrop-blur-sm">
              <span className="text-xs font-mono text-[#8d998b] uppercase">Sequestration Monitored</span>
              <div className="text-3xl lg:text-4xl font-bold text-[#f5f6f2] font-display">
                {totalCarbon.toLocaleString()} <span className="text-sm font-mono font-normal text-[#3fb978]">tCO₂e</span>
              </div>
              <p className="text-xs text-[#8d998b]">Net atmospheric carbon sequestered across active project zones.</p>
            </div>

            <div className="bg-[#050806]/90 p-6 lg:p-8 space-y-2 backdrop-blur-sm">
              <span className="text-xs font-mono text-[#8d998b] uppercase">Coastal Area Covered</span>
              <div className="text-3xl lg:text-4xl font-bold text-[#f5f6f2] font-display">
                {totalHectares.toLocaleString()} <span className="text-sm font-mono font-normal text-[#3fb978]">Hectares</span>
              </div>
              <p className="text-xs text-[#8d998b]">Georeferenced sub-meter coastal perimeters across 4 states.</p>
            </div>

            <div className="bg-[#050806]/90 p-6 lg:p-8 space-y-2 backdrop-blur-sm">
              <span className="text-xs font-mono text-[#8d998b] uppercase">Verified Projects</span>
              <div className="text-3xl lg:text-4xl font-bold text-[#f5f6f2] font-display">
                {verifiedProjectsCount} <span className="text-sm font-mono font-normal text-[#3fb978]">Portfolios</span>
              </div>
              <p className="text-xs text-[#8d998b]">Audited with Sentinel-2 radar data and official verifier keys.</p>
            </div>

            <div className="bg-[#050806]/90 p-6 lg:p-8 space-y-2 backdrop-blur-sm">
              <span className="text-xs font-mono text-[#8d998b] uppercase">Double-Counting Risk</span>
              <div className="text-3xl lg:text-4xl font-bold text-[#f5f6f2] font-display">
                0.0% <span className="text-sm font-mono font-normal text-[#3fb978]">Strict</span>
              </div>
              <p className="text-xs text-[#8d998b]">Sub-meter GIS collision prevention built into smart contracts.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ASYMMETRICAL ECOSYSTEM PORTFOLIO (Visual Moments 3, 4, 5) */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] font-mono text-[#8d998b] uppercase tracking-widest block mb-2">Active Coastal Deployments</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
              Curated Indian Blue Carbon Habitats
            </h2>
          </div>
          <button
            onClick={() => setActiveView('map')}
            className="editorial-link text-xs font-mono text-[#3fb978] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Geospatial Radar Map</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dynamic Asymmetric Grid for Real Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Large Project (7 Cols) */}
          <div className="lg:col-span-7 editorial-card overflow-hidden flex flex-col justify-between group">
            
            {/* Visual Header */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.08]">
              <img
                src="/images/sundarbans_mangrove_aerial.png"
                alt="Sundarbans Avicennia marina mangrove canopy and tidal root systems"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-[#070a08]/90 border border-white/[0.1] text-[10px] font-mono text-[#3fb978]">
                  Verified Habitat • Tier-1
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs font-mono">
                <span className="text-[#c2c9bf]">West Bengal, India</span>
                <span className="text-[#3fb978] font-bold">2,925 tCO₂e / yr</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3fb978] font-semibold">{projects[0]?.id || 'BC-2026-IND-001'}</span>
                  <span className="text-[#8d998b]">{projects[0]?.ecosystem} • VM0033</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f5f6f2] font-display">
                  {projects[0]?.name || 'Sundarbans Biosphere Mangrove Restoration'}
                </h3>

                <p className="text-xs sm:text-sm text-[#8d998b] leading-relaxed">
                  High-density Avicennia marina mangrove plantation across 450 hectares of coastal mudflats. Protects inland communities from Bay of Bengal storm surges while fixing carbon into anaerobic soil.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#8d998b] block uppercase">Area</span>
                  <span className="text-[#f5f6f2] font-bold">{projects[0]?.areaHectares} ha</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8d998b] block uppercase">Annual Sink</span>
                  <span className="text-[#3fb978] font-bold">{projects[0]?.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8d998b] block uppercase">Methodology</span>
                  <span className="text-[#f5f6f2] font-bold">VM0033 / IPCC</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="w-full py-3 bg-[#121a14] hover:bg-[#1a261d] text-[#f5f6f2] text-xs font-semibold border border-white/[0.1] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Due Diligence Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Stacked Projects (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project 2: Seagrass */}
            <div className="editorial-card overflow-hidden group">
              <div className="relative aspect-[21/9] overflow-hidden border-b border-white/[0.08]">
                <img
                  src="/images/gulf_mannar_seagrass.png"
                  alt="Underwater marine seagrass meadow in Gulf of Mannar"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80"
                />
                <div className="absolute top-2.5 left-3 px-2 py-0.5 bg-[#070a08]/90 border border-white/[0.1] text-[9px] font-mono text-[#3fb978]">
                  Seagrass Sanctuary
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3fb978]">{projects[1]?.id || 'BC-2026-IND-002'}</span>
                  <span className="text-[#8d998b]">{projects[1]?.state || 'Tamil Nadu'}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#f5f6f2] font-display">{projects[1]?.name || 'Gulf of Mannar Seagrass Recovery'}</h4>
                  <p className="text-xs text-[#8d998b] mt-1 line-clamp-2">{projects[1]?.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.06]">
                  <span className="text-[#c2c9bf]">{projects[1]?.areaHectares || 320} Hectares</span>
                  <span className="text-[#3fb978] font-semibold">{projects[1]?.estimatedCarbonTons.toLocaleString() || 1344} tCO₂e</span>
                </div>
              </div>
            </div>

            {/* Project 3: Salt Marsh */}
            <div className="editorial-card overflow-hidden group">
              <div className="relative aspect-[21/9] overflow-hidden border-b border-white/[0.08]">
                <img
                  src="/images/chilika_salt_marsh.png"
                  alt="Tidal salt marsh coastal lagoon in Chilika"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80"
                />
                <div className="absolute top-2.5 left-3 px-2 py-0.5 bg-[#070a08]/90 border border-white/[0.1] text-[9px] font-mono text-[#3fb978]">
                  Tidal Salt Marsh
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3fb978]">{projects[2]?.id || 'BC-2026-IND-003'}</span>
                  <span className="text-[#8d998b]">{projects[2]?.state || 'Odisha'}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#f5f6f2] font-display">{projects[2]?.name || 'Chilika Wetland Salt Marsh Protection'}</h4>
                  <p className="text-xs text-[#8d998b] mt-1 line-clamp-2">{projects[2]?.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.06]">
                  <span className="text-[#c2c9bf]">{projects[2]?.areaHectares || 510} Hectares</span>
                  <span className="text-[#3fb978] font-semibold">{projects[2]?.estimatedCarbonTons.toLocaleString() || 2601} tCO₂e</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: 60/40 SATELLITE MRV INGESTION & AI COMPUTATION (Visual Moment 6) */}
      <section className="editorial-panel p-8 sm:p-12 lg:p-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 60%: Technical Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-[#3fb978] uppercase tracking-widest">
                Scientific Verification Pipeline
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
                Multi-spectral orbital observation replaces manual guesswork.
              </h2>
            </div>

            <p className="text-sm text-[#8d998b] leading-relaxed">
              We eliminate traditional audit delays with an automated pipeline that continuously ingests European Space Agency Sentinel-2 multispectral radar imagery, validates ground-truth IoT salinity and water pH telemetry, and runs neural network biomass algorithms.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3fb978] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#f5f6f2]">Automated Band Ratio Calibration:</span>
                  <span className="text-[#8d998b] ml-1">Computes 10m-resolution NDVI vegetation indices from Near-Infrared (Band 8) and Red (Band 4) wavelengths.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3fb978] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#f5f6f2]">Soil Core & IoT Ingestion:</span>
                  <span className="text-[#8d998b] ml-1">Real-time salinity (ppt), pH, and dissolved oxygen sensors ensure zero carbon leakage in tidal cycles.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#3fb978] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#f5f6f2]">IPFS Cryptographic Pinning:</span>
                  <span className="text-[#8d998b] ml-1">Raw telemetry SHA-256 hashes are permanently sealed before smart contract minting can occur.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveView('mrv')}
                className="px-5 py-3 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Satellite MRV Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right 40%: Live Telemetry Readout Console with Real Satellite Imagery */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Satellite Image Visual Frame */}
            <div className="relative border border-white/[0.1] bg-[#0c120e] overflow-hidden group">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src="/images/sentinel2_satellite_coastal.png"
                  alt="Sentinel-2 orbital satellite optical earth observation of coastal ecosystem"
                  loading="lazy"
                  className="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-all duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-transparent opacity-85" />
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#070a08]/90 border border-white/[0.1] text-[10px] font-mono text-[#3fb978]">
                Sentinel-2A • Band 8/Band 4 MSI
              </div>
            </div>

            {/* Readout Data Box */}
            <div className="bg-[#050806] border border-white/[0.1] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-[#8d998b] uppercase tracking-wider text-[10px]">Sentinel-2 MSI Stream</span>
                <span className="text-[#3fb978] flex items-center gap-1 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" /> Synchronized
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Spectral Band Ratio</span>
                  <span className="text-[#3fb978]">B8 (NIR 842nm) / B4 (Red 665nm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Vegetation Index (NDVI)</span>
                  <span className="text-[#f5f6f2]">0.782 ± 0.014</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.05]">
                  <span className="text-[#8d998b]">Biomass Estimation (AGB)</span>
                  <span className="text-[#f5f6f2]">142.5 Mg / Hectare</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8d998b]">AI Model Confidence</span>
                  <span className="text-[#3fb978]">98.4% (Tier-2 Calibrated)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: OXFORD PRINCIPLES COMPARATIVE ARCHITECTURE */}
      <section className="space-y-10">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[#8d998b] uppercase tracking-widest">
            Institutional Standard Comparison
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Legacy voluntary markets vs. BlueChain on-chain verification
          </h2>
        </div>

        {/* Structured Architectural Comparison Grid */}
        <div className="editorial-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#070a08] font-mono text-[10px] uppercase text-[#8d998b]">
                  <th className="py-4 px-6">Verification Dimension</th>
                  <th className="py-4 px-6 text-[#8d998b]">Legacy Paper Registries</th>
                  <th className="py-4 px-6 text-[#3fb978]">BlueChain Decentralized Registry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#f5f6f2]">Issuance Verification Time</td>
                  <td className="py-4 px-6 text-[#8d998b]">12 – 18 Months (Manual consultant audits)</td>
                  <td className="py-4 px-6 text-[#3fb978] font-mono font-medium">Near Real-Time (Automated Sentinel-2 Telemetry)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#f5f6f2]">Double-Counting Prevention</td>
                  <td className="py-4 px-6 text-[#8d998b]">Spreadsheets & disconnected PDF databases</td>
                  <td className="py-4 px-6 text-[#3fb978] font-mono font-medium">Sub-meter polygon collision check in smart contract</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#f5f6f2]">Audit Provenance Data</td>
                  <td className="py-4 px-6 text-[#8d998b]">Static proprietary PDF reports behind paywalls</td>
                  <td className="py-4 px-6 text-[#3fb978] font-mono font-medium">Immutable IPFS CIDs & Polygon EVM transaction hashes</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#f5f6f2]">Token Settlement Standard</td>
                  <td className="py-4 px-6 text-[#8d998b]">Off-chain manual invoices & broker commissions</td>
                  <td className="py-4 px-6 text-[#3fb978] font-mono font-medium">ERC-20 Blue Carbon Token (1 BCT = 1 Metric Ton CO₂e)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#f5f6f2]">Corporate Climate Reporting</td>
                  <td className="py-4 px-6 text-[#8d998b]">Difficult to reconcile for CSRD & SEC rules</td>
                  <td className="py-4 px-6 text-[#3fb978] font-mono font-medium">Cryptographic retirement certificate with instant PDF export</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: EDITORIAL FAQ ACCORDION */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[#8d998b] uppercase tracking-widest">
            Protocol Due Diligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Frequently answered technical inquiries
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index} 
                className="editorial-card transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-[#f5f6f2]">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[#8d998b] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90 text-[#3fb978]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8d998b] leading-relaxed border-t border-white/[0.05]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: REFINED INSTITUTIONAL CTA (Visual Moment 7) */}
      <section className="relative editorial-panel p-8 sm:p-12 lg:p-16 text-center space-y-6 overflow-hidden group">
        
        {/* Background Moody Ocean/Coastal Horizon */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/images/coastal_horizon_twilight.png"
            alt="Atmospheric moody ocean shoreline and carbon sink horizon"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-[#070a08]/80 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-mono text-[#3fb978] uppercase tracking-widest">
            On-Chain Climate Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Start retiring satellite-verified blue carbon credits today.
          </h2>
          <p className="text-xs sm:text-sm text-[#8d998b] leading-relaxed">
            Gain immediate access to curated Indian coastal projects with sub-meter remote sensing proof, Oxford Net-Zero alignment, and cryptographic settlement.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveView('marketplace')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Procure Carbon Credits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveView('register')}
            className="w-full sm:w-auto px-6 py-3.5 border border-white/[0.15] hover:border-white/40 bg-[#0c120e] text-[#f5f6f2] font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Register a Coastal Site</span>
          </button>
        </div>
      </section>

    </div>
  );
};
