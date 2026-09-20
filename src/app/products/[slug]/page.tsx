import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug, getBrandBySlug, getBrandColor, getCategoryBySlug } from '@/lib/data';

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  return { title: product ? product.title : 'Product' };
}

export default function SingleProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const brandSlug = product.brands[0];
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const brandColor = getBrandColor(brandSlug);
  const categoryNames = product.categories
    .map((slug) => getCategoryBySlug(slug)?.name)
    .filter(Boolean);

  const meta: Array<[string, string]> = [
    ['Cut / Spec', product.cut_spec],
    ['Pack Size', product.pack_size],
    ['Carton Info', product.carton_info],
    ['Storage', product.storage],
    ['Shelf Life', product.shelf_life],
    ['Certification', product.certification],
    ['Notes / Suitable For', product.notes],
  ].filter(([, value]) => !!value) as Array<[string, string]>;

  return (
    <section className="ezm-section">
      <div className="ezm-container">
        <div className="ezm-single-product">
          <div className="ezm-single-product__gallery">
            {product.image ? (
              <img src={product.image} alt={product.title} />
            ) : (
              <span className="ezm-text-center" style={{ width: '100%', color: '#6b6462' }}>
                Image coming soon
              </span>
            )}
          </div>
          <div>
            {brand && (
              <div className="ezm-product-card__brand" style={{ color: brandColor }}>
                {brand.name}
              </div>
            )}
            <h1>{product.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: product.content }} />

            <ul className="ezm-single-product__meta">
              {meta.map(([label, value]) => (
                <li key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </li>
              ))}
              {categoryNames.length > 0 && (
                <li>
                  <strong>Category</strong>
                  <span>{categoryNames.join(', ')}</span>
                </li>
              )}
            </ul>

            <a
              className="ezm-btn ezm-btn--solid"
              style={{ background: brandColor, borderColor: brandColor }}
              href={`mailto:info@ezmameats.com?subject=${encodeURIComponent('Quote Request: ' + product.title)}`}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
