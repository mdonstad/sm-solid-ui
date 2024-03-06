
import { Component } from "solid-js";
import styles from './Header.module.css';
import {createSignal,Show} from "solid-js";
import LogoText from '../Misc/LogoText'
//import { eventListener } from "@solid-primitives/event-listener";

const Footer: Component<{sticky?:boolean,children?:any}> = ({sticky=true,children}) => {
  return <footer data-app-footer data-sticky={sticky ? '' : undefined} class={styles.footer}>
    {children}
  </footer>;
};

export default Footer;