import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Permitir explícitamente rutas de Next.js y estáticos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Esto permite cualquier archivo con extensión (png, jpg, svg)
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token');

  // 2. Si no hay token y no está en login, redirigir
  if (!token && pathname !== '/login') {
    return NextResponse.next(); // Opcional: podrías usar redirect aquí
    // Pero para evitar bucles infinitos durante el proceso de carga, asegúrate que /login sea libre:
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher mejorado para excluir estáticos de forma global
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};