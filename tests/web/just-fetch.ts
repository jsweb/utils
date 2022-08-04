import { JustFetch, JustFetchConfig } from '../../src/web/just-fetch'

describe('JustFetch', () => {
  let justFetch: JustFetch
  let jfetch: jest.SpyInstance
  const config: JustFetchConfig = {
    base: '',
    headers: {},
    fetch: (...args) => fetch(...args),
  }

  beforeEach(() => {
    justFetch = new JustFetch()
    jfetch = jest.spyOn(justFetch, 'fetch')
  })

  it('should be defined', () => {
    expect(JustFetch).toBeDefined()
  })

  it('should be a class', () => {
    expect(typeof JustFetch).toBe('function')
  })

  it('should return an instance of JustFetch', () => {
    expect(justFetch).toBeInstanceOf(JustFetch)
  })

  it('should return an instance of JustFetch with default config', () => {
    expect(justFetch.config.base).toBe('')
    expect(justFetch.config.headers).toEqual({})
    expect(justFetch.config.fetch).toBeInstanceOf(Function)
  })

  it('should return an instance of JustFetch with custom config', () => {
    const custom = {
      base: 'lorem-ipsum',
      headers: {
        'lorem-ipsum': 'dolor-sit-amet',
      },
    }
    const justFetch = new JustFetch(custom)

    expect(justFetch.config.base).toBe(custom.base)
    expect(justFetch.config.headers).toEqual(custom.headers)
  })

  it('should set a config.fetch function', () => {
    expect(justFetch.config.fetch).toBeDefined()
    expect(typeof justFetch.config.fetch).toBe('function')

    const jf = new JustFetch({ fetch: jest.fn() })
    expect(justFetch.config.fetch).toBeDefined()
    expect(typeof justFetch.config.fetch).toBe('function')
  })

  it('should implement the setURL utility method', () => {
    expect(justFetch.setURL).toBeDefined()
    expect(typeof justFetch.setURL).toBe('function')
  })

  it('should implement utilities for HTTP methods', () => {
    expect(typeof justFetch.fetch).toBe('function')
    expect(typeof justFetch.get).toBe('function')
    expect(typeof justFetch.delete).toBe('function')
    expect(typeof justFetch.post).toBe('function')
    expect(typeof justFetch.put).toBe('function')
    expect(typeof justFetch.patch).toBe('function')
  })

  it('should implement the payloadRequestInit utility method', () => {
    expect(justFetch.payloadRequestInit).toBeDefined()
    expect(typeof justFetch.payloadRequestInit).toBe('function')
  })

  it('should implement utilities for HTTP methods parsing response as JSON', () => {
    expect(typeof justFetch.fetchJSON).toBe('function')
    expect(typeof justFetch.getJSON).toBe('function')
    expect(typeof justFetch.deleteJSON).toBe('function')
    expect(typeof justFetch.postJSON).toBe('function')
    expect(typeof justFetch.putJSON).toBe('function')
    expect(typeof justFetch.patchJSON).toBe('function')
  })

  describe('fetch method', () => {
    it('should return a Promise', () => {
      const resp = justFetch.fetch('/')
      expect(resp).toBeInstanceOf(Promise)
    })

    it('should call config.fetch with the correct arguments', () => {
      const init = {
        headers: {
          'lorem-ipsum': 'dolor-sit-amet',
        },
      }
      const spy = jest.spyOn(justFetch.config, 'fetch')

      justFetch.fetch('/', init)
      expect(spy).toHaveBeenCalledWith('/', init)
    })
  })

  describe('get method', () => {
    it('should call fetch with GET method', () => {
      justFetch.get('/')
      expect(jfetch).toHaveBeenCalledWith('/', { method: 'GET' })
    })

    it('should call fetch with GET method and params', () => {
      const params = { lorem: 'ispum' }
      const url = justFetch.setURL('/', params)

      justFetch.get('/', params)
      expect(jfetch).toHaveBeenCalledWith(url, { method: 'GET' })
    })

    it('should call fetch with GET method and params and headers', () => {
      const params = { lorem: 'ispum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const url = justFetch.setURL('/', params)
      const init = justFetch.payloadRequestInit('GET', null, headers)

      justFetch.get('/', params, headers)
      expect(jfetch).toHaveBeenCalledWith(url, init)
    })
  })

  describe('delete method', () => {
    it('should call fetch with DELETE method', () => {
      justFetch.delete('/')
      expect(jfetch).toHaveBeenCalledWith('/', { method: 'DELETE' })
    })

    it('should call fetch with DELETE method and params', () => {
      const params = { lorem: 'ispum' }
      const url = justFetch.setURL('/', params)

      justFetch.delete('/', params)
      expect(jfetch).toHaveBeenCalledWith(url, { method: 'DELETE' })
    })

    it('should call fetch with DELETE method and params and headers', () => {
      const params = { lorem: 'ispum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const url = justFetch.setURL('/', params)
      const init = justFetch.payloadRequestInit('DELETE', null, headers)

      justFetch.delete('/', params, headers)
      expect(jfetch).toHaveBeenCalledWith(url, init)
    })
  })

  describe('post method', () => {
    it('should call fetch with POST method', () => {
      justFetch.post('/')
      expect(jfetch).toHaveBeenCalledWith('/', { method: 'POST' })
    })

    it('should call the fetch method with POST method and body', () => {
      const body = { lorem: 'ipsum' }
      const init = justFetch.payloadRequestInit('POST', body)

      justFetch.post('/', body)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })

    it('should call the fetch method with POST method, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const init = justFetch.payloadRequestInit('POST', body, headers)

      justFetch.post('/', body, headers)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })
  })

  describe('put method', () => {
    it('should call fetch with PUT method', () => {
      justFetch.put('/')
      expect(jfetch).toHaveBeenCalledWith('/', { method: 'PUT' })
    })

    it('should call the fetch method with PUT method and body', () => {
      const body = { lorem: 'ipsum' }
      const init = justFetch.payloadRequestInit('PUT', body)

      justFetch.put('/', body)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })

    it('should call the fetch method with PUT method, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const init = justFetch.payloadRequestInit('PUT', body, headers)

      justFetch.put('/', body, headers)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })
  })

  describe('patch method', () => {
    it('should call fetch with PATCH method', () => {
      justFetch.patch('/')
      expect(jfetch).toHaveBeenCalledWith('/', { method: 'PATCH' })
    })

    it('should call the fetch method with PATCH method and body', () => {
      const body = { lorem: 'ipsum' }
      const init = justFetch.payloadRequestInit('PATCH', body)

      justFetch.patch('/', body)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })

    it('should call the fetch method with PATCH method, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const init = justFetch.payloadRequestInit('PATCH', body, headers)

      justFetch.patch('/', body, headers)
      expect(jfetch).toHaveBeenCalledWith('/', init)
    })
  })

  describe('fetchJSON method', () => {
    it('should call fetch method with url and init object', () => {
      const url = '/'
      const init: RequestInit = {
        headers: {
          'lorem-ipsum': 'dolor-sit-amet',
        },
      }

      justFetch.fetchJSON(url, init)
      expect(jfetch).toHaveBeenCalledWith(url, init)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.fetchJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })

  describe('getJSON method', () => {
    it('should call get method with url, params and headers', () => {
      const params = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const spy = jest.spyOn(justFetch, 'get')

      justFetch.getJSON('/', params, headers)
      expect(spy).toHaveBeenCalledWith('/', params, headers)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.getJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })

  describe('deleteJSON method', () => {
    it('should call delete method with url, params and headers', () => {
      const params = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const spy = jest.spyOn(justFetch, 'delete')

      justFetch.deleteJSON('/', params, headers)
      expect(spy).toHaveBeenCalledWith('/', params, headers)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.deleteJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })

  describe('postJSON method', () => {
    it('should call post method with url, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const spy = jest.spyOn(justFetch, 'post')

      justFetch.postJSON('/', body, headers)
      expect(spy).toHaveBeenCalledWith('/', body, headers)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.postJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })

  describe('putJSON method', () => {
    it('should call put method with url, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const spy = jest.spyOn(justFetch, 'put')

      justFetch.putJSON('/', body, headers)
      expect(spy).toHaveBeenCalledWith('/', body, headers)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.putJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })

  describe('patchJSON method', () => {
    it('should call patch method with url, body and headers', () => {
      const body = { lorem: 'ipsum' }
      const headers = { 'lorem-ipsum': 'dolor-sit-amet' }
      const spy = jest.spyOn(justFetch, 'patch')

      justFetch.patchJSON('/', body, headers)
      expect(spy).toHaveBeenCalledWith('/', body, headers)
    })

    it('should return a Promise<JSON>', async () => {
      const resp = justFetch.patchJSON('/')
      expect(resp).toBeInstanceOf(Promise)

      const json = await resp
      expect(json).toEqual({})
    })
  })
})
