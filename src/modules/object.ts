// Function to get the value of a deep property in a given object or return a default value if it doesn't exist
export function getPropertyValue<T>(
  obj: any,
  path: string,
  value?: T
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

  return current
}
