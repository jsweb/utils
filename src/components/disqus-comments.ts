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

  private setup: CommentsConfig = {} as CommentsConfig
  private comments: Comments = {} as Comments

  static override styles = css`
    :host {
      display: block;
    }
  `

  override connectedCallback() {
    super.connectedCallback()

    const selector = this.localName
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
