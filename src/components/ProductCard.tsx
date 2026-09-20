import Link from 'next/link';
import type { Product } from '@/lib/data';
import { getBrandColor, getBrandBySlug } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const brandSlug = product.brands[0];
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const brandColor = getBrandColor(brandSlug);

  return (
    <article className="ezm-product-card">
      <div className="ezm-product-card__img">
        {product.image ? (
          <img src={product.image} alt={product.title} />
        ) : (
          <span>Image coming soon</span>
        )}
      </div>
      <div className="ezm-product-card__body">
        {brand && (
          <div className="ezm-product-card__brand" style={{ color: brandColor }}>
            {brand.name}
          </div>
        )}
        <h3 className="ezm-product-card__title">
          <Link href={`/products/${product.slug}/`}>{product.title}</Link>
        </h3>
        <div className="ezm-product-card__excerpt">{product.excerpt}</div>
        <Link className="ezm-product-card__cta" href={`/products/${product.slug}/`}>
          View Details →
        </Link>
      </div>
    </article>
  );
}
