
export enum FrameworkType {
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  PRIVATE_EQUITY = 'PRIVATE_EQUITY'
}

export enum SubscriptionTier {
  BASIC = 'BASIC',
  EXCLUSIVE = 'EXCLUSIVE',
  ASSOCIATE = 'ASSOCIATE'
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: string;
  priceValue: number; // Added for Payment Gateway
  features: string[];
  cta: string;
}

export interface FrameworkDetailModule {
  title: string;
  description: string;
}

export interface FrameworkDetails {
  longDescription: string;
  modules: FrameworkDetailModule[];
  benefits: string[];
}

export interface FrameworkModel {
  type: FrameworkType;
  title: string;
  subtitle: string;
  description: string;
  details: FrameworkDetails;
  plans: PricingPlan[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}