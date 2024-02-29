import type { Component } from 'solid-js';
import styles from './Splash.module.css';
import {Motion,Presence} from "solid-motionone";
import {createSignal, Show} from "solid-js"
//const [isSplashShown, setSplashShow] = createSignal(true)
const [splashDone, hideSplash] = createSignal(false)
const setSplashDuration = d => window.setTimeout(t=>hideSplash(true),d);

const Splash: Component = ({duration,children}) => {
    setSplashDuration(duration || 1300);

    return (
        <>
            <Presence >
            <Show when={!splashDone()}>
            <Motion.div class={styles.Splash} initial={{opacity:1}} exit={{opacity: [1,0]}} transition={{duration: 1, easing: "ease-in-out"}}>
                <div class={styles.header}>
                <Motion initial={{scale: 0.2}}  animate={{scale: 1.6}} transition={{duration: 0.3,easing: "ease-in-out"}}><h1><span>Smart</span>Mixers</h1></Motion>
                <sl-spinner></sl-spinner>
                </div>
            </Motion.div>
            </Show>
            </Presence>
            {children}
         </>
    );
  };
  export {splashDone}
  export default Splash;
  