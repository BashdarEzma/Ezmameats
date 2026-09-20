import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBrands, getBrandBySlug, getProductsByBrand } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return getBrands().map((brand) => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = getBrandBySlug(params.slug);
  return { title: brand ? brand.name : 'Brand' };
}

export default function BrandArchivePage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const brands = getBrands();
  const products = getProductsByBrand(brand.slug);

  return (
    <>
      <section className="ezm-hero" style={{ padding: '60px 24px' }}>
        <h1>{brand.name}</h1>
        {brand.description && <p>{brand.description}</p>}
      </section>

      <section className="ezm-section">
        <div className="ezm-container">
          <div className="ezm-filter-bar">
            <Link href="/products/">All Brands</Link>
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}/`}
                className={b.slug === brand.slug ? 'is-active' : ''}
              >
                {b.name}
              </Link>
            ))}
          </div>

          <div className="ezm-products-grid">
            {products.length ? (
              products.map((product) => <ProductCard product={product} key={product.id} />)
            ) : (
              <p className="ezm-text-center">No products published yet under this brand.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
