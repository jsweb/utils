import { equal } from 'assert'
import { getRandomItem } from '../../src/modules/array'

test('getRandomItem', () => {
  const array = [1, 2, 3, 4, 5]
  const random = getRandomItem(array)
  const exist = array.includes(random)

  equal(exist, true)
})
