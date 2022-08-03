export interface JustFetchConfig {
  base?: string
  headers?: Headers | HeadersInit
  fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

/**
 * JustFetch is a simple wrapper around the Fetch API.
 * It provides a simple way to make HTTP requests and parse the response as JSON with useful methods.
 * The constructor accepts a configuration object to create an instance of JustFetch with custom setup options to be used by all methods.
 * Support for a custom base fetch function to be used by the instance, but it needs to match the Fetch API. Useful for Node.js, tests, mocks, etc.
 *
 * @export {class} JustFetch
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

    if (config.fetch) this.config.fetch = config.fetch
    else if (typeof fetch === 'function') this.config.fetch = fetch
  }

  /**
   * Just a wrapper around the fetch API using the JustFetch instance configuration.
   *
   * @param {string} url The URL to fetch.
   * @param {RequestInit} [init={}] The RequestInit object to use.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  fetch(url: string, init: RequestInit = {}): Promise<Response> {
    if (!this.config.fetch) throw new Error('Fetch API is not defined')

    const { base, headers } = this.config
    const fetchUrl = base + url
    const fetchInit: RequestInit = {
      ...init,
      headers: {
        ...headers,
        ...init.headers,
      },
    }

    return this.config.fetch(fetchUrl, fetchInit)
  }

  /**
   * Utility method to properly set an URL with or without a query string.
   * The params object, when declared, is serialized and added to the URL as query string.
   * The params serialization is done using the URLSearchParams class.
   *
   * @param {string} url The URL to set.
   * @param {{ [key: string]: any } | null} [params] The params object to serialize and add to the URL as query string.
   * @return {string} The URL with or without a query string.
   * @memberof JustFetch
   */
  setURL(url: string, params?: { [key: string]: any } | null): string {
    if (!params) return url

    const query = new URLSearchParams()

    for (const key in params) query.append(key, params[key])

    const result = query.toString()

    return result ? `${url}?${result}` : url
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
   * @param {({ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null)} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the RequestInit object.
   * @return {RequestInit} RequestInit
   * @memberof JustFetch
   */
  payloadRequestInit(
    method: string,
    data?:
      | { [key: string]: any }
      | FormData
      | HTMLFormElement
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): RequestInit {
    let init: RequestInit = { method }

    if (headers) init = { ...init, headers }

    if (data) {
      if (data instanceof FormData) {
        init.body = data
        init.headers = {
          ...init.headers,
          'Content-Type': 'multipart/form-data',
        }
      } else if (data instanceof HTMLFormElement) {
        init.body = new FormData(data)
        init.headers = {
          ...init.headers,
          'Content-Type': 'multipart/form-data',
        }
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
   * @param {{ [key: string]: any } | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  get(
    url: string,
    params?: { [key: string]: any } | null,
    headers?: Headers | HeadersInit
  ): Promise<Response> {
    const result = this.setURL(url, params)
    const init = this.payloadRequestInit('GET', null, headers)
    return this.fetch(result, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to DELETE.
   * The url and params are processed by the setURL method to properly set the URL with or without a query string.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  delete(
    url: string,
    params?: { [key: string]: any } | null,
    headers?: Headers | HeadersInit
  ): Promise<Response> {
    const result = this.setURL(url, params)
    const init = this.payloadRequestInit('DELETE', null, headers)
    return this.fetch(result, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to POST.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  post(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<Response> {
    const init = this.payloadRequestInit('POST', data, headers)
    return this.fetch(url, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to PUT.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  put(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<Response> {
    const init = this.payloadRequestInit('PUT', data, headers)
    return this.fetch(url, init)
  }

  /**
   * Just a wrapper around the fetch method locking the request method to PATCH.
   * The data and headers objects are processed by the payloadRequestInit method and properly set as RequestInit.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  patch(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<Response> {
    const init = this.payloadRequestInit('PATCH', data, headers)
    return this.fetch(url, init)
  }

  /**
   * Just a wrapper around the fetch method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {RequestInit} [init] The RequestInit object to pass to the fetch method.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async fetchJSON(url: string, init?: RequestInit): Promise<any> {
    const resp = await this.fetch(url, init)
    const json = await resp.json()
    return json
  }

  /**
   * Just a wrapper around the get method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async getJSON(
    url: string,
    params?: { [key: string]: any } | null,
    headers?: Headers | HeadersInit
  ): Promise<any> {
    const resp = await this.get(url, params, headers)
    const json = await resp.json()
    return json
  }

  /**
   * Just a wrapper around the delete method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | null} [params] The params object to serialize and add to the URL as query string.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async deleteJSON(
    url: string,
    params?: { [key: string]: any } | null,
    headers?: Headers | HeadersInit
  ): Promise<any> {
    const resp = await this.delete(url, params, headers)
    const json = await resp.json()
    return json
  }

  /**
   * Just a wrapper around the post method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async postJSON(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<any> {
    const resp = await this.post(url, data, headers)
    const json = await resp.json()
    return json
  }

  /**
   * Just a wrapper around the put method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async putJSON(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<any> {
    const resp = await this.put(url, data, headers)
    const json = await resp.json()
    return json
  }

  /**
   * Just a wrapper around the patch method parsing the response as JSON.
   *
   * @param {string} url The URL to fetch.
   * @param {{ [key: string]: any } | FormData | HTMLFormElement | BodyInit | null} [data] The data object to set as body payload.
   * @param {Headers} [headers] The headers object to set in the request headers.
   * @return {Promise} Promise
   * @memberof JustFetch
   */
  async patchJSON(
    url: string,
    data?:
      | { [key: string]: any }
      | HTMLFormElement
      | FormData
      | BodyInit
      | null,
    headers?: Headers | HeadersInit
  ): Promise<any> {
    const resp = await this.patch(url, data, headers)
    const json = await resp.json()
    return json
  }
}
