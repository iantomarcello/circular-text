import { css as d, LitElement as c, html as a } from "lit";
import { customElement as g } from "lit/decorators.js";
var h = Object.getOwnPropertyDescriptor, p = (e, t, r, o) => {
  for (var s = o > 1 ? void 0 : o ? h(t, r) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (s = n(s) || s);
  return s;
};
let l = class extends c {
  get _slottedChildren() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    return (e == null ? void 0 : e.assignedNodes({ flatten: !0 })) || [];
  }
  firstUpdated(e) {
    var r;
    const t = (r = this.shadowRoot) == null ? void 0 : r.querySelector("slot");
    t && (t.addEventListener("slotchange", () => {
      this.requestUpdate();
    }), this._slottedChildren.length > 0 && t.setAttribute("hidden", ""));
  }
  render() {
    var e, t;
    return a`
      <slot></slot>
      <div class="ring">
        ${((e = this._slottedChildren) == null ? void 0 : e.length) < 1 ? "null" : (t = this._slottedChildren) == null ? void 0 : t.map((r) => {
      var s;
      return [...((s = r.textContent) == null ? void 0 : s.trim()).split("")].map((i, n) => a`<span class="character" style="--index: ${n}">${i}</span>`);
    })}
      </div>
      `;
  }
};
l.styles = [d`
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
l = p([
  g("circular-text")
], l);
export {
  l as CircularText
};
