// PetPill Theme - Pastel Pink Cute Design
export const COLORS = {
  // Primary palette
  primary: '#FF8FAB',        // Pastel pink
  primaryLight: '#FFB3C6',   // Light pink
  primaryDark: '#E56B8C',    // Deeper pink
  primarySoft: '#FFF0F3',    // Very soft pink bg

  // Secondary accents
  secondary: '#C9B1FF',      // Lavender
  secondaryLight: '#E8DEFF', // Light lavender
  mint: '#A8E6CF',           // Mint green
  mintLight: '#D4F5E6',      // Light mint
  peach: '#FFD3B6',          // Peach
  peachLight: '#FFE8D6',     // Light peach
  yellow: '#FFE66D',         // Sunny yellow
  yellowLight: '#FFF4B8',    // Light yellow
  coral: '#FF6B6B',          // Coral for alerts

  // Neutrals
  white: '#FFFFFF',
  background: '#FFF8FA',     // Very light pink bg
  card: '#FFFFFF',
  text: '#4A3D45',           // Soft dark text
  textLight: '#8B7D85',      // Gray text
  textMuted: '#BDB0B5',      // Muted text
  border: '#F5E6EB',         // Pink-tinted border
  shadow: '#FFD6E0',         // Pink shadow

  // Status colors
  success: '#7ED6A4',        // Soft green
  warning: '#FFD166',        // Soft yellow
  danger: '#FF6B6B',         // Soft red
  info: '#74B9FF',           // Soft blue

  // Medication status
  taken: '#7ED6A4',
  missed: '#FF6B6B',
  upcoming: '#FFD166',
  skipped: '#BDB0B5',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    title: 28,
    hero: 34,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const PET_TYPES = [
  { id: 'dog', name: 'Dog', emoji: '🐶' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'bird', name: 'Bird', emoji: '🐦' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fish', name: 'Fish', emoji: '🐠' },
  { id: 'hamster', name: 'Hamster', emoji: '🐹' },
  { id: 'reptile', name: 'Reptile', emoji: '🦎' },
  { id: 'turtle', name: 'Turtle', emoji: '🐢' },
  { id: 'guinea_pig', name: 'Guinea Pig', emoji: '🐹' },
  { id: 'ferret', name: 'Ferret', emoji: '🦦' },
  { id: 'other', name: 'Other', emoji: '🐾' },
];

export const FREQUENCY_OPTIONS = [
  { id: 'once_daily', label: 'Once Daily', times: 1 },
  { id: 'twice_daily', label: 'Twice Daily', times: 2 },
  { id: 'three_daily', label: '3 Times Daily', times: 3 },
  { id: 'every_other_day', label: 'Every Other Day', times: 0.5 },
  { id: 'weekly', label: 'Once a Week', times: 1/7 },
  { id: 'biweekly', label: 'Every 2 Weeks', times: 1/14 },
  { id: 'monthly', label: 'Once a Month', times: 1/30 },
  { id: 'custom', label: 'Custom Schedule', times: 0 },
];

export const PHARMACY_DATA = [
  {
    id: 'chewy',
    name: 'Chewy',
    logo: '🧡',
    color: '#FC6C27',
    affiliateBase: 'https://www.chewy.com/s?query=',
    rating: 4.7,
    deliveryDays: '1-3 days',
  },
  {
    id: 'petcarerx',
    name: 'PetCareRx',
    logo: '💚',
    color: '#4CAF50',
    affiliateBase: 'https://www.petcarerx.com/search?searchterm=',
    rating: 4.3,
    deliveryDays: '3-5 days',
  },
  {
    id: '1800petmeds',
    name: '1-800-PetMeds',
    logo: '💙',
    color: '#2196F3',
    affiliateBase: 'https://www.1800petmeds.com/search?query=',
    rating: 4.5,
    deliveryDays: '2-4 days',
  },
  {
    id: 'walmart',
    name: 'Walmart Pet Rx',
    logo: '💛',
    color: '#FFC107',
    affiliateBase: 'https://www.walmart.com/search?q=pet+',
    rating: 4.2,
    deliveryDays: '2-5 days',
  },
  {
    id: 'amazon',
    name: 'Amazon Pet Pharmacy',
    logo: '🧡',
    color: '#FF9800',
    affiliateBase: 'https://www.amazon.com/s?k=pet+medication+',
    rating: 4.6,
    deliveryDays: '1-2 days',
  },
  {
    id: 'allivet',
    name: 'Allivet',
    logo: '💜',
    color: '#9C27B0',
    affiliateBase: 'https://www.allivet.com/search?q=',
    rating: 4.4,
    deliveryDays: '3-5 days',
  },
];

export const COMMON_MEDICATIONS = [
  { name: 'Heartgard Plus', category: 'Heartworm Prevention', species: ['dog'] },
  { name: 'NexGard', category: 'Flea & Tick', species: ['dog'] },
  { name: 'Apoquel', category: 'Allergy', species: ['dog'] },
  { name: 'Carprofen', category: 'Pain/Anti-inflammatory', species: ['dog'] },
  { name: 'Gabapentin', category: 'Pain/Seizure', species: ['dog', 'cat'] },
  { name: 'Amoxicillin', category: 'Antibiotic', species: ['dog', 'cat'] },
  { name: 'Metronidazole', category: 'Antibiotic', species: ['dog', 'cat'] },
  { name: 'Prednisone', category: 'Steroid', species: ['dog', 'cat'] },
  { name: 'Revolution Plus', category: 'Flea/Tick/Heartworm', species: ['cat'] },
  { name: 'Bravecto', category: 'Flea & Tick', species: ['dog', 'cat'] },
  { name: 'Vetmedin', category: 'Heart', species: ['dog'] },
  { name: 'Methimazole', category: 'Thyroid', species: ['cat'] },
  { name: 'Enalapril', category: 'Heart/Blood Pressure', species: ['dog', 'cat'] },
  { name: 'Cerenia', category: 'Nausea', species: ['dog', 'cat'] },
  { name: 'Trazodone', category: 'Anxiety', species: ['dog'] },
  { name: 'Fluoxetine', category: 'Anxiety', species: ['dog', 'cat'] },
  { name: 'Insulin', category: 'Diabetes', species: ['dog', 'cat'] },
  { name: 'Phenobarbital', category: 'Seizure', species: ['dog', 'cat'] },
  { name: 'Doxycycline', category: 'Antibiotic', species: ['dog', 'cat', 'bird'] },
  { name: 'Clavamox', category: 'Antibiotic', species: ['dog', 'cat'] },
];

export const MEDICATION_INTERACTIONS = [
  {
    drugs: ['Carprofen', 'Prednisone'],
    severity: 'high',
    warning: 'NSAIDs and corticosteroids together can cause severe GI ulceration and bleeding.',
  },
  {
    drugs: ['Gabapentin', 'Trazodone'],
    severity: 'medium',
    warning: 'Both cause sedation. Combined use may cause excessive drowsiness.',
  },
  {
    drugs: ['Enalapril', 'Carprofen'],
    severity: 'medium',
    warning: 'NSAIDs may reduce the effectiveness of ACE inhibitors and affect kidney function.',
  },
  {
    drugs: ['Metronidazole', 'Phenobarbital'],
    severity: 'medium',
    warning: 'Phenobarbital may decrease metronidazole effectiveness.',
  },
  {
    drugs: ['Fluoxetine', 'Trazodone'],
    severity: 'high',
    warning: 'Risk of serotonin syndrome. Monitor closely.',
  },
];
