import { equal } from 'assert'
import { getPropertyValue } from '../../src/modules/object'

test('getPropertyValue', () => {
  const obj = {
    a: {
      b: {
        c: {
          d: 0,
          e: 'test',
        },
      },
    },
  }
  const t1 = getPropertyValue(obj, 'a.b.c.d')
  const t2 = getPropertyValue(obj, 'a.b.c.e')
  const t3 = getPropertyValue(obj, 'a.b.c.d.e')
  const t4 = getPropertyValue(obj, 'a.b.c.d.e', 'default')
  const t5 = getPropertyValue(obj, ['a', 'b', 'c', 'e'])

  equal(t1, 0)
  equal(t2, 'test')
  equal(t3, undefined)
  equal(t4, 'default')
  equal(t5, 'test')
})
