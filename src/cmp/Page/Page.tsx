
import type { Component } from "solid-js";
import styles from './Page.module.css';
import Icon from '../Icon/Icon'
import Header from './Header'
import Toolbar from '../Icon/Toolbar'
import ThemePicker from '../ThemePicker/index'
import SlideAnim from './transitions/Slide'
import { useRouter } from "../Router";
//import { useBeforeLeave } from "@solidjs/router";
const Page: Component<{name:string,children:any}> = ({name,children}) => {
    const {activeRoute}=useRouter();
    let active=activeRoute().id == name;
    return (
        <div data-id={name} class={styles.Page + " " + (activeRoute().id == name ? styles.active : '')} >
            <SlideAnim type={"slideIn"} show={activeRoute().id == name}>
            {children}
            </SlideAnim>
        </div>
        

  );
};

export default Page;