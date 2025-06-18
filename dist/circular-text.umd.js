(function(e,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("lit"),require("lit/decorators.js")):typeof define=="function"&&define.amd?define(["exports","lit","lit/decorators.js"],s):(e=typeof globalThis<"u"?globalThis:e||self,s(e.CircularText={},e.lit,e.decorators_js))})(this,function(e,s,d){"use strict";var c=Object.getOwnPropertyDescriptor,u=(a,i,t,r)=>{for(var o=r>1?void 0:r?c(i,t):i,n=a.length-1,l;n>=0;n--)(l=a[n])&&(o=l(o)||o);return o};e.CircularText=class extends s.LitElement{get _slottedChildren(){var t;const i=(t=this.shadowRoot)==null?void 0:t.querySelector("slot");return(i==null?void 0:i.assignedNodes({flatten:!0}))||[]}firstUpdated(i){var r;const t=(r=this.shadowRoot)==null?void 0:r.querySelector("slot");t&&(t.addEventListener("slotchange",()=>{this.requestUpdate()}),this._slottedChildren.length>0&&t.setAttribute("hidden",""))}render(){var i,t;return s.html`
      <slot></slot>
      <div class="ring">
        ${((i=this._slottedChildren)==null?void 0:i.length)<1?"null":(t=this._slottedChildren)==null?void 0:t.map(r=>{var n;return[...((n=r.textContent)==null?void 0:n.trim()).split("")].map((l,h)=>s.html`<span class="character" style="--index: ${h}">${l}</span>`)})}
      </div>
      `}},e.CircularText.styles=[s.css`
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
  `],e.CircularText=u([d.customElement("circular-text")],e.CircularText),Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
