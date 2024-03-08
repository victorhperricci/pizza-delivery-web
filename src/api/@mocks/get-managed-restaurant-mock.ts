import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    createdAt: '2021-08-01T00:00:00.000Z',
    description: 'A nice restaurant',
    id: '123',
    managerId: '123',
    name: 'Nice Restaurant',
    updatedAt: '2021-08-01T00:00:00.000Z',
  })
})
