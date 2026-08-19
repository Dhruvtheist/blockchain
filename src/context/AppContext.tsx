import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Project, 
  UserRole, 
  BlockchainTransaction, 
  WalletState, 
  SystemNotification, 
  CarbonCertificate, 
  MRVReport,
  AuthUser,
  LoginCredentials,
  RegisterFormData
} from '../types';
import { INITIAL_PROJECTS, INITIAL_TRANSACTIONS } from '../data/initialData';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type ThemeMode = 'dark' | 'light';

export const DEFAULT_DEMO_USERS: (AuthUser & { passwordHash: string })[] = [
  {
    id: 'usr-gov-01',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@bluechain.gov.in',
    phone: '+91 98100 12345',
    role: 'GOV_ADMIN',
    organization: 'Ministry of Environment & Forests (MoEFCC)',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    createdAt: '2026-01-15T00:00:00Z',
    passwordHash: 'admin123'
  },
  {
    id: 'usr-orig-02',
    name: 'Priya Sundaram',
    email: 'originator@sundarbans.org',
    phone: '+91 98450 67890',
    role: 'PROJECT_OWNER',
    organization: 'Sundarbans Coastal Eco Community Trust',
    walletAddress: '0x3C44CdD47a356F43003636079856ab281e728E47',
    createdAt: '2026-02-01T00:00:00Z',
    passwordHash: 'originator123'
  },
  {
    id: 'usr-ver-03',
    name: 'Vikramaditya Das',
    email: 'verifier@carbonaudit.org',
    phone: '+91 98230 54321',
    role: 'VERIFIER',
    organization: 'Global Oceanic Carbon Verification Council',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    createdAt: '2026-02-10T00:00:00Z',
    passwordHash: 'verifier123'
  },
  {
    id: 'usr-pub-04',
    name: 'Ananya Roy',
    email: 'observer@public.org',
    phone: '+91 98765 43210',
    role: 'PUBLIC',
    organization: 'Independent Climate Citizen Observer',
    walletAddress: '0x0000000000000000000000000000000000000000',
    createdAt: '2026-03-01T00:00:00Z',
    passwordHash: 'observer123'
  }
];

