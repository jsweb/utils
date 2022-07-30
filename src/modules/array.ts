// Function to get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  const random = Math.random() * array.length
  const index = Math.floor(random)
  return array[index]
}
