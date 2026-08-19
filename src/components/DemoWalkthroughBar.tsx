import React from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, X, ChevronRight } from 'lucide-react';

export const DemoWalkthroughBar: React.FC = () => {
  const { isDemoActive, setIsDemoActive, demoStep, setDemoStep, setActiveView, setUserRole } = useApp();

  if (!isDemoActive) {
    return (
      <div className="editorial-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--color-primary)]/20 bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-mono text-xs font-bold shrink-0">
            01
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">Evaluation Walkthrough Mode</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-panel)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold">
                SIH Guided Tour
              </span>
            </div>
            <span className="text-xs text-[var(--text-secondary)] block mt-0.5">
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
          className="h-9 px-4 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
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
    <div className="editorial-card p-5 space-y-4 mb-6 animate-fadeIn bg-[var(--surface-card)] border border-[var(--color-primary)]/40 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-primary)]">
            Evaluation Mode Active
          </span>
          <span className="text-xs text-[var(--text-secondary)] font-mono tabular-nums">— Step {demoStep} of {steps.length}</span>
        </div>

        <button
          onClick={() => { setIsDemoActive(false); setDemoStep(0); }}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-xs flex items-center gap-1 cursor-pointer font-mono"
        >
          <span>Close</span> <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 tabular-nums">
        {steps.map(s => (
          <button
            key={s.num}
            onClick={() => {
              setDemoStep(s.num);
              setUserRole(s.role as any);
              setActiveView(s.view);
            }}
            className={`h-8 px-2 text-[11px] font-mono text-center rounded-md transition-all truncate border cursor-pointer ${
              s.num === demoStep 
                ? 'bg-[var(--color-primary)] text-white font-bold border-[var(--color-primary)] shadow-xs'
                : s.num < demoStep
                ? 'bg-[var(--color-success-soft)] text-[var(--color-success)] font-semibold border-[var(--color-success)]/30'
                : 'bg-[var(--surface-panel)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-panel)]'
            }`}
          >
            0{s.num}
          </button>
        ))}
      </div>

      {/* Active Step Information Box */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[var(--surface-panel)] p-3.5 rounded-xl border border-[var(--border-color)] gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[var(--text-primary)]">{currentStepObj.title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--color-primary)] font-semibold">
              Role: {currentStepObj.role}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">{currentStepObj.desc}</p>
        </div>

        <button
          onClick={handleNextStep}
          className="w-full sm:w-auto h-9 px-4.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
        >
          <span>{demoStep === steps.length ? 'Finish Tour' : 'Next Step'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
