
import { Component } from "solid-js";
import styles from './mobile.module.css'
const Mobile: Component<{children?:any}> = (props) => {
    return(
        <>
        <sl-card>
        <div class={styles.M}>
        <sl-qr-code value="https://smartmixers.netlify.app/" size="150"  error-correction="Q" fill="black" background="white"></sl-qr-code>
        <br/><br/>{props.children}
        </div>
        </sl-card>
        </>
      )
};

export default Mobile;