import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';
import { 
  UserPlus, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Waves, 
  UserCheck, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterAuthPage: React.FC = () => {
  const { register, setActiveView } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('PROJECT_OWNER');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const rolesList: {
    role: UserRole;
    title: string;
    description: string;
    badge: string;
    icon: any;
  }[] = [
    {
      role: 'GOV_ADMIN',
      title: 'Regulator Portal',
      description: 'Government and regulatory authority responsible for institutional oversight, compliance auditing, and on-chain token minting approvals.',
      badge: 'Authority',
      icon: ShieldCheck
    },
    {
      role: 'PROJECT_OWNER',
      title: 'Project Originator',
      description: 'Registers coastal restoration project zones, defines georeferenced polygon boundaries, and uploads Sentinel-2 multispectral evidence.',
      badge: 'Developer / NGO',
      icon: Waves
    },
    {
      role: 'VERIFIER',
      title: 'Accredited Verifier',
      description: 'Independent auditor reviewing MRV spectral telemetry, soil organic carbon depths, and applying digital ECDSA verification signatures.',
      badge: 'Auditor',
      icon: UserCheck
    },
    {
      role: 'PUBLIC',
      title: 'Public Observer',
      description: 'Read-only citizen and corporate stakeholder access to publicly available project indices, geospatial radar maps, and immutable transaction ledgers.',
      badge: 'Observer',
      icon: Compass
    }
  ];

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setErrorMsg('Please provide your full legal or professional name.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid work email address.');
      return false;
    }
    if (!password) {
      setErrorMsg('Please enter a secure password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Password and confirmation password do not match.');
      return false;
    }
    if (!role) {
      setErrorMsg('Please select an account role persona.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        organization: organization.trim(),
        password,
        confirmPassword,
        role
      });

      if (!result.success && result.error) {
        setErrorMsg(result.error);
      } else {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } catch {
      setErrorMsg('Registration failed due to a system error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 text-[var(--text-primary)]">
      
      {/* Header Breadcrumb & Title */}
      <div className="border-b border-[var(--border-color)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] border border-[var(--color-primary)]/20 text-[11px] font-mono text-[var(--color-primary)]">
            <UserPlus className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-bold uppercase tracking-wider">Account Enrollment</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-secondary)]">Multi-Role Credential Registration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-display">
            Create BlueChain Account
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Register your institutional identity, select your operational governance role, and access verified blue carbon infrastructure.
          </p>
        </div>

        {/* Existing Account Link Pill */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[var(--text-secondary)]">Already registered?</span>
          <button
            onClick={() => setActiveView('login')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[var(--color-primary-soft)] hover:bg-[var(--color-primary)] hover:text-[var(--button-primary-text)] text-[var(--color-primary)] border border-[var(--color-primary)]/30 transition cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Registration Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Role Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="editorial-card p-5 sm:p-6 space-y-4 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block">
                1. Select Account Role
              </span>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Choose the persona matching your institutional operations:
              </p>
            </div>

            <div className="space-y-3">
              {rolesList.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.role;

                return (
                  <div
                    key={r.role}
                    onClick={() => {
                      setRole(r.role);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 select-none ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--text-primary)] shadow-xs ring-1 ring-[var(--color-primary)]/40'
                        : 'border-[var(--border-color)] bg-[var(--surface-panel)] text-[var(--text-secondary)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--surface-card)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--color-primary)]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold font-sans text-[var(--text-primary)]">{r.title}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-color)] text-[var(--text-muted)]">
                          {r.badge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />}
                      </div>
                    </div>

                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-9.5">
                      {r.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Identity & Security Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="editorial-card p-6 sm:p-8 space-y-6 bg-[var(--surface-card)] border border-[var(--border-color)] rounded-2xl shadow-xs">
            
            <div className="border-b border-[var(--border-color)] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] block">
                2. User Information & Credentials
              </span>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                All accounts are cryptographically registered into the local workspace ledger.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="e.g., Dr. Rajesh Sharma"
                    className="editorial-input w-full pl-10 pr-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="e.g., user@bluechain.gov.in"
                      className="editorial-input w-full pl-10 pr-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98100 12345"
                      className="editorial-input w-full pl-10 pr-3.5 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>

              {/* Organization (Optional) */}
              <div>
                <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                  Organization / Entity (Optional)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g., Sundarbans Coastal Restoration Trust"
                    className="editorial-input w-full pl-10 pr-3.5 py-2.5 text-xs border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                    Password
                  </label>
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
                      placeholder="Min 6 characters"
                      className="editorial-input w-full pl-10 pr-10 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold uppercase text-[var(--text-secondary)] block mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      placeholder="Re-enter password"
                      className="editorial-input w-full pl-10 pr-10 py-2.5 text-xs font-mono border border-[var(--border-color)] rounded-lg bg-[var(--surface-card)] text-[var(--text-primary)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--button-primary-text)] text-xs font-semibold transition cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Registering Account...' : 'Create Account & Access Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-center pt-1">
                  <span className="text-xs text-[var(--text-secondary)]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveView('login')}
                      className="text-[var(--color-primary)] font-bold hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
