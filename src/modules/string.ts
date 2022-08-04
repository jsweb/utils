export interface SlulgifyOptions {
  lower?: boolean
  upper?: boolean
}

/**
 * Transforms a string into a slulgified string.
 * Normalizes the string by replacing spaces with dashes and special characters with simpler ASCII equivalents.
 * It is possible to transform the string into full lowercase or full uppercase by setting the `lower` or `upper` options.
 *
 * @export
 * @function slulgify
 * @param {string} text
 * @param {SlulgifyOptions} [options={}]
 * @return {string}
 */
export function slugify(text: string, options: SlulgifyOptions = {}): string {
  if (typeof text !== 'string') return 'not-a-string'

  let result = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (options.lower) result = result.toLowerCase()
  if (options.upper) result = result.toUpperCase()

  return result.trim().replace(/[\W\s]+/g, '-')
}
