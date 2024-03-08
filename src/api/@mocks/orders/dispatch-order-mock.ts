import { http, HttpResponse } from 'msw'

import { DispatchOrderParams } from '../../orders/dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderParams>(
  '/orders/:orderId/dispatch',
  ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
