import test from 'ava'
import { getCurrentDate, addDays } from '../../src/modules/date'

test('getCurrentDate', (t) => {
  const dt = getCurrentDate()
  t.is(dt.date instanceof Date, true)
  t.is(typeof dt.unix, 'number')
  t.is(typeof dt.json, 'string')
})

test('addDays', (t) => {
  const dt = new Date()
  const newDate = addDays(dt, 5)
  t.is(newDate.date instanceof Date, true)
  t.is(typeof newDate.unix, 'number')
  t.is(typeof newDate.json, 'string')
})
