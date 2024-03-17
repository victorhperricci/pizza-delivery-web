import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('100', { exact: true })).toBeVisible()
  expect(page.getByText('+10% em relação a ontem')).toBeVisible()

  await page.waitForTimeout(2000)
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('800')).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^800\+10% em relação ao mês anterior$/ })
      .getByRole('paragraph'),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('15')).toBeVisible()
  expect(
    page
      .locator('div')
      .filter({ hasText: /^15\+10% em relação ao mês anterior$/ })
      .getByRole('paragraph'),
  ).toBeVisible()

  await page.waitForTimeout(2000)
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('R$ 2.500,00')).toBeVisible()
  expect(page.getByText('+10% em relação ao mês').first()).toBeVisible()

  await page.waitForTimeout(2000)
})
