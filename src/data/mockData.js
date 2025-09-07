// Mock data for Blue Carbon MRV Dashboard

export const mockProjects = [
  {
    id: 'BC001',
    name: 'Sundarbans Mangrove Restoration',
    location: 'West Bengal, India',
    coordinates: [21.9497, 88.7879],
    status: 'verified',
    hectares: 150,
    creditsMinted: 2500,
    submittedDate: '2024-01-15',
    verifiedDate: '2024-02-01',
    organization: 'West Bengal Forest Department',
    description: 'Large-scale mangrove restoration project in the Sundarbans delta region.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC002',
    name: 'Kerala Coastal Wetland Conservation',
    location: 'Kerala, India',
    coordinates: [9.9312, 76.2673],
    status: 'pending',
    hectares: 75,
    creditsMinted: 0,
    submittedDate: '2024-02-10',
    verifiedDate: null,
    organization: 'Kerala State Biodiversity Board',
    description: 'Coastal wetland restoration and conservation project.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
    ]
  },
  {
    id: 'BC003',
    name: 'Gujarat Salt Marsh Restoration',
    location: 'Gujarat, India',
    coordinates: [23.0225, 72.5714],
    status: 'in-progress',
    hectares: 200,
    creditsMinted: 1200,
    submittedDate: '2024-01-20',
    verifiedDate: '2024-02-15',
    organization: 'Gujarat Ecology Commission',
    description: 'Salt marsh restoration project along the Gujarat coastline.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC004',
    name: 'Tamil Nadu Seagrass Conservation',
    location: 'Tamil Nadu, India',
    coordinates: [11.1271, 78.6569],
    status: 'verified',
    hectares: 90,
    creditsMinted: 1800,
    submittedDate: '2024-01-05',
    verifiedDate: '2024-01-25',
    organization: 'Tamil Nadu Forest Department',
    description: 'Seagrass bed conservation and restoration project.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC005',
    name: 'Odisha Mangrove Protection',
    location: 'Odisha, India',
    coordinates: [20.2920, 86.6908],
    status: 'pending',
    hectares: 120,
    creditsMinted: 0,
    submittedDate: '2024-02-20',
    verifiedDate: null,
    organization: 'Odisha Forest Department',
    description: 'Mangrove protection and restoration in Bhitarkanika region.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC006',
    name: 'Maharashtra Coastal Restoration',
    location: 'Maharashtra, India',
    coordinates: [19.7515, 75.7139],
    status: 'verified',
    hectares: 180,
    creditsMinted: 3200,
    submittedDate: '2024-01-10',
    verifiedDate: '2024-02-05',
    organization: 'Maharashtra Forest Department',
    description: 'Comprehensive coastal ecosystem restoration project.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC007',
    name: 'Andhra Pradesh Wetland Conservation',
    location: 'Andhra Pradesh, India',
    coordinates: [15.9129, 79.7400],
    status: 'in-progress',
    hectares: 95,
    creditsMinted: 950,
    submittedDate: '2024-01-25',
    verifiedDate: '2024-02-10',
    organization: 'Andhra Pradesh Forest Department',
    description: 'Wetland conservation and restoration initiative.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ]
  },
  {
    id: 'BC008',
    name: 'Karnataka Mangrove Research',
    location: 'Karnataka, India',
    coordinates: [12.9716, 77.5946],
    status: 'pending',
    hectares: 60,
    creditsMinted: 0,
    submittedDate: '2024-02-25',
    verifiedDate: null,
    organization: 'Karnataka Forest Department',
    description: 'Research-based mangrove restoration project.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
    ]
  }
];

export const mockUsers = {
  'field-worker': {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'field-worker',
    email: 'rajesh.kumar@example.com',
    organization: 'West Bengal Forest Department',
    projects: ['BC001', 'BC002']
  },
  'ngo': {
    id: '2',
    name: 'Dr. Priya Sharma',
    role: 'ngo',
    email: 'priya.sharma@example.com',
    organization: 'Green Earth Foundation',
    projects: ['BC001', 'BC002', 'BC003', 'BC004']
  },
  'nccr-admin': {
    id: '3',
    name: 'Amit Patel',
    role: 'nccr-admin',
    email: 'amit.patel@nccr.gov.in',
    organization: 'National Carbon Credit Registry',
    projects: []
  }
};

export const mockCredits = [
  {
    id: 'CC001',
    projectId: 'BC001',
    amount: 2500,
    mintedDate: '2024-02-01',
    status: 'active',
    price: 15.50,
    buyer: 'Carbon Solutions Ltd.'
  },
  {
    id: 'CC002',
    projectId: 'BC003',
    amount: 1200,
    mintedDate: '2024-02-15',
    status: 'active',
    price: 16.20,
    buyer: 'EcoTech Industries'
  },
  {
    id: 'CC003',
    projectId: 'BC004',
    amount: 1800,
    mintedDate: '2024-01-25',
    status: 'active',
    price: 15.80,
    buyer: 'Green Future Corp'
  }
];

export const mockSequestrationData = [
  { month: 'Jan 2024', carbon: 1200, projects: 5 },
  { month: 'Feb 2024', carbon: 1450, projects: 7 },
  { month: 'Mar 2024', carbon: 1680, projects: 8 },
  { month: 'Apr 2024', carbon: 1920, projects: 10 },
  { month: 'May 2024', carbon: 2100, projects: 12 },
  { month: 'Jun 2024', carbon: 2350, projects: 15 }
];

export const mockBlockchainTransactions = [
  {
    hash: '0x1234567890abcdef...',
    type: 'Project Submission',
    projectId: 'BC002',
    timestamp: '2024-02-10T10:30:00Z',
    status: 'confirmed',
    gasUsed: '21000'
  },
  {
    hash: '0xabcdef1234567890...',
    type: 'Credit Minting',
    projectId: 'BC001',
    amount: 2500,
    timestamp: '2024-02-01T14:20:00Z',
    status: 'confirmed',
    gasUsed: '45000'
  },
  {
    hash: '0x9876543210fedcba...',
    type: 'Verification',
    projectId: 'BC003',
    timestamp: '2024-02-15T09:15:00Z',
    status: 'confirmed',
    gasUsed: '32000'
  }
];
