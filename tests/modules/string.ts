import test from 'ava'
import { slugify, SlulgifyOptions, template } from '../../src/modules/string'

test('slugify', (t) => {
  const s1 = 'Hello World'
  const s2 = 'Alex Bruno Cáceres'
  const s3 = 'Promoção Relâmpago'
  const lower: SlulgifyOptions = { lower: true }
  const upper: SlulgifyOptions = { upper: true }

  t.is(slugify(s1), 'Hello-World')
  t.is(slugify(s1, lower), 'hello-world')
  t.is(slugify(s1, upper), 'HELLO-WORLD')

  t.is(slugify(s2), 'Alex-Bruno-Caceres')
  t.is(slugify(s2, lower), 'alex-bruno-caceres')
  t.is(slugify(s2, upper), 'ALEX-BRUNO-CACERES')

  t.is(slugify(s3), 'Promocao-Relampago')
  t.is(slugify(s3, lower), 'promocao-relampago')
  t.is(slugify(s3, upper), 'PROMOCAO-RELAMPAGO')

  t.is(slugify(null), 'not-a-string')
  t.is(slugify(undefined), 'not-a-string')
  t.is(slugify(NaN), 'not-a-string')
  t.is(slugify(Infinity), 'not-a-string')
  t.is(slugify(true), 'not-a-string')
  t.is(slugify(false), 'not-a-string')
  t.is(slugify(0), 'not-a-string')
  t.is(slugify(1), 'not-a-string')
  t.is(slugify([]), 'not-a-string')
  t.is(slugify({}), 'not-a-string')
})

test('template', (t) => {
  const r1 = template('Hello ${name}!', { name: 'World' })
  const r2 = template('Lorem ${ipsum} dolor ${sit} amet', {
    ipsum: 'ipsum',
    sit: 'sit',
  })

  t.is(r1, 'Hello World!')
  t.is(r2, 'Lorem ipsum dolor sit amet')
})
