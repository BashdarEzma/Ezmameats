import type { Metadata } from 'next';
import Link from 'next/link';
import { getBrands, getProductsByBrand, getPage } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = { title: 'Our Brands' };

export default function BrandsPage() {
  const brands = getBrands();
  const page = getPage('brands');

  return (
    <>
      <section className="ezm-hero" style={{ padding: '60px 24px' }}>
        <h1>Our Brands</h1>
      </section>

      <section className="ezm-section">
        <div className="ezm-container">
          {page?.content && (
            <div
              className="ezm-legal"
              style={{ marginBottom: 48 }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}

          {brands.map((brand) => {
            const products = getProductsByBrand(brand.slug).slice(0, 4);
            return (
              <div style={{ marginBottom: 64 }} key={brand.slug}>
                <div className="ezm-section__head" style={{ marginBottom: 32 }}>
                  <h2>{brand.name}</h2>
                  {brand.description && <p>{brand.description}</p>}
                </div>
                <div className="ezm-products-grid">
                  {products.length ? (
                    products.map((product) => <ProductCard product={product} key={product.id} />)
                  ) : (
                    <p className="ezm-text-center">Products for this brand coming soon.</p>
                  )}
                </div>
                <p className="ezm-text-center" style={{ marginTop: 28 }}>
                  <Link className="ezm-btn ezm-btn--solid" href={`/brands/${brand.slug}/`}>
                    View All {brand.name}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
