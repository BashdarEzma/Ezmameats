import raw from '@/data/site-export.json';

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  brands: string[];
  categories: string[];
  cut_spec: string;
  pack_size: string;
  carton_info: string;
  storage: string;
  shelf_life: string;
  certification: string;
  notes: string;
}

export interface Page {
  id: number;
  title: string;
  content: string;
}

export interface SiteData {
  brands: Brand[];
  categories: Category[];
  products: Product[];
  pages: Record<string, Page>;
  site: { name: string; description: string; logo: string | null };
}

const data = raw as SiteData;

export function getBrands(): Brand[] {
  return data.brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return data.brands.find((b) => b.slug === slug);
}

export function getBrandColor(slug: string | undefined): string {
  if (!slug) return 'var(--ezm-primary)';
  const brand = getBrandBySlug(slug);
  return brand?.color || 'var(--ezm-primary)';
}

export function getCategories(): Category[] {
  return data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return data.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find((p) => p.slug === slug);
}

export function getProductsByBrand(slug: string): Product[] {
  return data.products.filter((p) => p.brands.includes(slug));
}

export function getProductsByCategory(slug: string): Product[] {
  return data.products.filter((p) => p.categories.includes(slug));
}

export function getPage(slug: string): Page | undefined {
  return data.pages[slug];
}

export function getSite() {
  return data.site;
}
