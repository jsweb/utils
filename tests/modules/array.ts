import test from 'ava'
import { getRandomItem } from '../../src/modules/array'

test('getRandomItem', (t) => {
  const array = [1, 2, 3, 4, 5]
  const random = getRandomItem(array)
  const exist = array.includes(random)

  t.true(exist)
})
