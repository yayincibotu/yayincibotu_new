import { NextRequest, NextResponse } from 'next/server'

// Protected routes listesi
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/orders',
  '/admin',
  '/cp'
]

// Public routes (authentication gerektirmeyen)
const publicRoutes = [
  '/',
  '/auth',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/forgot-password',
  '/unauthorized'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Static files ve API routes'u atla
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Pathname'i header olarak ekle (layout'ta kullanmak için)
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)

  // Public route kontrolü
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return response
  }

  // Protected route kontrolü
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Auth cookie'sinden token al
    const authToken = request.cookies.get('auth-token')?.value

    if (!authToken) {
      // Token yoksa login'e yönlendir
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      loginUrl.searchParams.set('message', 'Bu sayfaya erişim için giriş yapmanız gerekiyor')
      
      return NextResponse.redirect(loginUrl)
    }

    // Token varsa devam et (client-side'da doğrulanacak)
    return response
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 