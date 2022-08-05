import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { comments, Comments, CommentsConfig, DisqusConfig } from '../web/disqus'
import { after, create } from '../web/dom'

@customElement('disqus-comments')
export class DisqusComments extends LitElement {
  @property({ type: String }) url = ''
  @property({ type: String }) identifier = ''
  @property({ type: String }) site = ''
  @property({ type: String }) shortname = ''
  @property({ type: Number }) delay = 0
  @property({ type: String, attribute: 'category-id' }) category_id = ''
  @property({ type: Boolean, attribute: 'on-enter' }) onEnter = false

  private setup: CommentsConfig = {} as CommentsConfig
  private comments: Comments = {} as Comments

  static override styles = css`
    :host {
      display: block;
    }
  `

  override connectedCallback() {
    super.connectedCallback()

    const component = this.localName
    const container = create('div', { id: component })
    after(component, container)

    const selector = `#${component}`
    const disqus: DisqusConfig = {
      url: this.url,
      identifier: this.identifier,
      site: this.site,
      title: this.title,
      shortname: this.shortname,
      category_id: this.category_id,
    }

    this.setup = {
      selector,
      disqus,
      delay: this.delay,
      onEnter: this.onEnter,
    }
  }

  override render() {
    this.comments = comments(this.setup)
  }

  reload() {
    this.comments.reload()
  }
}
