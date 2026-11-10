import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import OffersPage from '@/pages/OffersPage'
import ExperiencePage from '@/pages/ExperiencePage'
import HotelListPage from '@/pages/HotelListPage'
import HotelDetailPage from '@/pages/HotelDetailPage'
import NewsPage from '@/pages/NewsPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import ContactPage from '@/pages/ContactPage'
import MediaPage from '@/pages/MediaPage'
import TermsPage from '@/pages/TermsPage'
import BookingPage from '@/pages/BookingPage'
import CareersPage from '@/pages/CareersPage'
import FeedbackPage from '@/pages/FeedbackPage'

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
        path: 'projects/:slug',
        element: <ProjectDetailPage />,
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
        path: 'experience',
        element: <ExperiencePage />,
      },
      {
        path: 'offers',
        element: <OffersPage />,
      },
      {
        path: 'hotels',
        element: <HotelListPage />,
      },
      {
        path: 'hotels/:slug',
        element: <HotelDetailPage />,
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
        path: 'media',
        element: <MediaPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'booking',
        element: <BookingPage />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'feedback',
        element: <FeedbackPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'privacy-policy',
        element: <Navigate to="/terms?section=privacy" replace />,
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
