import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { OverviewDashboard } from './components/OverviewDashboard';
import { InteractiveMap } from './components/InteractiveMap';
import { ProjectRegistration } from './components/ProjectRegistration';
import { MRVModule } from './components/MRVModule';
import { GovVerificationPortal } from './components/GovVerificationPortal';
import { CarbonMarketplace } from './components/CarbonMarketplace';
import { BlockchainExplorer } from './components/BlockchainExplorer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { PublicTransparencyPortal } from './components/PublicTransparencyPortal';
import { AuditTrailView } from './components/AuditTrailView';
import { AdminPanel } from './components/AdminPanel';
import { DemoWalkthroughBar } from './components/DemoWalkthroughBar';
import { Waves, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#070d19] text-slate-100 selection:bg-sky-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DemoWalkthroughBar />

        {activeView === 'landing' && <LandingPage />}
        {activeView === 'dashboard' && <OverviewDashboard />}
        {activeView === 'map' && <InteractiveMap />}
        {activeView === 'register' && <ProjectRegistration />}
        {activeView === 'mrv' && <MRVModule />}
        {activeView === 'verify' && <GovVerificationPortal />}
        {activeView === 'marketplace' && <CarbonMarketplace />}
        {activeView === 'ledger' && <BlockchainExplorer />}
        {activeView === 'analytics' && <AnalyticsDashboard />}
        {activeView === 'public-audit' && <PublicTransparencyPortal />}
        {activeView === 'audit-trail' && <AuditTrailView />}
        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-500/20 bg-slate-950/80 backdrop-blur-md py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
              <Waves className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="font-bold text-slate-200">BlueChain Registry</span>
              <span className="text-[10px] text-slate-500 block">Blockchain-Based Blue Carbon Ecosystem Management</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-400 text-xs">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart India Hackathon Prototype</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-sky-300">Ethereum Sepolia • ERC-20 BCT</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            &copy; {new Date().getFullYear()} BlueChain Registry Platform. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
