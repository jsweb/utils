import { formatNumber, formatCurrency } from '../../src/modules/number'

test('formatNumber', () => {
  const number = 1234567.89
  const br = formatNumber(number, 'pt-BR')
  const en = formatNumber(number, 'en-US')
  const fr = formatNumber(number, 'fr-FR')
  const decimals = formatNumber(number, 'pt-BR', 2)

  expect(br).toBe('1.234.568')
  expect(en).toBe('1,234,568')
  expect(fr).toBe('1\u202f234\u202f568')
  expect(decimals).toBe('1.234.567,89')
})

test('formatCurrency', () => {
  const number = 1234567.89
  const br = formatCurrency(number, 'pt-BR', 'BRL')
  const en = formatCurrency(number, 'en-US', 'USD')
  const fr = formatCurrency(number, 'fr-FR', 'EUR')

  expect(br).toBe('R$\xa01.234.567,89')
  expect(en).toBe('$1,234,567.89')
  expect(fr).toBe('1\u202f234\u202f567,89\xa0€')
})
