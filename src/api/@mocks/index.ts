import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getProfileMock } from './get-profile-mock'
import { getDailyRevenueInPeriodMock } from './metrics/get-daily-revenue-in-period'
import { getDayOrdersAmountMock } from './metrics/get-day-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './metrics/get-month-canceled-orders-amount'
import { getMonthOrdersAmountMock } from './metrics/get-month-orders-amount'
import { getMonthRevenueMock } from './metrics/get-month-revenue'
import { getPopularProductsMock } from './metrics/get-popular-products'
import { approveOrderMock } from './orders/approve-order-mock'
import { cancelOrderMock } from './orders/cancel-order-mock'
import { deliverOrderMock } from './orders/deliver-order-mock'
import { dispatchOrderMock } from './orders/dispatch-order-mock'
import { getOrderDetailsMock } from './orders/get-order-details-mock'
import { getOrdersMock } from './orders/get-orders-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'

const dashboardMocks = [
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
]

const authMocks = [signInMock, registerRestaurantMock]

const profileMocks = [
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
]

const ordersMocks = [
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
]

export const worker = setupWorker(
  ...dashboardMocks,
  ...authMocks,
  ...profileMocks,
  ...ordersMocks,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return
  await worker.start()
}
