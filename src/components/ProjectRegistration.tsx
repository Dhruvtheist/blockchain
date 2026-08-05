import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { Waves, FileUp, CheckCircle2, Calculator, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectRegistration: React.FC = () => {
  const { registerProject, wallet, setActiveView } = useApp();

  const [name, setName] = useState('');
  const [ecosystem, setEcosystem] = useState<EcosystemType>('Mangrove');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('West Bengal');
  const [district, setDistrict] = useState('South 24 Parganas');
  const [lat, setLat] = useState('21.9497');
  const [lng, setLng] = useState('88.8834');
  const [areaHectares, setAreaHectares] = useState('250');
  const [ownerName, setOwnerName] = useState('Sundarbans Marine Eco Community (NGO)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const sequestrationRates: Record<EcosystemType, number> = {
    Mangrove: 6.5,
    Seagrass: 4.2,
    'Salt Marsh': 5.1
  };

  const calculatedCarbon = Math.round((parseFloat(areaHectares) || 0) * sequestrationRates[ecosystem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !areaHectares) return;

    setIsSubmitting(true);
    try {
      const newProjectId = await registerProject({
        name,
        ecosystem,
        description,
        state,
        district,
        lat: parseFloat(lat) || 21.0,
        lng: parseFloat(lng) || 88.0,
        areaHectares: parseFloat(areaHectares) || 100,
        estimatedCarbonTons: calculatedCarbon,
        pricePerCreditUSD: ecosystem === 'Mangrove' ? 24.0 : ecosystem === 'Seagrass' ? 21.0 : 19.0,
        ownerWallet: wallet.address,
        ownerName,
        imageUrl: ecosystem === 'Mangrove' 
          ? 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
          : ecosystem === 'Seagrass'
          ? 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        documents: [
          { name: 'LiDAR_Soil_Carbon_Density_Report.pdf', url: '#', hash: `0x${Math.random().toString(16).substring(2, 10)}...` },
          { name: 'State_Forest_Dept_NOC_Approval.pdf', url: '#', hash: `0x${Math.random().toString(16).substring(2, 10)}...` }
        ]
      });

      setSuccessId(newProjectId);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Registration failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successId) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-2xl glass-panel bg-slate-900/90 border border-emerald-500/40 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <h2 className="text-2xl font-bold text-white">Project Registered on Blockchain!</h2>
        <p className="text-sm text-slate-300">
          Your project has been recorded on the BlueChain smart contract ledger. It is now awaiting government satellite verification.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs font-mono space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Assigned Project ID:</span>
            <span className="text-sky-400 font-bold">{successId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Estimated Sequestration:</span>
            <span className="text-teal-300 font-bold">{calculatedCarbon.toLocaleString()} tCO₂e / yr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className="text-amber-400 font-bold">Pending Government Audit</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setActiveView('map')}
            className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow hover:bg-sky-400"
          >
            View Project on Map
          </button>
          <button
            onClick={() => { setSuccessId(null); setName(''); }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
          >
            Register Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-sky-500/20 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Waves className="w-6 h-6 text-sky-400" />
            <span>Blue Carbon Project Registration Portal</span>
          </h2>
          <p className="text-xs text-slate-400">Submit coastal ecosystem restoration data for government verification and carbon credit minting</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Verified Smart Contract Gateway</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core Project Details */}
        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
          <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">1. Project & Owner Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Sundarbans Avicennia Restoration Project"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Owner Name *</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                placeholder="NGO / Forest Department Name"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Ecosystem Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Mangrove', 'Seagrass', 'Salt Marsh'] as const).map(eco => (
                <button
                  type="button"
                  key={eco}
                  onClick={() => setEcosystem(eco)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    ecosystem === eco
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500 shadow-md shadow-sky-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div>{eco}</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">~{sequestrationRates[eco]} tCO₂e/ha/yr</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Methodology *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe species planted, coastal tidal flow, community involvement, and carbon sequestration methodology..."
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>
        </div>

        {/* Geographic & Carbon Sequestration Estimator */}
        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider">2. Location & Carbon Storage Estimator</h3>
            <div className="flex items-center space-x-1 text-xs text-teal-400 font-mono">
              <Calculator className="w-4 h-4" />
              <span>IPCC Tier-2 Calculator Engine</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              >
                <option value="West Bengal">West Bengal</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Odisha">Odisha</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Kerala">Kerala</option>
                <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
              <input
                type="text"
                required
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Area Covered (Hectares) *</label>
              <input
                type="number"
                required
                min="1"
                value={areaHectares}
                onChange={e => setAreaHectares(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold text-sky-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GPS Latitude *</label>
              <input
                type="text"
                required
                value={lat}
                onChange={e => setLat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GPS Longitude *</label>
              <input
                type="text"
                required
                value={lng}
                onChange={e => setLng(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-sky-950/40 to-slate-950 border border-sky-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Estimated Annual Carbon Storage:</span>
              <span className="text-2xl font-black text-emerald-400">
                {calculatedCarbon.toLocaleString()} <span className="text-xs text-emerald-300">Metric Tons CO₂e / year</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Potential Credit Tokens:</span>
              <span className="text-lg font-bold text-sky-300">{calculatedCarbon.toLocaleString()} BCT</span>
            </div>
          </div>

        </div>

        {/* Supporting Documents & Image Mock */}
        <div className="p-6 rounded-2xl glass-panel bg-slate-900/70 border border-sky-500/20 space-y-4">
          <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">3. Verification Documents & IPFS Upload</h3>

          <div className="p-6 border-2 border-dashed border-sky-500/30 rounded-xl bg-slate-950/40 text-center hover:border-sky-500/60 transition-colors cursor-pointer">
            <FileUp className="w-8 h-8 text-sky-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-200">Drag & Drop Satellite Imagery & Soil Core Lab Reports</div>
            <div className="text-[10px] text-slate-400 mt-1">Files automatically anchored to IPFS (InterPlanetary File System) cryptographic hash</div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white font-black text-sm shadow-xl shadow-sky-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <span>Generating Smart Contract Cryptographic Hash...</span>
          ) : (
            <>
              <Waves className="w-5 h-5" />
              <span>Submit Project to Blockchain Registry</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
