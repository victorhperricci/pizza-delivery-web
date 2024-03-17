import { expect, test } from '@playwright/test'

test('display orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByTestId('next-page-button').click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByTestId('last-page-button').click()
  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'Customer 91', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 100', exact: true }),
  ).toBeVisible()

  await page.getByTestId('previous-page-button').click()

  expect(
    page.getByRole('cell', { name: 'Customer 81', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 90', exact: true }),
  ).toBeVisible()

  await page.getByTestId('first-page-button').click()

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()

  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Em entrega').getByText('Em entrega').click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(
    page.getByRole('cell', { name: 'Entregando', exact: true }).first(),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})
