import { Component } from "solid-js";
import styles from './CenterWrap.module.css'
const CenterWrap: Component<{}> = (props) => {
  
  return (<div class={styles.CenterWrap}>
    {props.children}
  </div>)
}
export default CenterWrap;