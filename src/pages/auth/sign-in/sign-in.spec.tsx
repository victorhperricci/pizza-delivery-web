import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { client } from '@/App'

import { SignIn } from './sing-in'

describe('SigIn', () => {
  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={['/sign-in?email=johndoe@gmail.com']}>
            <HelmetProvider>
              <QueryClientProvider client={client}>
                {children}
              </QueryClientProvider>
            </HelmetProvider>
          </MemoryRouter>
        )
      },
    })

    const emailInput = wrapper.getByLabelText('E-mail') as HTMLInputElement
    expect(emailInput.value).toEqual('johndoe@gmail.com')
  })
})
