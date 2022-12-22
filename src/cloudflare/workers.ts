export interface WorkerEnv {
  ASSETS: Fetcher
  [key: string]: any
}

export interface FunctionParams<Env> {
  req: Request
  env: Env
  url: URL
}

export interface WorkerFunction<Env> {
  (params: FunctionParams<Env>): Response | Promise<Response>
}

export interface ApiMethods {
  GET?: WorkerFunction<any>
  POST?: WorkerFunction<any>
  PUT?: WorkerFunction<any>
  DELETE?: WorkerFunction<any>
  PATCH?: WorkerFunction<any>
  HEAD?: WorkerFunction<any>
  OPTIONS?: WorkerFunction<any>
}
export type HttpMethod = keyof ApiMethods

type ApiMethodsMap = Map<HttpMethod, WorkerFunction<WorkerEnv>>

export class SimpleRouter {
  base = ''
  private map = new Map<string, ApiMethodsMap>()

  constructor(base: string) {
    this.base = base
  }

  set(path: string, methods: ApiMethods) {
    const endpoint = this.base + path
    const apis = new Map<HttpMethod, WorkerFunction<any>>()
    const keys = Object.keys(methods) as HttpMethod[]

    keys.forEach((method) => {
      const handler = methods[method]
      if (handler instanceof Function) apis.set(method, handler)
    })

    this.map.set(endpoint, apis)
  }

  response(req: Request, env: WorkerEnv, url: URL) {
    const endpoint = this.map.get(url.pathname)
    if (!endpoint)
      return new Response(null, { status: 404, statusText: 'Not found' })

    const handler = endpoint.get(req.method as HttpMethod)
    if (handler instanceof Function) return handler({ req, env, url })
    else
      return new Response(null, {
        status: 405,
        statusText: 'Method not allowed',
      })
  }

  handler(...routers: SimpleRouter[]) {
    return {
      fetch: (req: Request, env: WorkerEnv) => {
        const url = new URL(req.url)
        const instances = [this, ...routers]

        for (const router of instances) {
          const api = url.pathname.startsWith(router.base)
          if (api) return router.response(req, env, url)
        }

        return env.ASSETS.fetch(req)
      },
    }
  }
}
