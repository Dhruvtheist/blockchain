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
import { ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#070a08] text-[#e3e7e0] relative">
      
      {/* Top Architectural Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Editorial Multi-Column Architectural Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050806] pt-16 pb-12 mt-24 text-xs text-[#8d998b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col space-y-1 cursor-pointer" onClick={() => setActiveView('landing')}>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-bold text-lg text-[#f5f6f2] tracking-tight font-display">
                    BlueChain
                  </span>
                  <span className="text-[11px] font-mono text-[#3fb978]">
                    Registry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8d998b] uppercase tracking-widest">
                  Coastal Carbon Infrastructure & Satellite MRV
                </span>
              </div>
              <p className="text-xs text-[#8d998b] max-w-sm leading-relaxed">
                Decentralized registry protocol for blue carbon assets. Built for multi-spectral remote sensing verification, automated biomass calculation, and cryptographically settled removals.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 border border-white/[0.08] bg-[#0c120e] text-[#c2c9bf]">
                  <ShieldCheck className="w-3 h-3 text-[#3fb978]" />
                  <span>Oxford Principles Aligned</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 border border-white/[0.08] bg-[#0c120e] text-[#c2c9bf]">
                  <Cpu className="w-3 h-3 text-[#3fb978]" />
                  <span>Sentinel-2 MSI Ingestion</span>
                </span>
              </div>
            </div>

            {/* Column 2: Modules */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#f5f6f2]">Platform Interface</div>
              <ul className="space-y-2 text-[#8d998b]">
                <li><button onClick={() => setActiveView('marketplace')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Carbon Store</button></li>
                <li><button onClick={() => setActiveView('mrv')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Satellite MRV Studio</button></li>
                <li><button onClick={() => setActiveView('map')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Geospatial Radar</button></li>
                <li><button onClick={() => setActiveView('audit-trail')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Provenance Trail</button></li>
                <li><button onClick={() => setActiveView('dashboard')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Portfolio Dashboard</button></li>
              </ul>
            </div>

            {/* Column 3: Standards & Rigor */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#f5f6f2]">Methodologies</div>
              <ul className="space-y-2 text-[#8d998b]">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#3fb978]" />
                  <span>IPCC Tier-2 Sequestration</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#3fb978]" />
                  <span>Verra VM0033 Methodology</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#3fb978]" />
                  <span>Sentinel-2 Multispectral Radar</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#3fb978]" />
                  <span>ICVCM Core Carbon Principles</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#3fb978]" />
                  <span>Article 6.4 Paris Ready</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Cryptographic Ledger */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#f5f6f2]">Decentralized Ledger</div>
              <ul className="space-y-2 text-[#8d998b]">
                <li><button onClick={() => setActiveView('ledger')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Polygon EVM Contracts</button></li>
                <li><button onClick={() => setActiveView('ledger')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">ERC-20 Token (BCT) Minting</button></li>
                <li><button onClick={() => setActiveView('public-audit')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">IPFS CID Explorer</button></li>
                <li><button onClick={() => setActiveView('admin')} className="hover:text-[#f5f6f2] transition-colors cursor-pointer">Multisig Access Matrix</button></li>
              </ul>
            </div>

          </div>

          {/* Bottom Precision Strip */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#8d998b] text-[11px] font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
              <span>Polygon Contract Active • Double-Counting Risk: 0.0%</span>
            </div>
            <div>
              &copy; {new Date().getFullYear()} BlueChain Registry. High-integrity ecological carbon systems.
            </div>
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
