import Link from 'next/link';
import { getBrands, getProducts, getBrandColor } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const brands = getBrands();
  const featured = getProducts().slice(0, 6);

  return (
    <>
      <section className="ezm-hero ezm-hero--image">
        <img src="/wp-content/uploads/2026/09/slide1.png" alt="Ezmameats — Quality Meat, Trusted Brands" className="ezm-hero__img" />
        <div className="ezm-hero__cta">
          <Link className="ezm-btn ezm-btn--solid" href="/brands/">Explore Our Brands</Link>
        </div>
      </section>

      <section className="ezm-section">
        <div className="ezm-container">
          <div className="ezm-section__head">
            <h2>Our Brands</h2>
            <p>Two distinct international brands, each with its own identity and product range, backed by Ezmameats quality standards.</p>
          </div>
          <div className="ezm-grid-2">
            {brands.map((brand) => (
              <div className="ezm-brand-card" key={brand.slug}>
                <div className="ezm-brand-card__logo" style={{ color: getBrandColor(brand.slug) }}>
                  {brand.name}
                </div>
                <p>{brand.description}</p>
                <Link
                  className="ezm-btn ezm-btn--solid"
                  style={{ background: getBrandColor(brand.slug), borderColor: getBrandColor(brand.slug) }}
                  href={`/brands/${brand.slug}/`}
                >
                  View Products
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ezm-section ezm-section--alt">
        <div className="ezm-container">
          <div className="ezm-section__head">
            <h2>Featured Products</h2>
            <p>A selection from our current catalog.</p>
          </div>
          <div className="ezm-featured-row">
            <div className="ezm-featured-row__track">
              {featured.map((product) => (
                <ProductCard product={product} key={`a-${product.id}`} />
              ))}
              {featured.map((product) => (
                <ProductCard product={product} key={`b-${product.id}`} />
              ))}
            </div>
          </div>
          <p className="ezm-text-center" style={{ marginTop: 40 }}>
            <Link className="ezm-btn ezm-btn--solid" href="/products/">View All Products</Link>
          </p>
        </div>
      </section>

      <section className="ezm-section ezm-text-center">
        <div className="ezm-container">
          <h2>Interested in Wholesale or Export?</h2>
          <p>Get in touch with our team for pricing, samples, and partnership inquiries.</p>
          <a className="ezm-btn ezm-btn--solid" href="mailto:info@ezmameats.com">Contact Us</a>
        </div>
      </section>
    </>
  );
}
