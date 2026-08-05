import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, CarbonCertificate } from '../types';
import { ShoppingBag, Award, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from './CertificateModal';

export const CarbonMarketplace: React.FC = () => {
  const { projects, buyCredits, wallet, certificates } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(50);
  const [activeCert, setActiveCert] = useState<CarbonCertificate | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('ALL');

  const verifiedProjects = projects.filter(p => p.status === 'Verified');

  const filteredProjects = verifiedProjects.filter(p => {
    if (selectedEcosystem === 'ALL') return true;
    return p.ecosystem === selectedEcosystem;
  });

  const handlePurchase = async () => {
    if (!selectedProject || purchaseAmount <= 0) return;
    setIsBuying(true);
    try {
      const cert = await buyCredits(selectedProject.id, purchaseAmount);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setActiveCert(cert);
      setSelectedProject(null);
    } catch (err) {
      console.error('Purchase failed', err);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-teal-400" />
            <span>Verified Blue Carbon Credit Exchange</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Carbon Credit Marketplace</h2>
          <p className="text-xs text-slate-300">Purchase verified ERC-20 BCT tokens directly from coastal restoration projects. 100% Traceable.</p>
        </div>

        {/* Ecosystem Filter */}
        <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {(['ALL', 'Mangrove', 'Seagrass', 'Salt Marsh'] as const).map(eco => (
            <button
              key={eco}
              onClick={() => setSelectedEcosystem(eco)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                selectedEcosystem === eco ? 'bg-teal-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {eco}
            </button>
          ))}
        </div>
      </div>

      {/* Wallet Balance Strip */}
      <div className="p-4 rounded-xl glass-panel bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Connected Account Balance:</span>
            <div className="flex items-center space-x-3 text-xs font-mono font-bold">
              <span className="text-emerald-400">{wallet.balanceBCT.toLocaleString()} BCT</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300">{wallet.balanceETH} ETH</span>
            </div>
          </div>
        </div>

        {certificates.length > 0 && (
          <button
            onClick={() => setActiveCert(certificates[0])}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold"
          >
            <Award className="w-4 h-4" />
            <span>View My Issued Certificates ({certificates.length})</span>
          </button>
        )}
      </div>

      {/* Projects Marketplace Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 overflow-hidden glass-panel-hover flex flex-col justify-between"
          >
            <div>
              {/* Project Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white font-bold text-[10px] backdrop-blur-md">
                  Government Verified
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-sky-300 border border-sky-500/30 font-mono text-[10px] font-bold">
                  ${project.pricePerCreditUSD} / ton
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-sky-400 font-bold">{project.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold">
                    {project.ecosystem}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-white leading-snug">{project.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{project.description}</p>

                <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Available Credits:</span>
                    <span className="text-emerald-400 font-bold">{project.creditsAvailable.toLocaleString()} BCT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Sequestered:</span>
                    <span className="text-teal-300">{project.estimatedCarbonTons.toLocaleString()} tCO₂e</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 font-sans">{project.state}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="p-5 pt-0">
              <button
                onClick={() => { setSelectedProject(project); setPurchaseAmount(100); }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:opacity-90 transition-all flex items-center justify-center space-x-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Carbon Credits</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl glass-panel bg-slate-900 border border-sky-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-base">
                <ShoppingBag className="w-5 h-5" />
                <span>Purchase Carbon Offsets</span>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white">{selectedProject.name}</div>
              <div className="text-slate-400">{selectedProject.ecosystem} • ${selectedProject.pricePerCreditUSD} per Metric Ton</div>
              <div className="text-emerald-400 font-bold">Max Available: {selectedProject.creditsAvailable.toLocaleString()} BCT</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Credit Quantity (Metric Tons CO₂e)</label>
              <input
                type="number"
                min="1"
                max={selectedProject.creditsAvailable}
                value={purchaseAmount}
                onChange={e => setPurchaseAmount(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl glass-input text-sm font-bold text-sky-400 font-mono"
              />
            </div>

            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Price Subtotal:</span>
                <span className="text-white font-bold">${(purchaseAmount * selectedProject.pricePerCreditUSD).toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ETH Equivalent:</span>
                <span className="text-teal-300 font-bold">{(purchaseAmount * 0.008).toFixed(4)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Minted Token:</span>
                <span className="text-emerald-400 font-bold">{purchaseAmount} BCT ERC-20</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isBuying}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25"
              >
                {isBuying ? 'Executing Web3 Transfer...' : 'Confirm & Buy Credits'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
      )}

    </div>
  );
};
