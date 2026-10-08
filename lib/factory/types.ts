// Hello World
/** ViraWeb Factory domain types, shared by the public site, Operations and the API. */

export const CATEGORY_IDS = ['websites', 'automacao', 'bots', 'sistemas', 'ferramentas', 'apps'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const TIERS = ['standard', 'custom', 'enterprise'] as const;
export type Tier = (typeof TIERS)[number];

export const PREVIEW_KINDS = [
  'landing', 'sales', 'site', 'bot', 'whatsapp', 'automation',
  'dashboard', 'system', 'tool', 'app', 'integration',
] as const;
export type PreviewKind = (typeof PREVIEW_KINDS)[number];

export const BRIEFING_FIELD_TYPES = ['text', 'textarea', 'url', 'email', 'tel', 'select'] as const;
export type BriefingFieldType = (typeof BRIEFING_FIELD_TYPES)[number];

export interface BriefingField {
  name: string;
  label: string;
  type: BriefingFieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
}

export interface Product {
  /** null for the static fallback catalog (no database configured). */
  id: string | null;
  slug: string;
  name: string;
  category: CategoryId;
  tier: Tier;
  summary: string;
  description: string;
  /** BRL cents; null = priced after analysis. */
  setupPrice: number | null;
  monthlyPrice: number | null;
  /** Renders "a partir de". */
  priceFrom: boolean;
  /** Business days; null = defined after analysis. */
  deliveryDays: number | null;
  features: string[];
  preview: PreviewKind;
  /** Empty = use the category default. */
  briefing: BriefingField[];
  externalCostsNote: string | null;
  featured: boolean;
  sortOrder: number;
  active: boolean;
  imageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export const ORDER_STATUSES = [
  'awaiting_payment', 'briefing_pending', 'received', 'in_production',
  'in_review', 'ready', 'suspended', 'canceled',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';
export type BriefingStatus = 'pending' | 'complete';
export type ProductionStatus = 'queued' | 'in_progress' | 'in_review' | 'done';

export const SUBSCRIPTION_STATUSES = [
  'active', 'trialing', 'past_due', 'canceled', 'unpaid', 'paused', 'incomplete',
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

/** The slice of an order the workflow rules need. */
export interface OrderState {
  status: OrderStatus;
  payment_status: PaymentStatus;
  briefing_status: BriefingStatus;
  production_status: ProductionStatus;
  tier: Tier;
  accepted_at: string | null;
  assigned_to: string | null;
  setup_price: number | null;
  delivery_url: string | null;
}
