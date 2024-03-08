import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '@/api/metrics/get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Mussarela', amount: 60 },
    { product: 'Calabresa', amount: 50 },
    { product: 'Pepperoni', amount: 47 },
    { product: 'Portuguesa', amount: 45 },
    { product: 'Frango', amount: 30 },
  ])
})
