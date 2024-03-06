import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "sl-input": any;
      "sl-icon":any;
    }
  }
}