const { documentElement: html, head, body } = document

export { html, head, body }
/**
 * Shorthand for document.querySelector.
 *
 * @export
 * @function $
 * @param {string | Element} selector Element selector
 * @example
 * $(`.lazy`)
 */
export function $(selector: string | Element) {
  return selector instanceof Element
    ? selector
    : document.querySelector(selector)
}

/**
 * Shorthand for document.querySelectorAll, but returns an array.
 *
 * @export
 * @function $$
 * @param {string | NodeList | HTMLCollection} selector Elements selector
 * @example
 * $$('.lazy')
 */
export function $$(selector: string | NodeList | HTMLCollection) {
  const all =
    typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : selector
  return Array.from(all) as HTMLElement[]
}

/**
 * Shorthand for document.createElement
 *
 * @export
 * @function create
 * @param {string} tag Element tag name
 * @param {*} [props={}] Element properties
 * @example
 * create('div', { class: 'lazy' })
 */
export function create(tag: string, props: any = {}) {
  const target = document.createElement(tag)

  for (const key in props) target.setAttribute(key, props[key])

  return target
}

/**
 * Shorthand for Element.appendChild
 *
 * @export
 * @function append
 * @param {string | Element} selector Element selector
 * @param {Element} child Child element
 * @example
 * append('.lazy', child)
 */
export function append(selector: string | Element, child: Element) {
  const target = $(selector)
  if (target) target.appendChild(child)
}

/**
 * Shorthand for Element.insertAdjacentElement('afterend', child)
 *
 * @export
 * @function after
 * @param {string | Element} selector
 * @param {Element} child
 * @example
 * after('.lazy', child)
 */
export function after(selector: string | Element, child: Element) {
  const target = $(selector)
  if (target) target.insertAdjacentElement('afterend', child)
}

/**
 * Shorthand for Element.addEventListener.
 * Can observe one or multiple elements.
 *
 * @export
 * @function on
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} handler Event handler
 * @param {boolean | AddEventListenerOptions} [options]
 * @example
 * on('.lazy', 'click', callback, options?)
 */
export function on(
  selector: string | Element | NodeList | HTMLCollection,
  type: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  if (selector instanceof Element) {
    selector.addEventListener(type, handler, options)
  } else {
    const target = $$(selector)
    target.forEach((elm) => elm.addEventListener(type, handler, options))
  }
}

/**
 * Shorthand for Element.removeEventListener.
 * Can observe one or multiple elements.
 *
 * @export
 * @function off
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} handler Event handler
 * @param {boolean | AddEventListenerOptions} [options]
 * @example
 * off('.lazy', 'click', callback, options?)
 */
export function off(
  selector: string | Element | NodeList | HTMLCollection,
  type: string,
  handler: EventListener,
  options?: boolean | EventListenerOptions
) {
  if (selector instanceof Element) {
    selector.removeEventListener(type, handler, options)
  } else {
    const target = $$(selector)
    target.forEach((elm) => elm.removeEventListener(type, handler, options))
  }
}

/**
 * Shorthand for a listener that executes the callback just once.
 * Can observe one or multiple elements.
 *
 * @export
 * @function once
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {string} type Event type
 * @param {EventListenerOrEventListenerObject} handler Event handler
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {EventListenerOrEventListenerObject}
 * @example
 * once('.lazy', callback, options?)
 */
export function once(
  selector: string | Element | NodeList | HTMLCollection,
  type: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  function callback(e: Event) {
    handler(e)
    off(selector, e.type, callback, options)
  }
  on(selector, type, callback, options)
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
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersection('.lazy', callback, options?)
 */
export function observeIntersection(
  selector: string | Element | NodeList | HTMLCollection,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(callback),
    options
  )
  if (selector instanceof Element) {
    observer.observe(selector)
  } else {
    const target = $$(selector)
    target.forEach((elm) => observer.observe(elm))
  }
  return observer
}

/**
 * Shorthand for IntersectionObserver executing the callback just once.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeIntersectionOnce
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersectionOnce('.lazy', callback, options?)
 */
export function observeIntersectionOnce(
  selector: string | Element | NodeList | HTMLCollection,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = observeIntersection(
    selector,
    (entry, index, array) => {
      if (entry.isIntersecting) {
        callback(entry, index, array)
        observer.disconnect()
      }
    },
    options
  )
  return observer
}

/**
 * Shorthand for IntersectionObserver executing the callback once for each element.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeIntersectionOnceForEach
 * @param {string | Element | NodeList | HTMLCollection} selector Element selector
 * @param {EntryIntersectionObserverCallback} callback IntersectionObserver callback
 * @param {IntersectionObserverInit} [options] IntersectionObserver options
 * @returns {IntersectionObserver}
 * @example
 * observeIntersectionOnceForEach('.lazy', callback, options?)
 */
export function observeIntersectionOnceForEach(
  selector: string | Element | NodeList | HTMLCollection,
  callback: EntryIntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = observeIntersection(
    selector,
    (entry, index, array) => {
      if (entry.isIntersecting) {
        callback(entry, index, array)
        observer.unobserve(entry.target)
      }
    },
    options
  )
  return observer
}

type RecordMutationObserverCallback = (
  record: MutationRecord,
  index: number,
  array: MutationRecord[]
) => void
/**
 * Shorthand for MutationObserver.
 * Can observe one or multiple elements.
 *
 * @export
 * @function observeMutation
 * @param {string | Element | ShadowRoot | NodeList | HTMLCollection} selector Element selector
 * @param {RecordMutationObserverCallback} callback MutationObserver callback
 * @param {MutationObserverInit} [options] MutationObserver options
 * @returns {MutationObserver}
 * @example
 * observeMutation('.lazy', callback, options?)
 */
export function observeMutation(
  selector: string | Element | ShadowRoot | NodeList | HTMLCollection,
  callback: RecordMutationObserverCallback,
  options?: MutationObserverInit
): MutationObserver {
  const observer = new MutationObserver((records) => records.forEach(callback))

  if (selector instanceof Element || selector instanceof ShadowRoot) {
    observer.observe(selector, options)
  } else {
    const target = $$(selector)
    target.forEach((elm) => observer.observe(elm, options))
  }

  return observer
}