export const getRoleDefaultView = (role: UserRole): string => {
  switch (role) {
    case 'GOV_ADMIN':
      return 'verify';
    case 'PROJECT_OWNER':
      return 'register';
    case 'VERIFIER':
      return 'verify';
    case 'PUBLIC':
    default:
      return 'public-audit';
  }
};

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (formData: RegisterFormData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  projects: Project[];
  transactions: BlockchainTransaction[];
  notifications: SystemNotification[];
  certificates: CarbonCertificate[];
  registerProject: (projectData: Omit<Project, 'id' | 'status' | 'creditsIssued' | 'creditsAvailable' | 'timestamp' | 'txHash' | 'ipfsHash'>) => Promise<string>;
  submitMRVReport: (projectId: string, report: Omit<MRVReport, 'reportId' | 'projectId' | 'timestamp'>) => Promise<string>;
  verifyProject: (projectId: string, creditsToMint: number, remarks: string) => Promise<void>;
  rejectProject: (projectId: string, reason: string) => Promise<void>;
  buyCredits: (projectId: string, creditAmount: number) => Promise<CarbonCertificate>;
  markNotificationRead: (id: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  navigateToView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  contractAddress: string;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('bluechain-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('bluechain_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default seed active session for convenience, or null
    return DEFAULT_DEMO_USERS[0];
  });

  const [registeredUsers, setRegisteredUsers] = useState<(AuthUser & { passwordHash: string })[]>(() => {
    const saved = localStorage.getItem('bluechain_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_DEMO_USERS;
      }
    }
    return DEFAULT_DEMO_USERS;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    return currentUser?.role || 'GOV_ADMIN';
  });

  const [activeView, setActiveView] = useState<string>('landing');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  
  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('bluechain_wallet');
    return saved ? JSON.parse(saved) : {
      isConnected: true,
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      balanceETH: 14.85,
      balanceBCT: 2925,
      network: 'Ethereum Sepolia Testnet (Chain ID 11155111)'
    };
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('bluechain_projects');
    if (!saved) return INITIAL_PROJECTS;
    try {
      const parsed: Project[] = JSON.parse(saved);
      return parsed.map(p => {
        const init = INITIAL_PROJECTS.find(ip => ip.id === p.id);
        return init ? { ...p, imageUrl: init.imageUrl } : p;
      });
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [transactions, setTransactions] = useState<BlockchainTransaction[]>(() => {
    const saved = localStorage.getItem('bluechain_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 'n-1',
      title: 'Project Verification Needed',
      message: 'Chilika Wetland Salt Marsh Protection Project is waiting for Government Administrator audit.',
      type: 'warning',
      timestamp: '10 minutes ago',
      read: false
    },
    {
      id: 'n-2',
      title: 'Credits Minted On-Chain',
      message: '2,925 BCT tokens successfully minted for Sundarbans Mangrove Phase 2.',
      type: 'success',
      timestamp: '2 hours ago',
      read: false
    }
  ]);

  const [certificates, setCertificates] = useState<CarbonCertificate[]>(() => {
    const saved = localStorage.getItem('bluechain_certificates');
    return saved ? JSON.parse(saved) : [];
  });

  const contractAddress = '0x8A753747A1Fa494EC906ce90e9f37563A8AF630e';

  // Apply theme class and data-theme to document element and persist to localStorage
  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bluechain-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('bluechain_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bluechain_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bluechain_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('bluechain_wallet', JSON.stringify(wallet));
  }, [wallet]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWallet(prev => ({
            ...prev,
            isConnected: true,
            address: accounts[0]
          }));
          return;
        }
      } catch (err) {
        console.warn('MetaMask connection failed, fallback to simulator', err);
      }
    }
    setWallet(prev => ({
      ...prev,
      isConnected: true,
      address: '0x3C44CdD47a356F43003636079856ab281e728E47'
    }));
  };

  const disconnectWallet = () => {
    setWallet(prev => ({
      ...prev,
      isConnected: false
    }));
  };

  const addNotification = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error') => {
    const newNotif: SystemNotification = {
      id: `n-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const registerProject = async (projectData: Omit<Project, 'id' | 'status' | 'creditsIssued' | 'creditsAvailable' | 'timestamp' | 'txHash' | 'ipfsHash'>): Promise<string> => {
    const newId = `BC-2026-IND-00${projects.length + 1}`;
    const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const ipfsHash = `Qm${Array.from({ length: 44 }, () => Math.floor(Math.random() * 36).toString(36)).join('')}`;

    const newProject: Project = {
      ...projectData,
      id: newId,
      status: 'Pending',
      creditsIssued: 0,
      creditsAvailable: 0,
      timestamp: new Date().toISOString(),
      txHash,
      ipfsHash
    };

    const newTx: BlockchainTransaction = {
      hash: txHash,
      blockNumber: 19485000 + transactions.length,
      projectId: newId,
      projectName: newProject.name,
      sender: wallet.address,
      recipient: contractAddress,
      amount: 0,
      txType: 'REGISTER',
      timestamp: new Date().toISOString(),
      gasUsed: '0.0018 ETH'
    };

    setProjects(prev => [newProject, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    addNotification('Project Registered', `Project "${newProject.name}" submitted with hash ${ipfsHash.substring(0, 10)}...`, 'info');
    return newId;
  };

  const submitMRVReport = async (projectId: string, report: Omit<MRVReport, 'reportId' | 'projectId' | 'timestamp'>): Promise<string> => {
    const reportId = `MRV-${Date.now().toString().slice(-4)}`;
    const mrvTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    const newReport: MRVReport = {
      ...report,
      reportId,
      projectId,
      timestamp: new Date().toISOString()
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const existingReports = p.mrvReports || [];
        return {
          ...p,
          status: 'MRV_Submitted',
          estimatedCarbonTons: report.estimatedCarbonTons,
          mrvReports: [newReport, ...existingReports]
        };
      }
      return p;
    }));

    const targetProject = projects.find(p => p.id === projectId);
    const newTx: BlockchainTransaction = {
      hash: mrvTxHash,
      blockNumber: 19485050 + transactions.length,
      projectId,
      projectName: targetProject?.name || projectId,
      sender: wallet.address,
      recipient: contractAddress,
      amount: report.estimatedCarbonTons,
      txType: 'MRV_SUBMIT',
      timestamp: new Date().toISOString(),
      gasUsed: '0.0024 ETH'
    };

    setTransactions(prev => [newTx, ...prev]);
    addNotification('MRV Evidence Submitted', `AI estimated ${report.estimatedCarbonTons.toLocaleString()} tCO₂e with ${report.aiConfidenceScore}% confidence.`, 'info');
    return reportId;
  };

  const verifyProject = async (projectId: string, creditsToMint: number, remarks: string) => {
    const mintTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const sig = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'Verified',
          creditsIssued: creditsToMint,
          creditsAvailable: creditsToMint,
          verificationRemarks: remarks,
          verifierSignature: sig,
          txHash: mintTxHash
        };
      }
      return p;
    }));

    const targetProject = projects.find(p => p.id === projectId);
    const newTx: BlockchainTransaction = {
      hash: mintTxHash,
      blockNumber: 19485100 + transactions.length,
      projectId,
      projectName: targetProject?.name || projectId,
      sender: '0x0000000000000000000000000000000000000000',
      recipient: targetProject?.ownerWallet || wallet.address,
      amount: creditsToMint,
      txType: 'VERIFY_MINT',
      timestamp: new Date().toISOString(),
      gasUsed: '0.0042 ETH'
    };

    setTransactions(prev => [newTx, ...prev]);
    addNotification('Project Verified & Tokens Minted', `Approved ${projectId}. Minted ${creditsToMint.toLocaleString()} BCT Carbon Credit Tokens on-chain. Signature attached.`, 'success');
  };

  const rejectProject = async (projectId: string, reason: string) => {
    const rejectTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'Rejected',
          verificationRemarks: reason,
          txHash: rejectTxHash
        };
      }
      return p;
    }));

    const targetProject = projects.find(p => p.id === projectId);
    const newTx: BlockchainTransaction = {
      hash: rejectTxHash,
      blockNumber: 19485150 + transactions.length,
      projectId,
      projectName: targetProject?.name || projectId,
      sender: wallet.address,
      recipient: contractAddress,
      amount: 0,
      txType: 'REJECT',
      timestamp: new Date().toISOString(),
      gasUsed: '0.0011 ETH'
    };

    setTransactions(prev => [newTx, ...prev]);
    addNotification('Project Rejected', `Project ${projectId} was marked rejected: ${reason}`, 'error');
  };

  const buyCredits = async (projectId: string, creditAmount: number): Promise<CarbonCertificate> => {
    const purchaseTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    let updatedProj: Project | undefined;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        updatedProj = {
          ...p,
          creditsAvailable: Math.max(0, p.creditsAvailable - creditAmount)
        };
        return updatedProj;
      }
      return p;
    }));

    const proj = updatedProj || projects.find(p => p.id === projectId);

    setWallet(prev => ({
      ...prev,
      balanceBCT: prev.balanceBCT + creditAmount,
      balanceETH: Math.max(0, prev.balanceETH - (creditAmount * 0.008))
    }));

    const newTx: BlockchainTransaction = {
      hash: purchaseTxHash,
      blockNumber: 19485200 + transactions.length,
      projectId,
      projectName: proj?.name || projectId,
      sender: proj?.ownerWallet || '0xOwnerAddress',
      recipient: wallet.address,
      amount: creditAmount,
      txType: 'PURCHASE',
      timestamp: new Date().toISOString(),
      gasUsed: '0.0031 ETH'
    };

    setTransactions(prev => [newTx, ...prev]);

    const certificate: CarbonCertificate = {
      certificateId: `CERT-BLUE-${Math.floor(100000 + Math.random() * 900000)}`,
      projectName: proj?.name || 'Blue Carbon Restoration',
      buyerName: wallet.address === '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' ? 'Global Eco Corp (Buyer)' : 'Eco Carbon Investor',
      buyerWallet: wallet.address,
      creditsCount: creditAmount,
      co2SequesteredTons: creditAmount,
      txHash: purchaseTxHash,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      ecosystem: proj?.ecosystem || 'Mangrove',
      state: proj?.state || 'India'
    };

    setCertificates(prev => [certificate, ...prev]);
    addNotification('Carbon Credit Purchase Completed', `Purchased ${creditAmount} Blue Carbon Offsets (BCT) for project ${projectId}. Certificate issued.`, 'success');

    return certificate;
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const idClean = credentials.identifier.trim().toLowerCase();
    const passClean = credentials.password.trim();

    if (!idClean) {
      return { success: false, error: 'Please enter your email or username.' };
    }
    if (!passClean) {
      return { success: false, error: 'Please enter your password.' };
    }

    const found = registeredUsers.find(
      u => u.email.toLowerCase() === idClean || u.name.toLowerCase() === idClean || u.id.toLowerCase() === idClean
    );

    if (!found) {
      return { success: false, error: 'No registered account found matching this credential.' };
    }

    if (found.passwordHash !== passClean) {
      return { success: false, error: 'Incorrect password. Please verify your credentials.' };
    }

    const { passwordHash, ...userClean } = found;
    setCurrentUser(userClean);
    setUserRole(userClean.role);
    localStorage.setItem('bluechain_auth_user', JSON.stringify(userClean));

    addNotification(
      'Authentication Successful',
      `Welcome back, ${userClean.name}! Signed in as ${userClean.role}.`,
      'success'
    );

    const defaultView = getRoleDefaultView(userClean.role);
    setActiveView(defaultView);
    return { success: true };
  };

  const register = async (formData: RegisterFormData): Promise<{ success: boolean; error?: string }> => {
    const emailClean = formData.email.trim().toLowerCase();
    const nameClean = formData.name.trim();

    if (!nameClean) return { success: false, error: 'Full name is required.' };
    if (!emailClean) return { success: false, error: 'Email address is required.' };
    if (!formData.password) return { success: false, error: 'Password is required.' };
    if (formData.password.length < 6) return { success: false, error: 'Password must be at least 6 characters long.' };
    if (formData.password !== formData.confirmPassword) return { success: false, error: 'Passwords do not match.' };
    if (!formData.role) return { success: false, error: 'Please select an account role.' };

    const existing = registeredUsers.find(u => u.email.toLowerCase() === emailClean);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newUser: AuthUser & { passwordHash: string } = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: nameClean,
      email: emailClean,
      phone: formData.phone?.trim() || '',
      role: formData.role,
      organization: formData.organization?.trim() || `${formData.role} Entity`,
      walletAddress: wallet.address,
      createdAt: new Date().toISOString(),
      passwordHash: formData.password
    };

    const updatedList = [newUser, ...registeredUsers];
    setRegisteredUsers(updatedList);
    localStorage.setItem('bluechain_registered_users', JSON.stringify(updatedList));

    const { passwordHash, ...userClean } = newUser;
    setCurrentUser(userClean);
    setUserRole(userClean.role);
    localStorage.setItem('bluechain_auth_user', JSON.stringify(userClean));

    addNotification(
      'Registration Complete',
      `Account created for ${userClean.name} with ${userClean.role} credentials.`,
      'success'
    );

    const defaultView = getRoleDefaultView(userClean.role);
    setActiveView(defaultView);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('PUBLIC');
    localStorage.removeItem('bluechain_auth_user');
    setActiveView('login');
    addNotification('Session Terminated', 'You have been securely logged out.', 'info');
  };

  const protectedViewsConfig: Record<string, UserRole[]> = {
    'admin': ['GOV_ADMIN'],
    'verify': ['GOV_ADMIN', 'VERIFIER'],
    'register': ['PROJECT_OWNER', 'GOV_ADMIN'],
    'mrv': ['PROJECT_OWNER', 'VERIFIER', 'GOV_ADMIN'],
  };

  const navigateToView = (targetView: string) => {
    const requiredRoles = protectedViewsConfig[targetView];

    if (requiredRoles) {
      if (!currentUser) {
        addNotification('Authentication Required', 'Please sign in to access this protected portal.', 'warning');
        setActiveView('login');
        return;
      }
      if (!requiredRoles.includes(userRole)) {
        addNotification('Restricted Access', `Your role (${userRole}) is not authorized to access the ${targetView} module.`, 'error');
        return;
      }
    }
    setActiveView(targetView);
  };

  return (
    <AppContext.Provider value={{
      userRole,
      setUserRole,
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      register,
      logout,
      wallet,
      connectWallet,
      disconnectWallet,
      projects,
      transactions,
      notifications,
      certificates,
      registerProject,
      submitMRVReport,
      verifyProject,
      rejectProject,
      buyCredits,
      markNotificationRead,
      activeView,
      setActiveView,
      navigateToView,
      searchQuery,
      setSearchQuery,
      contractAddress,
      demoStep,
      setDemoStep,
      isDemoActive,
      setIsDemoActive,
      theme,
      toggleTheme,
      setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
