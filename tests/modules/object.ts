import test from 'ava'
import { getPropertyValue } from '../../src/modules/object'

test('getPropertyValue', (t) => {
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
  const def = 'default'
  const t1 = getPropertyValue(obj, 'a.b.c.d')
  const t2 = getPropertyValue(obj, 'a.b.c.e')
  const t3 = getPropertyValue(obj, 'a.b.c.d.e')
  const t4 = getPropertyValue(obj, 'a.b.c.d.e', def)
  const t5 = getPropertyValue(obj, ['a', 'b', 'c', 'e'])

  t.is(t1, obj.a.b.c.d)
  t.is(t2, obj.a.b.c.e)
  t.is(t3, undefined)
  t.is(t4, def)
  t.is(t5, obj.a.b.c.e)
})
