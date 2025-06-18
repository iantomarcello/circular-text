import { html, LitElement, css, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Renders text in a circular layout.
 * based on https://dev.to/jh3y/circular-text-with-css-57jf#introducing-css-trigonometry
 * @cssproperty `--offset` - The offset angle for the text.
 * @cssproperty `--spacing` - The spacing between characters. `full` for full circle.
 */
@customElement('circular-text')
export class CircularText extends LitElement {
  static styles = [css`
    :host {
      --offset: 0;
      --spacing: 1;
      display: block;
      aspect-ratio: 1;
    }

    .ring {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .character {
      --index: sibling-index();
      height: 50%;
      position: absolute;
      top: 0%;
      left: 50%;
      translate: -50% 0;
      transform-origin: center bottom;
      rotate: calc(var(--index) * (4deg * var(--spacing)) + (var(--offset) * 1deg));

      @supports(width: calc(sibling-index() * 1px)) {
        rotate: calc(sibling-index() * (4deg * var(--spacing)) + (var(--offset) * 1deg));
      }

      @container style(--spacing: full) {
        rotate: calc((sibling-index() / sibling-count() * 360deg) + (var(--offset) * 1deg));
      }
    }
  `];

  get _slottedChildren() {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedNodes({ flatten: true }) || [];
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => {
        this.requestUpdate();
      });
      this._slottedChildren.length > 0 && slot.setAttribute('hidden', '');
    }
  }

  render() {
      return html`
      <slot></slot>
      <div class="ring">
        ${this._slottedChildren?.length < 1 ? 'null' : this._slottedChildren?.map((node) => {
          const text: string = node.textContent?.trim() as string;
          return [...text.split('')]?.map((letter, index) => html`<span class="character" style="--index: ${index}">${letter}</span>`)
        })}
      </div>
      `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'circular-text': CircularText,
  }
}