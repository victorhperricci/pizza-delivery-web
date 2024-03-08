import { http, HttpResponse } from 'msw'

import {
  GetDailyRevenueInPeriodQuery,
  GetDailyRevenueInPeriodResponse,
} from '@/api/metrics/get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  GetDailyRevenueInPeriodQuery,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', ({ params }) => {
  const { from, to } = params

  if (!from || !to) {
    return new HttpResponse(null, {
      status: 400,
      statusText: 'Invalid "from" and "to" parameters',
    })
  }

  return HttpResponse.json([
    { date: '2024-02-01', receipt: 4000 },
    { date: '2024-02-02', receipt: 8000 },
    { date: '2024-02-03', receipt: 5500 },
    { date: '2024-02-04', receipt: 4350 },
    { date: '2024-02-05', receipt: 1530 },
    { date: '2024-02-06', receipt: 9000 },
    { date: '2024-02-07', receipt: 4000 },
  ])
})
