'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // El middleware se encarga de proteger la ruta.
    // Si llegamos hasta aquí, redirigimos al dashboard.
    router.push('/cartera-vigente');
  }, [router]);
  return null;
}
