import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  perPage: number
  orderId?: string | null
  customerName?: string | null
  status?:
    | 'all'
    | 'pending'
    | 'canceled'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  perPage,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      perPage,
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
