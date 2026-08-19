import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EcosystemType } from '../types';
import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
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
          ? '/images/sundarbans_mangrove_aerial.png'
          : ecosystem === 'Seagrass'
          ? '/images/gulf_mannar_seagrass.png'
          : '/images/chilika_salt_marsh.png',
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
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Site Georeferencing</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Coastal Carbon Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Register Coastal Carbon Project
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Submit georeferenced polygon perimeters, community governance documents, and baseline habitat characteristics for accredited MRV auditing.
          </p>
        </div>
      </div>

      {successId ? (
        <div className="editorial-panel p-8 sm:p-12 text-center space-y-6 bg-[var(--surface-card)] border border-[var(--color-success)]/30 rounded-2xl shadow-sm animate-fadeIn">
          <div className="w-14 h-14 rounded-full border border-[var(--color-success)]/20 bg-[var(--color-success-soft)] text-[var(--color-success)] mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono text-[var(--color-success)] uppercase tracking-widest font-bold">Intake Registered</span>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display">
              Site Georeferenced on Polygon Ledger
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Assigned project identification <span className="font-mono text-[var(--color-primary)] font-bold">{successId}</span>. Proceed to upload Sentinel-2 optical bands in the MRV Studio.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('mrv')}
              className="h-10 px-5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Open MRV Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSuccessId(null)}
              className="h-10 px-5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold cursor-pointer shadow-xs"
            >
              Register Another Site
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="editorial-card p-6 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block border-b border-[var(--border-color)] pb-3">
                1. Project Identity & Habitat
              </span>

              <div>
                <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sundarbans Coastal Mangrove Restoration Zone-4"
                  className="editorial-input w-full px-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['Mangrove', 'Seagrass', 'Salt Marsh'] as const).map((eco) => (
                  <button
                    key={eco}
                    type="button"
                    onClick={() => setEcosystem(eco)}
                    className={`p-3 text-left border rounded-lg text-xs font-mono transition cursor-pointer ${
                      ecosystem === eco 
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-bold shadow-xs' 
                        : 'border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:bg-[var(--surface-panel)]'
                    }`}
                  >
                    {eco}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Description & Objective</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide ecological baseline and community benefits..."
                  className="editorial-input w-full px-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg"
                />
              </div>
            </div>

            <div className="editorial-card p-6 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block border-b border-[var(--border-color)] pb-3">
                2. Geographic Coordinates & Boundary
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="editorial-input w-full px-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="editorial-input w-full px-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 tabular-nums">
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Latitude (°N)</label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="editorial-input w-full px-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Longitude (°E)</label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="editorial-input w-full px-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">Area (Hectares)</label>
                  <input
                    type="number"
                    value={areaHectares}
                    onChange={(e) => setAreaHectares(e.target.value)}
                    className="editorial-input w-full px-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="editorial-panel p-6 sm:p-7 space-y-5 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block border-b border-[var(--border-color)] pb-3">
                Estimated Sequestration Rate
              </span>

              <div className="p-4 sm:p-5 bg-[var(--surface-panel)] border border-[var(--border-color)] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">Annual Atmospheric Removal</span>
                <div className="text-3xl font-bold text-[var(--text-primary)] font-display tabular-nums">
                  {calculatedCarbon.toLocaleString()} <span className="text-xs font-mono font-normal text-[var(--color-success)]">tCO₂e / yr</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono tabular-nums">
                <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Ecosystem Benchmark:</span>
                  <span className="text-[var(--text-primary)] font-bold">{sequestrationRates[ecosystem]} tCO₂e/ha/yr</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Registrant Entity:</span>
                  <span className="text-[var(--text-primary)] font-bold truncate max-w-[180px]">{ownerName}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--text-muted)]">Double Count Protection:</span>
                  <span className="text-[var(--color-success)] font-bold">Sub-Meter Enforced</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
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
