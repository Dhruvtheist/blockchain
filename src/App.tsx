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
import { LoginPage } from './components/LoginPage';
import { RegisterAuthPage } from './components/RegisterAuthPage';
import { ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, currentUser, userRole } = useApp();

  const renderView = () => {
    // 1. Explicit Auth views
    if (activeView === 'login') return <LoginPage />;
    if (activeView === 'register-auth') return <RegisterAuthPage />;

    // 2. Protected routes requiring authentication
    const isProtected = ['admin', 'verify', 'register', 'mrv'].includes(activeView);
    if (isProtected && !currentUser) {
      return <LoginPage />;
    }

    // 3. Role-specific protection
    if (activeView === 'admin' && userRole !== 'GOV_ADMIN') {
      return <LoginPage />;
    }
    if (activeView === 'verify' && !['GOV_ADMIN', 'VERIFIER'].includes(userRole)) {
      return <LoginPage />;
    }
    if (activeView === 'register' && !['PROJECT_OWNER', 'GOV_ADMIN'].includes(userRole)) {
      return <LoginPage />;
    }
    if (activeView === 'mrv' && !['PROJECT_OWNER', 'VERIFIER', 'GOV_ADMIN'].includes(userRole)) {
      return <LoginPage />;
    }

    // 4. Standard views
    switch (activeView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <OverviewDashboard />;
      case 'map':
        return <InteractiveMap />;
      case 'register':
        return <ProjectRegistration />;
      case 'mrv':
        return <MRVModule />;
      case 'verify':
        return <GovVerificationPortal />;
      case 'marketplace':
        return <CarbonMarketplace />;
      case 'ledger':
        return <BlockchainExplorer />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'public-audit':
        return <PublicTransparencyPortal />;
      case 'audit-trail':
        return <AuditTrailView />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] relative font-sans transition-colors duration-200">
      
      {/* Top Architectural Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DemoWalkthroughBar />

        {renderView()}
      </main>

      {/* Modern Institutional Architectural Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--surface-card)] pt-16 pb-12 mt-20 text-xs text-[var(--text-secondary)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col space-y-1 cursor-pointer" onClick={() => setActiveView('landing')}>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-bold text-xl text-[var(--text-primary)] tracking-tight font-display">
                    BlueChain
                  </span>
                  <span className="text-xs font-mono font-semibold text-[var(--color-primary)] px-1.5 py-0.5 bg-[var(--color-primary-soft)] rounded">
                    Registry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                  Coastal Carbon Infrastructure & Satellite MRV
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
                Decentralized registry protocol for blue carbon assets. Built for multi-spectral remote sensing verification, automated biomass calculation, and cryptographically settled removals.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 border border-[var(--border-color)] bg-[var(--surface-panel)] text-[var(--text-primary)] rounded-md shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  <span>Oxford Principles Aligned</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 border border-[var(--border-color)] bg-[var(--surface-panel)] text-[var(--text-primary)] rounded-md shadow-xs">
                  <Cpu className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Sentinel-2 MSI Ingestion</span>
                </span>
              </div>
            </div>

            {/* Column 2: Modules */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">Platform Interface</div>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><button onClick={() => setActiveView('marketplace')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Carbon Store</button></li>
                <li><button onClick={() => setActiveView('mrv')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Satellite MRV Studio</button></li>
                <li><button onClick={() => setActiveView('map')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Geospatial Radar</button></li>
                <li><button onClick={() => setActiveView('audit-trail')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Provenance Trail</button></li>
                <li><button onClick={() => setActiveView('dashboard')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Portfolio Dashboard</button></li>
              </ul>
            </div>

            {/* Column 3: Standards & Rigor */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">Methodologies</div>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                  <span>IPCC Tier-2 Sequestration</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                  <span>Verra VM0033 Methodology</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                  <span>Sentinel-2 Multispectral Radar</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                  <span>ICVCM Core Carbon Principles</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                  <span>Article 6.4 Paris Ready</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Cryptographic Ledger */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">Decentralized Ledger</div>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li><button onClick={() => setActiveView('ledger')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Polygon EVM Contracts</button></li>
                <li><button onClick={() => setActiveView('ledger')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">ERC-20 Token (BCT) Minting</button></li>
                <li><button onClick={() => setActiveView('public-audit')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">IPFS CID Explorer</button></li>
                <li><button onClick={() => setActiveView('admin')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Multisig Access Matrix</button></li>
              </ul>
            </div>

          </div>

          {/* Bottom Precision Strip */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--text-muted)] text-[11px] font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-[var(--text-secondary)]">Polygon Contract Active • Double-Counting Risk: 0.0%</span>
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
