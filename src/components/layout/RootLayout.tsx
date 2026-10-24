import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

/**
 * RootLayout — persistent shell wrapping every route.
 *
 * Framer Motion page transitions stripped for stability.
 * Will be re-added once the hero renders correctly.
 *
 * Structure:
 *   <Navbar />          ← fixed, scroll-aware
 *   <main>
 *     <Outlet />        ← page-level content renders here
 *   </main>
 *   <Footer />
 *   <ScrollRestoration />
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117]">
      {/* Global navigation */}
      <Navbar />

      {/* Page content — plain <main> while we verify rendering */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global footer */}
      <Footer />

      {/* Restore scroll on navigation */}
      <ScrollRestoration />
    </div>
  )
}
