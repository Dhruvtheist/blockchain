import type { Project, BlockchainTransaction } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'BC-2026-IND-001',
    name: 'Sundarbans Biosphere Mangrove Restoration Phase 2',
    ecosystem: 'Mangrove',
    description: 'High-density Avicennia marina mangrove plantation across 450 hectares of coastal mudflats, mitigating cyclone surges and sequestering atmospheric CO2 into saline soils.',
    state: 'West Bengal',
    district: 'South 24 Parganas',
    lat: 21.9497,
    lng: 88.8834,
    boundaryPolygon: [
      [21.9600, 88.8700],
      [21.9650, 88.8950],
      [21.9350, 88.9000],
      [21.9300, 88.8750]
    ],
    areaHectares: 450,
    estimatedCarbonTons: 2925,
    creditsIssued: 2925,
    creditsAvailable: 1100,
    pricePerCreditUSD: 24.50,
    ownerWallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    ownerName: 'Sundarbans Ecological Foundation (NGO)',
    status: 'Verified',
    ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    verificationRemarks: 'Satellite LiDAR & soil core samples verified by Ministry of Environment & Forests. Smart Contract minted 2,925 BCT tokens.',
    verifierSignature: '0x7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
    timestamp: '2026-03-15T10:30:00Z',
    txHash: '0x8f3c71a9e4d580129b6110a137e9d48b11c47209bc714f85e13d9021c1724a1b',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'LiDAR_Soil_Carbon_Density_Report.pdf', url: '#', hash: '0xa719f...411' },
      { name: 'State_Forest_Dept_NOC_Approval.pdf', url: '#', hash: '0xb231c...881' }
    ],
    mrvReports: [
      {
        reportId: 'MRV-001-A',
        projectId: 'BC-2026-IND-001',
        ndviIndex: 0.782,
        biomassMgPerHa: 142.5,
        estimatedCarbonTons: 2925,
        aiConfidenceScore: 96.4,
        timestamp: '2026-03-14T09:20:00Z',
        sensorCsvHash: '0x39a1b42c90e...881a',
        waterQuality: { ph: 7.8, salinityPpt: 22.4, dissolvedOxygenMgL: 6.8 }
      }
    ]
  },
  {
    id: 'BC-2026-IND-002',
    name: 'Gulf of Mannar Seagrass Ecosystem Recovery',
    ecosystem: 'Seagrass',
    description: 'Restoration of Cymodocea serrulata seagrass beds in coastal Palk Bay waters, creating Dugong habitats while storing sediment carbon.',
    state: 'Tamil Nadu',
    district: 'Ramanathapuram',
    lat: 9.2876,
    lng: 79.1500,
    boundaryPolygon: [
      [9.3000, 79.1400],
      [9.3050, 79.1650],
      [9.2700, 79.1600],
      [9.2750, 79.1350]
    ],
    areaHectares: 320,
    estimatedCarbonTons: 1344,
    creditsIssued: 1344,
    creditsAvailable: 850,
    pricePerCreditUSD: 21.00,
    ownerWallet: '0x3C44CdD47a356F43003636079856ab281e728E47',
    ownerName: 'Tamil Nadu Marine Biology Institute',
    status: 'Verified',
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    verificationRemarks: 'Hydro-acoustic sonar mapping confirmed dense seagrass cover. High carbon trapping efficiency.',
    verifierSignature: '0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    timestamp: '2026-03-20T14:15:00Z',
    txHash: '0x12a95c8f10b784260d39e4418f754a93821049bc82e11d4e7311029c782bc401',
    imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Sonar_Seagrass_Coverage_Map.pdf', url: '#', hash: '0x8432a...902' }
    ],
    mrvReports: [
      {
        reportId: 'MRV-002-A',
        projectId: 'BC-2026-IND-002',
        ndviIndex: 0.615,
        biomassMgPerHa: 91.2,
        estimatedCarbonTons: 1344,
        aiConfidenceScore: 93.1,
        timestamp: '2026-03-19T11:00:00Z',
        sensorCsvHash: '0x99a2c310...772b',
        waterQuality: { ph: 8.1, salinityPpt: 34.1, dissolvedOxygenMgL: 7.2 }
      }
    ]
  },
  {
    id: 'BC-2026-IND-003',
    name: 'Chilika Wetland Salt Marsh Protection Project',
    ecosystem: 'Salt Marsh',
    description: 'Protection and sustainable tidal flow management of brackish coastal salt marshes along Chilika Lagoon to preserve deep peat soil carbon pools.',
    state: 'Odisha',
    district: 'Puri',
    lat: 19.6800,
    lng: 85.3400,
    boundaryPolygon: [
      [19.6950, 85.3250],
      [19.7000, 85.3550],
      [19.6650, 85.3500],
      [19.6600, 85.3300]
    ],
    areaHectares: 510,
    estimatedCarbonTons: 2601,
    creditsIssued: 0,
    creditsAvailable: 0,
    pricePerCreditUSD: 19.50,
    ownerWallet: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    ownerName: 'Odisha Coastal Zone Wetland Authority',
    status: 'MRV_Submitted',
    ipfsHash: 'QmW2WqiRUz13qMBCFdhL9i32Nd15xij5Sr3sD1231f456',
    verificationRemarks: 'MRV evidence submitted. Awaiting government verifier digital signature.',
    timestamp: '2026-03-28T09:00:00Z',
    txHash: '0x44910bc728a19245f7810a901f42d87e1c849102874bc19284102947192bc7e',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Boundary_Coordinates_Survey.pdf', url: '#', hash: '0x1290f...991' },
      { name: 'Drone_Multispectral_NDVI_Output.csv', url: '#', hash: '0x7731a...009' }
    ],
    mrvReports: [
      {
        reportId: 'MRV-003-A',
        projectId: 'BC-2026-IND-003',
        ndviIndex: 0.710,
        biomassMgPerHa: 110.8,
        estimatedCarbonTons: 2601,
        aiConfidenceScore: 94.8,
        timestamp: '2026-03-28T10:15:00Z',
        sensorCsvHash: '0x44819a...102a',
        waterQuality: { ph: 7.6, salinityPpt: 18.5, dissolvedOxygenMgL: 6.4 }
      }
    ]
  },
  {
    id: 'BC-2026-IND-004',
    name: 'Pichavaram Mangrove Canopy Expansion',
    ecosystem: 'Mangrove',
    description: 'Reforestation of Rhizophora mucronata mangrove trees along tidal canals in Cuddalore district.',
    state: 'Tamil Nadu',
    district: 'Cuddalore',
    lat: 11.4286,
    lng: 79.7915,
    boundaryPolygon: [
      [11.4380, 79.7820],
      [11.4420, 79.8000],
      [11.4180, 79.7980],
      [11.4200, 79.7800]
    ],
    areaHectares: 280,
    estimatedCarbonTons: 1820,
    creditsIssued: 1820,
    creditsAvailable: 420,
    pricePerCreditUSD: 23.00,
    ownerWallet: '0x15d34AA5426792171463e7639454825700778B2c',
    ownerName: 'Pichavaram Community Eco Trust',
    status: 'Verified',
    ipfsHash: 'QmR79021j102kSMDkf18294kSM10294kSM10294kSM102',
    verificationRemarks: 'Verified by Tamil Nadu Forest Department.',
    verifierSignature: '0x3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e',
    timestamp: '2026-02-10T11:20:00Z',
    txHash: '0x99201bc839410a8274bc91028471b827491028471b827491028471b827491028',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Forest_Dept_Audit.pdf', url: '#', hash: '0x9920...112' }
    ]
  },
  {
    id: 'BC-2026-IND-005',
    name: 'Kutch Coastal Saline Wetland Conservation',
    ecosystem: 'Salt Marsh',
    description: 'Protection of hypersaline coastal mudflats and salt marshes along Gulf of Kutch to arrest soil erosion and preserve ancient blue carbon deposits.',
    state: 'Gujarat',
    district: 'Kutch',
    lat: 23.0000,
    lng: 70.0000,
    boundaryPolygon: [
      [23.0150, 69.9850],
      [23.0200, 70.0150],
      [22.9850, 70.0100],
      [22.9800, 69.9800]
    ],
    areaHectares: 600,
    estimatedCarbonTons: 3060,
    creditsIssued: 0,
    creditsAvailable: 0,
    pricePerCreditUSD: 18.00,
    ownerWallet: '0xB02A3da7318a4d707297e682eC6603aD85348873',
    ownerName: 'Gujarat Ecological Education & Research (GEER)',
    status: 'Rejected',
    ipfsHash: 'QmRejected10294857192847102938471029384710293',
    verificationRemarks: 'Rejected: Satellite imagery revealed overlap with commercial industrial salt pan conversion application.',
    timestamp: '2026-03-01T16:45:00Z',
    txHash: '0x77201bc94102847192bc749102847192847102947192bc7e49102847192bc7e',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Kutch_Industrial_Overlap_Report.pdf', url: '#', hash: '0xef001...223' }
    ]
  }
];

