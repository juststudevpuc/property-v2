import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import NewsPage from '@/pages/NewsPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import ContactPage from '@/pages/ContactPage'

/* ─── Lazy placeholder pages (stubs until built) ────────── */
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <p className="text-greyon-muted text-sm tracking-widest uppercase">
      {name} — coming soon
    </p>
  </div>
)

/* ─── Data Router configuration ──────────────────────────── */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'project/:slug',
        element: <ProjectDetailPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'news',
        element: <NewsPage />,
      },
      {
        path: 'news/:slug',
        element: <NewsDetailPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'privacy-policy',
        element: <PlaceholderPage name="Privacy Policy" />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

/**
 * App — root of the React application.
 *
 * Configured with createBrowserRouter + RouterProvider to support
 * data-router capabilities (like <ScrollRestoration /> in RootLayout).
 */
export default function App() {
  return <RouterProvider router={router} />
}
