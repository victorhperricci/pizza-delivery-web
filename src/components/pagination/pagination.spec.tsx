import { render } from '@testing-library/react'
import userEvents from '@testing-library/user-event'

import { Pagination } from './pagination'
const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    nextPageButton.click()

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvents.setup()

    const wrapper = render(
      <Pagination
        pageIndex={4}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(3)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvents.setup()

    const wrapper = render(
      <Pagination
        pageIndex={4}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvents.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const previousPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(previousPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })

  it('should disable the previous button when on the first page', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    const firstPageButton = wrapper.getByTestId('first-page-button')
    const previousPageButton = wrapper.getByTestId('previous-page-button')

    expect(firstPageButton).toBeDisabled()
    expect(previousPageButton).toBeDisabled()
  })

  it('should disable the next button when on the last page', () => {
    const wrapper = render(
      <Pagination
        pageIndex={19}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    const lastPageButton = wrapper.getByTestId('last-page-button')
    const nextPageButton = wrapper.getByTestId('next-page-button')

    expect(lastPageButton).toBeDisabled()
    expect(nextPageButton).toBeDisabled()
  })
})
