// Hello World
import 'server-only';
import { isSupabaseConfigured } from '@/lib/env';
import { createPublicClient } from '@/lib/supabase/public';
import { FEATURED_ORDER, STATIC_CATALOG } from './catalog';
import { briefingSchemaValidator } from './briefing';
import { CATEGORY_IDS, PREVIEW_KINDS, TIERS, type CategoryId, type PreviewKind, type Product, type Tier } from './types';

/** Row shape of `products` joined with `product_features`. */
export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  tier: string;
  summary: string | null;
  description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  price_from: boolean;
  delivery_days: number | null;
  preview: string;
  briefing_schema: unknown;
  external_costs_note: string | null;
  featured: boolean;
  sort_order: number;
  active: boolean;
  image_url: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  product_features?: Array<{ name: string }> | null;
}

export const PRODUCT_SELECT =
  'id,slug,name,category,tier,summary,description,setup_price,monthly_price,price_from,delivery_days,preview,briefing_schema,external_costs_note,featured,sort_order,active,image_url,seo_title,seo_description,product_features(name)';

const oneOf = <T extends string>(list: readonly T[], value: string, fallback: T): T =>
  (list as readonly string[]).includes(value) ? (value as T) : fallback;

export function mapProduct(row: ProductRow): Product {
  const briefing = briefingSchemaValidator.safeParse(row.briefing_schema);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: oneOf<CategoryId>(CATEGORY_IDS, row.category, 'websites'),
    tier: oneOf<Tier>(TIERS, row.tier, 'custom'),
    summary: row.summary ?? '',
    description: row.description ?? '',
    setupPrice: row.setup_price,
    monthlyPrice: row.monthly_price,
    priceFrom: row.price_from,
    deliveryDays: row.delivery_days,
    features: (row.product_features ?? []).map((f) => f.name),
    preview: oneOf<PreviewKind>(PREVIEW_KINDS, row.preview, 'landing'),
    briefing: briefing.success ? briefing.data : [],
    externalCostsNote: row.external_costs_note,
    featured: row.featured,
    sortOrder: row.sort_order,
    active: row.active,
    imageUrl: row.image_url,
    seoTitle: row.seo_title ?? null,
    seoDescription: row.seo_description ?? null,
  };
}

/** Active catalog. Falls back to the static catalog when the database is absent or unreachable. */
export async function listProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [...STATIC_CATALOG];
  const { data, error } = await createPublicClient()
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error || !data) {
    console.error('catalog_fetch_failed', error?.message);
    return [...STATIC_CATALOG];
  }
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await listProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/** The commercial price table shown on the Factory home. */
export async function featuredProducts(): Promise<Product[]> {
  const products = await listProducts();
  const featured = products.filter((p) => p.featured);
  const rank = (slug: string) => {
    const i = (FEATURED_ORDER as readonly string[]).indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return featured.sort((a, b) => rank(a.slug) - rank(b.slug) || a.sortOrder - b.sortOrder);
}

/** Configured holidays as 'YYYY-MM-DD' strings (empty set without a database). */
export async function loadHolidays(): Promise<Set<string>> {
  if (!isSupabaseConfigured()) return new Set();
  const { data } = await createPublicClient().from('holidays').select('day');
  return new Set(((data ?? []) as Array<{ day: string }>).map((h) => h.day));
}
