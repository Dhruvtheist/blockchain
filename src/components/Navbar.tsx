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
  Menu, 
  Sun, 
  Moon,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    currentUser,
    logout,
    wallet, 
    connectWallet, 
    notifications, 
    markNotificationRead,
    activeView,
    setActiveView,
    theme,
    toggleTheme
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    <header className="sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--nav-border)] shadow-xs transition-colors duration-200">
      
      {/* Precision Institutional Top Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[var(--topbar-bg)] border-b border-[var(--topbar-border)] text-[11px] text-[var(--text-secondary)] font-mono transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="font-semibold text-[10px] text-[var(--color-primary)] uppercase tracking-wider bg-[var(--surface-card)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">Protocol v2.4</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-primary)] font-medium">Indian Coastal Carbon Infrastructure</span>
          </span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--text-secondary)]">Aligned with Oxford Principles & ICVCM Core Standards</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[var(--text-secondary)]">Decentralized Satellite Telemetry</span>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[var(--color-primary)] font-medium">Polygon EVM Active</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Wordmark */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center space-x-3 cursor-pointer group select-none py-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#087EA4] to-[#16825D] flex items-center justify-center text-white shadow-xs">
              <Waves className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight font-display">
                  BlueChain
                </span>
                <span className="text-[10px] font-mono font-bold text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
                  Registry
                </span>
              </div>
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider -mt-0.5">
                Coastal Carbon Systems
              </span>
            </div>
          </div>

          {/* Desktop Clean Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.roles && !item.roles.includes(userRole)) return null;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-tight transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold shadow-xs' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-panel)]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center space-x-2">

            {/* Global Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              className="h-9 w-9 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--border-hover)] transition-all cursor-pointer shadow-xs flex items-center justify-center"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#087EA4] hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* User Session / Role Dropdown or Auth Actions */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-9 flex items-center space-x-2 px-3 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] hover:border-[var(--border-hover)] text-xs text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                  <span className="hidden sm:inline font-mono text-[11px] font-medium truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="sm:hidden font-mono text-[11px] font-medium">
                    {roleLabels[userRole].badge}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-xl shadow-xl py-1.5 z-50 animate-fadeIn text-[var(--text-primary)]">
                    
                    {/* User Identity Header */}
                    <div className="px-3.5 py-2.5 border-b border-[var(--border-subtle)] space-y-1">
                      <div className="text-xs font-bold font-sans truncate">{currentUser.name}</div>
                      <div className="text-[11px] font-mono text-[var(--text-secondary)] truncate">{currentUser.email}</div>
                      <div className="inline-block mt-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--border-color)]">
                        {roleLabels[userRole].title}
                      </div>
                    </div>

                    <div className="px-3.5 pt-2 pb-1 text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest font-semibold">
                      Switch Role Persona
                    </div>

                    <div className="px-1 space-y-0.5">
                      {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                        const RoleIcon = roleLabels[r].icon;
                        const isSelected = userRole === r;
                        return (
                          <button
                            key={r}
                            onClick={() => {
                              setUserRole(r);
                              setShowUserMenu(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                              isSelected 
                                ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold' 
                                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <RoleIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}`} />
                              <span>{roleLabels[r].title}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Logout Action */}
                    <div className="p-1.5 border-t border-[var(--border-subtle)] mt-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActiveView('login')}
                  className="h-9 px-3 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] hover:bg-[var(--surface-panel)] hover:border-[var(--color-primary)]/40 text-xs font-semibold text-[var(--text-primary)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => setActiveView('register-auth')}
                  className="h-9 px-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Register</span>
                </button>
              </div>
            )}

            {/* Wallet Status / Connector */}
            {wallet.isConnected ? (
              <div className="h-9 flex items-center space-x-2 px-3 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] text-xs font-mono shadow-xs tabular-nums">
                <span className="text-[var(--color-primary)] font-bold text-[11px]">
                  {wallet.balanceBCT.toLocaleString()} BCT
                </span>
                <span className="text-[var(--border-color)]">|</span>
                <span className="text-[var(--text-secondary)] text-[11px] hidden sm:inline font-medium">
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="h-9 flex items-center space-x-2 px-3.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] font-semibold text-xs transition-all cursor-pointer shadow-xs"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="h-9 w-9 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--border-hover)] transition-colors relative cursor-pointer shadow-xs flex items-center justify-center"
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-success)] rounded-full ring-2 ring-[var(--surface-card)]" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-xl shadow-2xl p-4 z-50 animate-fadeIn text-[var(--text-primary)]">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-bold">System Ledger Log</span>
                    <button onClick={() => setShowNotifications(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[var(--text-muted)] py-4 text-center">No new log entries</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            n.read 
                              ? 'border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)]' 
                              : 'border-[var(--color-primary)]/30 bg-[var(--color-primary-soft)] text-[var(--text-primary)]'
                          }`}
                        >
                          <div className="font-semibold">{n.title}</div>
                          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{n.message}</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">{n.timestamp}</div>
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
              className="xl:hidden h-9 w-9 rounded-lg border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[var(--border-color)] bg-[var(--surface-card)] px-4 py-3 space-y-2 shadow-lg text-[var(--text-primary)]">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase">Theme Preference</span>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs font-mono"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#087EA4]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* User Status / Auth in Mobile Drawer */}
          {currentUser ? (
            <div className="p-2.5 rounded-lg bg-[var(--surface-panel)] border border-[var(--border-color)] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold">{currentUser.name}</div>
                <div className="text-[10px] font-mono text-[var(--color-primary)]">{roleLabels[userRole].title}</div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="px-2.5 py-1 text-xs font-medium rounded text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-1">
              <button
                onClick={() => {
                  setActiveView('login');
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-center text-xs font-semibold rounded-lg border border-[var(--border-color)] bg-[var(--surface-panel)] text-[var(--text-primary)]"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setActiveView('register-auth');
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-center text-xs font-semibold rounded-lg bg-[var(--color-primary)] text-[var(--button-primary-text)]"
              >
                Register
              </button>
            </div>
          )}

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
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                  isActive 
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-panel)] hover:text-[var(--text-primary)]'
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
