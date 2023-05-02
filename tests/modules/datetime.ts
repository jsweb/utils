import test from 'ava'
import {
  getCurrentDateTime,
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
  addYears,
  subtractYears,
  addHours,
  subtractHours,
  addMinutes,
  subtractMinutes,
  dateFormat,
  timeFormat,
} from '../../src/modules/datetime'

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

test('addMonths', (t) => {
  const dt = getCurrentDateTime()
  const result = addMonths(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('subtractMonths', (t) => {
  const dt = getCurrentDateTime()
  const result = subtractMonths(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('addYears', (t) => {
  const dt = getCurrentDateTime()
  const result = addYears(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('subtractYears', (t) => {
  const dt = getCurrentDateTime()
  const result = subtractYears(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('addHours', (t) => {
  const dt = getCurrentDateTime()
  const result = addHours(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('subtractHours', (t) => {
  const dt = getCurrentDateTime()
  const result = subtractHours(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('addMinutes', (t) => {
  const dt = getCurrentDateTime()
  const result = addMinutes(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('subtractMinutes', (t) => {
  const dt = getCurrentDateTime()
  const result = subtractMinutes(dt.unix, 5)
  t.is(result.date instanceof Date, true)
  t.is(typeof result.unix, 'number')
  t.is(typeof result.json, 'string')
})

test('dateFormat', (t) => {
  const dt = getCurrentDateTime()
  const result = dateFormat(dt.unix, 'en-US')
  t.is(typeof result, 'string')
})

test('timeFormat', (t) => {
  const dt = getCurrentDateTime()
  const result = timeFormat(dt.unix, 'en-US')
  t.is(typeof result, 'string')
})
