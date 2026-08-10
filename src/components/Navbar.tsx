import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { 
  Shield, 
  Waves, 
  Compass, 
  Wallet, 
  Bell, 
  UserCheck, 
  ChevronDown,
  CheckCircle2,
  X,
  Menu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    wallet, 
    connectWallet, 
    notifications, 
    markNotificationRead,
    activeView,
    setActiveView 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { title: string; badge: string; icon: any }> = {
    GOV_ADMIN: { title: 'Regulator Portal', badge: 'Regulator', icon: Shield },
    PROJECT_OWNER: { title: 'Project Originator', badge: 'Originator', icon: Waves },
    VERIFIER: { title: 'Accredited Verifier', badge: 'Verifier', icon: UserCheck },
    PUBLIC: { title: 'Public Observer', badge: 'Public', icon: Compass }
  };

  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'marketplace', label: 'Carbon Store' },
    { id: 'dashboard', label: 'Portfolio' },
    { id: 'map', label: 'Geospatial Radar' },
    { id: 'mrv', label: 'Satellite MRV', roles: ['PROJECT_OWNER', 'VERIFIER', 'GOV_ADMIN'] },
    { id: 'register', label: 'Registration', roles: ['PROJECT_OWNER', 'GOV_ADMIN'] },
    { id: 'verify', label: 'Verification Desk', roles: ['VERIFIER', 'GOV_ADMIN'] },
    { id: 'audit-trail', label: 'Provenance Trail' },
    { id: 'ledger', label: 'Ledger' },
    { id: 'admin', label: 'Governance', roles: ['GOV_ADMIN'] },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070a08]/95 backdrop-blur-md border-b border-white/[0.08] transition-all">
      
      {/* Editorial Precision Top Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 border-b border-white/[0.05] text-[11px] text-[#8d998b] font-mono">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2 text-[#c2c9bf]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
            <span className="font-sans font-medium uppercase tracking-wider text-[10px] text-[#3fb978]">Protocol v2.4</span>
            <span className="text-white/20">/</span>
            <span>Indian Coastal Carbon Infrastructure</span>
          </span>
          <span className="text-white/20">•</span>
          <span>Aligned with Oxford Offsetting Principles & ICVCM Core Standards</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#8d998b]">Decentralized Satellite Telemetry</span>
          <span className="text-white/20">/</span>
          <span className="text-[#c2c9bf]">Polygon PoS Smart Contracts</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Wordmark */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center space-x-3 cursor-pointer group select-none py-2"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-base sm:text-lg font-bold text-[#f5f6f2] tracking-tight font-display">
                  BlueChain
                </span>
                <span className="text-[11px] font-mono text-[#3fb978] tracking-normal">
                  Registry
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#8d998b] uppercase tracking-widest -mt-0.5">
                Coastal Carbon Systems
              </span>
            </div>
          </div>

          {/* Desktop Minimal Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.roles && !item.roles.includes(userRole)) return null;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`editorial-link text-xs font-medium tracking-tight py-1 transition-colors ${
                    isActive 
                      ? 'text-[#f5f6f2] font-semibold' 
                      : 'text-[#8d998b] hover:text-[#f5f6f2]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Role Persona Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-2 px-3 py-1.5 border border-white/[0.12] bg-[#0c120e] hover:border-white/25 text-xs text-[#c2c9bf] transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb978]" />
                <span className="hidden sm:inline font-mono text-[11px]">{roleLabels[userRole].title}</span>
                <span className="sm:hidden font-mono text-[11px]">{roleLabels[userRole].badge}</span>
                <ChevronDown className="w-3 h-3 text-[#8d998b]" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0c120e] border border-white/15 shadow-2xl py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-white/10 text-[9px] text-[#8d998b] font-mono uppercase tracking-widest">
                    Switch Perspective
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setUserRole(r);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sans transition-colors text-left cursor-pointer ${
                        userRole === r ? 'bg-white/[0.06] text-[#3fb978] font-semibold' : 'text-[#c2c9bf] hover:bg-white/[0.03] hover:text-white'
                      }`}
                    >
                      <span>{roleLabels[r].title}</span>
                      {userRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb978]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet Status / Connector */}
            {wallet.isConnected ? (
              <div className="flex items-center space-x-2 px-3 py-1.5 border border-white/[0.12] bg-[#0c120e] text-xs font-mono">
                <span className="text-[#3fb978] text-[11px]">
                  {wallet.balanceBCT.toLocaleString()} BCT
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[#8d998b] text-[11px] hidden sm:inline">
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#f5f6f2] hover:bg-white text-[#070a08] font-semibold text-xs transition-all cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-[#8d998b] hover:text-white hover:bg-white/[0.04] transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3fb978] rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0c120e] border border-white/15 shadow-2xl p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8d998b]">System Ledger Log</span>
                    <button onClick={() => setShowNotifications(false)} className="cursor-pointer">
                      <X className="w-4 h-4 text-[#8d998b] hover:text-white" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#8d998b] py-4 text-center">No new log entries</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 border text-xs transition-colors cursor-pointer ${
                            n.read ? 'border-white/[0.05] bg-transparent text-[#8d998b]' : 'border-[#3fb978]/30 bg-[#121c15] text-[#f5f6f2]'
                          }`}
                        >
                          <div className="font-semibold">{n.title}</div>
                          <div className="text-[11px] text-[#c2c9bf] mt-0.5">{n.message}</div>
                          <div className="text-[9px] text-[#8d998b] mt-1 font-mono">{n.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#8d998b] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#070a08] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            if (item.roles && !item.roles.includes(userRole)) return null;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-sans text-left ${
                  isActive ? 'bg-white/[0.06] text-[#3fb978] font-semibold' : 'text-[#c2c9bf] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
