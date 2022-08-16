import { slugify, SlulgifyOptions, template } from '../../src/modules/string'

test('slugify', () => {
  const s1 = 'Hello World'
  const s2 = 'Alex Bruno Cáceres'
  const s3 = 'Promoção Relâmpago'
  const lower: SlulgifyOptions = { lower: true }
  const upper: SlulgifyOptions = { upper: true }

  expect(slugify(s1)).toBe('Hello-World')
  expect(slugify(s1, lower)).toBe('hello-world')
  expect(slugify(s1, upper)).toBe('HELLO-WORLD')

  expect(slugify(s2)).toBe('Alex-Bruno-Caceres')
  expect(slugify(s2, lower)).toBe('alex-bruno-caceres')
  expect(slugify(s2, upper)).toBe('ALEX-BRUNO-CACERES')

  expect(slugify(s3)).toBe('Promocao-Relampago')
  expect(slugify(s3, lower)).toBe('promocao-relampago')
  expect(slugify(s3, upper)).toBe('PROMOCAO-RELAMPAGO')

  expect(slugify(0)).toBe('not-a-string')
  expect(slugify({})).toBe('not-a-string')
  expect(slugify([])).toBe('not-a-string')
})

test('template', () => {
  const r1 = template('Hello ${name}!', { name: 'World' })
  const r2 = template('Lorem ${ipsum} dolor ${sit} amet', {
    ipsum: 'ipsum',
    sit: 'sit',
  })

  expect(r1).toBe('Hello World!')
  expect(r2).toBe('Lorem ipsum dolor sit amet')
})
