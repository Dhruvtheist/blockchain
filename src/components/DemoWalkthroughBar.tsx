import React from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, X, ChevronRight } from 'lucide-react';

export const DemoWalkthroughBar: React.FC = () => {
  const { isDemoActive, setIsDemoActive, demoStep, setDemoStep, setActiveView, setUserRole } = useApp();

  if (!isDemoActive) {
    return (
      <div className="editorial-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3.5">
          <div className="w-8 h-8 flex items-center justify-center border border-white/[0.12] bg-[#070a08] text-[#3fb978] font-mono text-xs">
            01
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#f5f6f2] font-mono uppercase tracking-wider">Evaluation Walkthrough Mode</span>
              <span className="text-[10px] font-mono px-2 py-0.2 border border-white/[0.1] text-[#8d998b]">
                SIH Guided Tour
              </span>
            </div>
            <span className="text-xs text-[#8d998b] block mt-0.5">
              Follow the end-to-end lifecycle across Registration, Sentinel-2 MRV Telemetry, Auditor Sign-off, and Smart Contract Settlement.
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsDemoActive(true);
            setDemoStep(1);
            setUserRole('PROJECT_OWNER');
            setActiveView('register');
          }}
          className="px-4 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Launch Tour</span>
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, title: '1. Register Site & Polygon Boundary', role: 'PROJECT_OWNER', view: 'register', desc: 'Georeference coastal area on decentralized registry' },
    { num: 2, title: '2. Ingest Sentinel-2 Radar Bands', role: 'PROJECT_OWNER', view: 'mrv', desc: 'Upload MSI optical bands & soil salinity sensors' },
    { num: 3, title: '3. Execute AI Biomass Model', role: 'PROJECT_OWNER', view: 'mrv', desc: 'Run neural network biomass & CO2 carbon sink model' },
    { num: 4, title: '4. Verifier Digital Signature', role: 'VERIFIER', view: 'verify', desc: 'Accredited verifier cryptographically signs report' },
    { num: 5, title: '5. Mint BCT Carbon Tokens', role: 'GOV_ADMIN', view: 'marketplace', desc: 'Government regulator approves & mints ERC-20 credits' },
    { num: 6, title: '6. Inspect Transaction Ledger', role: 'PUBLIC', view: 'ledger', desc: 'Audit block explorer transactions & smart contract' },
    { num: 7, title: '7. Cryptographic Provenance Trail', role: 'PUBLIC', view: 'audit-trail', desc: 'Verify Oxford Net-Zero compliant audit trail' },
  ];

  const currentStepObj = steps.find(s => s.num === demoStep) || steps[0];

  const handleNextStep = () => {
    if (demoStep < steps.length) {
      const nextNum = demoStep + 1;
      const nextStepObj = steps.find(s => s.num === nextNum);
      setDemoStep(nextNum);
      if (nextStepObj) {
        setUserRole(nextStepObj.role as any);
        setActiveView(nextStepObj.view);
      }
    } else {
      setIsDemoActive(false);
      setDemoStep(0);
    }
  };

  return (
    <div className="editorial-card p-5 space-y-4 mb-8 animate-fadeIn border-[#3fb978]/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#f5f6f2]">
            Evaluation Mode Active
          </span>
          <span className="text-xs text-[#8d998b] font-mono">— Step {demoStep} of {steps.length}</span>
        </div>

        <button
          onClick={() => { setIsDemoActive(false); setDemoStep(0); }}
          className="text-[#8d998b] hover:text-white transition text-xs flex items-center gap-1 cursor-pointer font-mono"
        >
          <span>Close</span> <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {steps.map(s => (
          <button
            key={s.num}
            onClick={() => {
              setDemoStep(s.num);
              setUserRole(s.role as any);
              setActiveView(s.view);
            }}
            className={`py-2 px-2 text-[11px] font-mono text-center transition-all truncate border cursor-pointer ${
              s.num === demoStep 
                ? 'bg-[#3fb978] text-[#070a08] font-bold border-[#3fb978]'
                : s.num < demoStep
                ? 'bg-[#121a14] text-[#c2c9bf] border-white/[0.1]'
                : 'bg-[#070a08] text-[#8d998b] border-white/[0.06] hover:text-white'
            }`}
          >
            0{s.num}
          </button>
        ))}
      </div>

      {/* Active Step Information Box */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#070a08] p-4 border border-white/[0.08] gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-[#f5f6f2]">{currentStepObj.title}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 border border-white/[0.1] text-[#8d998b]">
              Role: {currentStepObj.role}
            </span>
          </div>
          <p className="text-xs text-[#8d998b]">{currentStepObj.desc}</p>
        </div>

        <button
          onClick={handleNextStep}
          className="w-full sm:w-auto px-5 py-2 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{demoStep === steps.length ? 'Finish Tour' : 'Next Step'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
