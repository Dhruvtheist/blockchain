import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  MapPin 
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
    <div className="space-y-20 sm:space-y-28 animate-fadeIn pb-20 text-[var(--text-primary)]">
      
      {/* SECTION 1: ASYMMETRICAL EDITORIAL HERO (Visual Moment 1) */}
      <section className="pt-2 lg:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: 65% Typography & Framing */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                <span className="font-bold uppercase tracking-wider">Coastal Carbon Infrastructure</span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--text-secondary)]">Sub-Meter Satellite MRV</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-bold text-[var(--text-primary)] tracking-tight font-display">
                High-integrity blue carbon, <span className="text-[var(--color-primary)]">verified from orbit.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl">
              BlueChain is a decentralized registry and telemetry engine for coastal carbon removals. We combine Sentinel-2 multi-spectral remote sensing, automated biomass models, and cryptographic smart contracts to eliminate greenwashing in voluntary carbon markets.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => setActiveView('marketplace')}
                className="h-11 px-6 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Explore Verified Carbon Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsDemoActive(true);
                  setDemoStep(1);
                  setUserRole('PROJECT_OWNER');
                  setActiveView('register');
                }}
                className="h-11 px-6 rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] text-[var(--text-primary)] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <PlayCircle className="w-4 h-4 text-[var(--color-success)]" />
                <span>Launch Interactive Demo</span>
              </button>
            </div>

            {/* Telemetry Index Strip */}
            <div className="pt-5 border-t border-[var(--border-color)] grid grid-cols-3 gap-3 sm:gap-4 font-mono text-xs tabular-nums">
              <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-color)] shadow-xs">
                <span className="text-[var(--text-muted)] text-[10px] block uppercase font-medium">Polygon Contracts</span>
                <span className="text-[var(--text-primary)] font-bold">0x8A75...630e</span>
              </div>
              <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-color)] shadow-xs">
                <span className="text-[var(--text-muted)] text-[10px] block uppercase font-medium">Spectral Source</span>
                <span className="text-[var(--color-primary)] font-bold">ESA Sentinel-2</span>
              </div>
              <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-color)] shadow-xs">
                <span className="text-[var(--text-muted)] text-[10px] block uppercase font-medium">Double Count Risk</span>
                <span className="text-[var(--color-success)] font-bold">0.0% Audited</span>
              </div>
            </div>
          </div>

          {/* Right Column: 35% Asymmetric Environmental Visual Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface-card)] shadow-md overflow-hidden group">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="/images/sundarbans_mangrove_aerial.png"
                  alt="Aerial view of Sundarbans coastal mangrove delta estuary and dense carbon-rich wetlands"
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-80" />
              </div>

              {/* Overlaid Data Annotation */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5 border-t border-[var(--border-color)] bg-[var(--surface-card)]/95 backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-mono tabular-nums">
                  <span className="text-[var(--text-primary)] font-bold">Sundarbans Mangrove Delta</span>
                  <span className="text-[var(--color-success)] font-semibold">21.9497° N, 88.8834° E</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-normal">
                  High-density sediment soil carbon. Measured at 2,925 tCO₂e annual sequestration rate with 98.4% AI confidence.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: FULL-BLEED MANIFESTO & LIVE REGISTRY IMPACT */}
      <section className="border-t border-b border-[var(--border-color)] py-14 lg:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] relative overflow-hidden transition-colors duration-200">
        
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
            <div className="lg:col-span-4 text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              <span>The Ecological Thesis</span>
            </div>
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--text-primary)] leading-snug font-serif">
                Oceans absorb 30% of anthropogenic carbon emissions. Mangrove and seagrass sediments trap carbon for centuries—yet traditional registries take 18 months to issue unverified paper credits.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                We replace bureaucratic opacity with automated remote sensing, smart contract governance, and direct community revenue distribution.
              </p>
            </div>
          </div>

          {/* Integrated Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--surface-card)] p-5 lg:p-6 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-semibold">Sequestration Monitored</span>
              <div className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                {totalCarbon.toLocaleString()} <span className="text-sm font-mono font-normal text-[var(--color-success)]">tCO₂e</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Net atmospheric carbon sequestered across active project zones.</p>
            </div>

            <div className="bg-[var(--surface-card)] p-5 lg:p-6 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-semibold">Coastal Area Covered</span>
              <div className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                {totalHectares.toLocaleString()} <span className="text-sm font-mono font-normal text-[var(--color-primary)]">Hectares</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Georeferenced sub-meter coastal perimeters across 4 states.</p>
            </div>

            <div className="bg-[var(--surface-card)] p-5 lg:p-6 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-semibold">Verified Projects</span>
              <div className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                {verifiedProjectsCount} <span className="text-sm font-mono font-normal text-[var(--color-success)]">Portfolios</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Audited with Sentinel-2 radar data and official verifier keys.</p>
            </div>

            <div className="bg-[var(--surface-card)] p-5 lg:p-6 rounded-xl border border-[var(--border-color)] shadow-xs space-y-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase font-semibold">Double-Counting Risk</span>
              <div className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                0.0% <span className="text-sm font-mono font-normal text-[var(--color-success)]">Strict</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">Sub-meter GIS collision prevention built into smart contracts.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ASYMMETRICAL ECOSYSTEM PORTFOLIO */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest block mb-1 font-bold">Active Coastal Deployments</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">
              Curated Indian Blue Carbon Habitats
            </h2>
          </div>
          <button
            onClick={() => setActiveView('map')}
            className="text-xs font-mono text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold flex items-center gap-1.5 cursor-pointer bg-[var(--color-primary-soft)] px-3.5 py-2 rounded-lg border border-[var(--color-primary)]/20"
          >
            <span>Launch Geospatial Radar Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Asymmetric Grid for Real Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Large Project (7 Cols) */}
          <div className="lg:col-span-7 editorial-card overflow-hidden flex flex-col justify-between group bg-[var(--surface-card)] border border-[var(--border-color)] shadow-sm rounded-2xl">
            
            {/* Visual Header */}
            <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border-color)]">
              <img
                src="/images/sundarbans_mangrove_aerial.png"
                alt="Sundarbans Avicennia marina mangrove canopy and tidal root systems"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent opacity-70" />
              
              <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-[var(--surface-card)]/95 backdrop-blur-md rounded-md border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--color-success)] shadow-xs">
                  Verified Habitat • Tier-1
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs font-mono tabular-nums">
                <span className="text-white font-medium drop-shadow-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#3fb978]" />
                  <span>West Bengal, India</span>
                </span>
                <span className="text-white font-bold bg-[var(--color-success)] px-2 py-0.5 rounded shadow-sm">
                  2,925 tCO₂e / yr
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-primary)] font-bold">{projects[0]?.id || 'BC-2026-IND-001'}</span>
                  <span className="text-[var(--text-muted)] font-medium">{projects[0]?.ecosystem} • VM0033</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-display">
                  {projects[0]?.name || 'Sundarbans Biosphere Mangrove Restoration'}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  High-density Avicennia marina mangrove plantation across 450 hectares of coastal mudflats. Protects inland communities from Bay of Bengal storm surges while fixing carbon into anaerobic soil.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-[var(--border-color)] pt-4 font-mono text-xs tabular-nums">
                <div className="p-2.5 bg-[var(--surface-panel)] rounded-lg border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-medium">Area</span>
                  <span className="text-[var(--text-primary)] font-bold">{projects[0]?.areaHectares} ha</span>
                </div>
                <div className="p-2.5 bg-[var(--surface-panel)] rounded-lg border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-medium">Annual Sink</span>
                  <span className="text-[var(--color-success)] font-bold">{projects[0]?.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                </div>
                <div className="p-2.5 bg-[var(--surface-panel)] rounded-lg border border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] block uppercase font-medium">Methodology</span>
                  <span className="text-[var(--color-primary)] font-bold">VM0033 / IPCC</span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="w-full py-2.5 rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-hover)] hover:text-white text-[var(--color-primary)] text-xs font-bold border border-[var(--color-primary)]/30 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Due Diligence Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Stacked Projects (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project 2: Seagrass */}
            <div className="editorial-card overflow-hidden group bg-[var(--surface-card)] border border-[var(--border-color)] shadow-sm rounded-2xl">
              <div className="relative aspect-[21/9] overflow-hidden border-b border-[var(--border-color)]">
                <img
                  src="/images/gulf_mannar_seagrass.png"
                  alt="Underwater marine seagrass meadow in Gulf of Mannar"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-3 px-2.5 py-0.5 rounded bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-color)] text-[10px] font-mono text-[var(--color-primary)] font-bold shadow-xs">
                  Seagrass Sanctuary
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-primary)] font-bold">{projects[1]?.id || 'BC-2026-IND-002'}</span>
                  <span className="text-[var(--text-muted)] font-medium">{projects[1]?.state || 'Tamil Nadu'}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] font-display">{projects[1]?.name || 'Gulf of Mannar Seagrass Recovery'}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">{projects[1]?.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[var(--border-color)] tabular-nums">
                  <span className="text-[var(--text-secondary)] font-medium">{projects[1]?.areaHectares || 320} Hectares</span>
                  <span className="text-[var(--color-success)] font-bold">{projects[1]?.estimatedCarbonTons.toLocaleString() || 1344} tCO₂e</span>
                </div>
              </div>
            </div>

            {/* Project 3: Salt Marsh */}
            <div className="editorial-card overflow-hidden group bg-[var(--surface-card)] border border-[var(--border-color)] shadow-sm rounded-2xl">
              <div className="relative aspect-[21/9] overflow-hidden border-b border-[var(--border-color)]">
                <img
                  src="/images/chilika_salt_marsh.png"
                  alt="Tidal salt marsh coastal lagoon in Chilika"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2.5 left-3 px-2.5 py-0.5 rounded bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-color)] text-[10px] font-mono text-[var(--color-success)] font-bold shadow-xs">
                  Tidal Salt Marsh
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-primary)] font-bold">{projects[2]?.id || 'BC-2026-IND-003'}</span>
                  <span className="text-[var(--text-muted)] font-medium">{projects[2]?.state || 'Odisha'}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] font-display">{projects[2]?.name || 'Chilika Wetland Salt Marsh Protection'}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">{projects[2]?.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[var(--border-color)] tabular-nums">
                  <span className="text-[var(--text-secondary)] font-medium">{projects[2]?.areaHectares || 510} Hectares</span>
                  <span className="text-[var(--color-success)] font-bold">{projects[2]?.estimatedCarbonTons.toLocaleString() || 2601} tCO₂e</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: 60/40 SATELLITE MRV INGESTION & AI COMPUTATION */}
      <section className="editorial-panel p-6 sm:p-10 lg:p-12 space-y-8 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 60%: Technical Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Scientific Verification Pipeline</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">
                Multi-spectral orbital observation replaces manual guesswork.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We eliminate traditional audit delays with an automated pipeline that continuously ingests European Space Agency Sentinel-2 multispectral radar imagery, validates ground-truth IoT salinity and water pH telemetry, and runs neural network biomass algorithms.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--text-primary)]">Automated Band Ratio Calibration:</span>
                  <span className="text-[var(--text-secondary)] ml-1">Computes 10m-resolution NDVI vegetation indices from Near-Infrared (Band 8) and Red (Band 4) wavelengths.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--text-primary)]">Soil Core & IoT Ingestion:</span>
                  <span className="text-[var(--text-secondary)] ml-1">Real-time salinity (ppt), pH, and dissolved oxygen sensors ensure zero carbon leakage in tidal cycles.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--text-primary)]">IPFS Cryptographic Pinning:</span>
                  <span className="text-[var(--text-secondary)] ml-1">Raw telemetry SHA-256 hashes are permanently sealed before smart contract minting can occur.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('mrv')}
                className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Launch Satellite MRV Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 40%: Live Telemetry Readout Console */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Satellite Image Visual Frame */}
            <div className="relative rounded-xl border border-[var(--border-color)] bg-[var(--surface-panel)] overflow-hidden group shadow-xs">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src="/images/sentinel2_satellite_coastal.png"
                  alt="Sentinel-2 orbital satellite optical earth observation of coastal ecosystem"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--surface-card)]/95 backdrop-blur-md rounded border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--color-primary)] shadow-xs">
                Sentinel-2A • Band 8/Band 4 MSI
              </div>
            </div>

            {/* Readout Data Box */}
            <div className="bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl p-4 sm:p-5 space-y-3 font-mono text-xs shadow-xs tabular-nums">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider text-[10px]">Sentinel-2 MSI Stream</span>
                <span className="text-[var(--color-success)] flex items-center gap-1.5 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" /> Synchronized
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Spectral Band Ratio</span>
                  <span className="text-[var(--color-primary)] font-bold">B8 (NIR 842nm) / B4 (Red 665nm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Vegetation Index (NDVI)</span>
                  <span className="text-[var(--text-primary)] font-bold">0.782 ± 0.014</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">Biomass Estimation (AGB)</span>
                  <span className="text-[var(--text-primary)] font-bold">142.5 Mg / Hectare</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-secondary)]">AI Model Confidence</span>
                  <span className="text-[var(--color-success)] font-bold">98.4% (Tier-2 Calibrated)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: OXFORD PRINCIPLES COMPARATIVE ARCHITECTURE */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" />
            <span>Institutional Standard Comparison</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Legacy voluntary markets vs. BlueChain on-chain verification
          </h2>
        </div>

        {/* Structured Architectural Comparison Grid */}
        <div className="editorial-card overflow-hidden bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--surface-panel)] font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  <th className="py-3.5 px-5 font-bold">Verification Dimension</th>
                  <th className="py-3.5 px-5 font-bold text-[var(--text-muted)]">Legacy Paper Registries</th>
                  <th className="py-3.5 px-5 font-bold text-[var(--color-primary)]">BlueChain Decentralized Registry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                <tr className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[var(--text-primary)]">Issuance Verification Time</td>
                  <td className="py-3.5 px-5 text-[var(--text-muted)]">12 – 18 Months (Manual consultant audits)</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>Near Real-Time (Automated Sentinel-2 Telemetry)</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[var(--text-primary)]">Double-Counting Prevention</td>
                  <td className="py-3.5 px-5 text-[var(--text-muted)]">Spreadsheets & disconnected PDF databases</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>Sub-meter polygon collision check in smart contract</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[var(--text-primary)]">Audit Provenance Data</td>
                  <td className="py-3.5 px-5 text-[var(--text-muted)]">Static proprietary PDF reports behind paywalls</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>Immutable IPFS CIDs & Polygon EVM transaction hashes</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[var(--text-primary)]">Token Settlement Standard</td>
                  <td className="py-3.5 px-5 text-[var(--text-muted)]">Off-chain manual invoices & broker commissions</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>ERC-20 Blue Carbon Token (1 BCT = 1 Metric Ton CO₂e)</span>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--surface-panel)] transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[var(--text-primary)]">Corporate Climate Reporting</td>
                  <td className="py-3.5 px-5 text-[var(--text-muted)]">Difficult to reconcile for CSRD & SEC rules</td>
                  <td className="py-3.5 px-5 text-[var(--color-success)] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>Cryptographic retirement certificate with instant PDF export</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: EDITORIAL FAQ ACCORDION */}
      <section className="space-y-5">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest font-bold">
            Protocol Due Diligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Frequently answered technical inquiries
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index} 
                className="editorial-card transition-all bg-[var(--surface-card)] border border-[var(--border-color)] rounded-xl shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90 text-[var(--color-primary)]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: REFINED INSTITUTIONAL CTA */}
      <section className="relative editorial-panel p-8 sm:p-12 text-center space-y-5 overflow-hidden rounded-2xl bg-[var(--surface-panel)] border border-[var(--border-color)] shadow-sm">
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest font-bold">
            On-Chain Climate Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Start retiring satellite-verified blue carbon credits today.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Gain immediate access to curated Indian coastal projects with sub-meter remote sensing proof, Oxford Net-Zero alignment, and cryptographic settlement.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveView('marketplace')}
            className="w-full sm:w-auto h-11 px-6 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Procure Carbon Credits</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveView('register')}
            className="w-full sm:w-auto h-11 px-6 rounded-lg border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] text-[var(--text-primary)] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Register a Coastal Site</span>
          </button>
        </div>
      </section>

    </div>
  );
};
