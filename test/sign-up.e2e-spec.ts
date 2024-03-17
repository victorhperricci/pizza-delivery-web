import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Victor')
  await page.getByLabel('E-mail').fill('victor.perricci@gmail.com')
  await page.getByLabel('Seu celular').fill('11916610024')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('sign up error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByLabel('Nome do estabelecimento').fill('Deu erro aqui ó')
  await page.getByLabel('Seu nome').fill('Victor')
  await page.getByLabel('E-mail').fill('victor.perricci@gmail.com')
  await page.getByLabel('Seu celular').fill('11916610024')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('sign up error when fields are empties', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const restaurantNameError = page.getByText(
    'Nome do restaurante é obrigatório',
  )
  const managerNameError = page.getByText('Nome do gerente é obrigatório')
  const phoneError = page.getByText('Telefone é obrigatório')
  const emailError = page.getByText('E-mail é obrigatório')

  expect(restaurantNameError).toBeVisible()
  expect(managerNameError).toBeVisible()
  expect(emailError).toBeVisible()
  expect(phoneError).toBeVisible()

  await page.waitForTimeout(2000)
})

test('navigate to the login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()

  const title = page.getByRole('heading', { name: 'Acessar painel' })

  expect(title).toBeVisible()

  await page.waitForTimeout(2000)
})
