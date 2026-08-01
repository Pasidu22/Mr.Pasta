import { Suspense } from 'react';
import ProfileClient from './ProfileClient';

export const metadata = {
  title: 'My Profile',
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 0' }}>Loading Profile...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
