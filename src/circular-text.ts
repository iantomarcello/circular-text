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
      --flip: 1;
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

      /** Goes full circle */
      @container style(--spacing: 0) {
        rotate: calc((sibling-index() / sibling-count() * 359deg) + (var(--offset) * 1deg));
      }
    }

    .letter {
      position: absolute;
      transform-origin: center;
      translate: -50% 0%;

      scale: if(
        style(--flip: 1): -1 -1;
      );
    }
  `];

  get _slottedChildren() {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedNodes({ flatten: true }) || [];
  }

  requestUpdate = () => {
    super.requestUpdate()
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => {
        this.requestUpdate();
      });
      this._slottedChildren.length > 0 && slot.setAttribute('hidden', '');
    }

    this.addEventListener('pointerenter', this.requestUpdate);
    this.addEventListener('pointerleave', this.requestUpdate);
    this.addEventListener('focus', this.requestUpdate);
    this.addEventListener('blur', this.requestUpdate);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('pointerenter', this.requestUpdate);
    this.removeEventListener('pointerleave', this.requestUpdate);
    this.removeEventListener('focus', this.requestUpdate);
    this.removeEventListener('blur', this.requestUpdate);
  }

  render() {
    const isFlip = getComputedStyle(this).getPropertyValue('--flip') === '1';
    return html`
      <slot></slot>
      <div class="ring">
        ${this._slottedChildren?.length < 1 ? 'null' : this._slottedChildren?.map((node) => {
          const text: string = node.textContent?.trim() as string;
          let texts = text.split('');
          if (isFlip) texts = texts.reverse();
          return texts?.map((letter, index) => html`
            <span class="character" style="--index: ${index}">
              <span class="letter">
                ${letter}
              </span>
            </span>
          `)
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