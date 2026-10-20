(function(){var e=(e,t)=>Math.round(e/t),t=class extends HTMLElement{static get observedAttributes(){return[`amount`,`currency`]}#e=null;#t=!1;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.style.display=`block`,this.#e=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(this.#t=!0,this._render(),this.#e?.disconnect(),this.#e=null)},{rootMargin:`200px`}),this.#e.observe(this)}disconnectedCallback(){this.#e?.disconnect(),this.#e=null}attributeChangedCallback(e,t,n){t!==n&&this.#t&&this._render()}_render(){this.shadowRoot.replaceChildren();let t=this.getAttribute(`amount`),n=parseFloat(t??``);if(!t||isNaN(n)||n<=0){console.warn(`paylater-message: invalid or missing amount attribute on element`,this);return}let r=e(Math.round(n*100),4),i=new Intl.NumberFormat(navigator.language,{style:`currency`,currency:this.getAttribute(`currency`)??`USD`}),a=document.createElement(`style`);a.textContent=`
      :host {
        font-family: system-ui, sans-serif;
        font-size: 14px;
        color: #333;
      }
      p {
        margin: 0;
      }
    `;let o=document.createElement(`p`);o.textContent=`or 4 payments of ${i.format(r/100)}`,this.shadowRoot.append(a,o)}};customElements.define(`paylater-message`,t)})();