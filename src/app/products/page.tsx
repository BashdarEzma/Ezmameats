import type { Metadata } from 'next';
import Link from 'next/link';
import { getBrands, getProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = { title: 'Products' };

export default function ProductsPage() {
  const brands = getBrands();
  const products = getProducts();

  return (
    <>
      <section className="ezm-hero" style={{ padding: '60px 24px' }}>
        <h1>Our Products</h1>
        <p>Browse our full product catalog by brand.</p>
      </section>

      <section className="ezm-section">
        <div className="ezm-container">
          <div className="ezm-filter-bar">
            <Link href="/products/" className="is-active">All Brands</Link>
            {brands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}/`}>{b.name}</Link>
            ))}
          </div>

          <div className="ezm-products-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
