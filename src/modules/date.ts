interface CurrentDate {
  date: Date
  unix: number
  json: string
}

/**
 * Gets current date and time in 3 basic formats: Date, Unix and JSON.
 * Returns a DateNow object.
 * @return {*} {DateNow} DateNow object
 * @example
 * const date = getCurrentDate()
 * console.log(date)
 * // { date: 2021-08-15T18:00:00.000Z, unix: 1629043200000, json: '2021-08-15T18:00:00.000Z' }
 */
export function getCurrentDate(): CurrentDate {
  const date = new Date()
  const unix = date.getTime()
  const json = date.toJSON()
  return { date, unix, json }
}

/**
 * Receives a Date object and adds a given amount of days to it.
 * Returns a new DateNow object.
 *
 * @param {Date} date Date to add days to
 * @param {number} days Amount of days to add
 * @return {*} {DateNow} New DateNow object
 * @example
 * const date = new Date()
 * const newDate = addDays(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-20T18:00:00.000Z, unix: 1629475200000, json: '2021-08-20T18:00:00.000Z' }
 */
export function addDays(
  date: Date | number | string,
  days: number
): CurrentDate {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)

  const unix = newDate.getTime()
  const json = newDate.toJSON()

  return { date: newDate, unix, json }
}
