import onEnter from 'enter-view'
import { $, create, append } from './dom'
import { getPropertyValue } from '../modules/object'

export interface DisqusConfig {
  url: string
  identifier: string
  site: string
  title?: string
  shortname?: string
  category_id?: string
}

export interface CommentsConfig {
  selector: string
  disqus: DisqusConfig
  delay?: number
  onEnter?: boolean
}

export interface Comments {
  thread: HTMLElement
  reload: () => void
}

export function comments(setup: CommentsConfig): Comments {
  Object.defineProperty(window, 'disqus_config', {
    writable: true,
    value: {
      call(obj: any) {
        obj.page.url = setup.disqus.url
        obj.page.identifier = setup.disqus.identifier

        if (setup.disqus.title) obj.page.title = setup.disqus.title
        if (setup.disqus.shortname) obj.page.shortname = setup.disqus.shortname
        if (setup.disqus.category_id)
          obj.page.category_id = setup.disqus.category_id
      },
    },
  })

  const thread = create('div', { id: 'disqus_thread' })
  const script = create('script', {
    async: true,
    'data-timestamp': Date.now(),
    src: `https://${setup.disqus.site}.disqus.com/embed.js`,
  })
  const load = () => {
    const container = $(setup.selector)

    if (container) {
      container.innerHTML = ''
      append(setup.selector, thread)
      append(setup.selector, script)
    }
  }
  const reload = () => {
    const dqs = getPropertyValue<any>(window, 'DISQUS')
    if (dqs) dqs.reset({ reload: true })
  }

  if (setup.onEnter)
    onEnter({ once: true, selector: setup.selector, enter: load })
  else setTimeout(load, setup.delay || 1)

  return { thread, reload }
}
