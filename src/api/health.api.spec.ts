import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from './client'
import { checkApi, checkDatabase } from './health.api'

vi.mock('./client', () => ({
  apiClient: { get: vi.fn() },
}))

const get = vi.mocked(apiClient.get)

describe('health api', () => {
  beforeEach(() => {
    get.mockReset()
  })

  it('checkApi calls /health and returns true on a JSend success', async () => {
    get.mockResolvedValue({ data: { status: 'success' } })

    await expect(checkApi()).resolves.toBe(true)
    expect(get).toHaveBeenCalledWith('/health')
  })

  it('checkDatabase calls /health/db and returns true on a JSend success', async () => {
    get.mockResolvedValue({ data: { status: 'success' } })

    await expect(checkDatabase()).resolves.toBe(true)
    expect(get).toHaveBeenCalledWith('/health/db')
  })

  it('returns false when the request fails', async () => {
    get.mockRejectedValue(new Error('Request failed with status code 503'))

    await expect(checkDatabase()).resolves.toBe(false)
  })

  it('returns false on a 200 response that is not from the API', async () => {
    get.mockResolvedValue({ data: '<!doctype html><html></html>' })

    await expect(checkApi()).resolves.toBe(false)
  })
})
