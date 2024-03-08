import { http, HttpResponse } from 'msw'

import { ApproveOrderParams } from '../../orders/approve-order'

export const approveOrderMock = http.patch<ApproveOrderParams>(
  '/orders/:orderId/approve',
  ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
