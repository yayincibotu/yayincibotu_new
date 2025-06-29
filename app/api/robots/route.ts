import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const robots = `User-agent: *
Allow: /
Allow: /auth
Allow: /about
Allow: /contact
Allow: /terms
Allow: /privacy

Disallow: /dashboard
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /unauthorized

Sitemap: ${baseUrl}/sitemap.xml

# Security
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // 24 hours
    },
  })
} 