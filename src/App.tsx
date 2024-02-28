import './global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import { router } from './routes'

const client = new QueryClient()

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | pizza.shop" defaultTitle="pizza.shop" />
          <RouterProvider router={router} />
          <Toaster richColors expand />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
