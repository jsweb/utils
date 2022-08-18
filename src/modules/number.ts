/**
 * Formats a given number to a localized string.
 *
 * @export
 * @function formatNumber
 * @param {number} number A number or a numeric string
 * @param {string} locale A locale code
 * @param {number} [decimals=0] The number of decimals, defaults to 0
 * @return {string} The number formatted
 */
export function formatNumber(
  number: number,
  locale: string,
  decimals: number = 0
): string {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return formatter.format(number)
}

/**
 * Formats a given number to a localized currency string.
 *
 * @export
 * @function formatCurrency
 * @param {number} number A number or a numeric string
 * @param {string} locale A locale code
 * @param {string} currency A currency code
 * @param {number} [decimals=0] The number of decimals, defaults to 2
 * @return {string} The currency value formatted
 */
export function formatCurrency(
  number: number,
  locale: string,
  currency: string,
  decimals: number = 2
): string {
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return formatter.format(number)
}

/**
 * Checks if a given number is between two other numbers (inclusive).
 *
 * @export
 * @function isBetween
 * @param {number} number A number or a numeric string
 * @param {number} min The minimum number
 * @param {number} max The maximum number
 * @return {boolean}
 */
export function isBetween(
  number: number | string,
  min: number | string,
  max: number | string
): boolean {
  return number >= min && number <= max
}
