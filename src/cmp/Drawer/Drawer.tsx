//scompie
import styles from './Drawer.module.css';

import { Component } from "solid-js";
import { eventListener } from "@solid-primitives/event-listener";

const Drawer: Component<{}> = ({label="",placement="start",open,onClick,children}) => {
  return <sl-drawer label={label} placement={placement} style="--size:75vw" open={open() ? true : undefined} 
  use:eventListener={["sl-hide", onClick]}
  >
  {children}
  <sl-button slot="footer" variant="primary" onClick={onClick}>Close</sl-button>
  </sl-drawer>
};

export default Drawer;