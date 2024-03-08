import { http, HttpResponse } from 'msw'

import { GetDayOrdersAmountResponse } from '@/api/metrics/get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 100,
    diffFromYesterday: 10,
  })
})