type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type MapRequestMethods = {
  [method in Methods]?: PagesFunction
}

/**
 * Map handler to set request methods for Cloudflare's Page Functions API.
 * Any HTTP method not mapped will automatically respond with a 405: Method Not Allowed.
 *
 * @export
 * @function setRequestMethods
 * @param {EventContext<unknown, any, Record<string, unknown>>} ctx Page Functions Event context
 * @param {MapRequestMethods} map Map of request methods to handler functions
 * @return {Response|Promise<Response>} The response for the request
 */
export function setRequestMethods(
  ctx: EventContext<unknown, any, Record<string, unknown>>,
  map: MapRequestMethods
): Response | Promise<Response> {
  const method = ctx.request.method.toUpperCase() as Methods
  const handler: PagesFunction | undefined = map[method]

  if (handler instanceof Function) return handler(ctx)

  return new Response('Method not allowed', { status: 405 })
}

/**
 * Utility method to send JSON response from Cloudflare's Page Functions.
 * The data object will be JSON encoded and sent in the response body with proper content type header.
 *
 * @export
 * @function ResponseJSON
 * @param {*} data Data to send in the response
 * @return {Response} Response with JSON encoded data
 */
export function ResponseJSON(data: any = {}): Response {
  const json = JSON.stringify(data)
  return new Response(json, {
    headers: { 'Content-Type': 'application/json' },
  })
}
