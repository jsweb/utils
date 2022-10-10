import test from 'ava'
import {
  currencyFormat,
  isBetween,
  numberFormat,
} from '../../src/modules/number'

test('numberFormat', (t) => {
  const number = 1234567.89
  const br = numberFormat(number, 'pt-BR')
  const en = numberFormat(number, 'en-US')
  const fr = numberFormat(number, 'fr-FR')
  const decimals = numberFormat(number, 'pt-BR', 2)

  t.is(br, '1.234.568')
  t.is(en, '1,234,568')
  t.is(fr, '1\u202f234\u202f568')
  t.is(decimals, '1.234.567,89')
})

test('currencyFormat', (t) => {
  const number = 1234567.89
  const br = currencyFormat(number, 'pt-BR', 'BRL')
  const en = currencyFormat(number, 'en-US', 'USD')
  const fr = currencyFormat(number, 'fr-FR', 'EUR')

  t.is(br, 'R$\xa01.234.567,89')
  t.is(en, '$1,234,567.89')
  t.is(fr, '1\u202f234\u202f567,89\xa0€')
})

test('isBetween', (t) => {
  t.true(isBetween(256, 128, 512))
})
