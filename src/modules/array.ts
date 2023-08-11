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

/**
 * Sum all the numeric elements of a given array.
 *
 * @export
 * @function sumValues
 * @param {number[]} array Array of numbers to sum
 * @return {number} Sum of all the numbers in the array
 * @throws {TypeError} If any element of the array is not a number
 * @example
 * sumValues([1, 2, 3]) // 6
 * sumValues([1, 2, 3, '4']) // TypeError
 */
export function sumValues(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}
