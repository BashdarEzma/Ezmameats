import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  return { title: category ? category.name : 'Category' };
}

export default function CategoryArchivePage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <section className="ezm-hero" style={{ padding: '60px 24px' }}>
        <h1>{category.name}</h1>
      </section>

      <section className="ezm-section">
        <div className="ezm-container">
          <div className="ezm-products-grid">
            {products.length ? (
              products.map((product) => <ProductCard product={product} key={product.id} />)
            ) : (
              <p className="ezm-text-center">No products published yet in this category.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
