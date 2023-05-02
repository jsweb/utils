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
 * Receives a Date value and adds a given amount of days to it.
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
 * Receives a Date value and subtracts a given amount of days from it.
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

/**
 * Receives a Date value and adds a given amount of months to it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to add months to
 * @param {number} months Amount of months to add
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = addMonths(date, 5)
 * console.log(newDate)
 * // { date: 2022-01-15T18:00:00.000Z, unix: 1642262400000, json: '2022-01-15T18:00:00.000Z' }
 */
export function addMonths(
  date: Date | number | string,
  months: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getMonth() + months

  dt.setMonth(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and subtracts a given amount of months from it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to subtract months from
 * @param {number} months Amount of months to subtract
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = subtractMonths(date, 5)
 * console.log(newDate)
 * // { date: 2021-03-15T18:00:00.000Z, unix: 1615804800000, json: '2021-03-15T18:00:00.000Z' }
 */
export function subtractMonths(
  date: Date | number | string,
  months: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getMonth() - months

  dt.setMonth(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and adds a given amount of years to it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to add years to
 * @param {number} years Amount of years to add
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = addYears(date, 5)
 * console.log(newDate)
 * // { date: 2026-08-15T18:00:00.000Z, unix: 1787097600000, json: '2026-08-15T18:00:00.000Z' }
 */
export function addYears(
  date: Date | number | string,
  years: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getFullYear() + years

  dt.setFullYear(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and subtracts a given amount of years from it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to subtract years from
 * @param {number} years Amount of years to subtract
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = subtractYears(date, 5)
 * console.log(newDate)
 * // { date: 2016-08-15T18:00:00.000Z, unix: 1471276800000, json: '2016-08-15T18:00:00.000Z' }
 */
export function subtractYears(
  date: Date | number | string,
  years: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getFullYear() - years

  dt.setFullYear(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and adds a given amount of hours to it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to add hours to
 * @param {number} hours Amount of hours to add
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = addHours(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-15T23:00:00.000Z, unix: 1629072000000, json: '2021-08-15T23:00:00.000Z' }
 */
export function addHours(
  date: Date | number | string,
  hours: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getHours() + hours

  dt.setHours(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and subtracts a given amount of hours from it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to subtract hours from
 * @param {number} hours Amount of hours to subtract
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = subtractHours(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-15T13:00:00.000Z, unix: 1629030000000, json: '2021-08-15T13:00:00.000Z' }
 */
export function subtractHours(
  date: Date | number | string,
  hours: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getHours() - hours

  dt.setHours(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and adds a given amount of minutes to it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to add minutes to
 * @param {number} minutes Amount of minutes to add
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = addMinutes(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-15T18:05:00.000Z, unix: 1629030300000, json: '2021-08-15T18:05:00.000Z' }
 */
export function addMinutes(
  date: Date | number | string,
  minutes: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getMinutes() + minutes

  dt.setMinutes(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Receives a Date value and subtracts a given amount of minutes from it.
 * Returns a CurrentDateTime object: { date: Date, unix: Number, json: String }.
 * @param {Date|number|string} date Date to subtract minutes from
 * @param {number} minutes Amount of minutes to subtract
 * @return {*} {CurrentDateTime} CurrentDateTime object
 * @example
 * const date = new Date()
 * const newDate = subtractMinutes(date, 5)
 * console.log(newDate)
 * // { date: 2021-08-15T17:55:00.000Z, unix: 1629029700000, json: '2021-08-15T17:55:00.000Z' }
 */
export function subtractMinutes(
  date: Date | number | string,
  minutes: number
): CurrentDateTime {
  const dt = new Date(date)
  const result = dt.getMinutes() - minutes

  dt.setMinutes(result)

  const unix = dt.getTime()
  const json = dt.toJSON()

  return { date: dt, unix, json }
}

/**
 * Formats a given Date value to a localized string.
 * Returns a string.
 * @param {Date|number|string} date Date to format
 * @param {Intl.LocalesArgument} locale Locale to use
 * @param {Intl.DateTimeFormatOptions} options Options to use
 * @return {*} {string} Formatted date string
 * @example
 * const date = new Date()
 * const formattedDate = dateFormat(date, 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
 * console.log(formattedDate)
 * // Sunday, August 15, 2021
 */
export function dateFormat(
  date: Date | number | string,
  locale: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(date).toLocaleDateString(locale, options)
}

/**
 * Formats a given Date value to a localized time string.
 * Returns a string.
 * @param {Date|number|string} date Date to format
 * @param {Intl.LocalesArgument} locale Locale to use
 * @param {Intl.DateTimeFormatOptions} options Options to use
 * @return {*} {string} Formatted time string
 * @example
 * const date = new Date()
 * const formattedTime = timeFormat(date, 'en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
 * console.log(formattedTime)
 * // 6:00:00 PM
 */
export function timeFormat(
  date: Date | number | string,
  locale: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(date).toLocaleTimeString(locale, options)
}
