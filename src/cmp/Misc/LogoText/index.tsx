
import { Component } from "solid-js";
import styles from './LogoText.module.css'

const LogoText: Component<{size:string,onClick?:any,children:any}> = ({size,onClick,children}) => {
  return (<div class={styles.LogoText} onClick={onClick}><h1 class={styles[size]}>{children}</h1></div>);
};

export default LogoText;