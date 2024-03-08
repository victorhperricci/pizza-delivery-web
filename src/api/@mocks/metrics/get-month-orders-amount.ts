import { http, HttpResponse } from 'msw'

import { GetMonthOrdersAmountResponse } from '@/api/metrics/get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 800,
    diffFromLastMonth: 10,
  })
})
