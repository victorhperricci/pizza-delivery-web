import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '@/api/metrics/get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    diffFromLastMonth: 10,
    receipt: 100 * 2500,
  })
})
