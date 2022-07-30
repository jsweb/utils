export interface JustFetchSetup {
  baseUrl: string
  headers: RequestInit['headers']
}

const defaultSetup: JustFetchSetup = {
  baseUrl: '',
  headers: {},
}

export class JustFetch {
  private config = defaultSetup

  constructor(config: JustFetchSetup = defaultSetup) {
    this.config = config
  }

  fetch(url: string, init: RequestInit = {}): Promise<Response> {
    const { baseUrl, headers } = this.config
    const fetchUrl = baseUrl + url
    const fetchInit: RequestInit = {
      ...init,
      headers: {
        ...headers,
        ...init.headers,
      },
    }

    return fetch(fetchUrl, fetchInit)
  }

  get(url: string, init?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...init, method: 'GET' })
  }

  post(url: string, init?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...init, method: 'POST' })
  }

  put(url: string, init?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...init, method: 'PUT' })
  }

  patch(url: string, init?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...init, method: 'PATCH' })
  }

  delete(url: string, init?: RequestInit): Promise<Response> {
    return this.fetch(url, { ...init, method: 'DELETE' })
  }

  async fetchJSON(url: string, init?: RequestInit): Promise<any> {
    const res = await this.fetch(url, init)
    const json = await res.json()
    return json
  }

  async getJSON(url: string, init?: RequestInit): Promise<any> {
    const res = await this.get(url, init)
    const json = await res.json()
    return json
  }

  private setRequestInitJSON(init: RequestInit): RequestInit {
    init.headers = {
      ...init.headers,
      'Content-Type': 'application/json',
    }

    if (init.body && typeof init.body === 'object')
      init.body = JSON.stringify(init.body)

    return init
  }

  async postJSON(url: string, init: RequestInit = {}): Promise<any> {
    init = this.setRequestInitJSON(init)

    const res = await this.post(url, init)
    const json = await res.json()
    return json
  }

  async putJSON(url: string, init: RequestInit = {}): Promise<any> {
    init = this.setRequestInitJSON(init)

    const res = await this.put(url, init)
    const json = await res.json()
    return json
  }

  async patchJSON(url: string, init: RequestInit = {}): Promise<any> {
    init = this.setRequestInitJSON(init)

    const res = await this.patch(url, init)
    const json = await res.json()
    return json
  }

  async deleteJSON(url: string, init: RequestInit = {}): Promise<any> {
    init = this.setRequestInitJSON(init)

    const res = await this.delete(url, init)
    const json = await res.json()
    return json
  }
}
