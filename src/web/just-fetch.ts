import { serialize } from '@jsweb/params'

export interface JustFetchConfig {
  base?: string
  headers?: Headers | HeadersInit
  fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

export interface JustFetchWrapper {
  request: Request
  response: Promise<Response>
}

/**
 * JustFetch is a simple wrapper around the Fetch API.
 * It provides a simple way to make HTTP requests and parse the response as JSON with useful methods.
 * The constructor accepts a configuration object to create an instance of JustFetch with custom setup options to be used by all methods.
 * Support for a custom base fetch function to be used by the instance, but it needs to match the Fetch API. Useful for Node.js, tests, mocks, etc.
 *
 * @export
 * @class JustFetch
 * @implements {JustFetchConfig}
 * @implements {Fetch}
 * @implements {Fetchable}
 */
export class JustFetch {
  config: JustFetchConfig = {
    base: '',
    headers: {},
  }

  /**
   * Creates an instance of JustFetch.
   * @param {JustFetchConfig} [config={}] The configuration object to setup the instance.
   * @instance JustFetch
   */
  constructor(config: JustFetchConfig = {} as JustFetchConfig) {
    if (config.base) this.config.base = config.base
    if (config.headers) this.config.headers = config.headers

    this.config.fetch = (...args) => {
      if (typeof config.fetch === 'function') return config.fetch(...args)
      else if (typeof fetch === 'function') return fetch(...args)
      else throw new Error('Fetch API is not defined')
    }
  }

  /**
   * Just a wrapper around the Request API to make HTTP requests.
   *
   * @param {string} url
   * @param {RequestInit} [init={}]
   * @return {Request}  {Request}
   * @memberof JustFetch
   */
  request(url: string, init: RequestInit = {}): Request {
    const { base, headers } = this.config
    const target = base + url
    const config: RequestInit = {
      ...init,
      headers: {
        ...headers,
        ...init.headers,
      },
    }

    return new Request(target, config)
  }

  /**
   * Just a wrapper around the fetch API using the JustFetch instance configuration.
   *
   * @param {string} url The URL to fetch.
   * @param {RequestInit} [init={}] The RequestInit object to use.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  fetch(url: string, init: RequestInit = {}): JustFetchWrapper {
    if (!this.config.fetch) throw new Error('Fetch API is not defined')

    const request = this.request(url, init)
    const response = this.config.fetch(request)

    return { request, response }
  }

  /**
   * Utility method to properly set an URL with or without a query string.
   * The params object, when declared, is serialized and added to the URL as query string.
   * The params serialization is done using the URLSearchParams class.
   *
   * @param {string} url The URL to set.
   * @param {Record<string, any> | null} [params] The params object to serialize and add to the URL as query string.
   * @return {string} The URL with or without a query string.
   * @memberof JustFetch
   */
  setURL(url: string, params?: Record<string, any> | null): string {
    if (!params) return url

    const query = serialize(params)

    return query ? `${url}?${query}` : url
  }

  /**
   * Utility method to create a RequestInit object with or without a body payload and properly set the content type header depending on the data type.
   *
   * If the data is FormData, it is just set as body payload.
   *
   * If the data is HTMLFormElement, it is instantiated as a FormData and set as body payload.
   *
   * If the data is plain object, it is serialized as JSON and set as body payload.
   *
   * For any other data type, the data is set as body payload and custom content type header can be set in the headers object.
   *
   * @param {string} method The request method.
   * @param {(Record<string, any> | FormData | HTMLFormElement | BodyInit | null)} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the RequestInit object.
   * @return {RequestInit} RequestInit
   * @memberof JustFetch
   */
  payloadRequestInit(
    method: string,
    data?: Record<string, any> | FormData | HTMLFormElement | BodyInit | null,
    headers?: Headers | HeadersInit
  ): RequestInit {
    let init: RequestInit = { method }

    if (headers) init = { ...init, headers }

    if (data) {
      if (data instanceof FormData) {
        init.body = data
      } else if (data instanceof HTMLFormElement) {
        init.body = new FormData(data)
      } else if (typeof data === 'object') {
        init.body = JSON.stringify(data)
        init.headers = {
          ...init.headers,
          'Content-Type': 'application/json',
        }
      } else init.body = data
    }

    return init
  }

  /**
   * Just a wrapper around the fetch method locking the request method to GET.
   * The url and params are processed by the setURL method to properly set the URL with or without a query string.
   *
   * @param {string} url The URL to fetch.
   * @param {Record<string, any> | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  get(
    url: string,
    params?: Record<string, any> | null,
    headers?: Headers | HeadersInit
  ): JustFetchWrapper {
    const result = this.setURL(url, params)
    const init = this.payloadRequestInit('GET', null, headers)
    return this.fetch(result, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to DELETE.
   * The url and params are processed by the setURL method to properly set the URL with or without a query string.
   *
   * @param {string} url The URL to fetch.
   * @param {Record<string, any> | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  delete(
    url: string,
    params?: Record<string, any> | null,
    headers?: Headers | HeadersInit
  ): JustFetchWrapper {
    const result = this.setURL(url, params)
    const init = this.payloadRequestInit('DELETE', null, headers)
    return this.fetch(result, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to POST.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {Record<string, any> | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  post(
    url: string,
    data?: Record<string, any> | HTMLFormElement | FormData | BodyInit | null,
    headers?: Headers | HeadersInit
  ): JustFetchWrapper {
    const init = this.payloadRequestInit('POST', data, headers)
    return this.fetch(url, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to PUT.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {Record<string, any> | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  put(
    url: string,
    data?: Record<string, any> | HTMLFormElement | FormData | BodyInit | null,
    headers?: Headers | HeadersInit
  ): JustFetchWrapper {
    const init = this.payloadRequestInit('PUT', data, headers)
    return this.fetch(url, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to PATCH.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {Record<string, any> | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {JustFetchWrapper} JustFetchWrapper: { request: Request, response: Promise<Response> }
   * @memberof JustFetch
   */
  patch(
    url: string,
    data?: Record<string, any> | HTMLFormElement | FormData | BodyInit | null,
    headers?: Headers | HeadersInit
  ): JustFetchWrapper {
    const init = this.payloadRequestInit('PATCH', data, headers)
    return this.fetch(url, init)
  }
}
