export interface WorkerEnv {
  ASSETS: Fetcher
  [key: string]: any
}

export interface WorkerKV extends KVNamespace {}

export interface SimpleRouterFunctionContext<Env> {
  req: Request
  env: Env
  url: URL
  params: Map<string, string>
}

export interface SimpleRouterWorkerFunction<Env> {
  (context: SimpleRouterFunctionContext<Env>): Response | Promise<Response>
}

export interface SimpleRouterCORS {
  origins: string[]
}

interface SimpleRouterApiMethods {
  GET?: SimpleRouterWorkerFunction<WorkerEnv>
  POST?: SimpleRouterWorkerFunction<WorkerEnv>
  PUT?: SimpleRouterWorkerFunction<WorkerEnv>
  DELETE?: SimpleRouterWorkerFunction<WorkerEnv>
  PATCH?: SimpleRouterWorkerFunction<WorkerEnv>
  HEAD?: SimpleRouterWorkerFunction<WorkerEnv>
  OPTIONS?: SimpleRouterWorkerFunction<WorkerEnv>
}
type HttpMethod = keyof SimpleRouterApiMethods
type SimpleRouterApiMethodsMap = Map<
  HttpMethod,
  SimpleRouterWorkerFunction<WorkerEnv>
>

export class SimpleRouter {
  base = ''
  origins = [] as string[]

  private map = new Map<string, SimpleRouterApiMethodsMap>()

  constructor(base: string, cors?: SimpleRouterCORS) {
    this.base = base

    if (cors) this.origins = cors.origins
  }

  set(path: string, methods: SimpleRouterApiMethods) {
    const endpoint = this.base.concat(path)
    const api = new Map<HttpMethod, SimpleRouterWorkerFunction<WorkerEnv>>()

    for (const method in methods) {
      const handler = methods[method as HttpMethod]
      if (handler instanceof Function) api.set(method as HttpMethod, handler)
    }

    this.map.set(endpoint, api)
  }

  async response(req: Request, env: WorkerEnv, url: URL) {
    const api = this.findByUrlPattern(url)
    const origin = req.headers.get('Origin') as string
    const headers = this.origins.length
      ? ({
          'Access-Control-Allow-Origin': origin,
        } as HeadersInit)
      : undefined

    if (!api)
      return new Response(null, {
        headers,
        status: 404,
        statusText: 'Not found',
      })

    const endpoint = this.map.get(api) as SimpleRouterApiMethodsMap
    const handler = endpoint.get(req.method as HttpMethod)
    const params = this.extractUrlParams(api, url)

    if (handler instanceof Function) {
      const context = { req, env, url, params }
      const response = await handler(context)

      if (this.origins.length)
        response.headers.set('Access-Control-Allow-Origin', origin)

      return response
    } else
      return new Response(null, {
        headers,
        status: 405,
        statusText: 'Method not allowed',
      })
  }

  handler(...routers: SimpleRouter[]) {
    return {
      fetch: async (req: Request, env: WorkerEnv) => {
        const cors = this.checkCORS(req)

        if (!cors)
          return new Response(null, { status: 403, statusText: 'Forbidden' })

        const url = new URL(req.url)
        const instances = [this, ...routers]

        for (const router of instances) {
          const api = url.pathname.startsWith(router.base)
          if (api) return router.response(req, env, url)
        }

        const response = await env.ASSETS.fetch(req)

        if (this.origins.length) {
          const origin = req.headers.get('Origin') as string
          response.headers.set('Access-Control-Allow-Origin', origin)
        }

        return response
      },
    }
  }

  private findByUrlPattern(url: URL) {
    const apis = this.map.keys()

    return Array.from(apis).find((pathname) => {
      const pattern = new URLPattern({ pathname })
      return pattern.test(url)
    })
  }

  private extractUrlParams(pathname: string, url: URL) {
    const keys = pathname.split('/')
    const values = url.pathname.split('/')
    const params = new Map<string, string>()

    keys.forEach((key, i) => {
      if (!key.startsWith(':')) return false

      const name = key.slice(1)
      const value = values[i]
      params.set(name, value)

      return true
    })

    return params
  }

  private checkCORS(req: Request) {
    const mode = req.headers.get('Sec-Fetch-Mode') as string
    const site = req.headers.get('Sec-Fetch-Site') as string
    const navigation = mode.includes('navigate')
    const sameOrigin = site.includes('same')

    if (!this.origins.length) return navigation || sameOrigin

    const all = this.origins.includes('*')
    const origin = req.headers.get('Origin') as string
    const listed = this.origins.includes(origin)

    return navigation || sameOrigin || all || listed
  }
}
