import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsQuery,
  GetOrderDetailsResponse,
} from '../../orders/get-order-details'
import { orders } from './get-orders-mock'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsQuery,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  const order = orders.find((order) => order.orderId === params.orderId)

  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: order?.customerName || 'Victor Hugo',
      email: 'victor.hugo@newpost.com',
      phone: '+1 (202) 555-0170',
    },
    createdAt: order?.createdAt || new Date().toISOString(),
    status: order?.status || 'pending',
    orderItems: [
      {
        id: 'product-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza',
        },
        quantity: 2,
      },
      {
        id: 'product-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza 2',
        },
        quantity: 4,
      },
    ],
    totalInCents: 1000 * 2 + 2000 * 4,
  })
})
