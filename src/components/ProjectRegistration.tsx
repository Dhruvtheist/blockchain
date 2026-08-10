import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { CheckCircle2 } from 'lucide-react';
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
  const [ownerName] = useState('Sundarbans Marine Eco Community (NGO)');
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
        pricePerCreditUSD: ecosystem === 'Mangrove' ? 24.5 : ecosystem === 'Seagrass' ? 21.0 : 19.5,
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
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Registration failed:', err);
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
            <span className="uppercase tracking-widest text-[#c2c9bf]">Site Georeferencing</span>
            <span className="text-white/20">/</span>
            <span>Coastal Carbon Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f2] tracking-tight font-display">
            Register Coastal Carbon Project
          </h1>
          <p className="text-xs sm:text-sm text-[#8d998b] max-w-2xl leading-relaxed">
            Submit georeferenced polygon perimeters, community governance documents, and baseline habitat characteristics for accredited MRV auditing.
          </p>
        </div>
      </div>

      {successId ? (
        <div className="editorial-panel p-8 sm:p-12 text-center space-y-6 border-[#3fb978]/40 animate-fadeIn">
          <div className="w-12 h-12 border border-[#3fb978]/30 bg-[#0c120e] text-[#3fb978] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-mono text-[#3fb978] uppercase tracking-widest">Intake Registered</span>
            <h2 className="text-2xl font-bold text-[#f5f6f2] font-display">
              Site Georeferenced on Polygon Ledger
            </h2>
            <p className="text-xs text-[#8d998b]">
              Assigned project identification <span className="font-mono text-[#3fb978] font-bold">{successId}</span>. Proceed to upload Sentinel-2 optical bands in the MRV Studio.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('mrv')}
              className="px-6 py-2.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold cursor-pointer"
            >
              Open MRV Studio
            </button>
            <button
              onClick={() => setSuccessId(null)}
              className="px-6 py-2.5 border border-white/[0.15] text-xs text-[#8d998b] hover:text-white cursor-pointer"
            >
              Register Another Site
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="editorial-card p-6 sm:p-8 space-y-5">
              <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2] block border-b border-white/[0.08] pb-3">
                1. Project Identity & Habitat
              </span>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sundarbans Coastal Mangrove Restoration Zone-4"
                  className="editorial-input w-full p-3 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['Mangrove', 'Seagrass', 'Salt Marsh'] as const).map((eco) => (
                  <button
                    key={eco}
                    type="button"
                    onClick={() => setEcosystem(eco)}
                    className={`p-3 text-left border text-xs font-mono transition cursor-pointer ${
                      ecosystem === eco ? 'border-[#3fb978] bg-[#121a14] text-[#3fb978] font-bold' : 'border-white/[0.1] text-[#8d998b]'
                    }`}
                  >
                    {eco}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">Description & Objective</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide ecological baseline and community benefits..."
                  className="editorial-input w-full p-3 text-xs"
                />
              </div>
            </div>

            <div className="editorial-card p-6 sm:p-8 space-y-5">
              <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2] block border-b border-white/[0.08] pb-3">
                2. Geographic Coordinates & Boundary
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="editorial-input w-full p-3 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="editorial-input w-full p-3 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">Latitude (°N)</label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="editorial-input w-full p-3 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">Longitude (°E)</label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="editorial-input w-full p-3 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8d998b] block mb-1.5">Area (Hectares)</label>
                  <input
                    type="number"
                    value={areaHectares}
                    onChange={(e) => setAreaHectares(e.target.value)}
                    className="editorial-input w-full p-3 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="editorial-panel p-6 sm:p-8 space-y-5">
              <span className="text-xs font-mono font-semibold uppercase text-[#f5f6f2] block border-b border-white/[0.08] pb-3">
                Estimated Sequestration Rate
              </span>

              <div className="p-5 bg-[#050806] border border-white/[0.08] space-y-1">
                <span className="text-[10px] font-mono text-[#8d998b] uppercase">Annual Atmospheric Removal</span>
                <div className="text-3xl font-bold text-[#f5f6f2] font-display">
                  {calculatedCarbon.toLocaleString()} <span className="text-xs font-mono font-normal text-[#3fb978]">tCO₂e / yr</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-[#8d998b]">Ecosystem Benchmark:</span>
                  <span className="text-[#f5f6f2]">{sequestrationRates[ecosystem]} tCO₂e/ha/yr</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-[#8d998b]">Registrant Entity:</span>
                  <span className="text-[#f5f6f2] truncate max-w-[180px]">{ownerName}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#8d998b]">Double Count Protection:</span>
                  <span className="text-[#3fb978]">Sub-Meter Enforced</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  {isSubmitting ? 'Registering On-Chain...' : 'Confirm Site Registration'}
                </button>
              </div>
            </div>

          </div>

        </form>
      )}

    </div>
  );
};
