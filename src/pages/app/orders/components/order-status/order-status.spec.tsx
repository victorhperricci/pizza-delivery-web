import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text and class when order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)
    const statusText = wrapper.getByText('Pendente')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })

  it('should display the right text and class when order status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />)
    const statusText = wrapper.getByText('Cancelado')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-red-500')
  })

  it('should display the right text and class when order status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)
    const statusText = wrapper.getByText('Processando')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-yellow-500')
  })

  it('should display the right text and class when order status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)
    const statusText = wrapper.getByText('Entregando')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-blue-500')
  })

  it('should display the right text and class when order status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)
    const statusText = wrapper.getByText('Entregue')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-green-500')
  })
})
