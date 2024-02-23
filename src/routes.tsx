import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Orders } from './pages/app/orders/orders'
import { SignUp } from './pages/auth/sign-up'
import { SignIn } from './pages/auth/sing-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
