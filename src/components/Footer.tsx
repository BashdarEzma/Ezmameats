import Link from 'next/link';
import { getSite } from '@/lib/data';

export default function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="ezm-footer">
      <div className="ezm-container">
        <div className="ezm-footer__grid">
          <div>
            <h4>{site.name}</h4>
            <p>International meat product brands, sourced and processed to global export standards.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/brands/">Our Brands</Link></li>
              <li><Link href="/products/">Products</Link></li>
              <li><Link href="/about-us/">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/trademark-notice/">Trademark Notice</Link></li>
            </ul>
          </div>
          <div>
            <h4>Office</h4>
            <p>Naz Naz Qtr, Erbil, KRD Region, Iraq</p>
            <p>Phone: <a href="tel:+9647704496005">+964 770 449 6005</a></p>
            <p>Email: <a href="mailto:info@ezmameats.com">info@ezmameats.com</a></p>
          </div>
        </div>
        <div className="ezm-footer__bottom">
          &copy; {year} {site.name}. All rights reserved. A brand of{' '}
          <a href="https://ezmaholding.com" target="_blank" rel="noopener noreferrer">Ezma Holding</a>.
        </div>
      </div>
    </footer>
  );
}
