import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Nice Restaurant' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  // Rocket Pizza
  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page
    .getByLabel('Descrição')
    .fill('Rocket Pizza é a melhor pizzaria da cidade')

  await page.getByRole('button', { name: 'Salvar' }).click()
  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')
  expect(toast).toBeVisible()

  expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()

  await page.waitForTimeout(2000)
})

test('update profile wrong', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Nice Restaurant' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  await page.getByLabel('Nome').fill('Pizza Top')
  await page
    .getByLabel('Descrição')
    .fill('Rocket Pizza é a melhor pizzaria da cidade')

  await page.getByRole('button', { name: 'Salvar' }).click()
  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Não foi possível atualizar o perfil da loja')
  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})
