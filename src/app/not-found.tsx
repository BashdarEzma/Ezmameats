import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="ezm-section ezm-text-center">
      <div className="ezm-container">
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link className="ezm-btn ezm-btn--solid" href="/">Back to Home</Link>
      </div>
    </section>
  );
}
