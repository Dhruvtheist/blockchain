import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Waves, 
  Compass, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import type { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, setActiveView } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  const demoAccounts: { role: UserRole; title: string; email: string; pass: string; icon: any }[] = [
    {
      role: 'GOV_ADMIN',
      title: 'Regulator Portal',
      email: 'admin@bluechain.gov.in',
      pass: 'admin123',
      icon: ShieldCheck
    },
    {
      role: 'PROJECT_OWNER',
      title: 'Project Originator',
      email: 'originator@sundarbans.org',
      pass: 'originator123',
      icon: Waves
    },
    {
      role: 'VERIFIER',
      title: 'Accredited Verifier',
      email: 'verifier@carbonaudit.org',
      pass: 'verifier123',
      icon: UserCheck
    },
    {
      role: 'PUBLIC',
      title: 'Public Observer',
      email: 'observer@public.org',
      pass: 'observer123',
      icon: Compass
    }
  ];

  const handleDemoFill = (email: string, pass: string) => {
    setIdentifier(email);
    setPassword(pass);
    setErrorMsg(null);
    setForgotMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setForgotMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email address or username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login({
        identifier: identifier.trim(),
        password,
        rememberMe
      });

      if (!result.success && result.error) {
        setErrorMsg(result.error);
      }
    } catch {
      setErrorMsg('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotMsg(
      'Demo Password Reset: Use the Quick-Fill Demo Roles below (e.g. admin123, originator123, verifier123, observer123) or register a new account.'
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header Breadcrumb & Title */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <Lock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Security & Authentication</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Institutional Access Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Sign In to BlueChain
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Access your role-based coastal carbon registry workspace, submit or audit Sentinel-2 MRV dossiers, and govern smart contract settlements.
          </p>
        </div>

        {/* Create Account Action Pill */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[var(--text-secondary)]">Don't have an account?</span>
          <button
            onClick={() => setActiveView('register-auth')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary)] hover:text-[var(--button-primary-text)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 transition cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Register Here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Form + Demo Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left Column: Login Card (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="editorial-card p-6 sm:p-8 space-y-6 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-sm">
            
            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block">
                Account Credentials
              </span>
              <p className="text-xs text-[var(--text-secondary)]">
                Enter your registered work email and authorization key.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Forgot Password Banner */}
            {forgotMsg && (
              <div className="p-3.5 rounded-xl bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs flex items-start gap-2.5 animate-fadeIn">
                <KeyRound className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{forgotMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email / Username Field */}
              <div>
                <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="e.g., admin@bluechain.gov.in"
                    className="editorial-input w-full pl-10 pr-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-[var(--color-primary)] hover:underline cursor-pointer font-mono"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="Enter your secure password"
                    className="editorial-input w-full pl-10 pr-10 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[var(--border-color)] accent-[var(--color-primary)]"
                  />
                  <span>Remember session on this browser</span>
                </label>
              </div>

              {/* Action Submit Button */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView('register-auth')}
                  className="w-full h-10 rounded-lg border border-[var(--border-color)] bg-[var(--surface-panel)] hover:bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold transition cursor-pointer"
                >
                  Create New Account
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* Right Column: Quick Demo Access Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="editorial-panel p-6 space-y-4 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[var(--color-primary)] block">
                Quick-Fill Demo Credentials
              </span>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Click any role to auto-populate credentials for evaluation:
              </p>
            </div>

            <div className="space-y-2.5">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                const isSelected = identifier === acc.email;

                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleDemoFill(acc.email, acc.pass)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] shadow-xs'
                        : 'border-[var(--border-color)] bg-[var(--surface-panel)] text-[var(--text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--color-primary)]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-sans text-[var(--text-primary)]">{acc.title}</div>
                        <div className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[170px]">{acc.email}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                      Fill
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Note info */}
            <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)]">
              <span>Security: Oxford Net-Zero & ICVCM Compliant Access Protocol</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
