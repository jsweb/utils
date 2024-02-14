import { wuid } from '@jsweb/randkey'
import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Comments, CommentsConfig, DisqusConfig } from '../web/disqus'

@customElement('disqus-comments')
export class DisqusComments extends LitElement {
  @property({ type: String }) url = ''
  @property({ type: String }) identifier = ''
  @property({ type: String }) site = ''
  @property({ type: String }) shortname = ''
  @property({ type: Number }) delay = 0
  @property({ type: String, attribute: 'category-id' }) category_id = ''
  @property({ type: Boolean, attribute: 'on-enter-view' }) onEnterView = false

  private setup: CommentsConfig = {} as CommentsConfig
  private comments: Comments = {} as Comments

  static override styles = css`
    :host {
      display: none;
    }
  `

  async setupDisqus() {
    const { after, create } = await import('../web/dom')

    const id = `disqus-${wuid()}`
    const component = this.localName
    const container = create('div', { id })
    after(component, container)

    const disqus: DisqusConfig = {
      url: this.url,
      identifier: this.identifier,
      site: this.site,
      title: this.title,
      shortname: this.shortname,
      category_id: this.category_id,
    }

    this.setup = {
      disqus,
      selector: `#${id}`,
      delay: this.delay,
      onEnterView: this.onEnterView,
    }
  }

  async setupComments() {
    const { comments } = await import('../web/disqus')
    this.comments = comments(this.setup)
  }

  override async render() {
    await this.setupDisqus()
    await this.setupComments()
  }

  reload() {
    this.comments.reload()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'disqus-comments': DisqusComments
  }
}
