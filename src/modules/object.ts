/**
 * Gets the value of a deep property path in a given object or returns a default value if it doesn't exist.
 * If a default value is not provided, undefined is returned by default.
 * This is exacly the same as `lodash.get(object, path, value)` but this is made with cleaner, smarter and modern code,
 * with no bloat imports like the lodash method.
 *
 * @export
 * @function getPropertyValue
 * @template T
 * @param {*} obj
 * @param {string} path
 * @param {*} [value]
 * @return {*} The extracted value, the default value or undefined.
 */
export function getPropertyValue<T>(
  obj: any,
  path: string | string[],
  value?: any
): T | undefined {
  let current = obj

  const split = (key: string) =>
    key
      .toString()
      .split('.')
      .filter((k) => k)

  const keys = Array.isArray(path) ? path.flatMap(split) : split(path)

  for (const key of keys) {
    if (current[key] === undefined) return value
    current = current[key]
  }

  return current as T
}
