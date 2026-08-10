import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, CarbonCertificate } from '../types';
import { 
  ShoppingBag, 
  Search, 
  FileText, 
  MapPin, 
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from './CertificateModal';

export const CarbonMarketplace: React.FC = () => {
  const { projects, buyCredits, wallet, certificates } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(100);
  const [activeCert, setActiveCert] = useState<CarbonCertificate | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const verifiedProjects = projects.filter(p => p.status === 'Verified');

  const filteredProjects = verifiedProjects.filter(p => {
    const matchesEco = selectedEcosystem === 'ALL' || p.ecosystem === selectedEcosystem;
    const matchesSearch = searchFilter === '' || 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.state.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesEco && matchesSearch;
  });

  const handlePurchase = async () => {
    if (!selectedProject || purchaseAmount <= 0) return;
    setIsBuying(true);
    try {
      const cert = await buyCredits(selectedProject.id, purchaseAmount);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setActiveCert(cert);
      setSelectedProject(null);
      setInspectingProject(null);
    } catch (err) {
      console.error('Purchase failed', err);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Editorial Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8d998b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="uppercase tracking-widest text-[#c2c9bf]">Verified Carbon Store</span>
            <span className="text-white/20">/</span>
            <span>Oxford Net-Zero Principles Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Institutional Blue Carbon Assets
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Acquire and retire verified blue carbon tokens (BCT). Every asset is backed by multi-spectral satellite observation, audited biomass models, and sub-meter GIS bounding boxes.
          </p>
        </div>

        {/* Quick Balance Readout */}
        <div className="flex items-center space-x-4 border border-white/[0.1] bg-[#0c120e] p-4 text-xs font-mono">
          <div>
            <span className="text-[#8d998b] text-[10px] block uppercase">Wallet Balance</span>
            <span className="text-[#3fb978] font-bold">{wallet.balanceBCT.toLocaleString()} BCT</span>
          </div>
          <div className="border-l border-white/[0.08] pl-4">
            <span className="text-[#8d998b] text-[10px] block uppercase">Retirements</span>
            <span className="text-[#f5f6f2] font-bold">{certificates.length} Certs</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Ecosystem Tabs */}
        <div className="flex items-center space-x-1 border border-white/[0.08] bg-[#070a08] p-1 text-xs font-mono">
          {['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'].map((eco) => (
            <button
              key={eco}
              onClick={() => setSelectedEcosystem(eco)}
              className={`px-3 py-1.5 transition-all cursor-pointer ${
                selectedEcosystem === eco
                  ? 'bg-[#18241c] text-[#3fb978] font-semibold'
                  : 'text-[#8d998b] hover:text-white'
              }`}
            >
              {eco === 'ALL' ? 'All Habitats' : eco}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8d998b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, name, or state..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="editorial-input w-full pl-9 pr-3 py-1.5 text-xs font-mono"
          />
        </div>
      </div>

      {/* Project Asset Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => {
          const pricePerTon = p.pricePerCreditUSD || 24.5;
          const availableBCT = p.creditsIssued > 0 ? p.creditsIssued : Math.floor(p.estimatedCarbonTons * 0.4);

          return (
            <div 
              key={p.id}
              className="editorial-card flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header with Art-Directed Framing */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.08]">
                  <img 
                    src={p.imageUrl || '/images/sundarbans_mangrove_aerial.png'} 
                    alt={`Coastal ${p.ecosystem} ecosystem project - ${p.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a08]/90 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 bg-[#070a08]/90 border border-white/[0.1] text-[10px] font-mono text-[#3fb978]">
                      Verified Tier-1
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#070a08]/90 border border-white/[0.1] text-xs font-mono font-bold text-[#f5f6f2]">
                    ${pricePerTon} <span className="text-[10px] font-normal text-[#8d998b]">/ tCO₂e</span>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#3fb978]">{p.id}</span>
                    <span className="text-[#8d998b]">{p.ecosystem} • VM0033</span>
                  </div>

                  <h3 className="text-base font-bold text-[#f5f6f2] font-display line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="text-xs text-[#8d998b] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Metrics Table */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/[0.06] text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-[#8d998b] block uppercase">Available</span>
                      <span className="text-[#3fb978] font-bold">{availableBCT.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8d998b] block uppercase">Total Sink</span>
                      <span className="text-[#f5f6f2] font-bold">{p.estimatedCarbonTons.toLocaleString()} t</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8d998b] block uppercase">Area</span>
                      <span className="text-[#f5f6f2] font-bold">{p.areaHectares} ha</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs text-[#8d998b]">
                    <MapPin className="w-3.5 h-3.5 text-[#3fb978]" />
                    <span>{p.state}, India</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => setInspectingProject(p)}
                  className="w-full py-2.5 bg-[#070a08] hover:bg-[#121a14] border border-white/[0.1] text-xs font-mono text-[#c2c9bf] transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#3fb978]" />
                  <span>Due Diligence Dossier</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProject(p);
                    setPurchaseAmount(100);
                  }}
                  className="w-full py-2.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Procure & Settle Credits</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* DUE DILIGENCE DOSSIER MODAL WITH INTEGRATED REALISTIC HABITAT IMAGERY */}
      {inspectingProject && (
        <div className="fixed inset-0 z-50 bg-[#070a08]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0c120e] border border-white/15 max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#3fb978] uppercase">{inspectingProject.id}</span>
                <h3 className="text-xl font-bold text-[#f5f6f2] font-display">{inspectingProject.name}</h3>
              </div>
              <button 
                onClick={() => setInspectingProject(null)}
                className="p-1 text-[#8d998b] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Habitat Inspection Frame */}
            <div className="relative aspect-[21/9] overflow-hidden border border-white/[0.1] bg-[#070a08]">
              <img 
                src={inspectingProject.imageUrl} 
                alt={inspectingProject.name}
                className="w-full h-full object-cover grayscale contrast-125 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs font-mono">
                <span className="text-[#f5f6f2] font-semibold">{inspectingProject.ecosystem} Habitat Telemetry</span>
                <span className="text-[#3fb978]">{inspectingProject.lat.toFixed(4)}° N, {inspectingProject.lng.toFixed(4)}° E</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#8d998b] leading-relaxed">
              <p>{inspectingProject.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070a08] border border-white/[0.08] font-mono">
                <div>
                  <span className="text-[9px] uppercase text-[#8d998b] block">Ecosystem</span>
                  <span className="text-[#f5f6f2] font-bold">{inspectingProject.ecosystem}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#8d998b] block">Coordinates</span>
                  <span className="text-[#3fb978]">{inspectingProject.lat.toFixed(3)}°, {inspectingProject.lng.toFixed(3)}°</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#8d998b] block">Area</span>
                  <span className="text-[#f5f6f2]">{inspectingProject.areaHectares} Hectares</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#8d998b] block">Annual Capacity</span>
                  <span className="text-[#3fb978]">{inspectingProject.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/[0.08] pt-4">
                <span className="font-mono text-[11px] text-[#f5f6f2] uppercase">Scientific Telemetry Index</span>
                <ul className="space-y-1 text-[#8d998b]">
                  <li>• Sentinel-2 MSI Multi-Spectral Ingestion: <span className="text-[#3fb978] font-mono">B8/B4 Validated (10m Resolution)</span></li>
                  <li>• Ground Truth Sensors: <span className="text-[#3fb978] font-mono">Water Salinity & Core Density Telemetry Connected</span></li>
                  <li>• Smart Contract Hash: <span className="text-[#8d998b] font-mono">0x8A75c12...4b92</span></li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setInspectingProject(null)}
                className="px-4 py-2 border border-white/15 text-xs text-[#8d998b] hover:text-white cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedProject(inspectingProject);
                  setInspectingProject(null);
                }}
                className="px-5 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold cursor-pointer"
              >
                Proceed to Procurement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROCUREMENT CHECKOUT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#070a08]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0c120e] border border-white/15 max-w-md w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#3fb978]">Settlement Order</span>
                <h3 className="text-lg font-bold text-[#f5f6f2] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="cursor-pointer text-[#8d998b] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8d998b] block mb-1.5">Credit Quantity (tCO₂e / BCT)</label>
                <input
                  type="number"
                  min="1"
                  max={selectedProject.estimatedCarbonTons}
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="editorial-input w-full p-3 font-mono text-sm"
                />
              </div>

              <div className="p-4 bg-[#070a08] border border-white/[0.08] space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#8d998b]">
                  <span>Price per tCO₂e:</span>
                  <span className="text-[#f5f6f2]">${selectedProject.pricePerCreditUSD || 24.5} USD</span>
                </div>
                <div className="flex justify-between text-[#8d998b]">
                  <span>Protocol Verification Fee:</span>
                  <span className="text-[#f5f6f2]">$0.00 (Gasless)</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.08] pt-2 text-sm font-bold text-[#f5f6f2]">
                  <span>Total Settlement:</span>
                  <span className="text-[#3fb978]">${(purchaseAmount * (selectedProject.pricePerCreditUSD || 24.5)).toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-white/15 text-xs text-[#8d998b] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isBuying}
                className="px-5 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold transition cursor-pointer"
              >
                {isBuying ? 'Executing Transaction...' : 'Confirm & Retire'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {activeCert && (
        <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
      )}

    </div>
  );
};
