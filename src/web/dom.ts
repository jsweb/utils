const { documentElement: html, head, body } = document

export { html, head, body }
/**
 * Shorthand for document.querySelector
 *
 * @export
 * @function $
 * @param {string} selector Element selector
 * @return {Element} Element
 */
export function $(selector: string): Element {
  return document.querySelector(selector)
}

/**
 * Shorthand for document.querySelectorAll
 *
 * @export
 * @function $$
 * @param {string} selector Elements selector
 * @return {Element[]} Elements
 */
export function $$(selector: string): Element[] {
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
 * @return {HTMLElement} Element created
 */
export function create(tag: string, props: any = {}): HTMLElement {
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
  $(selector).appendChild(child)
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
export function listen(
  selector: string,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  $(selector).addEventListener(type, handler, options)
}
