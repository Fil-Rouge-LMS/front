import { apiClient } from './client'

// The body is checked as well as the HTTP status: without VITE_API_URL, the
// request hits the front-end host, which can answer 200 with an HTML page.
async function isHealthy(path: string): Promise<boolean> {
  try {
    const { data } = await apiClient.get(path)
    return data?.status === 'success'
  } catch {
    return false
  }
}

export function checkApi(): Promise<boolean> {
  return isHealthy('/health')
}

export function checkDatabase(): Promise<boolean> {
  return isHealthy('/health/db')
}
