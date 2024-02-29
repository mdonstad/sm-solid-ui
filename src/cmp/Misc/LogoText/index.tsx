
import { Component } from "solid-js";
import styles from './LogoText.module.css'

const LogoText: Component<{size:string,children:any}> = ({size,children}) => {
  return (<div class={styles.LogoText}><h1 class={styles[size]}>{children}</h1></div>);
};

export default LogoText;