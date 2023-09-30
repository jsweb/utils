const { documentElement: html, head, body } = document

export { html, head, body }
/**
 * Shorthand for document.querySelector
 *
 * @export
 * @function $
 * @param {string} selector Element selector
 */
export function $(selector: string) {
  return document.querySelector(selector)
}

/**
 * Shorthand for document.querySelectorAll
 *
 * @export
 * @function $$
 * @param {string} selector Elements selector
 */
export function $$(selector: string) {
  const all = document.querySelectorAll(selector)
  return Array.from(all)
}

/**
 * Shorthand for document.createElement
 *
 * @export
 * @function create
 * @param {string} tag Element tag name
 * @param {*} [props={}] Element properties
 */
export function create(tag: string, props: any = {}) {
  const elm = document.createElement(tag)

  for (const key in props) elm.setAttribute(key, props[key])

  return elm
}

/**
 * Shorthand for Element.appendChild
 *
 * @export
 * @function append
 * @param {string} selector Element selector
 * @param {Node} child Child element
 */
export function append(selector: string, child: Node) {
  const elm = $(selector)
  if (elm) elm.appendChild(child)
}

/**
 * Shorthand for Element.insertAdjacentElement('afterend', child)
 *
 * @export
 * @function after
 * @param {string} selector
 * @param {Element} child
 */
export function after(selector: string, child: Element) {
  const elm = $(selector)
  if (elm) elm.insertAdjacentElement('afterend', child)
}

/**
 * Shorthand for Element.addEventListener
 *
 * @export
 * @function on
 * @param {string} selector Element selector
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} handler Event handler
 * @param {(boolean | AddEventListenerOptions)} [options]
 */
export function on(
  selector: string,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  const elm = $(selector)
  if (elm) elm.addEventListener(type, handler, options)
}

/**
 * Shorthand for Element.removeEventListener
 *
 * @export
 * @function off
 * @param {string} selector Element selector
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} handler Event handler
 * @param {(boolean | AddEventListenerOptions)} [options]
 */
export function off(
  selector: string,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
) {
  const elm = $(selector)
  if (elm) elm.removeEventListener(type, handler, options)
}

type EntryIntersectionObserverCallback = (
  entry: IntersectionObserverEntry,
  index: number,
  array: IntersectionObserverEntry[]
) => void
/**
 * Shorthand for IntersectionObserver.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeIntersection
 * @param {string} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersection('.lazy', callback, options?)
 */
export function observeIntersection(
  selector: string,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(callback),
    options
  )
  const all = $$(selector)
  all.forEach((elm) => observer.observe(elm))
  return observer
}

/**
 * Shorthand for IntersectionObserver executin the callback just once.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeIntersectionOnce
 * @param {string} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersectionOnce('.lazy', callback, options?)
 */
export function observeIntersectionOnce(
  selector: string,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(callback)
    observer.disconnect()
  }, options)
  const all = $$(selector)
  all.forEach((elm) => observer.observe(elm))
  return observer
}

/**
 * Shorthand for IntersectionObserver executin the callback just once for each element.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeIntersectionOnceForEach
 * @param {string} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersectionOnceForEach('.lazy', callback, options?)
 */
export function observeIntersectionOnceForEach(
  selector: string,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index, array) => {
      callback(entry, index, array)
      observer.unobserve(entry.target)
    })
  }, options)
  const all = $$(selector)
  all.forEach((elm) => observer.observe(elm))
  return observer
}
