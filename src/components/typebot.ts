import { $, $$, create, observeMutation } from '../web/dom'
import { getPropertyValue } from '../modules/object'

const types = {
  standard: 'initStandard',
  popup: 'initPopup',
  bubble: 'initBubble',
}
type methods = keyof typeof types

export default {
  /**
   * Initializes the typebot with the specified type and component.
   * Accepts an optional configuration object, according to the typebot documentation.
   *
   * @param {string} typebot - the typebot id
   * @param {methods} component - the component type
   * @param {Object} config - (optional) configuration for the typebot
   * @see https://docs.typebot.io
   * @example
   * init('my-typebot-id', 'standard', { ... })
   */
  init(typebot: string, component: methods, config: object = {}) {
    let script = $('#jsweb-tpbtmdl')

    if (!script) {
      const method = getPropertyValue<methods>(types, component, 'initStandard')
      const setup = JSON.stringify({ ...config, typebot })
      const js = [
        `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js/dist/web.js'`,
        `Typebot.${method}(${setup})`,
      ].join('\n')
      const blob = new Blob([js], { type: 'application/javascript' })
      const src = URL.createObjectURL(blob)

      script = create('script', { id: 'typebot', type: 'module', src })

      document.head.appendChild(script)
    }
  },

  /**
   * Opens Typebot if available, otherwise logs an error.
   */
  open() {
    const Typebot = getPropertyValue(window, 'Typebot') as any
    if (Typebot) {
      Typebot.toggle()
      TypebotCleanUp()
    } else console.error('Failed to open Typebot')
  },

  /**
   * Closes the Typebot if available, otherwise logs an error.
   */
  close() {
    const Typebot = getPropertyValue(window, 'Typebot') as any
    if (Typebot) Typebot.toggle()
    else console.error('Failed to close Typebot')
  },

  /**
   * Toggles Typebot if available, otherwise logs an error.
   */
  toggle() {
    const Typebot = getPropertyValue(window, 'Typebot') as any
    if (Typebot) {
      Typebot.toggle()
      TypebotCleanUp()
    } else console.error('Failed to toggle Typebot')
  },
}

// Helpers
function TypebotCleanUp() {
  $$('typebot-standard, typebot-bubble, typebot-popup').forEach((tpb) => {
    observeMutation(
      tpb.shadowRoot ?? tpb,
      (record) => {
        record.addedNodes.forEach((node) => {
          const elm = node as HTMLElement
          const link = elm.querySelector('a')
          const brand = link?.href?.includes('typebot.io')

          if (!link || !brand) return undefined

          link.removeAttribute('id')
          link.remove()
        })
      },
      { childList: true, subtree: true }
    )
  })
}
