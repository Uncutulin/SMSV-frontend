import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Permitir acceso libre a /login y recursos estáticos
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/favicon.ico') || request.nextUrl.pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // Verificar si el usuario está autenticado (ejemplo: flag en cookies)
  const isAuthenticated = request.cookies.get('smsv-auth')?.value === 'true';

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|public).*)'],
}; 