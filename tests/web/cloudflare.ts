import test from 'ava'
import sinon from 'sinon'
import { ResponseJSON, setRequestMethods } from '../../src/web/cloudflare'

Object.defineProperties(global, {
  Response: {
    value: sinon.fake(),
  },
})

test('ResponseJSON', (t) => {
  const response = ResponseJSON()
  t.true(response instanceof Response)
})

test('setRequestMethods', (t) => {
  const map = { GET: () => ResponseJSON() }
  const ctx = {
    request: {
      method: 'get',
    },
  }
  const response = setRequestMethods(ctx, map)

  t.true(response instanceof Response)
})
