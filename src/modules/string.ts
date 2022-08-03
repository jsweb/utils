export interface SlulgifyOptions {
  lower?: boolean
  upper?: boolean
}

/**
 * Normalizes a string replacing special characters with simpler ASCII equivalents and spaces with dashes.
 * The normalization can be customized by providing a `NormalizeOptions` object as the second argument.
 *
 * @export
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
