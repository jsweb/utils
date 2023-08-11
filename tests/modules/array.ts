import test from 'ava'
import { getRandomItem, sumValues } from '../../src/modules/array'

test('getRandomItem', (t) => {
  const array = [1, 2, 3, 4, 5]
  const random = getRandomItem(array)
  const exist = array.includes(random)

  t.true(exist)
})

test('sumValues', (t) => {
  const array = [1, 2, 3, 4, 5]
  const sum = sumValues(array)

  t.is(sum, 15)
})
