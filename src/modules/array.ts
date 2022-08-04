/**
 * Gets a random element from a given array.
 *
 * @export
 * @function getRandomItem
 * @template T Type of the array elements
 * @param {T[]} array Array to get a random element from
 * @return {*} A random element from the array
 */
export function getRandomItem<T>(array: T[]): T {
  const random = Math.random() * array.length
  const index = Math.floor(random)
  return array[index] as T
}
