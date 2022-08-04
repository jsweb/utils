import { ResponseJSON, setRequestMethods } from '../../src/web/cloudflare'

test('ResponseJSON', () => {
  const response = ResponseJSON()
  expect(response).toBeInstanceOf(Response)
})

test('setRequestMethods', () => {
  const map = { GET: () => ResponseJSON() }
  const ctx = {
    request: {
      method: 'get',
    },
  }

  const response = setRequestMethods(ctx, map)
  expect(response).toBeInstanceOf(Response)
})