export const INITIAL_TRANSACTIONS: BlockchainTransaction[] = [
  {
    hash: '0x8f3c71a9e4d580129b6110a137e9d48b11c47209bc714f85e13d9021c1724a1b',
    blockNumber: 19482012,
    projectId: 'BC-2026-IND-001',
    projectName: 'Sundarbans Biosphere Mangrove Restoration Phase 2',
    sender: '0x0000000000000000000000000000000000000000',
    recipient: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    amount: 2925,
    txType: 'VERIFY_MINT',
    timestamp: '2026-03-15T10:30:00Z',
    gasUsed: '0.0034 ETH'
  },
  {
    hash: '0x44910bc728a19245f7810a901f42d87e1c849102874bc19284102947192bc7e',
    blockNumber: 19484192,
    projectId: 'BC-2026-IND-003',
    projectName: 'Chilika Wetland Salt Marsh Protection Project',
    sender: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    recipient: '0xBlueChainRegistryContractAddress000000001',
    amount: 0,
    txType: 'REGISTER',
    timestamp: '2026-03-28T09:00:00Z',
    gasUsed: '0.0012 ETH'
  },
  {
    hash: '0x12a95c8f10b784260d39e4418f754a93821049bc82e11d4e7311029c782bc401',
    blockNumber: 19481900,
    projectId: 'BC-2026-IND-002',
    projectName: 'Gulf of Mannar Seagrass Ecosystem Recovery',
    sender: '0x3C44CdD47a356F43003636079856ab281e728E47',
    recipient: '0x9821AAb418294719284710294871029487102948',
    amount: 494,
    txType: 'PURCHASE',
    timestamp: '2026-03-29T14:10:00Z',
    gasUsed: '0.0028 ETH'
  }
];
