import Link from 'next/link';
import { getSite } from '@/lib/data';

export default function Header() {
  const site = getSite();

  return (
    <header className="ezm-header">
      <div className="ezm-header__inner">
        {site.logo ? (
          <div className="ezm-logo ezm-logo--custom">
            <Link href="/" className="custom-logo-link">
              <img src={site.logo} alt={site.name} />
            </Link>
          </div>
        ) : (
          <Link href="/" className="ezm-logo">
            EZMA<span>MEATS</span>
          </Link>
        )}
        <nav className="ezm-nav" aria-label="Primary">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/brands/">Brands</Link></li>
            <li><Link href="/products/">Products</Link></li>
            <li><Link href="/about-us/">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
