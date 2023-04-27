interface CurrentDateTime {
  date: Date
  unix: number
  json: string
}

/**
 * Gets current date and time in 3 basic formats: Date, Unix and JSON.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = getCurrentDate()
 * console.log(date)
 * // { date: 2021-08-15T18:00:00.000Z, unix: 1629043200000, json: '2021-08-15T18:00:00.000Z' }
 */
export function getCurrentDateTime(): CurrentDateTime {
  const date = new Date()
  const unix = date.getTime()
  const json = date.toJSON()
  return { date, unix, json }
}

/**
 * Receives a Date object and adds a given amount of days to it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 *
 * @param {Date|number|string} date Date to add days to
 * @param {number} days Amount of days to add
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = addDays(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-20T18:00:00.000Z, unix: 1629475200000, json: '2021-08-20T18:00:00.000Z' }
 */
export function addDays(
  date: Date | number | string,
  days: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getDate() + days

  dt.setDate(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date object and subtracts a given amount of days from it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 *
 * @param {Date|number|string} date Date to subtract days from
 * @param {number} days Amount of days to subtract
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = subtractDays(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-10T18:00:00.000Z, unix: 1628620800000, json: '2021-08-10T18:00:00.000Z' }
 */
export function subtractDays(
  date: Date | number | string,
  days: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getDate() - days

  dt.setDate(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}
