/**
 * Gets a random element from a given array.
 *
 * @export {function} getRandomItem
 * @template T
 * @param {T[]} array
 * @return {*} A random element from the array.
 */
export function getRandomItem<T>(array: T[]): T {
  const random = Math.random() * array.length
  const index = Math.floor(random)
  return array[index] as T
}
