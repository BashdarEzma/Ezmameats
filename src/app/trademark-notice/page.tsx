import type { Metadata } from 'next';
import { getPage } from '@/lib/data';

export const metadata: Metadata = { title: 'Trademark Notice' };

export default function TrademarkPage() {
  const page = getPage('trademark-notice');

  return (
    <>
      <section className="ezm-hero" style={{ padding: '60px 24px' }}>
        <h1>{page?.title || 'Trademark Notice'}</h1>
      </section>
      <section className="ezm-section">
        <div className="ezm-container">
          <div className="ezm-legal" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
        </div>
      </section>
    </>
  );
}
