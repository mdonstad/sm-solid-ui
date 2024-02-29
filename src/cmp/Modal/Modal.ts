export class CSModal extends HTMLElement {
    get value() {
        return this.getAttribute('value');
    }
    constructor() {
      super();
      const shadowRoot=this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent=`
        :host {--sl-input-required-content:''}
        .cs-modal__overlay {
            position: fixed;left: 0px;top: 0px;width:100vw;height:100vh;
            background:rgba(0,0,0,0.48);z-index:1400;
        }
        .cs-modal {tabindex="-1";display: flex;width: 100vw;height: 100dvh; position: fixed;
            left: 0px;top: 0px;z-index: 1400;
            -webkit-box-pack: center;justify-content: center;
            align-items: flex-start;overflow: auto;overscroll-behavior-y: none;
        }
        .cs-modal__content {
            display: flex;flex-direction: column;
            position: relative;outline-offset: 2px;color: inherit;
            margin-top: 0px;margin-bottom: 0px;z-index: 1400;
            --modal-bg: var(--app-panel-background);--modal-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px;
            background-image: ;background-position-x: ;background-position-y: ;background-size: ;
            background-repeat: ;background-attachment: ;
            background-origin: ;background-clip: ;
            box-shadow: var(--modal-shadow);
            max-width: 800px;min-height: 100dvh;width: 800px;
            background-color: var(--sl-color-neutral-200);
            outline: transparent solid 2px;
            padding: 0px;border-radius: 15px;
        }
        .cs-modal__close {

        }
        .cs-modal__body {
            padding-inline-start: 1.5rem;
            padding-inline-end: 1.5rem;
            flex: 1 1 0%;
            padding: 0px;
            height: 100%; 
        }
      `;
      const divMain = document.createElement("div");
      let mContent=`
        <div class="cs-modal__overlay" aria-hidden="true"></div>
        <div class="cs-modal">
            <section class="cs-modal__content" role="dialog">
                <sl-button class="cs-modal__close">Close</sl-button>
                <div class="cs-modal__body">
                    <slot />
                </div>
            </section>
        </div>
      `
      shadowRoot.prepend(style);
      divMain.innerHTML=mContent;
      shadowRoot.append(divMain);

    }
    connectedCallback() {
        const shadowRoot=this.shadowRoot;
        if (shadowRoot){
        }
    }
  
    disconnectedCallback() {
    }
  
    static get observedAttributes() {
      return [/* array of attribute names to monitor for changes */];
    }
  
   // attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
   // }
  
    adoptedCallback() {
      // called when the element is moved to a new document
      // (happens in document.adoptNode, very rarely used)
    }
  
    // there can be other element methods and properties
  }
  customElements.define("cs-modal", CSModal);
