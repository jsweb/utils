import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { comments, Comments, CommentsConfig, DisqusConfig } from '../web/disqus'

@customElement('disqus-comments')
export class DisqusComments extends LitElement {
  @property({ type: String }) url = ''
  @property({ type: String }) identifier = ''
  @property({ type: String }) site = ''
  @property({ type: String }) shortname = ''
  @property({ type: String }) category_id = ''
  @property({ type: Number }) delay = 0
  @property({ type: Boolean }) onEnter = false

  private comments: Comments

  static override styles = css`
    :host {
      display: block;
    }
  `

  constructor() {
    super()

    const selector = this.localName
    const disqus: DisqusConfig = {
      url: this.url,
      identifier: this.identifier,
      site: this.site,
      title: this.title,
      shortname: this.shortname,
      category_id: this.category_id,
    }
    const setup: CommentsConfig = {
      selector,
      disqus,
      delay: this.delay,
      onEnter: this.onEnter,
    }

    this.comments = comments(setup)
  }

  reload() {
    this.comments.reload()
  }
}
