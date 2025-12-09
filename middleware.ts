import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Permitir acceso libre a /login y recursos estáticos
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/favicon.ico') || request.nextUrl.pathname.startsWith('/public') || request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Verificar si el usuario está autenticado (existencia de token)
  // Nota: Para mayor seguridad, idealmente se debería validar la firma del JWT aquí o en las API routes.
  const token = request.cookies.get('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public).*)'],
}; 