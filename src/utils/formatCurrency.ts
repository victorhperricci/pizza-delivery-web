export function formatCurrency(amount: number, locale: string = 'pt-BR') {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: 'BRL',
  })
}
