export interface Product {
  id: string;
  type: 'savings' | 'credit';
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  requirements: string[];
  referenceRate: number;
  minAmount?: number;
  maxAmount?: number;
  minTerm?: number;
  maxTerm?: number;
  ctaLabel: string;
  ctaUrl?: string;
  imageUrl?: string;
  iconName: string;
  isFeatured: boolean;
  sortOrder: number;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  schedule: { day: string; hours: string }[];
  lat: number;
  lng: number;
  isMain: boolean;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface Branding {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  welcomeMessage: string;
  botTone: string;
  disclaimer: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: Record<string, string>;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroImageUrl: string;
  institutionName: string;
  mission: string;
  vision: string;
  values: string[];
  history: string;
  footerText: string;
  sepsCode: string;
}

export interface CreditSimulationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  amount: number;
  annualRate: number;
  termMonths: number;
  disclaimer: string;
}

export interface SavingsSimulationResult {
  totalContributed: number;
  estimatedInterest: number;
  projectedValue: number;
  initialAmount: number;
  monthlyContribution: number;
  termMonths: number;
  annualRate: number;
  disclaimer: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
