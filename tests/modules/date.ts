import test from 'ava'
import {
  getCurrentDateTime,
  addDays,
  subtractDays,
} from '../../src/modules/date'

test('getCurrentDateTime', (t) => {
  const dt = getCurrentDateTime()
  t.is(dt.date instanceof Date, true)
  t.is(typeof dt.unix, 'number')
  t.is(typeof dt.json, 'string')
})

test('addDays', (t) => {
  const dt = getCurrentDateTime()
  const result = addDays(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('subtractDays', (t) => {
  const dt = getCurrentDateTime()
  const result = subtractDays(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})
