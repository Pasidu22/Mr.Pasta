import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'Our Menu',
  description: 'Browse our premium range of traditional and healthy pasta. High quality, factory-direct prices in Sri Lanka.',
};

export default function Page() {
  return (
    <Suspense fallback={
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="pulse" style={{ width: '60px', height: '60px', background: 'var(--color-terracotta)', borderRadius: '50%', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', fontWeight: '600', color: '#666' }}>Loading Menu...</p>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
