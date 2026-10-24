import type { Project, NewsItem, Promotion } from '@/types'
import { PROJECTS } from '@/data/projects'
import { NEWS_ITEMS } from '@/data/news'
import { PROMOTIONS } from '@/data/promotions'

/* ─── Custom API Error ──────────────────────────────────── */
export class ApiError extends Error {
  status: number
  statusText: string
  data?: unknown

  constructor(message: string, status: number, statusText: string, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

/* ─── Client Options ─────────────────────────────────────── */
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

/* ─── Base Configuration ─────────────────────────────────── */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const CMS_READ_TOKEN = import.meta.env.VITE_CMS_READ_TOKEN || ''

/**
 * Core generic fetch wrapper using native fetch()
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options

  // Build query string if params are provided
  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += `${url.includes('?') ? '&' : '?'}${queryString}`
    }
  }

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(CMS_READ_TOKEN ? { Authorization: `Bearer ${CMS_READ_TOKEN}` } : {}),
    ...headers,
  }

  const response = await fetch(url, {
    headers: defaultHeaders,
    ...restOptions,
  })

  if (!response.ok) {
    let errorData: unknown
    try {
      errorData = await response.json()
    } catch {
      errorData = await response.text()
    }
    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
      errorData
    )
  }

  // If response is 204 No Content
  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}

/* ─── Convenience HTTP Methods ──────────────────────────── */
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
}

/* ─── Domain-Specific API Services (with Mock Fallbacks) ── */

export interface ContactInquiryPayload {
  name: string
  email: string
  phone: string
  project?: string
  date?: string
  message?: string
}

/**
 * Fetch all projects from backend or fallback to local dataset
 */
export async function getProjects(): Promise<Project[]> {
  if (!API_BASE_URL) return PROJECTS
  try {
    return await api.get<Project[]>('/projects')
  } catch (err) {
    console.warn('[API] Could not fetch remote projects, using mock data:', err)
    return PROJECTS
  }
}

/**
 * Fetch a single project by slug from backend or fallback to local dataset
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!API_BASE_URL) {
    return PROJECTS.find((p) => p.slug === slug)
  }
  try {
    return await api.get<Project>(`/projects/${slug}`)
  } catch (err) {
    console.warn(`[API] Could not fetch remote project "${slug}", using mock data:`, err)
    return PROJECTS.find((p) => p.slug === slug)
  }
}

/**
 * Fetch news articles with optional category filter
 */
export async function getNews(category?: string): Promise<NewsItem[]> {
  if (!API_BASE_URL) {
    if (!category || category === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter((n) => n.category === category)
  }
  try {
    return await api.get<NewsItem[]>('/news', {
      params: category && category !== 'All' ? { category } : undefined,
    })
  } catch (err) {
    console.warn('[API] Could not fetch remote news, using mock data:', err)
    if (!category || category === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter((n) => n.category === category)
  }
}

/**
 * Fetch a single news article by slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  if (!API_BASE_URL) {
    return NEWS_ITEMS.find((n) => n.slug === slug)
  }
  try {
    return await api.get<NewsItem>(`/news/${slug}`)
  } catch (err) {
    console.warn(`[API] Could not fetch remote article "${slug}", using mock data:`, err)
    return NEWS_ITEMS.find((n) => n.slug === slug)
  }
}

/**
 * Fetch promotions
 */
export async function getPromotions(): Promise<Promotion[]> {
  if (!API_BASE_URL) return PROMOTIONS
  try {
    return await api.get<Promotion[]>('/promotions')
  } catch (err) {
    console.warn('[API] Could not fetch remote promotions, using mock data:', err)
    return PROMOTIONS
  }
}

/**
 * Submit contact inquiry / private preview request
 */
export async function submitContactInquiry(
  payload: ContactInquiryPayload
): Promise<{ success: boolean; message?: string }> {
  const webhookUrl =
    import.meta.env.VITE_CONTACT_WEBHOOK_URL ||
    (API_BASE_URL ? `${API_BASE_URL}/inquiries` : '')

  if (!webhookUrl) {
    // Simulated instant success when no backend is wired yet
    console.info('[API] In-memory inquiry submitted:', payload)
    return { success: true, message: 'Inquiry received successfully' }
  }

  return api.post<{ success: boolean; message?: string }>(webhookUrl, payload)
}
