import { headers } from "next/headers"
import HeaderV2 from "@/components/header-v2"
import Footer from "@/components/footer"

interface RootLayoutContentProps {
  children: React.ReactNode
}

export default async function RootLayoutContent({ children }: RootLayoutContentProps) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '/'
  
  // Dashboard (/cp) rotalarında header/footer gizle
  const isDashboardRoute = pathname.startsWith('/cp')
  
  return (
    <>
      {!isDashboardRoute && <HeaderV2 />}
      <main className={isDashboardRoute ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  )
} 