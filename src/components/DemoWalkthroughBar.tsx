import React from 'react';
import { useApp } from '../context/AppContext';
import { PlayCircle, X, Sparkles, ChevronRight } from 'lucide-react';

export const DemoWalkthroughBar: React.FC = () => {
  const { isDemoActive, setIsDemoActive, demoStep, setDemoStep, setActiveView, setUserRole } = useApp();

  if (!isDemoActive) {
    return (
      <div className="bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-purple-500/10 border border-sky-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center border border-sky-500/30 text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Smart India Hackathon 5-Minute Evaluator Mode</span>
            <span className="text-[11px] text-slate-400">Guide judges through the 8-step Blue Carbon & MRV workflow automatically.</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsDemoActive(true);
            setDemoStep(1);
            setUserRole('PROJECT_OWNER');
            setActiveView('register');
          }}
          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-sky-500/20 whitespace-nowrap"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Start Interactive Demo (5 Mins)</span>
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, title: '1. Register Site & Polygon Boundary', role: 'PROJECT_OWNER', view: 'register' },
    { num: 2, title: '2. Upload Drone/Sensor Payload', role: 'PROJECT_OWNER', view: 'mrv' },
    { num: 3, title: '3. Run AI NDVI & Biomass Model', role: 'PROJECT_OWNER', view: 'mrv' },
    { num: 4, title: '4. Verifier Audit & Digital Signature', role: 'VERIFIER', view: 'verify' },
    { num: 5, title: '5. Mint BCT Carbon Credit Tokens', role: 'GOV_ADMIN', view: 'marketplace' },
    { num: 6, title: '6. Inspect Immutable Ledger Hash', role: 'PUBLIC', view: 'ledger' },
    { num: 7, title: '7. View Provenance Audit Trail', role: 'PUBLIC', view: 'audit-trail' },
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
    <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 space-y-3 shadow-2xl mb-6 animate-fadeIn relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-emerald-400">
            SIH 5-Minute Guided Demo Mode Active
          </span>
          <span className="text-xs text-slate-400">• Step {demoStep} of {steps.length}</span>
        </div>

        <button
          onClick={() => { setIsDemoActive(false); setDemoStep(0); }}
          className="text-slate-500 hover:text-slate-300 transition text-xs flex items-center gap-1"
        >
          <span>Exit Demo</span> <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="grid grid-cols-7 gap-1.5">
        {steps.map(s => (
          <button
            key={s.num}
            onClick={() => {
              setDemoStep(s.num);
              setUserRole(s.role as any);
              setActiveView(s.view);
            }}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold text-center transition truncate ${
              s.num === demoStep 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : s.num < demoStep
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            Step {s.num}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-950/80 rounded-xl p-3 border border-slate-800 gap-3">
        <div>
          <span className="text-xs font-bold text-white block">{currentStepObj.title}</span>
          <span className="text-[11px] text-slate-400">Active Role Switched To: <span className="text-sky-400 font-semibold">{currentStepObj.role}</span></span>
        </div>

        <button
          onClick={handleNextStep}
          className="w-full sm:w-auto px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
        >
          <span>{demoStep === steps.length ? 'Finish Presentation' : 'Next Demo Step'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
