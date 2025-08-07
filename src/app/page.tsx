'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isAuth = document.cookie.includes('smsv-auth=true');
      if (!isAuth) {
        router.push('/login');
      } else {
        router.push('/evolucion-de-la-cartera');
      }
    }
  }, [router]);
  return null;
}
