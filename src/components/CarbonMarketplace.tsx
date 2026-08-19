import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, CarbonCertificate } from '../types';
import { 
  ShoppingBag, 
  Search, 
  FileText, 
  MapPin, 
  X, 
  Wallet, 
  Award 
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
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="font-bold uppercase tracking-wider">Verified Carbon Store</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Oxford Net-Zero Principles Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Institutional Blue Carbon Assets
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Acquire and retire verified blue carbon tokens (BCT). Every asset is backed by multi-spectral satellite observation, audited biomass models, and sub-meter GIS bounding boxes.
          </p>
        </div>

        {/* Quick Balance Readout */}
        <div className="flex items-center space-x-4 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-xl px-4 py-3 text-xs font-mono shadow-xs tabular-nums">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block uppercase font-bold">Wallet Balance</span>
              <span className="text-[var(--color-success)] font-bold text-xs">{wallet.balanceBCT.toLocaleString()} BCT</span>
            </div>
          </div>
          <div className="border-l border-[var(--border-color)] pl-4 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--color-success-soft)] text-[var(--color-success)]">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[var(--text-muted)] text-[10px] block uppercase font-bold">Retirements</span>
              <span className="text-[var(--text-primary)] font-bold text-xs">{certificates.length} Certs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Ecosystem Tabs */}
        <div className="flex items-center space-x-1 border border-[var(--border-color)] bg-[var(--surface-card)] rounded-lg p-1 text-xs font-mono shadow-xs">
          {['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'].map((eco) => (
            <button
              key={eco}
              onClick={() => setSelectedEcosystem(eco)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedEcosystem === eco
                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-panel)]'
              }`}
            >
              {eco === 'ALL' ? 'All Habitats' : eco}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, name, or state..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="editorial-input w-full pl-9 pr-3 py-2 text-xs font-mono border border-[var(--border-color)] rounded-lg"
          />
        </div>
      </div>

      {/* Project Asset Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const pricePerTon = p.pricePerCreditUSD || 24.5;
          const availableBCT = p.creditsIssued > 0 ? p.creditsIssued : Math.floor(p.estimatedCarbonTons * 0.4);

          return (
            <div 
              key={p.id}
              className="editorial-card flex flex-col justify-between overflow-hidden group bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Visual Image Header with Art-Directed Framing */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border-color)]">
                  <img 
                    src={p.imageUrl || '/images/sundarbans_mangrove_aerial.png'} 
                    alt={`Coastal ${p.ecosystem} ecosystem project - ${p.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 bg-[var(--surface-card)]/95 backdrop-blur-md rounded border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--color-success)] shadow-xs">
                      Verified Tier-1
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[var(--surface-card)]/95 backdrop-blur-md rounded border border-[var(--border-color)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-xs tabular-nums">
                    ${pricePerTon} <span className="text-[10px] font-normal text-[var(--text-muted)]">/ tCO₂e</span>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--color-primary)] font-bold">{p.id}</span>
                    <span className="text-[var(--text-muted)] font-medium">{p.ecosystem} • VM0033</span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-primary)] font-display line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Metrics Table */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl text-xs font-mono tabular-nums">
                    <div>
                      <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Available</span>
                      <span className="text-[var(--color-success)] font-bold">{availableBCT.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Total Sink</span>
                      <span className="text-[var(--text-primary)] font-bold">{p.estimatedCarbonTons.toLocaleString()} t</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[var(--text-muted)] block uppercase font-bold">Area</span>
                      <span className="text-[var(--color-primary)] font-bold">{p.areaHectares} ha</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs text-[var(--text-secondary)] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span>{p.state}, India</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => setInspectingProject(p)}
                  className="w-full h-9 bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary-hover)] hover:text-white border border-[var(--color-primary)]/30 rounded-lg text-xs font-mono text-[var(--color-primary)] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Due Diligence Dossier</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProject(p);
                    setPurchaseAmount(100);
                  }}
                  className="w-full h-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-lg text-[var(--button-primary-text)] text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Procure & Settle Credits</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* DUE DILIGENCE DOSSIER MODAL */}
      {inspectingProject && (
        <div className="fixed inset-0 z-50 bg-[var(--modal-overlay)] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl max-w-3xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto shadow-xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5">
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--color-primary)] uppercase">{inspectingProject.id}</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">{inspectingProject.name}</h3>
              </div>
              <button 
                onClick={() => setInspectingProject(null)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Visual Habitat Inspection Frame */}
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--surface-panel)]">
              <img 
                src={inspectingProject.imageUrl} 
                alt={inspectingProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-xs font-mono text-white drop-shadow-sm font-medium tabular-nums">
                <span className="font-bold">{inspectingProject.ecosystem} Habitat Telemetry</span>
                <span className="text-[#3fb978] font-bold">{inspectingProject.lat.toFixed(4)}° N, {inspectingProject.lng.toFixed(4)}° E</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[var(--text-secondary)] leading-relaxed">
              <p>{inspectingProject.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl font-mono tabular-nums">
                <div>
                  <span className="text-[9px] uppercase text-[var(--text-muted)] block font-bold">Ecosystem</span>
                  <span className="text-[var(--text-primary)] font-bold">{inspectingProject.ecosystem}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[var(--text-muted)] block font-bold">Coordinates</span>
                  <span className="text-[var(--color-primary)] font-bold">{inspectingProject.lat.toFixed(3)}°, {inspectingProject.lng.toFixed(3)}°</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[var(--text-muted)] block font-bold">Area</span>
                  <span className="text-[var(--text-primary)] font-bold">{inspectingProject.areaHectares} ha</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[var(--text-muted)] block font-bold">Annual Capacity</span>
                  <span className="text-[var(--color-success)] font-bold">{inspectingProject.estimatedCarbonTons.toLocaleString()} t</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-[var(--border-color)] pt-3.5">
                <span className="font-mono text-[11px] text-[var(--text-primary)] uppercase font-bold">Scientific Telemetry Index</span>
                <ul className="space-y-1.5 text-[var(--text-secondary)]">
                  <li>• Sentinel-2 MSI Multi-Spectral Ingestion: <span className="text-[var(--color-success)] font-mono font-bold">B8/B4 Validated (10m Resolution)</span></li>
                  <li>• Ground Truth Sensors: <span className="text-[var(--color-success)] font-mono font-bold">Water Salinity & Core Density Telemetry Connected</span></li>
                  <li>• Smart Contract Hash: <span className="text-[var(--color-primary)] font-mono font-bold">0x8A75c12...4b92</span></li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-[var(--border-color)]">
              <button
                onClick={() => setInspectingProject(null)}
                className="h-9 px-4 rounded-lg border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedProject(inspectingProject);
                  setInspectingProject(null);
                }}
                className="h-9 px-4.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold cursor-pointer shadow-xs"
              >
                Proceed to Procurement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROCUREMENT CHECKOUT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[var(--modal-overlay)] backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3.5">
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--color-success)] uppercase">Settlement Order</span>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-display">{selectedProject.name}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Credit Quantity (tCO₂e / BCT)</label>
                <input
                  type="number"
                  min="1"
                  max={selectedProject.estimatedCarbonTons}
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="editorial-input w-full px-3.5 py-2.5 font-mono text-xs border border-[var(--border-color)] rounded-lg"
                />
              </div>

              <div className="p-3.5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl space-y-1.5 font-mono text-xs tabular-nums">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Price per tCO₂e:</span>
                  <span className="text-[var(--text-primary)] font-bold">${selectedProject.pricePerCreditUSD || 24.5} USD</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Protocol Verification Fee:</span>
                  <span className="text-[var(--color-success)] font-bold">$0.00 (Gasless)</span>
                </div>
                <div className="flex justify-between border-t border-[var(--border-color)] pt-2 text-xs font-bold text-[var(--text-primary)]">
                  <span>Total Settlement:</span>
                  <span className="text-[var(--color-success)]">${(purchaseAmount * (selectedProject.pricePerCreditUSD || 24.5)).toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="h-9 px-4 rounded-lg border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isBuying}
                className="h-9 px-4.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition cursor-pointer shadow-xs disabled:opacity-50"
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
