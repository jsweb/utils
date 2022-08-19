import test from 'ava'
import sinon from 'sinon'
import { JustFetch } from '../../src/web/just-fetch'

let justFetch: JustFetch
let jfetch: sinon.SinonSpy

// Mocks
Object.defineProperties(global, {
  fetch: {
    value: () => sinon.promise(),
  },
  Request: {
    value: sinon.fake(),
  },
  HTMLFormElement: {
    value: sinon.fake(),
  },
  FormData: {
    value: sinon.fake(),
  },
})

test.beforeEach((t) => {
  justFetch = new JustFetch()
  jfetch = sinon.spy(justFetch, 'fetch')
})

test.afterEach(() => {
  sinon.restore()
})

test('should be a class', (t) => {
  t.is(typeof JustFetch, 'function')
})

test('should return an instance of JustFetch', (t) => {
  t.true(justFetch instanceof JustFetch)
})

test('should return an instance of JustFetch with default config', (t) => {
  t.is(justFetch.config.base, '')
  t.deepEqual(justFetch.config.headers, {})
  t.true(justFetch.config.fetch instanceof Function)
})

test('should return an instance of JustFetch with custom config', (t) => {
  const custom = {
    base: 'lorem-ipsum',
    headers: {
      'lorem-ipsum': 'dolor-sit-amet',
    },
  }
  const jf = new JustFetch(custom)

  t.is(jf.config.base, custom.base)
  t.deepEqual(jf.config.headers, custom.headers)
})

test('should set a config.fetch function', (t) => {
  t.is(typeof justFetch.config.fetch, 'function')

  const jf = new JustFetch({ fetch: sinon.fake() })
  t.is(typeof jf.config.fetch, 'function')
})

test('should implement the setURL utility method', (t) => {
  t.is(typeof justFetch.setURL, 'function')
})

test('should implement utilities for HTTP methods', (t) => {
  t.is(typeof justFetch.fetch, 'function')
  t.is(typeof justFetch.get, 'function')
  t.is(typeof justFetch.delete, 'function')
  t.is(typeof justFetch.post, 'function')
  t.is(typeof justFetch.put, 'function')
  t.is(typeof justFetch.patch, 'function')
})

test('should implement the payloadRequestInit utility method', (t) => {
  t.is(typeof justFetch.payloadRequestInit, 'function')
})

// fetch method
test('should return a Promise', (t) => {
  const { request, response } = justFetch.fetch('/')

  t.true(request instanceof Request)
  t.true(response instanceof Promise)
})

test('should call config.fetch with the correct arguments', (t) => {
  const init = {
    headers: {
      'lorem-ipsum': 'dolor-sit-amet',
    },
  }
  const request = sinon.spy(justFetch, 'request')
  const cfetch = sinon.spy(justFetch.config, 'fetch')

  justFetch.fetch('/', init)

  t.true(request.calledWith('/', init))
  t.true(cfetch.calledWith(request.getCall(0).returnValue))
})

// get method
test('should call fetch with GET method', (t) => {
  justFetch.get('/')
  t.true(jfetch.calledWith('/', { method: 'GET' }))
})

test('should call fetch with GET method and params', (t) => {
  const params = { lorem: 'ispum' }
  const url = justFetch.setURL('/', params)

  justFetch.get('/', params)
  t.true(jfetch.calledWith(url, { method: 'GET' }))
})

test('should call fetch with GET method and params and headers', (t) => {
  const params = { lorem: 'ispum' }
  const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
  const url = justFetch.setURL('/', params)
  const init = justFetch.payloadRequestInit('GET', null, headers)

  justFetch.get('/', params, headers)
  t.true(jfetch.calledWith(url, init))
})

// delete method
test('should call fetch with DELETE method', (t) => {
  justFetch.delete('/')
  t.true(jfetch.calledWith('/', { method: 'DELETE' }))
})

test('should call fetch with DELETE method and params', (t) => {
  const params = { lorem: 'ispum' }
  const url = justFetch.setURL('/', params)

  justFetch.delete('/', params)
  t.true(jfetch.calledWith(url, { method: 'DELETE' }))
})

test('should call fetch with DELETE method and params and headers', (t) => {
  const params = { lorem: 'ispum' }
  const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
  const url = justFetch.setURL('/', params)
  const init = justFetch.payloadRequestInit('DELETE', null, headers)

  justFetch.delete('/', params, headers)
  t.true(jfetch.calledWith(url, init))
})

// post method
test('should call fetch with POST method', (t) => {
  justFetch.post('/')
  t.true(jfetch.calledWith('/', { method: 'POST' }))
})

test('should call the fetch method with POST method and body', (t) => {
  const body = { lorem: 'ipsum' }
  const init = justFetch.payloadRequestInit('POST', body)

  justFetch.post('/', body)
  t.true(jfetch.calledWith('/', init))
})

test('should call the fetch method with POST method, body and headers', (t) => {
  const body = { lorem: 'ipsum' }
  const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
  const init = justFetch.payloadRequestInit('POST', body, headers)

  justFetch.post('/', body, headers)
  t.true(jfetch.calledWith('/', init))
})

// put method
test('should call fetch with PUT method', (t) => {
  justFetch.put('/')
  t.true(jfetch.calledWith('/', { method: 'PUT' }))
})

test('should call the fetch method with PUT method and body', (t) => {
  const body = { lorem: 'ipsum' }
  const init = justFetch.payloadRequestInit('PUT', body)

  justFetch.put('/', body)
  t.true(jfetch.calledWith('/', init))
})

test('should call the fetch method with PUT method, body and headers', (t) => {
  const body = { lorem: 'ipsum' }
  const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
  const init = justFetch.payloadRequestInit('PUT', body, headers)

  justFetch.put('/', body, headers)
  t.true(jfetch.calledWith('/', init))
})

// patch method
test('should call fetch with PATCH method', (t) => {
  justFetch.patch('/')
  t.true(jfetch.calledWith('/', { method: 'PATCH' }))
})

test('should call the fetch method with PATCH method and body', (t) => {
  const body = { lorem: 'ipsum' }
  const init = justFetch.payloadRequestInit('PATCH', body)

  justFetch.patch('/', body)
  t.true(jfetch.calledWith('/', init))
})

test('should call the fetch method with PATCH method, body and headers', (t) => {
  const body = { lorem: 'ipsum' }
  const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
  const init = justFetch.payloadRequestInit('PATCH', body, headers)

  justFetch.patch('/', body, headers)
  t.true(jfetch.calledWith('/', init))
})
