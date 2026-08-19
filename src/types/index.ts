export type UserRole = 'GOV_ADMIN' | 'PROJECT_OWNER' | 'VERIFIER' | 'PUBLIC';

export type EcosystemType = 'Mangrove' | 'Seagrass' | 'Salt Marsh';

export type ProjectStatus = 'Pending' | 'MRV_Submitted' | 'Verified' | 'Rejected';

export interface MRVReport {
  reportId: string;
  projectId: string;
  dronePhotoUrl?: string;
  satelliteImageUrl?: string;
  sensorCsvHash?: string;
  ndviIndex: number;
  biomassMgPerHa: number;
  estimatedCarbonTons: number;
  aiConfidenceScore: number;
  timestamp: string;
  verifierSignature?: string;
  waterQuality?: {
    ph: number;
    salinityPpt: number;
    dissolvedOxygenMgL: number;
  };
}

export interface Project {
  id: string;
  name: string;
  ecosystem: EcosystemType;
  description: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  boundaryPolygon?: [number, number][]; // Polygon coordinates
  areaHectares: number;
  estimatedCarbonTons: number;
  creditsIssued: number;
  creditsAvailable: number;
  pricePerCreditUSD: number; // e.g. $18 per ton
  ownerWallet: string;
  ownerName: string;
  status: ProjectStatus;
  ipfsHash: string;
  verificationRemarks?: string;
  verifierSignature?: string;
  timestamp: string;
  txHash: string;
  imageUrl: string;
  documents: { name: string; url: string; hash: string }[];
  mrvReports?: MRVReport[];
}

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  projectId: string;
  projectName: string;
  sender: string;
  recipient: string;
  amount: number;
  txType: 'REGISTER' | 'MRV_SUBMIT' | 'VERIFY_MINT' | 'REJECT' | 'PURCHASE' | 'RETIRE' | 'TRANSFER';
  timestamp: string;
  gasUsed: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  balanceETH: number;
  balanceBCT: number; // Blue Carbon Tokens owned
  network: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
}

export interface CarbonCertificate {
  certificateId: string;
  projectName: string;
  buyerName: string;
  buyerWallet: string;
  creditsCount: number;
  co2SequesteredTons: number;
  txHash: string;
  issueDate: string;
  ecosystem: EcosystemType;
  state: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  organization?: string;
  walletAddress?: string;
  createdAt: string;
}

export interface LoginCredentials {
  identifier: string; // Email or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  organization?: string;
}

