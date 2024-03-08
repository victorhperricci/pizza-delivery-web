import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      createdAt: '2021-08-01T00:00:00.000Z',
      email: 'victor.perricci@gmail.com',
      id: '123',
      name: 'Victor Perricci',
      phone: '123456789',
      role: 'manager',
      updatedAt: '2021-08-01T00:00:00.000Z',
    })
  },
)
