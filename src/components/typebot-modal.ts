import { create, $, observeMutation } from '../web/dom'
import { getPropertyValue } from '../modules/object'

export default {
  init(id: string) {
    let script = $('#jsweb-tpbtmdl')

    if (!script) {
      const js = [
        `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2/dist/web.js'`,
        `Typebot.initPopup({ typebot: '${id}' })`,
      ].join('\n')
      const blob = new Blob([js], { type: 'application/javascript' })
      const src = URL.createObjectURL(blob)

      script = create('script', { id: 'typebot', type: 'module', src })

      document.head.appendChild(script)
    }
  },

  open() {
    const Typebot = getPropertyValue(window, 'Typebot') as any
    if (Typebot) {
      Typebot.open()

      const tp = document.querySelector('typebot-popup') as HTMLElement

      observeMutation(tp.shadowRoot ?? tp, (record) => {
        record.addedNodes.forEach((node) => {
          node.childNodes.forEach((child) => {
            const link = child.textContent?.includes('Made with Typebot')
            if (link) {
              const tag = child as HTMLAnchorElement
              tag.removeAttribute('id')
              tag.remove()
            }
          })
        })
      })
    } else console.error('Failed to open Typebot')
  },

  close() {
    const Typebot = getPropertyValue(window, 'Typebot') as any
    if (Typebot) Typebot.close()
    else console.error('Failed to close Typebot')
  },
}
