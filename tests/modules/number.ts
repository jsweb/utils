import test from 'ava'
import {
  formatNumber,
  formatCurrency,
  isBetween,
} from '../../src/modules/number'

test('formatNumber', (t) => {
  const number = 1234567.89
  const br = formatNumber(number, 'pt-BR')
  const en = formatNumber(number, 'en-US')
  const fr = formatNumber(number, 'fr-FR')
  const decimals = formatNumber(number, 'pt-BR', 2)

  t.is(br, '1.234.568')
  t.is(en, '1,234,568')
  t.is(fr, '1\u202f234\u202f568')
  t.is(decimals, '1.234.567,89')
})

test('formatCurrency', (t) => {
  const number = 1234567.89
  const br = formatCurrency(number, 'pt-BR', 'BRL')
  const en = formatCurrency(number, 'en-US', 'USD')
  const fr = formatCurrency(number, 'fr-FR', 'EUR')

  t.is(br, 'R$\xa01.234.567,89')
  t.is(en, '$1,234,567.89')
  t.is(fr, '1\u202f234\u202f567,89\xa0€')
})

test('isBetween', (t) => {
  t.true(isBetween(256, 128, 512))
})
