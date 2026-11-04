import { useEffect, useState } from 'react'
import { checkApi, checkDatabase } from '../api/health.api'

export type HealthStatus = 'checking' | 'ok' | 'error'

function toStatus(isHealthy: boolean): HealthStatus {
  return isHealthy ? 'ok' : 'error'
}

export function useHealth() {
  const [api, setApi] = useState<HealthStatus>('checking')
  const [database, setDatabase] = useState<HealthStatus>('checking')

  useEffect(() => {
    let isCancelled = false

    void checkApi().then((isHealthy) => {
      if (!isCancelled) setApi(toStatus(isHealthy))
    })
    void checkDatabase().then((isHealthy) => {
      if (!isCancelled) setDatabase(toStatus(isHealthy))
    })

    return () => {
      isCancelled = true
    }
  }, [])

  return { api, database }
}
