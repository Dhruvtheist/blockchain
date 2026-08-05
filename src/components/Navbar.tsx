import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { 
  Shield, 
  Waves, 
  Compass, 
  FileCheck2, 
  ShoppingBag, 
  Blocks, 
  BarChart3, 
  Search, 
  Lock, 
  Wallet, 
  Bell, 
  UserCheck, 
  ChevronDown,
  CheckCircle2,
  X
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

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { title: string; color: string; icon: any }> = {
    GOV_ADMIN: { title: 'Gov Admin', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: Shield },
    PROJECT_OWNER: { title: 'Project Owner', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30', icon: Waves },
    VERIFIER: { title: 'Auditor / Verifier', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: UserCheck },
    PUBLIC: { title: 'Public Citizen', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30', icon: Compass }
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Interactive Map', icon: Compass },
    { id: 'register', label: 'Register Project', icon: Waves, roles: ['PROJECT_OWNER', 'GOV_ADMIN'] },
    { id: 'mrv', label: 'AI MRV Module', icon: Waves, roles: ['PROJECT_OWNER', 'VERIFIER', 'GOV_ADMIN'] },
    { id: 'verify', label: 'Verifier Portal', icon: FileCheck2, badge: 'Audit', roles: ['VERIFIER', 'GOV_ADMIN'] },
    { id: 'marketplace', label: 'Carbon Store', icon: ShoppingBag },
    { id: 'ledger', label: 'Blockchain Ledger', icon: Blocks },
    { id: 'audit-trail', label: 'Audit Provenance', icon: Search },
    { id: 'admin', label: 'Admin', icon: Lock, roles: ['GOV_ADMIN'] },
  ];

  const CurrentRoleIcon = roleLabels[userRole].icon;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-sky-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Waves className="w-6 h-6 text-sky-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                  BlueChain
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold tracking-wider uppercase">
                  v2.4 Web3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Blockchain Blue Carbon Registry</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.roles && !item.roles.includes(userRole)) return null;
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">

            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${roleLabels[userRole].color}`}
              >
                <CurrentRoleIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{roleLabels[userRole].title}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    Switch Active Role
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                    const RoleIcon = roleLabels[r].icon;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setUserRole(r);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                          userRole === r ? 'bg-sky-500/20 text-sky-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-4 h-4 text-slate-400" />
                          <span>{roleLabels[r].title}</span>
                        </div>
                        {userRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {wallet.isConnected ? (
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-panel bg-slate-900/90 border border-emerald-500/30 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-slate-200 hidden sm:inline">
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold ml-1">
                  {wallet.balanceBCT} BCT
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/25 hover:opacity-90 transition-opacity"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect MetaMask</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl glass-panel bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-200">System Notifications</span>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-3 text-center">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                            n.read ? 'bg-slate-800/40 border-slate-800 text-slate-400' : 'bg-sky-950/40 border-sky-500/30 text-slate-200'
                          }`}
                        >
                          <div className="font-semibold text-sky-300">{n.title}</div>
                          <div className="text-[11px] mt-0.5">{n.message}</div>
                          <div className="text-[9px] text-slate-500 mt-1">{n.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
      
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 space-x-2 border-t border-slate-800">
        {navItems.map((item) => {
          if (item.roles && !item.roles.includes(userRole)) return null;
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                isActive ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
