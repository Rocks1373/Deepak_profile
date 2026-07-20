/**
 * Browser client for the GoDam real-time warehouse API.
 * Falls back gracefully when the API is offline so the demo still works.
 */

export type GodamDashboard = {
  inboundToday: number
  outboundToday: number
  pendingInbound: number
  pendingOutbound: number
  pendingApprovals?: number
  stockSummary: {
    totalParts: number
    aggregatedQty: number
    topParts: { partNumber: string; qty: number }[]
  }
  lastUpdated: string
}

export type GodamRealtimeEvent = {
  id: number
  at: string
  type: string
  entity?: string
  entityId?: string | number
  data?: unknown
}

const API_BASE = import.meta.env.VITE_GODAM_API_BASE || ''
const API_KEY = import.meta.env.VITE_GODAM_API_KEY || 'godam-dev-key'

function resolveUrl(path: string): string {
  if (API_BASE) return `${API_BASE.replace(/\/$/, '')}${path}`
  return path
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(resolveUrl(path), {
    headers: {
      Accept: 'application/json',
      'X-API-Key': API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  if (!res.ok) {
    throw new Error(`GoDam API ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function fetchGodamHealth(): Promise<{ ok: boolean } | null> {
  try {
    return await apiFetch<{ ok: boolean }>('/api/health')
  } catch {
    try {
      return await apiFetch<{ ok: boolean }>('/health')
    } catch {
      return null
    }
  }
}

export async function fetchGodamDashboard(): Promise<GodamDashboard | null> {
  try {
    return await apiFetch<GodamDashboard>('/api/dashboard')
  } catch {
    return null
  }
}

export async function fetchGodamOrders(status?: string) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : ''
  return apiFetch<{ items: unknown[] }>(`/api/orders${qs}`)
}

export async function fetchGodamApprovals(status = 'PENDING') {
  return apiFetch<{ items: unknown[] }>(
    `/api/approvals?status=${encodeURIComponent(status)}`
  )
}

export function connectGodamRealtime(
  onEvent: (event: GodamRealtimeEvent) => void,
  onStatus?: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void
): () => void {
  onStatus?.('connecting')
  const url = resolveUrl('/api/realtime')
  // EventSource cannot set custom headers; pass key as query for browser SSE.
  const withKey = url.includes('?')
    ? `${url}&api_key=${encodeURIComponent(API_KEY)}`
    : `${url}?api_key=${encodeURIComponent(API_KEY)}`

  let source: EventSource
  try {
    source = new EventSource(withKey)
  } catch {
    onStatus?.('error')
    return () => undefined
  }

  source.onopen = () => onStatus?.('connected')
  source.onerror = () => onStatus?.('error')

  const handler = (ev: MessageEvent) => {
    try {
      const data = JSON.parse(ev.data) as GodamRealtimeEvent
      onEvent(data)
      if (data.type === 'connected') onStatus?.('connected')
    } catch {
      // ignore malformed chunks
    }
  }

  ;['connected', 'order.updated', 'stock.updated', 'shipment.updated', 'approval.updated', 'heartbeat', 'message'].forEach(
    (name) => source.addEventListener(name, handler as EventListener)
  )
  source.onmessage = handler

  return () => {
    source.close()
    onStatus?.('disconnected')
  }
}
